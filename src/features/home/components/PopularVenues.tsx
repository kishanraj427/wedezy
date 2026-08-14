import { useQuery } from '@tanstack/react-query'
import { Flex } from '@radix-ui/themes'

import { ActionLink } from '@/components/ui/Action'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HEADER_CITY } from '@/data/navigation'
import { PAGE_SIZE, VenueGrid } from '@/features/venues/components/VenueGrid'
import { venuesQueryOptions } from '@/services/queries'

export function PopularVenues() {
  const { data: venues, isPending } = useQuery(venuesQueryOptions)

  return (
    <Section>
      <Reveal>
        <SectionHeading
          title={`Popular venues in ${HEADER_CITY}`}
          description="Loved by couples and event planners"
        />
      </Reveal>

      <VenueGrid
        venues={(venues ?? []).slice(0, PAGE_SIZE)}
        isPending={isPending}
        paginated={false}
      />

      <Flex justify="center" className="mt-13">
        <ActionLink to="/venues" search={{ city: HEADER_CITY }} tone="outline" size="lg" lift>
          Browse all venues
        </ActionLink>
      </Flex>
    </Section>
  )
}
