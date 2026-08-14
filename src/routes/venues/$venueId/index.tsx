import { createFileRoute } from '@tanstack/react-router'

import { VenueDetailPage } from '@/features/venues/VenueDetailPage'
import { VenueNotFound } from '@/features/venues/components/VenueNotFound'
import { loadVenueDetail } from '@/features/venues/loaders'

export const Route = createFileRoute('/venues/$venueId/')({
  loader: loadVenueDetail,
  component: VenueDetailPage,
  notFoundComponent: VenueNotFound,
})
