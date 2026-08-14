import type { QueryClient } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'

import { unavailableDatesQueryOptions, venueQueryOptions } from '@/services/queries'

import { parseBookingStep, type BookingStep } from './booking-form'

export const validateBookingSearch = (search: Record<string, unknown>): { step: BookingStep } => ({
  step: parseBookingStep(search.step),
})

export async function loadBookingFlow({
  context: { queryClient },
  params,
}: {
  context: { queryClient: QueryClient }
  params: { venueId: string }
}) {
  const venue = await queryClient.ensureQueryData(venueQueryOptions(params.venueId))
  if (!venue) throw notFound()

  await queryClient.ensureQueryData(unavailableDatesQueryOptions(params.venueId))
}
