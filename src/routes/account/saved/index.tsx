import { createFileRoute } from '@tanstack/react-router'

import { SavedVenuesPage } from '@/features/account/SavedVenuesPage'
import { requireSession } from '@/lib/guards'

export const Route = createFileRoute('/account/saved/')({
  beforeLoad: ({ context: { queryClient } }) => requireSession(queryClient, '/account/saved'),
  component: SavedVenuesPage,
})
