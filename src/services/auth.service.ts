import { EmailInUseError, InvalidCredentialsError } from '@/services/errors'
import { STORAGE_KEYS } from '@/services/storage/keys'
import {
  readCollection,
  readValue,
  removeValue,
  writeValue,
} from '@/services/storage/local-storage'
import type { Session, StoredUser, User } from '@/types'

export interface SignUpInput {
  name: string
  email: string
  password: string
}

export interface SignInInput {
  email: string
  password: string
}

/* ------------------------------------------------------------------ *
 * Password hashing
 *
 * A local demo still has no business storing plaintext credentials, so
 * passwords are salted and digested with WebCrypto before they are written.
 * ------------------------------------------------------------------ */

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function randomHex(bytes: number): string {
  const array = new Uint8Array(bytes)
  crypto.getRandomValues(array)
  return toHex(array.buffer)
}

async function hashPassword(password: string, salt: string): Promise<string> {
  const encoded = new TextEncoder().encode(`${salt}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return toHex(digest)
}

/* ------------------------------------------------------------------ *
 * Service
 * ------------------------------------------------------------------ */

const normaliseEmail = (email: string) => email.trim().toLowerCase()

function toUser(stored: StoredUser): User {
  return {
    id: stored.id,
    name: stored.name,
    email: stored.email,
    createdAt: stored.createdAt,
  }
}

function readUsers(): StoredUser[] {
  return readCollection<StoredUser>(STORAGE_KEYS.users)
}

export async function signUp({ name, email, password }: SignUpInput): Promise<User> {
  const users = readUsers()
  const normalisedEmail = normaliseEmail(email)

  if (users.some((user) => user.email === normalisedEmail)) {
    throw new EmailInUseError()
  }

  const salt = randomHex(16)
  const stored: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalisedEmail,
    salt,
    passwordHash: await hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  }

  writeValue(STORAGE_KEYS.users, [...users, stored])
  writeValue<Session>(STORAGE_KEYS.session, {
    userId: stored.id,
    startedAt: new Date().toISOString(),
  })

  return toUser(stored)
}

export async function signIn({ email, password }: SignInInput): Promise<User> {
  const stored = readUsers().find((user) => user.email === normaliseEmail(email))
  if (!stored) throw new InvalidCredentialsError()

  const hash = await hashPassword(password, stored.salt)
  if (hash !== stored.passwordHash) throw new InvalidCredentialsError()

  writeValue<Session>(STORAGE_KEYS.session, {
    userId: stored.id,
    startedAt: new Date().toISOString(),
  })

  return toUser(stored)
}

export async function signOut(): Promise<void> {
  removeValue(STORAGE_KEYS.session)
}

/** The signed-in user, or `null`. Also self-heals a session pointing at a deleted user. */
export async function getSession(): Promise<User | null> {
  const session = readValue<Session | null>(STORAGE_KEYS.session, null)
  if (!session?.userId) return null

  const stored = readUsers().find((user) => user.id === session.userId)
  if (!stored) {
    removeValue(STORAGE_KEYS.session)
    return null
  }

  return toUser(stored)
}
