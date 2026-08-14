const NAMESPACE = 'wedezy'

/** Bump when a stored shape changes incompatibly — old keys are then ignored. */
export const SCHEMA_VERSION = 'v1'

export const STORAGE_KEYS = {
  users: `${NAMESPACE}:${SCHEMA_VERSION}:users`,
  session: `${NAMESPACE}:${SCHEMA_VERSION}:session`,
  bookings: `${NAMESPACE}:${SCHEMA_VERSION}:bookings`,
  favourites: `${NAMESPACE}:${SCHEMA_VERSION}:favourites`,
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]

export const ALL_STORAGE_KEYS: StorageKey[] = Object.values(STORAGE_KEYS)
