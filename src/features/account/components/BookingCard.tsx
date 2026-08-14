import { Badge, Box, Flex, Heading, Text } from '@radix-ui/themes'

import { ActionButton } from '@/components/ui/Action'
import { AppLink } from '@/components/ui/AppLink'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { formatDateLong, isPast } from '@/lib/dates'
import { formatINR } from '@/lib/money'
import type { Booking, BookingStatus, Venue } from '@/types'

const STATUS: Record<BookingStatus, { label: string; color: 'amber' | 'green' | 'gray' }> = {
  pending: { label: 'Awaiting venue', color: 'amber' },
  confirmed: { label: 'Confirmed', color: 'green' },
  cancelled: { label: 'Cancelled', color: 'gray' },
}

interface BookingCardProps {
  booking: Booking
  venue: Venue | undefined
  index?: number
  onCancel: (booking: Booking) => void
}

export function BookingCard({ booking, venue, index = 0, onCancel }: BookingCardProps) {
  const status = STATUS[booking.status]
  const canCancel = booking.status !== 'cancelled' && !isPast(booking.date)

  return (
    <Flex
      direction={{ initial: 'column', sm: 'row' }}
      style={{ animationDelay: `${index * 70}ms` }}
      className="animate-card-in overflow-hidden rounded-card border border-border bg-sheet shadow-card transition-lift hover:shadow-float motion-reduce:animate-none"
    >
      {/* Stretches to the card height rather than letterboxing at a fixed ratio. */}
      <Box className="min-h-42 self-stretch max-sm:h-44 sm:w-56 sm:shrink-0">
        {venue ? (
          <Image
            src={venue.image}
            alt={venue.name}
            className={booking.status === 'cancelled' ? 'grayscale' : undefined}
          />
        ) : (
          <Box className="h-full w-full bg-canvas-sunken" />
        )}
      </Box>

      <Flex direction="column" className="min-w-0 flex-1 p-5">
        <Flex align="center" justify="between" gap="3">
          <Badge color={status.color} variant="soft" radius="full" className="px-3 py-1">
            {status.label}
          </Badge>
          <Text className="text-label font-semibold text-fg-subtle uppercase">
            #{booking.id.slice(0, 8)}
          </Text>
        </Flex>

        <Heading as="h3" className="mt-3 text-h4 font-extrabold text-fg">
          {venue ? (
            <AppLink
              to="/venues/$venueId"
              params={{ venueId: booking.venueId }}
              className="text-fg transition-smooth-fast hover:text-accent"
            >
              {venue.name}
            </AppLink>
          ) : (
            'Venue unavailable'
          )}
        </Heading>

        <Flex gap="5" wrap="wrap" className="mt-3 text-body-sm text-fg-muted">
          <Meta icon="calendar">{formatDateLong(booking.date)}</Meta>
          <Meta icon="users">{booking.guests} guests</Meta>
          <Meta icon="ticket">{booking.eventType}</Meta>
        </Flex>

        <Flex align="center" justify="between" gap="4" wrap="wrap" className="mt-auto pt-5">
          <Box>
            <Text as="div" className="text-h4 font-extrabold text-accent">
              {formatINR(booking.estimate)}
            </Text>
            <Text as="div" className="text-eyebrow font-semibold text-fg-muted uppercase">
              estimate
            </Text>
          </Box>

          {canCancel ? (
            <ActionButton
              tone="outline"
              size="sm"
              onClick={() => onCancel(booking)}
              className="hover:border-accent hover:text-accent"
            >
              Cancel booking
            </ActionButton>
          ) : (
            <Text className="text-body-sm text-fg-subtle">
              {booking.status === 'cancelled' ? 'Cancelled' : 'Past event'}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

function Meta({
  icon,
  children,
}: {
  icon: 'calendar' | 'users' | 'ticket'
  children: React.ReactNode
}) {
  return (
    <Flex align="center" gap="2">
      <Icon name={icon} className="size-4" />
      {children}
    </Flex>
  )
}
