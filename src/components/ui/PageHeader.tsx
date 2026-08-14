import { Box, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface PageHeaderProps {
  title: string
  description?: string
  /** Rendered above the title, e.g. a back link or eyebrow. */
  above?: ReactNode
  className?: string
}

/** The title block every inner page opens with. */
export function PageHeader({ title, description, above, className }: PageHeaderProps) {
  return (
    <Box className={cn(className)}>
      {above ? <Box className="mb-6">{above}</Box> : null}

      <Heading as="h1" className="text-h1 font-extrabold text-fg">
        {title}
      </Heading>

      {description ? (
        <Text as="p" className="mt-2 text-lead text-fg-muted">
          {description}
        </Text>
      ) : null}
    </Box>
  )
}
