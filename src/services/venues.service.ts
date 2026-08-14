import { COLLECTIONS } from '@/data/collections'
import { VENUES } from '@/data/venues'
import { NotFoundError } from '@/services/errors'
import type { Collection, Venue } from '@/types'

/**
 * Catalogue reads. The bodies are the only thing that changes when this moves
 * behind an HTTP API — every caller already awaits.
 */

const LATENCY = 200

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function listVenues(): Promise<Venue[]> {
  await delay(LATENCY)
  return VENUES
}

export async function getVenue(venueId: string): Promise<Venue | null> {
  await delay(LATENCY / 2)
  return VENUES.find((venue) => venue.id === venueId) ?? null
}

/** Throwing variant for callers that cannot proceed without the venue. */
export async function requireVenue(venueId: string): Promise<Venue> {
  const venue = await getVenue(venueId)
  if (!venue) throw new NotFoundError('Venue')
  return venue
}

export async function listVenuesByIds(venueIds: string[]): Promise<Venue[]> {
  await delay(LATENCY / 2)
  const order = new Map(venueIds.map((id, index) => [id, index]))
  return VENUES.filter((venue) => order.has(venue.id)).sort(
    (a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0),
  )
}

export async function listCollections(): Promise<Collection[]> {
  await delay(LATENCY / 2)
  return COLLECTIONS
}

export async function getCollection(collectionId: string): Promise<Collection | null> {
  await delay(LATENCY / 2)
  return COLLECTIONS.find((collection) => collection.id === collectionId) ?? null
}
