import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toggleFavourite } from '@/services/favourites.service'
import { queryKeys } from '@/services/query-keys'
import { favouritesQueryOptions } from '@/services/queries'
import type { Favourite } from '@/types'

export function useFavourites(userId: string | undefined) {
  return useQuery({
    ...favouritesQueryOptions(userId ?? ''),
    enabled: Boolean(userId),
  })
}

/**
 * Optimistic toggle: the heart fills the instant it is clicked and rolls back
 * if the write fails.
 */
export function useToggleFavourite(userId: string | undefined) {
  const queryClient = useQueryClient()
  const key = queryKeys.favourites.byUser(userId ?? '')

  return useMutation({
    mutationFn: (venueId: string) => {
      if (!userId) throw new Error('Sign in to save venues.')
      return toggleFavourite(userId, venueId)
    },
    onMutate: async (venueId) => {
      await queryClient.cancelQueries({ queryKey: key })
      const previous = queryClient.getQueryData<Favourite[]>(key) ?? []
      const saved = previous.some((favourite) => favourite.venueId === venueId)

      queryClient.setQueryData<Favourite[]>(
        key,
        saved
          ? previous.filter((favourite) => favourite.venueId !== venueId)
          : [{ userId: userId ?? '', venueId, savedAt: new Date().toISOString() }, ...previous],
      )

      return { previous }
    },
    onError: (_error, _venueId, context) => {
      if (context) queryClient.setQueryData(key, context.previous)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKeys.favourites.all }),
  })
}
