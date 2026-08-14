import { useSuspenseQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { AspectRatio, Badge, Box, Flex, Grid, Heading, Separator, Text } from '@radix-ui/themes'
import { useEffect } from 'react'

import { ActionLink } from '@/components/ui/Action'
import { AppLink } from '@/components/ui/AppLink'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useUnavailableDates } from '@/hooks/useBookings'
import { setActiveVenue, venueImageTransition } from '@/lib/view-transition'
import { venueQueryOptions, venuesQueryOptions } from '@/services/queries'

import { SaveVenueButton } from './components/SaveVenueButton'
import { VenueCard } from './components/VenueCard'

const route = getRouteApi('/venues/$venueId/')

export function VenueDetailPage() {
  const { venueId } = route.useParams()
  const { data: venue } = useSuspenseQuery(venueQueryOptions(venueId))
  const { data: allVenues } = useSuspenseQuery(venuesQueryOptions)
  const { data: unavailable = [] } = useUnavailableDates(venueId)

  // Also covers a cold load straight to this URL, so Back still morphs.
  useEffect(() => setActiveVenue(venueId), [venueId])

  if (!venue) return null

  const related = allVenues
    .filter((item) => item.id !== venue.id && item.events.some((e) => venue.events.includes(e)))
    .slice(0, 3)

  return (
    <Section space="sm">
      <AppLink
        to="/venues"
        search={{ city: venue.city }}
        className="text-body font-semibold text-fg-muted transition-smooth-fast hover:text-accent"
      >
        ← Back to venues in {venue.city}
      </AppLink>

      <Box
        style={venueImageTransition(venue.id)}
        className="relative mt-6 overflow-hidden rounded-card shadow-card"
      >
        <AspectRatio ratio={21 / 9}>
          <Image src={venue.image} alt={venue.name} loading="eager" />
        </AspectRatio>
        <SaveVenueButton
          venueId={venue.id}
          venueName={venue.name}
          className="absolute top-5 right-5 size-11"
        />
      </Box>

      <Grid columns={{ initial: '1', lg: '1.7fr 1fr' }} gap="8" className="mt-9">
        <Box>
          <Flex align="center" gap="3" wrap="wrap">
            <Badge color="gray" variant="soft" radius="full" className="px-3 py-1 text-label">
              {venue.tag}
            </Badge>
            <Flex align="center" gap="2" className="text-body font-bold text-fg">
              <Icon name="star" className="size-4 text-accent" />
              {venue.rating.toFixed(1)}
            </Flex>
          </Flex>

          <Heading as="h1" className="mt-4 text-h1 font-extrabold text-fg">
            {venue.name}
          </Heading>

          <Flex align="center" gap="2" className="mt-3 text-body-lg text-fg-muted">
            <Icon name="pin" className="size-4" />
            {venue.area}
          </Flex>

          <Separator size="4" className="my-7 bg-border" />

          <Heading as="h2" className="text-h4 font-extrabold text-fg">
            Good for
          </Heading>
          <Flex gap="2" wrap="wrap" className="mt-3">
            {venue.events.map((event) => (
              <AppLink key={event} to="/venues" search={{ type: event, city: venue.city }}>
                <Badge
                  color="crimson"
                  variant="soft"
                  radius="full"
                  className="px-3.5 py-1.5 text-body-sm transition-smooth-fast hover:bg-accent hover:text-fg-on-accent"
                >
                  {event}
                </Badge>
              </AppLink>
            ))}
          </Flex>

          <Heading as="h2" className="mt-8 text-h4 font-extrabold text-fg">
            About this venue
          </Heading>
          <Text as="p" className="mt-3 max-w-[62ch] text-body-lg text-fg-muted">
            {venue.name} is a {venue.tag.toLowerCase()} venue in {venue.area}, seating up to{' '}
            {venue.guests} guests. Pricing is indicative at {venue.price} per plate and varies with
            menu, season and final headcount.
          </Text>
        </Box>

        <Box>
          <Card pad="lg" className="sticky top-24">
            <Text as="div" className="text-h2 font-extrabold text-accent">
              {venue.price}
            </Text>
            <Text as="div" className="text-eyebrow font-semibold text-fg-muted uppercase">
              per plate
            </Text>

            <Flex
              align="center"
              gap="2"
              className="mt-5 w-fit rounded-control bg-sheet-sunken px-3.5 py-2 text-body-sm font-semibold text-fg-strong-muted"
            >
              <Icon name="users" className="size-4 text-fg-muted" />
              Up to {venue.guests} guests
            </Flex>

            <ActionLink
              to="/venues/$venueId/book"
              params={{ venueId: venue.id }}
              search={{ step: 'details' as const }}
              size="lg"
              block
              className="mt-6"
            >
              Request a booking
            </ActionLink>

            <Text as="p" className="mt-3 text-center text-label text-fg-muted">
              {unavailable.length > 0
                ? `${unavailable.length} ${unavailable.length === 1 ? 'date is' : 'dates are'} already taken · Free to enquire`
                : 'Free to enquire · No booking fee'}
            </Text>
          </Card>
        </Box>
      </Grid>

      {related.length > 0 ? (
        <Box className="mt-16">
          <SectionHeading title="Similar venues" description="Same occasions, different rooms" />
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="7">
            {related.map((item, index) => (
              <VenueCard key={item.id} venue={item} index={index} />
            ))}
          </Grid>
        </Box>
      ) : null}
    </Section>
  )
}
