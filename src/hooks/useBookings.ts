import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { cancelBooking, createBooking } from '@/services/bookings.service'
import { queryKeys } from '@/services/query-keys'
import { bookingsQueryOptions, unavailableDatesQueryOptions } from '@/services/queries'
import type { CreateBookingInput } from '@/types'

export function useBookings(userId: string | undefined) {
  return useQuery({
    ...bookingsQueryOptions(userId ?? ''),
    enabled: Boolean(userId),
  })
}

export function useUnavailableDates(venueId: string) {
  return useQuery(unavailableDatesQueryOptions(venueId))
}

function useBookingInvalidation() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all })
}

export function useCreateBooking() {
  const invalidate = useBookingInvalidation()

  return useMutation({
    mutationFn: (input: CreateBookingInput) => createBooking(input),
    onSuccess: invalidate,
  })
}

export function useCancelBooking() {
  const invalidate = useBookingInvalidation()

  return useMutation({
    mutationFn: ({ bookingId, userId }: { bookingId: string; userId: string }) =>
      cancelBooking(bookingId, userId),
    onSuccess: invalidate,
  })
}
