/**
 * Shared names let an element morph across a route change.
 *
 * A name must be unique per page, but it must also be *rare*: if every venue
 * card carries one, navigating between a list and a detail page pairs up half a
 * dozen images at once and the morph reads as a flurry rather than one object
 * moving. So only the venue being navigated to or from claims the name, and
 * every other card opts out.
 */

let activeVenueId: string | null = null
const listeners = new Set<() => void>()

export function setActiveVenue(venueId: string | null): void {
  if (activeVenueId === venueId) return
  activeVenueId = venueId
  listeners.forEach((listener) => listener())
}

export function getActiveVenue(): string | null {
  return activeVenueId
}

export function subscribeActiveVenue(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function venueTransitionName(venueId: string): string {
  return `venue-image-${venueId.replace(/[^a-z0-9]/gi, '-')}`
}

/** Style for the one element allowed to morph. */
export function venueImageTransition(venueId: string) {
  return { viewTransitionName: venueTransitionName(venueId) }
}
