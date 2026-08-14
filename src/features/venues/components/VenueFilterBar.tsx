import { Badge, Flex, Text, TextField } from '@radix-ui/themes'
import { useNavigate } from '@tanstack/react-router'
import type { FocusEvent, KeyboardEvent } from 'react'

import { ActionButton } from '@/components/ui/Action'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { SearchSelectField } from '@/components/ui/SearchSelectField'
import { EVENT_TYPES, GUEST_RANGES, type EventType, type GuestRange } from '@/types'

import { hasActiveFilters, type VenuesSearch } from '../venue-search'

const ANY_EVENT = 'Any event'
type EventOption = EventType | typeof ANY_EVENT
const EVENT_OPTIONS: EventOption[] = [ANY_EVENT, ...EVENT_TYPES]

interface VenueFilterBarProps {
  search: VenuesSearch
  resultCount: number
}

/**
 * Every control writes straight to the URL — the page holds no filter state of
 * its own, so results are shareable and the back button undoes a filter.
 */
export function VenueFilterBar({ search, resultCount }: VenueFilterBarProps) {
  const navigate = useNavigate({ from: '/venues/' })

  const update = (patch: Partial<VenuesSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) })

  const commitQuery = (event: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) =>
    update({ q: event.currentTarget.value.trim() || undefined })

  const onQueryKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') commitQuery(event)
  }

  return (
    <Flex direction="column" gap="4" className="mb-9">
      <Card tone="flat" radius="panel" pad="none" className="shadow-card">
        <Flex direction={{ initial: 'column', md: 'row' }} align="stretch" className="p-2">
          <Flex align="center" gap="3" className="min-w-0 flex-1 px-4">
            <Icon name="search" className="size-4.5 text-fg-muted" />
            <TextField.Root
              // Uncontrolled and re-keyed on URL change — the URL is the source of truth.
              key={search.q ?? ''}
              defaultValue={search.q ?? ''}
              onKeyDown={onQueryKeyDown}
              onBlur={commitQuery}
              placeholder="Search venues, areas or types..."
              aria-label="Search venues"
              variant="soft"
              color="gray"
              className="min-w-0 flex-1 bg-transparent text-body shadow-none [&_input::placeholder]:text-fg-subtle [&_input]:text-fg"
            />
          </Flex>

          <Divider />

          <SearchSelectField
            icon="calendar"
            label="Event Type"
            value={search.type ?? ANY_EVENT}
            options={EVENT_OPTIONS}
            onChange={(value) => update({ type: value === ANY_EVENT ? undefined : value })}
          />

          <Divider />

          <SearchSelectField
            icon="users"
            label="Guests"
            value={search.guests ?? 'Any'}
            options={GUEST_RANGES}
            onChange={(guests: GuestRange) =>
              update({ guests: guests === 'Any' ? undefined : guests })
            }
          />
        </Flex>
      </Card>

      <Flex align="center" gap="3" wrap="wrap">
        <Text className="text-body font-semibold text-fg">
          {resultCount} {resultCount === 1 ? 'venue' : 'venues'}
        </Text>

        {search.city ? (
          <Badge color="gray" variant="soft" radius="full" className="px-3 py-1">
            {search.city}
          </Badge>
        ) : null}
        {search.q ? (
          <Badge color="crimson" variant="soft" radius="full" className="px-3 py-1">
            “{search.q}”
          </Badge>
        ) : null}

        {hasActiveFilters(search) ? (
          <ActionButton
            tone="ghost"
            size="sm"
            onClick={() => navigate({ search: {} })}
            className="ml-auto text-accent hover:bg-accent-soft hover:text-accent"
          >
            Clear all filters
          </ActionButton>
        ) : null}
      </Flex>
    </Flex>
  )
}

/** Splits the bar horizontally on desktop, vertically on mobile. */
function Divider() {
  return <Flex className="border-border max-md:border-t md:border-l" />
}
