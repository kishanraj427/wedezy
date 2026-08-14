import { createFileRoute } from '@tanstack/react-router'

import { ListYourVenuePage } from '@/features/marketing/ListYourVenuePage'

export const Route = createFileRoute('/list-your-venue/')({
  component: ListYourVenuePage,
})
