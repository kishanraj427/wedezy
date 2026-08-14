import { Flex } from '@radix-ui/themes'

import { AppLink } from '@/components/ui/AppLink'
import { cn } from '@/lib/cn'

const TAB =
  'rounded-full px-5 py-2.5 text-body font-bold text-fg-muted transition-smooth hover:text-fg data-[status=active]:bg-sheet data-[status=active]:text-fg data-[status=active]:shadow-subtle'

export function AccountTabs({ className }: { className?: string }) {
  return (
    <Flex
      gap="1"
      className={cn('w-fit rounded-full border border-border bg-canvas-sunken p-1', className)}
    >
      <AppLink to="/account/bookings" search={{ status: 'all' as const }} className={TAB}>
        Bookings
      </AppLink>
      <AppLink to="/account/saved" className={TAB}>
        Saved venues
      </AppLink>
    </Flex>
  )
}
