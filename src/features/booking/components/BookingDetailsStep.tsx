import { Flex, TextField } from '@radix-ui/themes'

import { ActionButton } from '@/components/ui/Action'
import { Field, invalidFieldClass } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { SearchSelectField } from '@/components/ui/SearchSelectField'
import { cn } from '@/lib/cn'
import { EVENT_TYPES, type EventType, type Venue } from '@/types'

import type { BookingDraft, FieldErrors } from '../booking-form'
import { DateField } from './DateField'

interface BookingDetailsStepProps {
  venue: Venue
  draft: BookingDraft
  errors: FieldErrors
  unavailable: string[]
  onChange: (patch: Partial<BookingDraft>) => void
  onContinue: () => void
}

export function BookingDetailsStep({
  venue,
  draft,
  errors,
  unavailable,
  onChange,
  onContinue,
}: BookingDetailsStepProps) {
  return (
    <Flex direction="column" gap="5">
      <Field label="Date" error={errors.date}>
        <DateField
          value={draft.date}
          onChange={(date) => onChange({ date })}
          unavailable={unavailable}
          invalid={Boolean(errors.date)}
        />
      </Field>

      <Field label="Guests" error={errors.guests} hint={`Seats up to ${venue.guests}`}>
        <TextField.Root
          type="number"
          size="3"
          min={1}
          max={venue.guests}
          value={draft.guests}
          onChange={(event) => onChange({ guests: event.currentTarget.valueAsNumber || 0 })}
          className={cn(errors.guests && invalidFieldClass)}
        />
      </Field>

      <Flex className="rounded-control border border-border bg-sheet">
        <SearchSelectField
          icon="calendar"
          label="Event type"
          value={draft.eventType}
          options={EVENT_TYPES}
          onChange={(eventType: EventType) => onChange({ eventType })}
        />
      </Flex>

      <ActionButton size="lg" onClick={onContinue} className="mt-2 gap-2">
        Continue
        <Icon name="arrowRight" className="size-4" />
      </ActionButton>
    </Flex>
  )
}
