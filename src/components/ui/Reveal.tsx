import { Box } from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/cn'

interface RevealProps {
  children: ReactNode
  /** Stagger, in milliseconds. */
  delay?: number
  className?: string
}

/** Fades + lifts its children into place the first time they enter the viewport. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>()

  return (
    <Box
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'transition-smooth motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        className,
      )}
    >
      {children}
    </Box>
  )
}
