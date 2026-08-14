import { getRouteApi } from '@tanstack/react-router'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'

import { AppLink } from '@/components/ui/AppLink'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'

const route = getRouteApi('/info/$slug')

export function InfoPage() {
  const page = route.useLoaderData()

  return (
    <Section space="lg">
      <Box className="max-w-3xl">
        <PageHeader
          title={page.title}
          description={page.tagline}
          above={
            <AppLink
              to="/"
              className="text-body font-semibold text-fg-muted transition-smooth-fast hover:text-accent"
            >
              ← Back home
            </AppLink>
          }
        />

        <Flex direction="column" gap="7" className="mt-10">
          {page.sections.map((section) => (
            <Card key={section.heading} radius="panel" pad="lg">
              <Heading as="h2" className="text-h4 font-extrabold text-fg">
                {section.heading}
              </Heading>
              <Text as="p" className="mt-2.5 text-body-lg text-fg-muted">
                {section.body}
              </Text>
            </Card>
          ))}
        </Flex>
      </Box>
    </Section>
  )
}
