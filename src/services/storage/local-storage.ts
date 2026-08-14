import { StorageFullError } from '@/services/errors'

import type { StorageKey } from './keys'

function getStore(): Storage | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    return window.localStorage
  } catch {
    // Access can throw when storage is blocked by browser settings.
    return null
  }
}

/**
 * Reads a stored value. Any failure — missing key, blocked storage, corrupted
 * JSON — resolves to `fallback` so one bad key degrades a single feature
 * instead of breaking the app.
 */
export function readValue<T>(key: StorageKey, fallback: T): T {
  const store = getStore()
  if (!store) return fallback

  try {
    const raw = store.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function readCollection<T>(key: StorageKey): T[] {
  const value = readValue<T[]>(key, [])
  return Array.isArray(value) ? value : []
}

export function writeValue<T>(key: StorageKey, value: T): void {
  const store = getStore()
  if (!store) return

  try {
    store.setItem(key, JSON.stringify(value))
  } catch (error) {
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new StorageFullError()
    }
    throw error
  }
}

export function removeValue(key: StorageKey): void {
  getStore()?.removeItem(key)
}

/**
 * Notifies when another tab writes to one of our keys. The `storage` event only
 * fires in *other* tabs, which is exactly the cross-tab case we care about.
 */
export function subscribe(onChange: (key: string) => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const handler = (event: StorageEvent) => {
    if (!event.key) return
    onChange(event.key)
  }

  window.addEventListener('storage', handler)
  return () => window.removeEventListener('storage', handler)
}
