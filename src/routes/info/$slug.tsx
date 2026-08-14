import { createFileRoute } from '@tanstack/react-router'

import { InfoPage } from '@/features/marketing/InfoPage'
import { InfoNotFound } from '@/features/marketing/components/InfoNotFound'
import { loadInfoPage } from '@/features/marketing/loaders'

export const Route = createFileRoute('/info/$slug')({
  loader: loadInfoPage,
  component: InfoPage,
  notFoundComponent: InfoNotFound,
})
