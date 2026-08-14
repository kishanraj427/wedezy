import { Flex, Text } from '@radix-ui/themes'

import { AppLink } from '@/components/ui/AppLink'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { CATEGORIES } from '@/data/categories'
import { HEADER_CITY } from '@/data/navigation'

export function CategoryRail() {
  return (
    <Section space="sm" className="pt-18">
      <Flex wrap="wrap" className="gap-x-11 gap-y-8 max-sm:justify-center max-sm:gap-6">
        {CATEGORIES.map((category, index) => (
          <Reveal key={category.type} delay={index * 60}>
            <AppLink
              to="/venues"
              search={{ type: category.type, city: HEADER_CITY }}
              className="group flex flex-col items-center gap-4"
            >
              <Flex
                align="center"
                justify="center"
                className="size-32 rounded-full border border-transparent bg-accent-softer text-4xl transition-lift group-hover:-translate-y-1.5 group-hover:bg-sheet group-hover:shadow-raised group-data-[status=active]:border-accent group-data-[status=active]:bg-sheet max-sm:size-26 max-sm:text-3xl"
              >
                {category.emoji}
              </Flex>
              <Text as="span" className="text-body-lg font-bold text-fg">
                {category.label}
              </Text>
            </AppLink>
          </Reveal>
        ))}
      </Flex>
    </Section>
  )
}
