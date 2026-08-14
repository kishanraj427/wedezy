import { Flex, Text } from '@radix-ui/themes'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import { ActionButton } from '@/components/ui/Action'
import { Icon } from '@/components/ui/Icon'
import { SearchSelectField } from '@/components/ui/SearchSelectField'
import { HEADER_CITY } from '@/data/navigation'
import { EVENT_TYPES, GUEST_RANGES, type EventType, type GuestRange } from '@/types'

export function HeroSearchCard() {
  const navigate = useNavigate()
  const [eventType, setEventType] = useState<EventType>('Wedding')
  const [guestRange, setGuestRange] = useState<GuestRange>('200 - 500')

  const onSearch = () =>
    navigate({
      to: '/venues',
      search: {
        type: eventType,
        guests: guestRange === 'Any' ? undefined : guestRange,
        city: HEADER_CITY,
      },
    })

  return (
    <Flex
      direction={{ initial: 'column', md: 'row' }}
      align="stretch"
      className="mx-auto mt-11 max-w-[61rem] rounded-panel bg-sheet p-2 text-left shadow-hero"
    >
      <Flex align="center" gap="4" className="min-w-0 flex-1 rounded-card px-5 py-4">
        <Icon name="pin" className="size-5.5 text-accent" />
        <Flex direction="column" gap="1" className="min-w-0">
          <Text as="span" className="text-eyebrow font-bold text-fg-muted uppercase">
            Location
          </Text>
          <Text as="span" className="truncate text-body-lg font-semibold text-fg">
            Bandra West, {HEADER_CITY}
          </Text>
        </Flex>
      </Flex>

      <Divider />

      <SearchSelectField
        icon="calendar"
        label="Event Type"
        value={eventType}
        options={EVENT_TYPES}
        onChange={setEventType}
      />

      <Divider />

      <SearchSelectField
        icon="users"
        label="Guests"
        value={guestRange}
        options={GUEST_RANGES}
        onChange={setGuestRange}
      />

      <ActionButton size="lg" onClick={onSearch} className="m-1.5 min-h-16 gap-2.5 max-md:min-h-14">
        <Icon name="search" className="size-4.5" strokeWidth={2.4} />
        Search
      </ActionButton>
    </Flex>
  )
}

function Divider() {
  return <Flex className="border-border max-md:border-t md:border-l" />
}
