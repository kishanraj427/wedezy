import { queryOptions } from '@tanstack/react-query'

import { getSession } from '@/services/auth.service'
import { getUnavailableDates, listBookings } from '@/services/bookings.service'
import { listFavourites } from '@/services/favourites.service'
import { queryKeys } from '@/services/query-keys'
import {
  getCollection,
  getVenue,
  listCollections,
  listVenues,
  listVenuesByIds,
} from '@/services/venues.service'

/** The read contract of the app. Route loaders and hooks share these. */

export const venuesQueryOptions = queryOptions({
  queryKey: queryKeys.venues.all,
  queryFn: listVenues,
})

export const venueQueryOptions = (venueId: string) =>
  queryOptions({
    queryKey: queryKeys.venues.detail(venueId),
    queryFn: () => getVenue(venueId),
  })

export const collectionsQueryOptions = queryOptions({
  queryKey: queryKeys.collections.all,
  queryFn: listCollections,
})

export const collectionQueryOptions = (collectionId: string) =>
  queryOptions({
    queryKey: queryKeys.collections.detail(collectionId),
    queryFn: () => getCollection(collectionId),
  })

export const sessionQueryOptions = queryOptions({
  queryKey: queryKeys.session,
  queryFn: getSession,
  staleTime: Number.POSITIVE_INFINITY,
})

export const bookingsQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: queryKeys.bookings.byUser(userId),
    queryFn: () => listBookings(userId),
  })

export const unavailableDatesQueryOptions = (venueId: string) =>
  queryOptions({
    queryKey: queryKeys.bookings.unavailableDates(venueId),
    queryFn: () => getUnavailableDates(venueId),
    staleTime: 0,
  })

export const favouritesQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: queryKeys.favourites.byUser(userId),
    queryFn: () => listFavourites(userId),
  })

/** Saved venues, resolved to full venue records in saved-at order. */
export const savedVenuesQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: [...queryKeys.favourites.byUser(userId), 'venues'],
    queryFn: async () => {
      const favourites = await listFavourites(userId)
      return listVenuesByIds(favourites.map((favourite) => favourite.venueId))
    },
  })
