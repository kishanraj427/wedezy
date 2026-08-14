import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { Icon } from './Icon'
import { ToastContext, type Toast, type ToastInput, type ToastTone } from './toast-context'

const TONE_BAR: Record<ToastTone, string> = {
  success: 'bg-positive',
  error: 'bg-accent',
  info: 'bg-fg-subtle',
}

const DEFAULT_DURATION = 4500
const MAX_VISIBLE = 3

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timers.current.delete(id)
    }
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, tone = 'info', duration = DEFAULT_DURATION }: ToastInput) => {
      const id = crypto.randomUUID()
      setToasts((current) => [
        ...current.slice(-(MAX_VISIBLE - 1)),
        { id, title, description, tone },
      ])
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), duration),
      )
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Flex
        direction="column"
        gap="3"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-100 items-center px-gutter sm:inset-x-auto sm:right-6 sm:items-end"
      >
        {toasts.map((item) => (
          <Flex
            key={item.id}
            align="start"
            gap="3"
            className="pointer-events-auto w-full max-w-95 animate-toast-in overflow-hidden rounded-panel border border-border bg-sheet p-4 shadow-float motion-reduce:animate-none"
          >
            <Box className={cn('h-full w-1 self-stretch rounded-full', TONE_BAR[item.tone])} />

            <Box className="min-w-0 flex-1">
              <Text as="div" className="text-body font-bold text-fg">
                {item.title}
              </Text>
              {item.description ? (
                <Text as="div" className="mt-1 text-body-sm text-fg-muted">
                  {item.description}
                </Text>
              ) : null}
            </Box>

            <IconButton
              variant="ghost"
              color="gray"
              aria-label="Dismiss notification"
              onClick={() => dismiss(item.id)}
              className="-mr-1 shrink-0 text-fg-muted"
            >
              <Icon name="close" className="size-4" />
            </IconButton>
          </Flex>
        ))}
      </Flex>
    </ToastContext.Provider>
  )
}
