import { Box } from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface PageContainerProps {
  children: ReactNode
  className?: string
}

/** Centred content column with the site gutter. Width comes from the theme. */
export function PageContainer({ children, className }: PageContainerProps) {
  return <Box className={cn('mx-auto w-full max-w-page px-gutter', className)}>{children}</Box>
}
