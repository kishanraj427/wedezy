import { Box, Flex, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

/** Class applied to an input that failed validation — one definition, reused. */
export const invalidFieldClass = 'shadow-[inset_0_0_0_1px_var(--color-accent)]'

interface FieldProps {
  label: string
  children: ReactNode
  /** Associates the label with the control. */
  htmlFor?: string
  hint?: string
  error?: string
}

/** Label, optional hint, control, and inline error — the same everywhere. */
export function Field({ label, children, htmlFor, hint, error }: FieldProps) {
  return (
    <Box>
      <Flex align="center" justify="between" className="mb-1.5">
        <Text as="label" htmlFor={htmlFor} className="text-body-sm font-semibold text-fg">
          {label}
        </Text>
        {hint ? <Text className="text-label text-fg-muted">{hint}</Text> : null}
      </Flex>

      {children}

      {error ? (
        <Text
          as="p"
          role="alert"
          className="mt-1.5 animate-rise text-label font-medium text-accent motion-reduce:animate-none"
        >
          {error}
        </Text>
      ) : null}
    </Box>
  )
}
