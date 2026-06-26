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

// Pass-through: the global category sidebar/breadcrumb was removed in the redesign.
// Each store page (catalog / category / PDP / search) now owns its own layout and chrome.
export default function StoreLayout({ children }: StoreLayoutProps) {
    return <>{children}</>;
}