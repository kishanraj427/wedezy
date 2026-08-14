import { AlertDialog, Button, Flex, Text } from '@radix-ui/themes'

import { ActionButton } from '@/components/ui/Action'
import { formatDateLong } from '@/lib/dates'
import type { Booking } from '@/types'

interface CancelBookingDialogProps {
  booking: Booking | null
  venueName?: string
  isPending: boolean
  onConfirm: () => void
  onOpenChange: (open: boolean) => void
}

export function CancelBookingDialog({
  booking,
  venueName,
  isPending,
  onConfirm,
  onOpenChange,
}: CancelBookingDialogProps) {
  return (
    <AlertDialog.Root open={Boolean(booking)} onOpenChange={onOpenChange}>
      <AlertDialog.Content maxWidth="440px">
        <AlertDialog.Title>Cancel this booking?</AlertDialog.Title>
        <AlertDialog.Description size="2">
          <Text as="p" className="text-body text-fg-muted">
            {venueName ?? 'This venue'} will release{' '}
            <Text as="span" className="font-semibold text-fg">
              {booking ? formatDateLong(booking.date) : ''}
            </Text>{' '}
            back to other planners. This cannot be undone.
          </Text>
        </AlertDialog.Description>

        <Flex gap="3" justify="end" className="mt-5">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" radius="full" className="px-5">
              Keep booking
            </Button>
          </AlertDialog.Cancel>
          <ActionButton loading={isPending} onClick={onConfirm}>
            Cancel booking
          </ActionButton>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
