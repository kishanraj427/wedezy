import { isWithinBookingWindow } from '@/lib/dates'
import { parsePrice } from '@/lib/money'
import {
  DateUnavailableError,
  InvalidDateError,
  NotFoundError,
  NotOwnerError,
  OverCapacityError,
} from '@/services/errors'
import { STORAGE_KEYS } from '@/services/storage/keys'
import { readCollection, writeValue } from '@/services/storage/local-storage'
import { requireVenue } from '@/services/venues.service'
import type { Booking, CreateBookingInput } from '@/types'

/**
 * All booking rules live here. Components ask questions ("which dates are
 * taken?") and issue commands ("create this booking") — they never decide.
 */

function readBookings(): Booking[] {
  return readCollection<Booking>(STORAGE_KEYS.bookings)
}

const isActive = (booking: Booking) => booking.status !== 'cancelled'

const byDateAscending = (a: Booking, b: Booking) => a.date.localeCompare(b.date)

export async function listBookings(userId: string): Promise<Booking[]> {
  return readBookings()
    .filter((booking) => booking.userId === userId)
    .sort(byDateAscending)
}

export async function getBooking(bookingId: string): Promise<Booking | null> {
  return readBookings().find((booking) => booking.id === bookingId) ?? null
}

/** Dates already taken at this venue, by anyone. Feeds the date picker. */
export async function getUnavailableDates(venueId: string): Promise<string[]> {
  return readBookings()
    .filter((booking) => booking.venueId === venueId && isActive(booking))
    .map((booking) => booking.date)
}

export function calculateEstimate(pricePerPlate: string, guests: number): number {
  return parsePrice(pricePerPlate) * guests
}

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const venue = await requireVenue(input.venueId)

  if (!isWithinBookingWindow(input.date)) {
    throw new InvalidDateError()
  }

  if (!Number.isFinite(input.guests) || input.guests < 1) {
    throw new OverCapacityError(venue.guests)
  }

  if (input.guests > venue.guests) {
    throw new OverCapacityError(venue.guests)
  }

  const bookings = readBookings()

  // Re-checked here rather than trusting the picker: another tab may have
  // taken this date since the form was rendered.
  const clash = bookings.some(
    (booking) =>
      booking.venueId === input.venueId && booking.date === input.date && isActive(booking),
  )
  if (clash) throw new DateUnavailableError()

  const booking: Booking = {
    id: crypto.randomUUID(),
    userId: input.userId,
    venueId: input.venueId,
    date: input.date,
    guests: input.guests,
    eventType: input.eventType,
    contactName: input.contactName.trim(),
    contactPhone: input.contactPhone.trim(),
    estimate: calculateEstimate(venue.price, input.guests),
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  writeValue(STORAGE_KEYS.bookings, [...bookings, booking])
  return booking
}

export async function cancelBooking(bookingId: string, userId: string): Promise<Booking> {
  const bookings = readBookings()
  const existing = bookings.find((booking) => booking.id === bookingId)

  if (!existing) throw new NotFoundError('Booking')
  if (existing.userId !== userId) throw new NotOwnerError()

  const cancelled: Booking = {
    ...existing,
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
  }

  writeValue(
    STORAGE_KEYS.bookings,
    bookings.map((booking) => (booking.id === bookingId ? cancelled : booking)),
  )

  return cancelled
}
