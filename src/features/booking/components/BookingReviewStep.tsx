import { Flex, Text, TextField } from '@radix-ui/themes'

import { ActionButton } from '@/components/ui/Action'
import { Card } from '@/components/ui/Card'
import { Field, invalidFieldClass } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
import { formatDateLong } from '@/lib/dates'
import type { Venue } from '@/types'

import type { BookingDraft, FieldErrors } from '../booking-form'

interface BookingReviewStepProps {
  venue: Venue
  draft: BookingDraft
  errors: FieldErrors
  isSubmitting: boolean
  onChange: (patch: Partial<BookingDraft>) => void
  onBack: () => void
  onConfirm: () => void
}

export function BookingReviewStep({
  venue,
  draft,
  errors,
  isSubmitting,
  onChange,
  onBack,
  onConfirm,
}: BookingReviewStepProps) {
  return (
    <Flex direction="column" gap="5">
      <Field label="Contact name" error={errors.contactName}>
        <TextField.Root
          size="3"
          value={draft.contactName}
          onChange={(event) => onChange({ contactName: event.currentTarget.value })}
          placeholder="Priya Sharma"
          className={cn(errors.contactName && invalidFieldClass)}
        />
      </Field>

      <Field label="Contact number" error={errors.contactPhone}>
        <TextField.Root
          size="3"
          type="tel"
          value={draft.contactPhone}
          onChange={(event) => onChange({ contactPhone: event.currentTarget.value })}
          placeholder="+91 98765 43210"
          className={cn(errors.contactPhone && invalidFieldClass)}
        />
      </Field>

      <Card tone="sunken" radius="control" pad="sm">
        <Text as="p" className="text-body-sm text-fg-muted">
          Sending this holds{' '}
          <Text as="span" className="font-semibold text-fg">
            {draft.date ? formatDateLong(draft.date) : 'your date'}
          </Text>{' '}
          at {venue.name} while they confirm. Nothing is charged now.
        </Text>
      </Card>

      <Flex gap="3" wrap="wrap">
        <ActionButton tone="outline" size="lg" onClick={onBack}>
          Back
        </ActionButton>
        <ActionButton size="lg" loading={isSubmitting} onClick={onConfirm}>
          Confirm booking
        </ActionButton>
      </Flex>
    </Flex>
  )
}
