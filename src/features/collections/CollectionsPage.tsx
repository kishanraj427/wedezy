import { useSuspenseQuery } from '@tanstack/react-query'
import { Grid } from '@radix-ui/themes'

import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { collectionsQueryOptions } from '@/services/queries'

import { CollectionCard } from './components/CollectionCard'

export function CollectionsPage() {
  const { data: collections } = useSuspenseQuery(collectionsQueryOptions)

  return (
    <Section>
      <PageHeader
        title="Curated Collections"
        description="Shortlists we keep up to date, grouped by the kind of room you need."
        className="mb-9"
      />

      <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </Grid>
    </Section>
  )
}
