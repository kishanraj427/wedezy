import { useQuery } from '@tanstack/react-query'
import { AspectRatio, Grid, Skeleton } from '@radix-ui/themes'

import { ActionLink } from '@/components/ui/Action'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { VenueCard } from '@/features/venues/components/VenueCard'
import { useSession } from '@/hooks/useSession'
import { savedVenuesQueryOptions } from '@/services/queries'

import { AccountTabs } from './components/AccountTabs'

export function SavedVenuesPage() {
  const { user } = useSession()
  const { data: venues, isPending } = useQuery({
    ...savedVenuesQueryOptions(user?.id ?? ''),
    enabled: Boolean(user),
  })

  const saved = venues ?? []

  return (
    <Section>
      <PageHeader
        title="Saved venues"
        description={
          saved.length > 0
            ? `${saved.length} ${saved.length === 1 ? 'venue' : 'venues'} on your shortlist.`
            : 'Your shortlist, kept between visits.'
        }
      />

      <AccountTabs className="mt-7 mb-9" />

      {isPending ? (
        <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="7">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="rounded-card">
              <AspectRatio ratio={4 / 3} />
            </Skeleton>
          ))}
        </Grid>
      ) : saved.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          description="Tap the heart on any venue to keep it here."
          action={
            <ActionLink to="/venues" search={{}} lift>
              Browse venues
            </ActionLink>
          }
        />
      ) : (
        <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="7">
          {saved.map((venue, index) => (
            <VenueCard key={venue.id} venue={venue} index={index} />
          ))}
        </Grid>
      )}
    </Section>
  )
}
