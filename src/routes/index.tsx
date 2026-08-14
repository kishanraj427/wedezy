import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '@/features/home/HomePage'
import { loadCollections } from '@/features/collections/loaders'
import { loadVenueList } from '@/features/venues/loaders'

export const Route = createFileRoute('/')({
  loader: async (context) => {
    await Promise.all([loadVenueList(context), loadCollections(context)])
  },
  component: HomePage,
})
