import { useQuery } from '@tanstack/react-query'
import { AspectRatio, Grid, Skeleton } from '@radix-ui/themes'

import { AppLink } from '@/components/ui/AppLink'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HEADER_CITY } from '@/data/navigation'
import { CollectionCard } from '@/features/collections/components/CollectionCard'
import { collectionsQueryOptions } from '@/services/queries'

export function CollectionsSection() {
  const { data: collections, isPending } = useQuery(collectionsQueryOptions)

  return (
    <Section space="sm">
      <Reveal>
        <SectionHeading
          title="Curated Collections"
          description={`Handpicked venues in ${HEADER_CITY} for every occasion`}
          action={
            <AppLink
              to="/collections"
              className="text-body font-bold text-accent transition-smooth-fast hover:text-accent-hover"
            >
              View all
            </AppLink>
          }
        />
      </Reveal>

      <Grid columns={{ initial: '1', sm: '2', lg: '4' }} gap="6">
        {isPending
          ? Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="rounded-card">
                <AspectRatio ratio={3 / 4} />
              </Skeleton>
            ))
          : collections?.map((collection, index) => (
              <Reveal key={collection.id} delay={index * 80}>
                <CollectionCard collection={collection} />
              </Reveal>
            ))}
      </Grid>
    </Section>
  )
}
