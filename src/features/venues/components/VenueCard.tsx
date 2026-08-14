import { AspectRatio, Box, Flex, Heading, Text } from '@radix-ui/themes'

import { AppLink } from '@/components/ui/AppLink'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { useClaimVenueTransition, useVenueImageTransition } from '@/hooks/useVenueTransition'
import type { Venue } from '@/types'

import { SaveVenueButton } from './SaveVenueButton'

interface VenueCardProps {
  venue: Venue
  /** Position in the grid — drives the staggered entrance. */
  index?: number
}

export function VenueCard({ venue, index = 0 }: VenueCardProps) {
  const transitionStyle = useVenueImageTransition(venue.id)
  const claimTransition = useClaimVenueTransition()

  return (
    <Box className="group relative">
      <AppLink
        to="/venues/$venueId"
        params={{ venueId: venue.id }}
        onClick={() => claimTransition(venue.id)}
        style={{ animationDelay: `${index * 70}ms` }}
        className="flex animate-card-in flex-col motion-reduce:animate-none"
      >
        <Box style={transitionStyle} className="relative overflow-hidden rounded-card shadow-card">
          <AspectRatio ratio={4 / 3}>
            <Image
              src={venue.image}
              alt={venue.name}
              className="media-zoom group-hover:scale-105"
            />
          </AspectRatio>

          <Badge className="top-4 left-4">{venue.tag}</Badge>

          <Badge className="top-4 right-16">
            <Icon name="star" className="size-3.5 text-accent" />
            {venue.rating.toFixed(1)}
          </Badge>
        </Box>

        <Box className="px-1 pt-5">
          <Flex justify="between" align="start" gap="4">
            <Heading
              as="h3"
              className="text-h3 font-extrabold text-fg transition-smooth-fast group-hover:text-accent"
            >
              {venue.name}
            </Heading>
            <Box className="shrink-0 text-right">
              <Text as="div" className="text-h4 font-extrabold text-accent">
                {venue.price}
              </Text>
              <Text as="div" className="text-eyebrow font-semibold text-fg-muted uppercase">
                per plate
              </Text>
            </Box>
          </Flex>

          <Flex align="center" gap="2" className="mt-2.5 text-body text-fg-muted">
            <Icon name="pin" className="size-4" />
            {venue.area}
          </Flex>

          <Flex
            align="center"
            gap="2"
            className="mt-4 w-fit rounded-control bg-sheet-sunken px-3.5 py-2 text-body-sm font-semibold text-fg-strong-muted"
          >
            <Icon name="users" className="size-4 text-fg-muted" />
            {venue.guests} guests
          </Flex>
        </Box>
      </AppLink>

      {/* Outside the link so saving never navigates. */}
      <SaveVenueButton
        venueId={venue.id}
        venueName={venue.name}
        className="absolute top-4 right-4"
      />
    </Box>
  )
}

/** Pill floating over the photo. */
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Flex
      align="center"
      gap="2"
      className={`absolute rounded-full bg-sheet px-3.5 py-1.5 text-body-sm font-semibold text-fg shadow-pill ${className ?? ''}`}
    >
      {children}
    </Flex>
  )
}
