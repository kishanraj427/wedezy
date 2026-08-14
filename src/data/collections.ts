import type { Collection } from '@/types'

import { IMAGES } from './images'

export const COLLECTIONS: Collection[] = [
  {
    id: 'banquet-halls',
    title: 'Top Banquet Halls',
    count: '42 venues',
    image: IMAGES.banquet,
    description: 'Chandeliers, stage lighting and space for the whole guest list.',
    venueTags: ['Banquet'],
  },
  {
    id: 'rooftop',
    title: 'Rooftop Venues',
    count: '18 venues',
    image: IMAGES.rooftop,
    description: 'Skyline backdrops for sundowners and cocktail receptions.',
    venueTags: ['Rooftop'],
  },
  {
    id: 'outdoor-lawns',
    title: 'Outdoor Lawns',
    count: '24 venues',
    image: IMAGES.lawns,
    description: 'Open-air mandaps, string lights and room to breathe.',
    venueTags: ['Outdoor'],
  },
  {
    id: 'poolside',
    title: 'Poolside Parties',
    count: '15 venues',
    image: IMAGES.poolside,
    description: 'Private villas and pool decks for smaller, louder nights.',
    venueTags: ['Private Villa', 'Loft'],
  },
]
