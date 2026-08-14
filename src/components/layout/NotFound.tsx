import { Flex, Heading, Text } from '@radix-ui/themes'

import { ActionLink } from '@/components/ui/Action'
import { AppLink } from '@/components/ui/AppLink'
import { Section } from '@/components/ui/Section'

interface NotFoundProps {
  title?: string
  description?: string
}

/** Prop-free variant, so route configs can reference it directly. */
export function RouteNotFound() {
  return <NotFound />
}

export function NotFound({
  title = 'Page not found',
  description = 'The page you are looking for has moved, or never existed.',
}: NotFoundProps) {
  return (
    <Section space="lg">
      <Flex direction="column" align="center" gap="4" className="py-20 text-center">
        <Text className="text-label font-bold tracking-[0.16em] text-accent uppercase">404</Text>
        <Heading as="h1" className="text-h1 font-extrabold text-fg">
          {title}
        </Heading>
        <Text as="p" className="max-w-[29rem] text-lead text-fg-muted">
          {description}
        </Text>
        <Flex gap="3" wrap="wrap" justify="center" className="mt-4">
          <ActionLink to="/">Back home</ActionLink>
          <AppLink
            to="/venues"
            search={{}}
            className="self-center px-3 text-body font-bold text-accent hover:text-accent-hover"
          >
            Browse venues
          </AppLink>
        </Flex>
      </Flex>
    </Section>
  )
}
