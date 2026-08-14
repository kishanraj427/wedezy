/* ------------------------------------------------------------------ *
 * Catalogue
 * ------------------------------------------------------------------ */

export const EVENT_TYPES = [
  'Wedding',
  'Birthday',
  'Corporate',
  'Party',
  'Engagement',
  'Conference',
] as const

export type EventType = (typeof EVENT_TYPES)[number]

export const GUEST_RANGES = [
  'Any',
  '0 - 100',
  '100 - 200',
  '200 - 500',
  '500 - 800',
  '800+',
] as const

export type GuestRange = (typeof GUEST_RANGES)[number]

export interface Venue {
  id: string
  name: string
  tag: string
  rating: number
  area: string
  city: string
  /** Pre-formatted, per-plate price. */
  price: string
  guests: number
  image: string
  events: EventType[]
}

export interface Collection {
  id: string
  title: string
  count: string
  image: string
  description: string
  /** Venue tags this collection gathers. */
  venueTags: string[]
}

export interface Category {
  emoji: string
  label: string
  type: EventType
}

/* ------------------------------------------------------------------ *
 * Accounts
 * ------------------------------------------------------------------ */

/** Stored shape — never leaves the auth service. */
export interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash: string
  salt: string
  createdAt: string
}

/** Shape handed to the UI. */
export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface Session {
  userId: string
  startedAt: string
}

/* ------------------------------------------------------------------ *
 * Bookings
 * ------------------------------------------------------------------ */

export const BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled'] as const

export type BookingStatus = (typeof BOOKING_STATUSES)[number]

export interface Booking {
  id: string
  userId: string
  venueId: string
  /** ISO `YYYY-MM-DD` — a venue is booked for a day, not a moment. */
  date: string
  guests: number
  eventType: EventType
  contactName: string
  contactPhone: string
  /** Whole rupees, computed by the service. */
  estimate: number
  status: BookingStatus
  createdAt: string
  cancelledAt?: string
}

export interface CreateBookingInput {
  userId: string
  venueId: string
  date: string
  guests: number
  eventType: EventType
  contactName: string
  contactPhone: string
}

export interface Favourite {
  userId: string
  venueId: string
  savedAt: string
}
