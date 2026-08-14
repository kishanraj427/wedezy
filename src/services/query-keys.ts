/** Single source of truth for cache keys, so invalidation never guesses. */
export const queryKeys = {
  venues: {
    all: ['venues'] as const,
    detail: (venueId: string) => ['venues', venueId] as const,
  },
  collections: {
    all: ['collections'] as const,
    detail: (collectionId: string) => ['collections', collectionId] as const,
  },
  session: ['session'] as const,
  bookings: {
    all: ['bookings'] as const,
    byUser: (userId: string) => ['bookings', 'user', userId] as const,
    unavailableDates: (venueId: string) => ['bookings', 'unavailable', venueId] as const,
  },
  favourites: {
    all: ['favourites'] as const,
    byUser: (userId: string) => ['favourites', 'user', userId] as const,
  },
} as const
