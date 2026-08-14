import { useSuspenseQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'

import { AppLink } from '@/components/ui/AppLink'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { VenueGrid } from '@/features/venues/components/VenueGrid'
import { VenuesEmptyState } from '@/features/venues/components/VenuesEmptyState'
import { collectionQueryOptions, venuesQueryOptions } from '@/services/queries'

const route = getRouteApi('/collections/$collectionId')

export function CollectionDetailPage() {
  const { collectionId } = route.useParams()
  const { data: collection } = useSuspenseQuery(collectionQueryOptions(collectionId))
  const { data: venues } = useSuspenseQuery(venuesQueryOptions)

  if (!collection) return null

  const results = venues.filter((venue) => collection.venueTags.includes(venue.tag))

  return (
    <Section>
      <PageHeader
        title={collection.title}
        description={collection.description}
        className="mb-9"
        above={
          <AppLink
            to="/collections"
            className="text-body font-semibold text-fg-muted transition-smooth-fast hover:text-accent"
          >
            ← Back to collections
          </AppLink>
        }
      />

      <VenueGrid
        venues={results}
        emptyState={
          <VenuesEmptyState
            title="This collection is being restocked"
            description="No venues in this collection right now — browse everything instead."
          />
        }
      />
    </Section>
  )
}
