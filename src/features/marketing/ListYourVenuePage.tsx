import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'

import { ActionLink } from '@/components/ui/Action'
import { Card } from '@/components/ui/Card'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'

const BENEFITS = [
  {
    title: 'Reach planners actively booking',
    body: 'Your listing appears in city and event-type searches the moment it is approved.',
  },
  {
    title: 'Keep your own calendar',
    body: 'Enquiries come to you directly. No exclusivity, no commission on the booking.',
  },
  {
    title: 'Show the venue honestly',
    body: 'Real photos, real capacity and indicative per-plate pricing — fewer wasted site visits.',
  },
]

export function ListYourVenuePage() {
  return (
    <Section space="lg">
      <Box className="max-w-3xl">
        <PageHeader
          title="List your venue on Wedezy"
          description="Add your space once and start receiving enquiries from couples and event planners in your city. Approval usually takes two working days."
          above={
            <Text className="text-label font-bold tracking-[0.16em] text-accent uppercase">
              For venue owners
            </Text>
          }
        />

        <Flex gap="3" wrap="wrap" className="mt-8">
          <ActionLink to="/signup" size="lg" lift>
            Create a partner account
          </ActionLink>
          <ActionLink to="/info/$slug" params={{ slug: 'help-center' }} tone="outline" size="lg">
            Read the FAQ
          </ActionLink>
        </Flex>
      </Box>

      <Grid columns={{ initial: '1', lg: '3' }} gap="6" className="mt-14">
        {BENEFITS.map((benefit) => (
          <Card key={benefit.title} radius="panel" pad="lg">
            <Heading as="h2" className="text-h4 font-extrabold text-fg">
              {benefit.title}
            </Heading>
            <Text as="p" className="mt-2.5 text-body-lg text-fg-muted">
              {benefit.body}
            </Text>
          </Card>
        ))}
      </Grid>
    </Section>
  )
}
