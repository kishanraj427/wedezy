import { Box } from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type IconName =
  | 'pin'
  | 'search'
  | 'calendar'
  | 'users'
  | 'chevron'
  | 'chevronLeft'
  | 'chevronRight'
  | 'star'
  | 'heart'
  | 'close'
  | 'check'
  | 'ticket'
  | 'user'
  | 'logout'
  | 'arrowRight'

const PATHS: Record<IconName, ReactNode> = {
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  check: <path d="M20 6 9 17l-5-5" />,
  ticket: (
    <>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v14" />
    </>
  ),
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5M21 12H9" />
    </>
  ),
  arrowRight: <path d="M5 12h14m-6-7 7 7-7 7" />,
}

/** Icons drawn with a fill rather than a stroke. */
const FILLED: IconName[] = ['star']

export interface IconProps {
  name: IconName
  /** Tailwind sizing/colour classes — defaults to `size-5`. */
  className?: string
  strokeWidth?: number
  /** Renders a stroked icon filled, e.g. a saved heart. */
  filled?: boolean
}

export function Icon({ name, className, strokeWidth = 2, filled }: IconProps) {
  const solid = filled ?? FILLED.includes(name)

  return (
    <Box asChild>
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 24 24"
        fill={solid ? 'currentColor' : 'none'}
        stroke={solid && FILLED.includes(name) ? 'none' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn('block shrink-0 size-5', className)}
      >
        {PATHS[name]}
      </svg>
    </Box>
  )
}
