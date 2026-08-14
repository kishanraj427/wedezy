import { Box, Flex, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  description?: string
  /** Optional trailing slot, e.g. a "View all" link. */
  action?: ReactNode
}

export function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <Flex
      align={{ initial: 'start', sm: 'end' }}
      justify="between"
      gap="5"
      direction={{ initial: 'column', sm: 'row' }}
      className="mb-9"
    >
      <Box>
        <Heading as="h2" className="text-h2 font-extrabold text-fg">
          {title}
        </Heading>
        {description ? (
          <Text as="p" className="mt-2.5 text-lead text-fg-muted">
            {description}
          </Text>
        ) : null}
      </Box>
      {action ? <Box className="shrink-0">{action}</Box> : null}
    </Flex>
  )
}
