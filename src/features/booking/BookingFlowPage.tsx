import { useSuspenseQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { useState } from 'react'

import { AppLink } from '@/components/ui/AppLink'
import { Section } from '@/components/ui/Section'
import { useToast } from '@/components/ui/toast-context'
import { useCreateBooking, useUnavailableDates } from '@/hooks/useBookings'
import { useSession } from '@/hooks/useSession'
import { formatDateLong } from '@/lib/dates'
import { isDomainError, toMessage } from '@/services/errors'
import { venueQueryOptions } from '@/services/queries'
import type { Booking } from '@/types'

import {
  emptyDraft,
  hasErrors,
  validateContact,
  validateDetails,
  type BookingDraft,
  type BookingStep,
  type FieldErrors,
} from './booking-form'
import { BookingDetailsStep } from './components/BookingDetailsStep'
import { BookingReviewStep } from './components/BookingReviewStep'
import { BookingSuccess } from './components/BookingSuccess'
import { BookingSummary } from './components/BookingSummary'

const route = getRouteApi('/venues/$venueId/book')

export function BookingFlowPage() {
  const { venueId } = route.useParams()
  const { step } = route.useSearch()
  const navigate = route.useNavigate()

  const { user } = useSession()
  const { data: venue } = useSuspenseQuery(venueQueryOptions(venueId))
  const { data: unavailable = [] } = useUnavailableDates(venueId)
  const createBooking = useCreateBooking()
  const { toast } = useToast()

  const [draft, setDraft] = useState<BookingDraft>(() =>
    venue ? emptyDraft(venue, user?.name ?? '') : ({} as BookingDraft),
  )
  const [errors, setErrors] = useState<FieldErrors>({})
  const [confirmed, setConfirmed] = useState<Booking | null>(null)

  if (!venue) return null

  if (confirmed) {
    return (
      <Section space="sm">
        <BookingSuccess booking={confirmed} venue={venue} />
      </Section>
    )
  }

  const goToStep = (next: BookingStep) => navigate({ search: { step: next } })

  const update = (patch: Partial<BookingDraft>) => {
    setDraft((current) => ({ ...current, ...patch }))
    setErrors((current) => {
      const next = { ...current }
      for (const key of Object.keys(patch)) delete next[key as keyof BookingDraft]
      return next
    })
  }

  const onContinue = () => {
    const found = validateDetails(draft, venue, unavailable)
    setErrors(found)
    if (!hasErrors(found)) goToStep('review')
  }

  const onConfirm = async () => {
    const found = validateContact(draft)
    setErrors(found)
    if (hasErrors(found) || !user || !draft.date) return

    try {
      const booking = await createBooking.mutateAsync({
        userId: user.id,
        venueId: venue.id,
        date: draft.date,
        guests: draft.guests,
        eventType: draft.eventType,
        contactName: draft.contactName,
        contactPhone: draft.contactPhone,
      })
      setConfirmed(booking)
      toast({
        title: 'Date held',
        description: `${venue.name} on ${formatDateLong(booking.date)}.`,
        tone: 'success',
      })
    } catch (error) {
      // The service re-checks availability, so another tab can still win the race.
      if (isDomainError(error) && error.field) {
        setErrors({ [error.field]: error.message } as FieldErrors)
        if (error.field === 'date') goToStep('details')
      }
      toast({ title: 'Could not complete booking', description: toMessage(error), tone: 'error' })
    }
  }

  return (
    <Section space="sm">
      <AppLink
        to="/venues/$venueId"
        params={{ venueId: venue.id }}
        className="text-body font-semibold text-fg-muted transition-smooth-fast hover:text-accent"
      >
        ← {venue.name}
      </AppLink>

      <Flex align="center" justify="between" gap="4" className="mt-6">
        <Heading as="h1" className="text-h1 font-extrabold text-fg">
          {step === 'details' ? 'Your event' : 'Review & confirm'}
        </Heading>
        <Text className="shrink-0 text-label font-bold text-fg-muted uppercase">
          Step {step === 'details' ? 1 : 2} of 2
        </Text>
      </Flex>

      <Box className="mt-4 h-1.5 overflow-hidden rounded-full bg-border">
        <Box
          className="h-full origin-left rounded-full bg-accent transition-transform duration-[var(--duration-slow)] ease-emphasized"
          style={{ transform: `scaleX(${step === 'details' ? 0.5 : 1})` }}
        />
      </Box>

      <Grid columns={{ initial: '1', lg: '1.6fr 1fr' }} gap="8" className="mt-9">
        <Box key={step} className="animate-step-in motion-reduce:animate-none">
          {step === 'details' ? (
            <BookingDetailsStep
              venue={venue}
              draft={draft}
              errors={errors}
              unavailable={unavailable}
              onChange={update}
              onContinue={onContinue}
            />
          ) : (
            <BookingReviewStep
              venue={venue}
              draft={draft}
              errors={errors}
              isSubmitting={createBooking.isPending}
              onChange={update}
              onBack={() => goToStep('details')}
              onConfirm={onConfirm}
            />
          )}
        </Box>

        <BookingSummary
          venue={venue}
          date={draft.date}
          guests={draft.guests}
          eventType={draft.eventType}
        />
      </Grid>
    </Section>
  )
}
