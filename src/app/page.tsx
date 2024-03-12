import Branding from '@/components/home/branding_component';
import CorporateResume from '@/components/home/corporate_resume_component';
import HeroComponent from '@/components/home/hero_component'
import Hikvision from '@/components/home/hikvision';
import { UbiquitiSection } from '@/components/home/ubiquiti-section';
import { UbiquitiWispSection } from '@/components/home/ubiquiti-wisp-section';
import Footer from '@/components/main-layout/foother';
import Navbar from '@/components/main-layout/navbar';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Inicio | Smart Business',
  description: 'Expertos en soluciones de seguridad: Cámaras Hikvision, redes Ubiquiti y cableado estructurado. Transforma tu espacio con la mejor tecnología CCTV y de red.',
  keywords: ['Ubiquiti','Camaras', 'Redes','Wifi Empresarial', 'Contratista CCTV','Hikvision','IT','servidores NAS'],
  icons: {
    icon: 'assets/images/favicon.ico'
  }
}

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl 3xl:max-w-screen-2xl mx-auto">
        <HeroComponent />
        <Branding />
        <CorporateResume />
        <UbiquitiSection />
        <UbiquitiWispSection />
        {/* <ProductsByCategory/> */}
        <Hikvision />
      </main>
      <Footer />
    </>
  )
}


