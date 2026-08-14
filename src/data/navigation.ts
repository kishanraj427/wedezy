export const HEADER_CITY = 'Mumbai'

export const FOOTER_CITIES = ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Hyderabad'] as const

export interface InfoLink {
  label: string
  slug: string
}

export const FOOTER_COMPANY: InfoLink[] = [
  { label: 'About us', slug: 'about' },
  { label: 'Careers', slug: 'careers' },
  { label: 'Blog', slug: 'blog' },
  { label: 'Contact', slug: 'contact' },
]

export const FOOTER_FOR_VENUES: InfoLink[] = [
  { label: 'Partner portal', slug: 'partner-portal' },
  { label: 'Help center', slug: 'help-center' },
]

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Search your city',
    description: 'Pick your location, date and event type.',
  },
  {
    step: 2,
    title: 'Compare venues',
    description: 'Browse photos, prices, ratings and amenities.',
  },
  {
    step: 3,
    title: 'Book with ease',
    description: 'Contact the venue and confirm your booking online.',
  },
]
