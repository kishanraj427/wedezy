import { isWithinBookingWindow } from '@/lib/dates'
import type { EventType, Venue } from '@/types'

export interface BookingDraft {
  date: string | null
  guests: number
  eventType: EventType
  contactName: string
  contactPhone: string
}

export type BookingStep = 'details' | 'review'

export type FieldErrors = Partial<Record<keyof BookingDraft, string>>

export function parseBookingStep(value: unknown): BookingStep {
  return value === 'review' ? 'review' : 'details'
}

export function emptyDraft(venue: Venue, contactName: string): BookingDraft {
  return {
    date: null,
    guests: Math.min(100, venue.guests),
    eventType: venue.events[0] ?? 'Wedding',
    contactName,
    contactPhone: '',
  }
}

/**
 * Client-side mirror of the service rules, so the user sees a problem before
 * submitting. The service re-checks everything — this is convenience, not trust.
 */
export function validateDetails(
  draft: BookingDraft,
  venue: Venue,
  unavailable: string[],
): FieldErrors {
  const errors: FieldErrors = {}

  if (!draft.date) errors.date = 'Choose a date for your event.'
  else if (unavailable.includes(draft.date)) errors.date = 'That date is already booked here.'
  else if (!isWithinBookingWindow(draft.date))
    errors.date = 'Pick a date between today and 18 months from now.'

  if (!Number.isFinite(draft.guests) || draft.guests < 1)
    errors.guests = 'Enter at least one guest.'
  else if (draft.guests > venue.guests)
    errors.guests = `This venue seats up to ${venue.guests} guests.`

  return errors
}

export function validateContact(draft: BookingDraft): FieldErrors {
  const errors: FieldErrors = {}

  if (draft.contactName.trim().length < 2) errors.contactName = 'Who should the venue ask for?'
  if (draft.contactPhone.replace(/\D/g, '').length < 8)
    errors.contactPhone = 'Enter a contact number.'

  return errors
}

export const hasErrors = (errors: FieldErrors) => Object.keys(errors).length > 0
