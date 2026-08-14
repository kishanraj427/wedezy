import { CategoryRail } from './components/CategoryRail'
import { CollectionsSection } from './components/CollectionsSection'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { PopularVenues } from './components/PopularVenues'

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoryRail />
      <CollectionsSection />
      <PopularVenues />
      <HowItWorks />
    </>
  )
}
