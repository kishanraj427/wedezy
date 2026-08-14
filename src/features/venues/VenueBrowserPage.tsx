import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { useMemo } from 'react'

import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { venuesQueryOptions } from '@/services/queries'

import { VenueFilterBar } from './components/VenueFilterBar'
import { VenueGrid } from './components/VenueGrid'
import { filterVenues } from './venue-search'

const route = getRouteApi('/venues/')

export function VenueBrowserPage() {
  const search = route.useSearch()
  const { data: venues, isPending } = useQuery(venuesQueryOptions)

  const results = useMemo(() => filterVenues(venues ?? [], search), [venues, search])

  return (
    <Section>
      <PageHeader
        title={search.city ? `Venues in ${search.city}` : 'All venues'}
        description="Filter by event type and guest count — your selection stays in the URL."
        className="mb-8"
      />

      <VenueFilterBar search={search} resultCount={results.length} />

      {/* Remount on filter change so pagination restarts at the first page. */}
      <VenueGrid key={JSON.stringify(search)} venues={results} isPending={isPending} />
    </Section>
  )
}
