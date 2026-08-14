import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { Flex, Skeleton } from '@radix-ui/themes'
import { useMemo, useState } from 'react'

import { ActionLink } from '@/components/ui/Action'
import { ChipLink } from '@/components/ui/Chip'
import { EmptyState } from '@/components/ui/EmptyState'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { useToast } from '@/components/ui/toast-context'
import { useBookings, useCancelBooking } from '@/hooks/useBookings'
import { useSession } from '@/hooks/useSession'
import { toMessage } from '@/services/errors'
import { venuesQueryOptions } from '@/services/queries'
import type { Booking } from '@/types'

import {
  applyStatusFilter,
  countByStatus,
  STATUS_FILTERS,
  STATUS_FILTER_LABELS,
} from './booking-filters'
import { AccountTabs } from './components/AccountTabs'
import { BookingCard } from './components/BookingCard'
import { CancelBookingDialog } from './components/CancelBookingDialog'

const route = getRouteApi('/account/bookings/')

export function BookingsPage() {
  const { status } = route.useSearch()
  const { user } = useSession()
  const { toast } = useToast()

  const { data: bookings, isPending } = useBookings(user?.id)
  const { data: venues } = useQuery(venuesQueryOptions)
  const cancelBooking = useCancelBooking()
  const [pendingCancel, setPendingCancel] = useState<Booking | null>(null)

  const venuesById = useMemo(
    () => new Map((venues ?? []).map((venue) => [venue.id, venue])),
    [venues],
  )

  const all = bookings ?? []
  const visible = applyStatusFilter(all, status)

  const onConfirmCancel = async () => {
    if (!pendingCancel || !user) return
    try {
      await cancelBooking.mutateAsync({ bookingId: pendingCancel.id, userId: user.id })
      toast({
        title: 'Booking cancelled',
        description: 'The date is available again.',
        tone: 'info',
      })
      setPendingCancel(null)
    } catch (error) {
      toast({ title: 'Could not cancel', description: toMessage(error), tone: 'error' })
    }
  }

  return (
    <Section>
      <PageHeader
        title="My bookings"
        description="Every enquiry you have sent, and where it stands."
      />

      <AccountTabs className="mt-7" />

      <Flex gap="2" wrap="wrap" className="mt-7 mb-8">
        {STATUS_FILTERS.map((filter) => (
          <ChipLink
            key={filter}
            to="/account/bookings"
            search={{ status: filter }}
            replace
            selected={status === filter}
          >
            {STATUS_FILTER_LABELS[filter]} ({countByStatus(all, filter)})
          </ChipLink>
        ))}
      </Flex>

      {isPending ? (
        <Flex direction="column" gap="5">
          {Array.from({ length: 2 }, (_, index) => (
            <Skeleton key={index} className="h-44 rounded-card" />
          ))}
        </Flex>
      ) : visible.length === 0 ? (
        <EmptyState
          title={status === 'all' ? 'No bookings yet' : 'Nothing in this list'}
          description={
            status === 'all'
              ? 'Find a venue you like and hold a date — it only takes a minute.'
              : 'Try another status filter.'
          }
          action={
            <ActionLink to="/venues" search={{}} lift>
              Browse venues
            </ActionLink>
          }
        />
      ) : (
        <Flex direction="column" gap="5">
          {visible.map((booking, index) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              venue={venuesById.get(booking.venueId)}
              index={index}
              onCancel={setPendingCancel}
            />
          ))}
        </Flex>
      )}

      <CancelBookingDialog
        booking={pendingCancel}
        venueName={pendingCancel ? venuesById.get(pendingCancel.venueId)?.name : undefined}
        isPending={cancelBooking.isPending}
        onConfirm={onConfirmCancel}
        onOpenChange={(open) => !open && setPendingCancel(null)}
      />
    </Section>
  )
}
