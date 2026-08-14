import { Button } from '@radix-ui/themes'
import type { ComponentProps, ReactNode } from 'react'

import { actionClass, type ActionStyleProps } from './action-styles'
import { ButtonLink } from './AppLink'

type ActionButtonProps = ActionStyleProps &
  Omit<ComponentProps<typeof Button>, 'variant' | 'size' | 'color'> & {
    children?: ReactNode
  }

export function ActionButton({
  tone,
  size,
  lift,
  block,
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      radius="full"
      variant="ghost"
      color="gray"
      className={actionClass({ tone, size, lift, block, className })}
      {...props}
    >
      {children}
    </Button>
  )
}

type ActionLinkProps = ActionStyleProps & ComponentProps<typeof ButtonLink>

export function ActionLink({ tone, size, lift, block, className, ...props }: ActionLinkProps) {
  return (
    <ButtonLink
      radius="full"
      variant="ghost"
      color="gray"
      className={actionClass({ tone, size, lift, block, className })}
      {...props}
    />
  )
}
