import { notFound } from '@tanstack/react-router'

import { INFO_PAGES, type InfoPage } from '@/data/info-pages'

export function loadInfoPage({ params }: { params: { slug: string } }): InfoPage {
  const page = INFO_PAGES[params.slug]
  if (!page) throw notFound()
  return page
}
