import { createFileRoute } from '@tanstack/react-router'

import { BookingsPage } from '@/features/account/BookingsPage'
import { validateBookingsSearch } from '@/features/account/booking-filters'
import { loadVenueList } from '@/features/venues/loaders'
import { requireSession } from '@/lib/guards'

export const Route = createFileRoute('/account/bookings/')({
  validateSearch: validateBookingsSearch,
  beforeLoad: ({ context: { queryClient } }) => requireSession(queryClient, '/account/bookings'),
  loader: loadVenueList,
  component: BookingsPage,
})
