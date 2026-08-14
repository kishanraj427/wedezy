import { STORAGE_KEYS } from '@/services/storage/keys'
import { readCollection, writeValue } from '@/services/storage/local-storage'
import type { Favourite } from '@/types'

function readFavourites(): Favourite[] {
  return readCollection<Favourite>(STORAGE_KEYS.favourites)
}

/** Most recently saved first. */
export async function listFavourites(userId: string): Promise<Favourite[]> {
  return readFavourites()
    .filter((favourite) => favourite.userId === userId)
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt))
}

export async function isSaved(userId: string, venueId: string): Promise<boolean> {
  return readFavourites().some(
    (favourite) => favourite.userId === userId && favourite.venueId === venueId,
  )
}

/** Returns the resulting saved state, so callers can phrase the confirmation. */
export async function toggleFavourite(userId: string, venueId: string): Promise<boolean> {
  const favourites = readFavourites()
  const exists = favourites.some(
    (favourite) => favourite.userId === userId && favourite.venueId === venueId,
  )

  if (exists) {
    writeValue(
      STORAGE_KEYS.favourites,
      favourites.filter(
        (favourite) => !(favourite.userId === userId && favourite.venueId === venueId),
      ),
    )
    return false
  }

  writeValue(STORAGE_KEYS.favourites, [
    ...favourites,
    { userId, venueId, savedAt: new Date().toISOString() },
  ])
  return true
}
