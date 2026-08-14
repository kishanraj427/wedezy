import { Box } from '@radix-ui/themes'
import type { CSSProperties, ReactNode } from 'react'

import { recipe } from './variants'

const cardRecipe = recipe({
  base: 'bg-sheet',
  variants: {
    tone: {
      raised: 'border border-border shadow-card',
      flat: 'border border-border',
      dashed: 'border border-dashed border-border',
      media: 'overflow-hidden shadow-card',
      sunken: 'border border-border bg-sheet-sunken',
    },
    radius: {
      card: 'rounded-card',
      panel: 'rounded-panel',
      control: 'rounded-control',
    },
    pad: {
      none: '',
      sm: 'p-5',
      md: 'p-6',
      lg: 'p-7',
      xl: 'p-8',
    },
    interactive: {
      true: 'transition-lift hover:shadow-float',
      false: '',
    },
  },
  defaults: { tone: 'raised', radius: 'card', pad: 'md', interactive: 'false' },
})

interface CardProps {
  children: ReactNode
  tone?: 'raised' | 'flat' | 'dashed' | 'media' | 'sunken'
  radius?: 'card' | 'panel' | 'control'
  pad?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  interactive?: boolean
  className?: string
  style?: CSSProperties
  id?: string
}

/** The app's surface. Every panel, tile and sheet is one of these. */
export function Card({ children, tone, radius, pad, interactive, className, ...rest }: CardProps) {
  return (
    <Box
      className={cardRecipe(
        { tone, radius, pad, interactive: interactive ? 'true' : 'false' },
        className,
      )}
      {...rest}
    >
      {children}
    </Box>
  )
}
