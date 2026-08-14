import { AspectRatio, Flex, Grid, Skeleton } from '@radix-ui/themes'
import { useState, type ReactNode } from 'react'

import { ActionButton } from '@/components/ui/Action'
import type { Venue } from '@/types'

import { VenuesEmptyState } from './VenuesEmptyState'
import { VenueCard } from './VenueCard'

export const PAGE_SIZE = 6
const PAGE_STEP = 3

interface VenueGridProps {
  venues: Venue[]
  isPending?: boolean
  /** Renders the pager; off for fixed showcases. */
  paginated?: boolean
  emptyState?: ReactNode
}

export function VenueGrid({ venues, isPending, paginated = true, emptyState }: VenueGridProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const shown = paginated ? venues.slice(0, visibleCount) : venues
  const canLoadMore = paginated && visibleCount < venues.length

  if (isPending) {
    return (
      <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="7">
        {Array.from({ length: PAGE_SIZE }, (_, index) => (
          <Skeleton key={index} className="rounded-card">
            <AspectRatio ratio={4 / 3} />
          </Skeleton>
        ))}
      </Grid>
    )
  }

  if (shown.length === 0) {
    return <>{emptyState ?? <VenuesEmptyState />}</>
  }

  return (
    <>
      <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="7">
        {shown.map((venue, index) => (
          <VenueCard key={venue.id} venue={venue} index={index} />
        ))}
      </Grid>

      {paginated ? (
        <Flex justify="center" className="mt-13 mb-6">
          <ActionButton
            tone="outline"
            size="lg"
            disabled={!canLoadMore}
            onClick={() => setVisibleCount((count) => Math.min(count + PAGE_STEP, venues.length))}
          >
            {canLoadMore ? 'Load more venues' : 'No more venues'}
          </ActionButton>
        </Flex>
      ) : null}
    </>
  )
}
