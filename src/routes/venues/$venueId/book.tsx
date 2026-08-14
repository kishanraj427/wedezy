import { createFileRoute } from '@tanstack/react-router'

import { BookingFlowPage } from '@/features/booking/BookingFlowPage'
import { loadBookingFlow, validateBookingSearch } from '@/features/booking/loaders'
import { VenueNotFound } from '@/features/venues/components/VenueNotFound'
import { requireSession } from '@/lib/guards'

export const Route = createFileRoute('/venues/$venueId/book')({
  validateSearch: validateBookingSearch,
  beforeLoad: ({ context: { queryClient }, params: { venueId } }) =>
    requireSession(queryClient, `/venues/${venueId}/book`),
  loader: loadBookingFlow,
  component: BookingFlowPage,
  notFoundComponent: VenueNotFound,
})
