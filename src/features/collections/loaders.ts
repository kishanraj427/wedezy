import type { QueryClient } from '@tanstack/react-query'
import { notFound } from '@tanstack/react-router'

import {
  collectionQueryOptions,
  collectionsQueryOptions,
  venuesQueryOptions,
} from '@/services/queries'

export const loadCollections = ({ context }: { context: { queryClient: QueryClient } }) =>
  context.queryClient.ensureQueryData(collectionsQueryOptions)

export async function loadCollectionDetail({
  context: { queryClient },
  params,
}: {
  context: { queryClient: QueryClient }
  params: { collectionId: string }
}) {
  const collection = await queryClient.ensureQueryData(collectionQueryOptions(params.collectionId))
  if (!collection) throw notFound()

  await queryClient.ensureQueryData(venuesQueryOptions)
}
