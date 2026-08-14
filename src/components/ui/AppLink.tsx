import {
  Button,
  Link as ThemeLink,
  type ButtonProps,
  type LinkProps as ThemeLinkProps,
} from '@radix-ui/themes'
import { createLink, type LinkComponentProps } from '@tanstack/react-router'
import type { ReactNode, Ref } from 'react'

/* ------------------------------------------------------------------ *
 * Text link — Radix Themes styling, TanStack Router behaviour.
 * `createLink` keeps `to` / `params` / `search` fully type-checked.
 * ------------------------------------------------------------------ */

interface ThemeAnchorProps extends Omit<ThemeLinkProps, 'href'> {
  ref?: Ref<HTMLAnchorElement>
}

function ThemeAnchor({ ref, underline = 'none', ...props }: ThemeAnchorProps) {
  return <ThemeLink ref={ref} underline={underline} {...props} />
}

const CreatedAppLink = createLink(ThemeAnchor)

export function AppLink(props: LinkComponentProps<typeof ThemeAnchor>) {
  return <CreatedAppLink preload="intent" {...props} />
}

/* ------------------------------------------------------------------ *
 * Button-shaped link — a Radix Button that navigates.
 * ------------------------------------------------------------------ */

interface ButtonAnchorProps extends Pick<
  ButtonProps,
  'variant' | 'size' | 'radius' | 'color' | 'highContrast'
> {
  ref?: Ref<HTMLAnchorElement>
  className?: string
  children?: ReactNode
}

function ButtonAnchor({
  ref,
  variant,
  size,
  radius,
  color,
  highContrast,
  className,
  children,
  ...anchorProps
}: ButtonAnchorProps) {
  return (
    <Button
      asChild
      variant={variant}
      size={size}
      radius={radius}
      color={color}
      highContrast={highContrast}
      className={className}
    >
      <a ref={ref} {...anchorProps}>
        {children}
      </a>
    </Button>
  )
}

const CreatedButtonLink = createLink(ButtonAnchor)

export function ButtonLink(props: LinkComponentProps<typeof ButtonAnchor>) {
  return <CreatedButtonLink preload="intent" {...props} />
}
