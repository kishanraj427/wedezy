import { Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { Card } from './Card'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

/** Every "nothing here" surface in the app. */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <Card
      tone="dashed"
      pad="none"
      className="animate-rise px-gutter py-section text-center motion-reduce:animate-none"
    >
      <Heading as="h2" className="text-h4 font-extrabold text-fg">
        {title}
      </Heading>
      <Text as="p" className="mt-2.5 text-body-lg text-fg-muted">
        {description}
      </Text>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </Card>
  )
}
