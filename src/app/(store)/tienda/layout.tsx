import CategoryTree from "@/components/store/category-tree.component";
import Breadcrumb from "@/components/store/breadcrumb.component";
import ProductPageLayout from "@/components/store/product-page-layout.component";
import { Metadata } from 'next';

interface StoreLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Tienda | SMART BUSINESS - Cableado Estructurado, CCTV, Fibra Óptica y Soluciones Tecnológicas',
  description: 'Explora nuestra tienda especializada en cableado estructurado, sistemas CCTV, fibra óptica, equipos de red y soluciones tecnológicas integrales. Productos de alta calidad para proyectos de infraestructura en Honduras.',
  keywords: [
    'cableado estructurado',
    'sistemas CCTV',
    'fibra óptica',
    'equipos de red',
    'soluciones tecnológicas',
    'infraestructura de red',
    'cámaras de seguridad',
    'cableado de red',
    'equipos de telecomunicaciones',
    'SMART BUSINESS',
    'tecnología Honduras',
    'equipos de monitoreo',
    'cableado de datos',
    'sistemas de vigilancia',
    'equipos de fibra óptica'
  ],
  authors: [{ name: 'SMART BUSINESS S. DE R.L.' }],
  creator: 'SMART BUSINESS S. DE R.L.',
  publisher: 'SMART BUSINESS S. DE R.L.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://smartbusiness.site'),
  alternates: {
    canonical: '/tienda',
  },
  openGraph: {
    title: 'Tienda | SMART BUSINESS - Soluciones Tecnológicas',
    description: 'Cableado estructurado, CCTV, fibra óptica y equipos de red. Soluciones tecnológicas integrales en Honduras.',
    url: 'https://smartbusiness.site/tienda',
    siteName: 'SMART BUSINESS',
    locale: 'es_HN',
    type: 'website',
    images: [
      {
        url: 'https://www.smartbusiness.site/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tienda SMART BUSINESS - Soluciones Tecnológicas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tienda | SMART BUSINESS - Soluciones Tecnológicas',
    description: 'Cableado estructurado, CCTV, fibra óptica y equipos de red.',
    images: ['https://www.smartbusiness.site/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
  classification: 'electronics store',
  other: {
    'geo.region': 'HN',
    'geo.placename': 'Honduras',
    'DC.title': 'Tienda SMART BUSINESS',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Cableado Estructurado, CCTV, Fibra Óptica, Equipos de Red',
    'DC.description': 'Tienda especializada en soluciones tecnológicas y equipos de infraestructura',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.type': 'Collection',
    'DC.format': 'text/html',
    'DC.identifier': 'https://smartbusiness.site/tienda',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
  },
};

export default function StoreLayout({ children }: StoreLayoutProps) {
    return (
        <div className='w-full md:mx-auto max-w-screen-2xl py-5 container px-4'>
            <ProductPageLayout />
            <Breadcrumb />
            <div className='w-full grid gap-5 pt-5 grid-cols-4' id='left-sidebar'>
                    <div className='hidden md:block col-span-1 product-page-sidebar'>
                        <div className='p-4 bg-fixed' style={{ backgroundImage: `url('/images/backgrounds/categories-bg.jpg')`, }}>
                            <h2 className='font-semibold text-gray-900 text-xl mb-3'>Categorias</h2>
                            <hr className='w-[20%] -mb-1 border-[#1C68E1] border'></hr>
                            <hr className='mt-1 mb-5'></hr>
                                <CategoryTree/>
                        </div>
                    </div>
                    <div className='col-span-3 product-page-content'>
                        {children}
                    </div>
            </div>
        </div>
    );
}