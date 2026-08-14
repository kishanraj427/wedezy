import type { QueryClient } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'

import {
  unavailableDatesQueryOptions,
  venueQueryOptions,
  venuesQueryOptions,
} from '@/services/queries'

interface VenueRouteArgs {
  context: { queryClient: QueryClient }
  params: { venueId: string }
}

export const loadVenueList = ({ context }: { context: { queryClient: QueryClient } }) =>
  context.queryClient.ensureQueryData(venuesQueryOptions)

export async function loadVenueDetail({ context: { queryClient }, params }: VenueRouteArgs) {
  const venue = await queryClient.ensureQueryData(venueQueryOptions(params.venueId))
  if (!venue) throw notFound()

  await Promise.all([
    queryClient.ensureQueryData(venuesQueryOptions),
    queryClient.ensureQueryData(unavailableDatesQueryOptions(params.venueId)),
  ])
}
