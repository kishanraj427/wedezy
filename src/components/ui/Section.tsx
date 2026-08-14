import { Box } from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { PageContainer } from './PageContainer'
import { recipe } from './variants'

const sectionRecipe = recipe({
  base: '',
  variants: {
    tone: {
      canvas: '',
      sunken: 'border-y border-border bg-canvas-sunken',
    },
    space: {
      sm: 'py-10',
      md: 'py-section',
      lg: 'py-section-lg',
    },
  },
  defaults: { tone: 'canvas', space: 'md' },
})

interface SectionProps {
  children: ReactNode
  tone?: 'canvas' | 'sunken'
  space?: 'sm' | 'md' | 'lg'
  /** Skips the inner container when the section manages its own layout. */
  bare?: boolean
  id?: string
  className?: string
}

/** A page band: vertical rhythm and background come from the theme. */
export function Section({ children, tone, space, bare, id, className }: SectionProps) {
  return (
    <Box asChild className={cn(sectionRecipe({ tone, space }), className)}>
      <section id={id}>{bare ? children : <PageContainer>{children}</PageContainer>}</section>
    </Box>
  )
}
