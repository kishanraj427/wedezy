import { Box, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import type { ReactNode } from 'react'

import { AppLink } from '@/components/ui/AppLink'
import { PageContainer } from '@/components/ui/PageContainer'
import { FOOTER_CITIES, FOOTER_COMPANY, FOOTER_FOR_VENUES } from '@/data/navigation'

const LINK = 'text-body-lg font-medium text-fg transition-smooth-fast hover:text-accent'

export function Footer() {
  return (
    <Box asChild className="bg-canvas pt-18">
      <footer>
        <PageContainer>
          <Grid
            columns={{ initial: '1', sm: '2', lg: '1.35fr 1fr 1fr 1fr' }}
            gap="8"
            className="pb-16"
          >
            <Box>
              <AppLink to="/" className="text-h3 font-extrabold text-accent">
                Wedezy
              </AppLink>
              <Text as="p" className="mt-4.5 max-w-[19rem] text-body-lg text-fg-muted">
                Making event planning simple. Find the best venues in your city.
              </Text>
            </Box>

            <FooterColumn title="Cities">
              {FOOTER_CITIES.map((city) => (
                <AppLink key={city} to="/venues" search={{ city }} className={LINK}>
                  {city}
                </AppLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Company">
              {FOOTER_COMPANY.map((link) => (
                <AppLink
                  key={link.slug}
                  to="/info/$slug"
                  params={{ slug: link.slug }}
                  className={LINK}
                >
                  {link.label}
                </AppLink>
              ))}
            </FooterColumn>

            <FooterColumn title="For Venues">
              <AppLink to="/list-your-venue" className={LINK}>
                List your venue
              </AppLink>
              {FOOTER_FOR_VENUES.map((link) => (
                <AppLink
                  key={link.slug}
                  to="/info/$slug"
                  params={{ slug: link.slug }}
                  className={LINK}
                >
                  {link.label}
                </AppLink>
              ))}
            </FooterColumn>
          </Grid>

          <Flex align="center" justify="between" gap="4" className="border-t border-border py-6.5">
            <Text as="p" className="text-body-sm text-fg-muted">
              © 2026 Wedezy. All rights reserved.
            </Text>
            <AppLink
              to="/info/$slug"
              params={{ slug: 'privacy' }}
              className="text-body-sm font-medium text-fg-muted transition-smooth-fast hover:text-fg"
            >
              Privacy
            </AppLink>
          </Flex>
        </PageContainer>
      </footer>
    </Box>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box>
      <Heading as="h4" className="mb-6 text-eyebrow font-bold text-fg-muted uppercase">
        {title}
      </Heading>
      <Flex direction="column" align="start" className="gap-4.5">
        {children}
      </Flex>
    </Box>
  )
}
