import { Box } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

export type ImageProps = ComponentPropsWithoutRef<'img'>

/** Cover image primitive — always lazy, always object-fit: cover by default. */
export function Image({ className, alt = '', loading = 'lazy', ...props }: ImageProps) {
  return (
    <Box asChild>
      <img
        alt={alt}
        loading={loading}
        className={cn('block h-full w-full object-cover', className)}
        {...props}
      />
    </Box>
  )
}
