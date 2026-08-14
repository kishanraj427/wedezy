import { BOOKING_STATUSES, type Booking, type BookingStatus } from '@/types'

export type StatusFilter = BookingStatus | 'all'

export const STATUS_FILTERS: StatusFilter[] = ['all', ...BOOKING_STATUSES]

export const STATUS_FILTER_LABELS: Record<StatusFilter, string> = {
  all: 'All',
  pending: 'Awaiting venue',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
}

export const validateBookingsSearch = (
  search: Record<string, unknown>,
): { status: StatusFilter } => ({
  status: STATUS_FILTERS.includes(search.status as StatusFilter)
    ? (search.status as StatusFilter)
    : 'all',
})

export function countByStatus(bookings: Booking[], filter: StatusFilter): number {
  return filter === 'all'
    ? bookings.length
    : bookings.filter((booking) => booking.status === filter).length
}

export function applyStatusFilter(bookings: Booking[], filter: StatusFilter): Booking[] {
  return filter === 'all' ? bookings : bookings.filter((booking) => booking.status === filter)
}
