import type { ComponentProps } from 'react'

import { AppLink } from './AppLink'
import { recipe } from './variants'

const chipRecipe = recipe({
  base: 'inline-flex items-center gap-2 rounded-full text-body-sm font-semibold transition-smooth',
  variants: {
    state: {
      selected: 'border border-accent bg-accent text-fg-on-accent',
      idle: 'border border-border bg-sheet text-fg-muted hover:border-accent-border hover:text-fg',
    },
    size: {
      sm: 'px-3 py-1.5',
      md: 'px-4 py-2',
    },
  },
  defaults: { state: 'idle', size: 'md' },
})

type ChipLinkProps = ComponentProps<typeof AppLink> & {
  selected?: boolean
  size?: 'sm' | 'md'
}

/** A filter pill that navigates — used for status and category filters. */
export function ChipLink({ selected, size, className, ...props }: ChipLinkProps) {
  return (
    <AppLink
      className={chipRecipe({ state: selected ? 'selected' : 'idle', size }, className)}
      {...props}
    />
  )
}
