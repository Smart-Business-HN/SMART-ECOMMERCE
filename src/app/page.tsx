import HeroComponent from '@/components/home/hero_component'
import Hikvision from '@/components/home/hikvision';
import ProductsByCategory from '@/components/home/products_by_category';
import { UbiquitiSection } from '@/components/home/ubiquiti-section';
import { UbiquitiWispSection } from '@/components/home/ubiquiti-wisp-section';

export default async function Home() {
  
  return (
    <main className="w-full max-w-7xl mx-auto">
        <HeroComponent/>
        <ProductsByCategory/>
        <UbiquitiSection/>
        <UbiquitiWispSection/>
        <Hikvision/>
    </main>
  )
}


