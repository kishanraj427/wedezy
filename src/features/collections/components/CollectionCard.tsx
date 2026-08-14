import { AspectRatio, Box, Flex, Heading, Text } from '@radix-ui/themes'

import { AppLink } from '@/components/ui/AppLink'
import { Image } from '@/components/ui/Image'
import type { Collection } from '@/types'

interface CollectionCardProps {
  collection: Collection
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <AppLink
      to="/collections/$collectionId"
      params={{ collectionId: collection.id }}
      className="group relative block overflow-hidden rounded-card shadow-card"
    >
      <AspectRatio ratio={3 / 4}>
        <Image
          src={collection.image}
          alt={collection.title}
          className="media-zoom group-hover:scale-105"
        />
      </AspectRatio>

      <Flex direction="column" justify="end" className="absolute inset-0 scrim-card p-5">
        <Box>
          <Heading as="h3" className="text-h3 font-extrabold text-fg-on-scrim">
            {collection.title}
          </Heading>
          <Text as="p" className="mt-1.5 text-body-sm font-medium text-fg-on-scrim/80">
            {collection.count}
          </Text>
        </Box>
      </Flex>
    </AppLink>
  )
}
