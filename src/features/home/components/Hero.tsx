import { Box, Flex, Heading, Text } from '@radix-ui/themes'

import { IMAGES } from '@/data/images'

import { HeroSearchCard } from './HeroSearchCard'

export function Hero() {
  return (
    <Flex
      asChild
      align="center"
      className="relative min-h-[clamp(38rem,88vh,58rem)] overflow-hidden"
    >
      <section>
        <Box
          role="presentation"
          style={{ backgroundImage: `url('${IMAGES.hero}')` }}
          className="absolute inset-0 animate-hero-zoom bg-cover bg-center motion-reduce:animate-none"
        />
        <Box className="absolute inset-0 scrim-hero" />

        <Box className="relative z-2 w-full px-gutter pt-24 pb-18 text-center">
          <Heading
            as="h1"
            className="mx-auto max-w-[56rem] text-display font-extrabold text-fg-on-scrim text-shadow-hero"
          >
            Find the perfect
            <br />
            place for your big day
          </Heading>

          <Text as="p" className="mt-5.5 text-lead font-medium text-fg-on-scrim/90">
            Discover and book wedding, birthday and party venues near you.
          </Text>

          <HeroSearchCard />
        </Box>
      </section>
    </Flex>
  )
}
