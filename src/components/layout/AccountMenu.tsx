import { Avatar, Button, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { useNavigate } from '@tanstack/react-router'

import { ActionLink } from '@/components/ui/Action'
import { AppLink } from '@/components/ui/AppLink'
import { Icon } from '@/components/ui/Icon'
import { useToast } from '@/components/ui/toast-context'
import { useBookings } from '@/hooks/useBookings'
import { useSession, useSignOut } from '@/hooks/useSession'

export function AccountMenu() {
  const { user, isAuthenticated } = useSession()
  const signOut = useSignOut()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { data: bookings } = useBookings(user?.id)

  const activeCount = (bookings ?? []).filter((booking) => booking.status !== 'cancelled').length

  if (!isAuthenticated || !user) {
    return (
      <>
        <AppLink
          to="/signin"
          className="hidden text-body font-semibold text-fg transition-smooth-fast hover:text-accent sm:block"
        >
          Sign in
        </AppLink>
        <ActionLink to="/signup" lift>
          Sign up
        </ActionLink>
      </>
    )
  }

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleSignOut = async () => {
    await signOut.mutateAsync()
    toast({ title: 'Signed out', tone: 'info' })
    navigate({ to: '/' })
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="ghost"
          color="gray"
          radius="full"
          aria-label="Account menu"
          className="h-auto gap-2.5 py-1.5 pr-3 pl-1.5 transition-smooth-fast hover:bg-accent-soft"
        >
          <Avatar
            size="2"
            radius="full"
            fallback={initials || '?'}
            color="crimson"
            variant="solid"
            className="text-label font-bold"
          />
          <Text className="hidden text-body font-semibold text-fg sm:block">
            {user.name.split(' ')[0]}
          </Text>
          <Icon name="chevron" className="size-4 text-fg-muted" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content variant="soft" color="gray" align="end" className="min-w-56">
        <DropdownMenu.Label>
          <Text className="text-label text-fg-muted">{user.email}</Text>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <DropdownMenu.Item asChild>
          <AppLink to="/account/bookings" search={{ status: 'all' as const }}>
            <Flex align="center" gap="2" className="w-full">
              <Icon name="ticket" className="size-4" />
              My bookings
              {activeCount > 0 ? (
                <Text className="ml-auto rounded-full bg-accent px-2 py-0.5 text-eyebrow font-bold text-fg-on-accent">
                  {activeCount}
                </Text>
              ) : null}
            </Flex>
          </AppLink>
        </DropdownMenu.Item>

        <DropdownMenu.Item asChild>
          <AppLink to="/account/saved">
            <Flex align="center" gap="2" className="w-full">
              <Icon name="heart" className="size-4" />
              Saved venues
            </Flex>
          </AppLink>
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item color="crimson" onSelect={handleSignOut}>
          <Flex align="center" gap="2">
            <Icon name="logout" className="size-4" />
            Sign out
          </Flex>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
