import { createFileRoute } from '@tanstack/react-router'

import { CollectionsPage } from '@/features/collections/CollectionsPage'
import { loadCollections } from '@/features/collections/loaders'

export const Route = createFileRoute('/collections/')({
  loader: loadCollections,
  component: CollectionsPage,
})
