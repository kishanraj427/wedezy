import { Box, Button, Flex, IconButton, Popover, Text } from '@radix-ui/themes'
import { useState } from 'react'

import { Icon } from '@/components/ui/Icon'
import { invalidFieldClass } from '@/components/ui/Field'
import { cn } from '@/lib/cn'
import {
  buildMonthGrid,
  formatDateLong,
  fromISODate,
  isWithinBookingWindow,
  monthLabel,
  todayISO,
  WEEKDAY_LABELS,
} from '@/lib/dates'

interface DateFieldProps {
  value: string | null
  onChange: (iso: string) => void
  /** Dates already booked at this venue. */
  unavailable: string[]
  invalid?: boolean
}

/**
 * A month grid rather than a native date input, because the point is to show
 * which days are already taken before one can be chosen.
 */
export function DateField({ value, onChange, unavailable, invalid }: DateFieldProps) {
  const initial = value ? fromISODate(value) : new Date()
  const [cursor, setCursor] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const [open, setOpen] = useState(false)

  const taken = new Set(unavailable)
  const days = buildMonthGrid(cursor.year, cursor.month)
  const takenThisMonth = days.filter((day) => day.isCurrentMonth && taken.has(day.iso)).length

  const shift = (delta: number) =>
    setCursor((current) => {
      const next = new Date(current.year, current.month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger>
        <Button
          type="button"
          variant="ghost"
          color="gray"
          aria-label="Event date"
          className={cn(
            'h-auto w-full justify-start gap-3 rounded-control border border-border bg-sheet px-4 py-3.5 text-left text-body font-semibold text-fg transition-smooth-fast hover:border-accent-border hover:bg-sheet',
            invalid && invalidFieldClass,
          )}
        >
          <Icon name="calendar" className="size-4.5 text-accent" />
          {value ? formatDateLong(value) : <Text className="text-fg-subtle">Choose a date</Text>}
          <Icon name="chevron" className="ml-auto size-4 text-fg-muted" />
        </Button>
      </Popover.Trigger>

      <Popover.Content className="w-80 p-4">
        <Flex align="center" justify="between" className="mb-3">
          <IconButton
            type="button"
            variant="ghost"
            color="gray"
            aria-label="Previous month"
            onClick={() => shift(-1)}
          >
            <Icon name="chevronLeft" className="size-4" />
          </IconButton>
          <Text className="text-body font-bold text-fg">
            {monthLabel(cursor.year, cursor.month)}
          </Text>
          <IconButton
            type="button"
            variant="ghost"
            color="gray"
            aria-label="Next month"
            onClick={() => shift(1)}
          >
            <Icon name="chevronRight" className="size-4" />
          </IconButton>
        </Flex>

        <Box className="grid grid-cols-7 gap-1">
          {WEEKDAY_LABELS.map((label) => (
            <Text
              key={label}
              align="center"
              className="py-1 text-eyebrow font-bold text-fg-subtle uppercase"
            >
              {label}
            </Text>
          ))}

          {days.map((day) => {
            const isTaken = taken.has(day.iso)
            const isDisabled = isTaken || !isWithinBookingWindow(day.iso)
            const isSelected = day.iso === value
            const isToday = day.iso === todayISO()

            return (
              <Button
                key={day.iso}
                type="button"
                variant="ghost"
                color="gray"
                disabled={isDisabled}
                aria-label={`${formatDateLong(day.iso)}${isTaken ? ' — already booked' : ''}`}
                onClick={() => {
                  onChange(day.iso)
                  setOpen(false)
                }}
                className={cn(
                  'm-0 h-9 w-full rounded-control p-0 text-body-sm font-semibold transition-smooth',
                  day.isCurrentMonth ? 'text-fg' : 'text-fg-subtle/60',
                  !isDisabled && 'hover:bg-accent-soft hover:text-accent',
                  isToday && !isSelected && 'ring-1 ring-border',
                  isTaken && 'text-fg-subtle line-through opacity-60',
                  isSelected &&
                    'bg-accent text-fg-on-accent hover:bg-accent hover:text-fg-on-accent',
                )}
              >
                {day.day}
              </Button>
            )
          })}
        </Box>

        {takenThisMonth > 0 ? (
          <Text as="p" className="mt-3 text-label text-fg-muted">
            {takenThisMonth} {takenThisMonth === 1 ? 'date is' : 'dates are'} already booked this
            month.
          </Text>
        ) : null}
      </Popover.Content>
    </Popover.Root>
  )
}
