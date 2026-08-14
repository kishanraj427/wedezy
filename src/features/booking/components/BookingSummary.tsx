import { Box, Flex, Separator, Text } from '@radix-ui/themes'

import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { formatDateMedium } from '@/lib/dates'
import { formatINR, parsePrice } from '@/lib/money'
import type { EventType, Venue } from '@/types'

interface BookingSummaryProps {
  venue: Venue
  date: string | null
  guests: number
  eventType: EventType
}

/** Live price summary — the same maths the service uses when it stores the record. */
export function BookingSummary({ venue, date, guests, eventType }: BookingSummaryProps) {
  const perPlate = parsePrice(venue.price)
  const estimate = perPlate * guests

  return (
    <Card tone="media" pad="none" className="sticky top-24 border border-border">
      <Box className="relative h-32">
        <Image src={venue.image} alt={venue.name} />
        <Box className="absolute inset-0 scrim-media" />
        <Box className="absolute inset-x-0 bottom-0 p-4">
          <Text as="div" className="text-body-lg font-extrabold text-fg-on-scrim">
            {venue.name}
          </Text>
          <Flex align="center" gap="2" className="text-label text-fg-on-scrim/85">
            <Icon name="pin" className="size-3.5" />
            {venue.area}
          </Flex>
        </Box>
      </Box>

      <Box className="p-5">
        <Row label="Event" value={eventType} />
        <Row label="Date" value={date ? formatDateMedium(date) : 'Not chosen yet'} muted={!date} />
        <Row label="Guests" value={`${guests}`} />

        <Separator size="4" className="my-4 bg-border" />

        <Text className="text-body-sm text-fg-muted">
          {guests} × {formatINR(perPlate)}
        </Text>

        <Flex justify="between" align="end" className="mt-2">
          <Text className="text-label font-semibold text-fg-muted uppercase">Estimate</Text>
          <Text
            key={estimate}
            className="animate-pop text-h2 font-extrabold text-accent motion-reduce:animate-none"
          >
            {formatINR(estimate)}
          </Text>
        </Flex>

        <Text as="p" className="mt-3 text-label text-fg-muted">
          Indicative only — final cost varies with menu and season. Free to enquire, no booking fee.
        </Text>
      </Box>
    </Card>
  )
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <Flex justify="between" align="center" className="py-1.5">
      <Text className="text-body-sm text-fg-muted">{label}</Text>
      <Text
        className={muted ? 'text-body-sm text-fg-subtle' : 'text-body-sm font-semibold text-fg'}
      >
        {value}
      </Text>
    </Flex>
  )
}
