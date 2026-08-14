import { Flex, Grid, Heading, Text } from '@radix-ui/themes'

import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { HOW_IT_WORKS } from '@/data/navigation'

export function HowItWorks() {
  return (
    <Section tone="sunken" space="lg" className="mt-14">
      <Reveal>
        <Heading as="h2" align="center" className="mb-14 text-h2 font-extrabold text-fg">
          How Wedezy works
        </Heading>
      </Reveal>

      <Grid columns={{ initial: '1', lg: '3' }} gap="6" className="max-lg:mx-auto max-lg:max-w-xl">
        {HOW_IT_WORKS.map((item, index) => (
          <Reveal key={item.step} delay={index * 80} className="h-full">
            <Card
              tone="flat"
              radius="panel"
              pad="lg"
              className="h-full transition-lift hover:-translate-y-1.5 hover:shadow-raised"
            >
              <Flex
                align="center"
                justify="center"
                className="mb-6 size-14 rounded-full bg-accent text-h4 font-extrabold text-fg-on-accent shadow-accent"
              >
                {item.step}
              </Flex>
              <Heading as="h3" className="mb-3 text-h3 font-extrabold text-fg">
                {item.title}
              </Heading>
              <Text as="p" className="text-body-lg text-fg-muted">
                {item.description}
              </Text>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </Section>
  )
}
