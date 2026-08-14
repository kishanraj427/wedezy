import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

import {
  getActiveVenue,
  setActiveVenue,
  subscribeActiveVenue,
  venueImageTransition,
} from '@/lib/view-transition'

/** The transition style for this venue, or nothing when it is not the one moving. */
export function useVenueImageTransition(venueId: string) {
  const active = useSyncExternalStore(subscribeActiveVenue, getActiveVenue, () => null)
  return active === venueId ? venueImageTransition(venueId) : undefined
}

/**
 * Claims the shared name for a venue before navigation starts.
 * `flushSync` matters: the browser snapshots the outgoing page the moment the
 * router navigates, so the name has to be in the DOM by then, not after the
 * next React render.
 */
export function useClaimVenueTransition() {
  return (venueId: string) => flushSync(() => setActiveVenue(venueId))
}
