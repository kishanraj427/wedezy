/** Booking dates are calendar days: ISO `YYYY-MM-DD`, no time, no timezone drift. */

export const BOOKING_WINDOW_MONTHS = 18

export function toISODate(date: Date): string {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function fromISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function todayISO(): string {
  return toISODate(new Date())
}

export function maxBookingDateISO(): string {
  const date = new Date()
  date.setMonth(date.getMonth() + BOOKING_WINDOW_MONTHS)
  return toISODate(date)
}

export function isWithinBookingWindow(iso: string): boolean {
  return iso >= todayISO() && iso <= maxBookingDateISO()
}

export function isPast(iso: string): boolean {
  return iso < todayISO()
}

const LONG = new Intl.DateTimeFormat('en-IN', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const MEDIUM = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatDateLong(iso: string): string {
  return LONG.format(fromISODate(iso))
}

export function formatDateMedium(iso: string): string {
  return MEDIUM.format(fromISODate(iso))
}

export const WEEKDAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export interface CalendarDay {
  iso: string
  day: number
  isCurrentMonth: boolean
}

/** Six-week grid starting Monday, so the calendar never changes height. */
export function buildMonthGrid(year: number, month: number): CalendarDay[] {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - offset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)
    return {
      iso: toISODate(date),
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === month,
    }
  })
}

export function monthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(
    new Date(year, month, 1),
  )
}
