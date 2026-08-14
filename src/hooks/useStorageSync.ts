import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { queryKeys } from '@/services/query-keys'
import { STORAGE_KEYS } from '@/services/storage/keys'
import { subscribe } from '@/services/storage/local-storage'

/**
 * Keeps other tabs honest: a booking made — or a sign-out performed — in one tab
 * invalidates the matching cache here.
 */
export function useStorageSync() {
  const queryClient = useQueryClient()

  useEffect(
    () =>
      subscribe((key) => {
        switch (key) {
          case STORAGE_KEYS.session:
          case STORAGE_KEYS.users:
            queryClient.invalidateQueries({ queryKey: queryKeys.session })
            break
          case STORAGE_KEYS.bookings:
            queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
            break
          case STORAGE_KEYS.favourites:
            queryClient.invalidateQueries({ queryKey: queryKeys.favourites.all })
            break
        }
      }),
    [queryClient],
  )
}
