import { EVENT_TYPES, GUEST_RANGES, type EventType, type GuestRange, type Venue } from '@/types'

/** URL state for the venue browser — every filter is shareable. */
export interface VenuesSearch {
  type?: EventType
  guests?: GuestRange
  q?: string
  city?: string
}

function asOption<T extends string>(value: unknown, options: readonly T[]): T | undefined {
  return typeof value === 'string' && (options as readonly string[]).includes(value)
    ? (value as T)
    : undefined
}

function asText(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export function validateVenuesSearch(search: Record<string, unknown>): VenuesSearch {
  return {
    type: asOption(search.type, EVENT_TYPES),
    guests: asOption(search.guests, GUEST_RANGES),
    q: asText(search.q),
    city: asText(search.city),
  }
}

export function hasActiveFilters(search: VenuesSearch): boolean {
  return Boolean(
    search.type || (search.guests && search.guests !== 'Any') || search.q || search.city,
  )
}

/** `"200 - 500"` / `"800+"` / `"Any"` → inclusive bounds. */
export function parseGuestRange(range: GuestRange | undefined): [number, number] | null {
  if (!range || range === 'Any') return null

  if (range.includes('+')) {
    return [Number.parseInt(range, 10), Number.POSITIVE_INFINITY]
  }

  const [min, max] = range.split('-').map((part) => Number.parseInt(part.trim(), 10))
  return [min, max]
}

export function matchesSearch(venue: Venue, search: VenuesSearch): boolean {
  if (search.type && !venue.events.includes(search.type)) return false
  if (search.city && venue.city.toLowerCase() !== search.city.toLowerCase()) return false

  const guests = parseGuestRange(search.guests)
  if (guests && (venue.guests < guests[0] || venue.guests > guests[1])) return false

  if (search.q) {
    const haystack = `${venue.name} ${venue.tag} ${venue.area}`.toLowerCase()
    if (!haystack.includes(search.q.toLowerCase())) return false
  }

  return true
}

export function filterVenues(venues: Venue[], search: VenuesSearch): Venue[] {
  return venues.filter((venue) => matchesSearch(venue, search))
}
