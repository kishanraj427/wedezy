import { createFileRoute } from '@tanstack/react-router'

import { CollectionDetailPage } from '@/features/collections/CollectionDetailPage'
import { CollectionNotFound } from '@/features/collections/components/CollectionNotFound'
import { loadCollectionDetail } from '@/features/collections/loaders'

export const Route = createFileRoute('/collections/$collectionId')({
  loader: loadCollectionDetail,
  component: CollectionDetailPage,
  notFoundComponent: CollectionNotFound,
})
