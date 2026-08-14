import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes'

import { ActionLink } from '@/components/ui/Action'
import { AppLink } from '@/components/ui/AppLink'
import { Card } from '@/components/ui/Card'
import { formatDateLong } from '@/lib/dates'
import { formatINR } from '@/lib/money'
import type { Booking, Venue } from '@/types'

interface BookingSuccessProps {
  booking: Booking
  venue: Venue
}

export function BookingSuccess({ booking, venue }: BookingSuccessProps) {
  return (
    <Flex direction="column" align="center" className="py-10 text-center">
      <DrawnCheck />

      <Rise delay={120}>
        <Heading as="h1" className="mt-7 text-h1 font-extrabold text-fg">
          Booking requested
        </Heading>
      </Rise>

      <Rise delay={200}>
        <Text as="p" className="mt-3 max-w-[46ch] text-lead text-fg-muted">
          {venue.name} has your enquiry for {formatDateLong(booking.date)}. We have held the date
          while they confirm.
        </Text>
      </Rise>

      <Rise delay={280} className="w-full max-w-[27.5rem]">
        <Card pad="lg" className="mt-9 text-left">
          <DetailRow label="Reference" value={booking.id.slice(0, 8).toUpperCase()} />
          <DetailRow label="Venue" value={venue.name} />
          <DetailRow label="Date" value={formatDateLong(booking.date)} />
          <DetailRow label="Event" value={booking.eventType} />
          <DetailRow label="Guests" value={`${booking.guests}`} />
          <Separator size="4" className="my-3 bg-border" />
          <DetailRow label="Estimate" value={formatINR(booking.estimate)} emphasis />
        </Card>
      </Rise>

      <Rise delay={360}>
        <Flex gap="3" wrap="wrap" justify="center" className="mt-8">
          <ActionLink to="/account/bookings" search={{ status: 'all' as const }} size="lg">
            View my bookings
          </ActionLink>
          <AppLink
            to="/venues"
            search={{ city: venue.city }}
            className="self-center px-3 text-body font-bold text-accent hover:text-accent-hover"
          >
            Keep browsing
          </AppLink>
        </Flex>
      </Rise>
    </Flex>
  )
}

function Rise({
  children,
  delay,
  className,
}: {
  children: React.ReactNode
  delay: number
  className?: string
}) {
  return (
    <Box
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-rise motion-reduce:animate-none ${className ?? ''}`}
    >
      {children}
    </Box>
  )
}

/** Ring and tick draw themselves in; static for reduced-motion users. */
function DrawnCheck() {
  return (
    <Box asChild>
      <svg viewBox="0 0 100 100" className="size-24" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="var(--color-accent-soft)"
          strokeWidth="4"
        />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="4"
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          className="animate-ring-draw motion-reduce:animate-none"
          style={{ strokeDasharray: 302 }}
        />
        <path
          d="M30 52 L44 66 L70 38"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-check-draw motion-reduce:animate-none"
          style={{ strokeDasharray: 48 }}
        />
      </svg>
    </Box>
  )
}

function DetailRow({
  label,
  value,
  emphasis,
}: {
  label: string
  value: string
  emphasis?: boolean
}) {
  return (
    <Flex justify="between" align="center" className="py-1.5">
      <Text className="text-body-sm text-fg-muted">{label}</Text>
      <Text
        className={
          emphasis ? 'text-h4 font-extrabold text-accent' : 'text-body-sm font-semibold text-fg'
        }
      >
        {value}
      </Text>
    </Flex>
  )
}
