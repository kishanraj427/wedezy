import { Box, Flex, Separator, Text, TextField } from '@radix-ui/themes'
import { useNavigate } from '@tanstack/react-router'
import { useState, type KeyboardEvent } from 'react'

import { AccountMenu } from '@/components/layout/AccountMenu'
import { AppLink } from '@/components/ui/AppLink'
import { Icon } from '@/components/ui/Icon'
import { PageContainer } from '@/components/ui/PageContainer'
import { HEADER_CITY } from '@/data/navigation'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'

export function Header() {
  const scrolled = useScrolled()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    navigate({ to: '/venues', search: { q: query.trim() || undefined, city: HEADER_CITY } })
  }

  return (
    <Box
      asChild
      className={cn(
        'surface-glass sticky top-0 z-60 border-b transition-smooth',
        scrolled ? 'border-border shadow-header' : 'border-transparent',
      )}
    >
      <header>
        <PageContainer>
          <Flex align="center" gap="7" className="h-18">
            <AppLink to="/" className="shrink-0 text-h3 font-extrabold text-accent">
              Wedezy
            </AppLink>

            <Flex
              align="center"
              gap="3"
              className="hidden min-w-0 max-w-[35rem] flex-1 rounded-full border border-transparent bg-sheet-muted px-5 py-2.5 transition-smooth-fast focus-within:border-border focus-within:bg-sheet focus-within:shadow-subtle min-[860px]:flex"
            >
              <Flex asChild align="center" gap="2" className="shrink-0">
                <Text className="text-body font-semibold text-fg">
                  <Icon name="pin" className="size-4.5 text-accent" />
                  {HEADER_CITY}
                </Text>
              </Flex>

              <Separator orientation="vertical" size="1" className="h-5.5 bg-border-strong" />

              <TextField.Root
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                onKeyDown={onSearchKeyDown}
                placeholder="Search venues, areas or types..."
                aria-label="Search venues"
                variant="soft"
                color="gray"
                className="min-w-0 flex-1 bg-transparent text-body shadow-none outline-none [&_input::placeholder]:text-fg-subtle [&_input]:pl-2 [&_input]:text-fg"
              >
                <TextField.Slot pr="0">
                  <Icon name="search" className="size-4 text-fg-muted" />
                </TextField.Slot>
              </TextField.Root>
            </Flex>

            <Flex asChild align="center" gap="6" className="ml-auto">
              <nav>
                <AppLink
                  to="/list-your-venue"
                  activeProps={{ className: 'text-fg' }}
                  className="hidden text-body font-semibold text-fg-muted transition-smooth-fast hover:text-fg lg:block"
                >
                  List your venue
                </AppLink>

                <AccountMenu />
              </nav>
            </Flex>
          </Flex>
        </PageContainer>
      </header>
    </Box>
  )
}
