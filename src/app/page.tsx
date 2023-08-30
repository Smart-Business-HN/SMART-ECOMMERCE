import CategoriesComponent from '@/components/home/categories_component'
import HeroComponent from '@/components/home/hero_component'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <main className="w-full justify-center  min-h-screen">
        <HeroComponent/>
        <CategoriesComponent/>
    </main>
  )
}
