import { createFileRoute } from '@tanstack/react-router'

import { VenueBrowserPage } from '@/features/venues/VenueBrowserPage'
import { loadVenueList } from '@/features/venues/loaders'
import { validateVenuesSearch } from '@/features/venues/venue-search'

export const Route = createFileRoute('/venues/')({
  validateSearch: validateVenuesSearch,
  loader: loadVenueList,
  component: VenueBrowserPage,
})
