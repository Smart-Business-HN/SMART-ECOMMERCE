import HeroComponent from "@/components/home/hero.component";
import BrandingComponent from "@/components/home/branding.component";
import CorporateResumeComponent from "@/components/home/corporate-resume.component";
import UbiquitiSectionComponent from "@/components/home/ubiquiti-section.component";
import UbiquitiWispSectionComponent from "@/components/home/ubiquiti-wisp-section.component";
import Hikvision from "@/components/home/hikvision.component";
import CertificatesComponent from "@/components/home/certificates.components";
import HappyHolidaysComponent from "@/components/home/happy-holidays.component";
import VentixSectionComponent from "@/components/home/ventix-section.component";

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SMART BUSINESS S. DE R.L.",
            "alternateName": "Smart Business",
            "url": "https://www.smartbusiness.site",
            "logo": "https://www.smartbusiness.site/images/corporate/logo-smart-business.png",
            "description": "Somos tu mejor opción para upgrades multi-disciplinarios de tu empresa. Proveedor líder de tecnología en Honduras especializado en redes, videovigilancia, fibra óptica y soluciones IT.",
            "foundingDate": "2020",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "HN",
              "addressRegion": "Honduras",
              "addressLocality": "San Pedro Sula"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+504-8818-7765",
              "contactType": "customer service",
              "availableLanguage": ["Spanish", "English"]
            },
            "sameAs": [
              "https://www.facebook.com/smartbusiness504",
              "https://www.instagram.com/smartbusiness504",
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Productos Tecnológicos",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Cableado Estructurado",
                    "description": "Soluciones de cableado estructurado para redes empresariales"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Sistemas CCTV",
                    "description": "Cámaras de videovigilancia y sistemas de seguridad"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Fibra Óptica",
                    "description": "Productos y servicios de fibra óptica para redes de alta velocidad"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Equipos de Red",
                    "description": "Switches, routers y equipos de red empresarial"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Ventix - ERP & POS en la nube",
                    "description": "Sistema ERP y POS en la nube para PyMEs: facturación CAI/SAR, inventario, CRM y reportes",
                    "url": "https://ventix.smartbusiness.site/"
                  }
                }
              ]
            },
            "serviceArea": {
              "@type": "Country",
              "name": "Honduras"
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "San Pedro Sula"
              },
              {
                "@type": "City",
                "name": "Tegucigalpa"
              },
              {
                "@type": "City",
                "name": "La Ceiba"
              },
              {
                "@type": "City",
                "name": "Choloma"
              }
            ],
            "knowsAbout": [
              "Cableado Estructurado",
              "Sistemas CCTV",
              "Fibra Óptica",
              "Equipos de Red",
              "Videovigilancia",
              "Ubiquiti",
              "Hikvision",
              "Mikrotik",
              "Synology",
              "Sistemas POS",
              "Backups de Energía",
              "Productos de Biometría",
              "WISP",
              "NAS Servers",
              "Ventix ERP",
              "Ventix POS",
              "ERP en la nube Honduras",
              "Facturación CAI SAR"
            ],
            "makesOffer": [
              {
                "@type": "Offer",
                "name": "Actualización de Equipo Ofimático",
                "description": "Actualización de equipo ofimático para call centers"
              },
              {
                "@type": "Offer",
                "name": "Distribución de Productos de Fibra Óptica",
                "description": "Distribución de productos de fibra óptica"
              },
              {
                "@type": "Offer",
                "name": "Actualizaciones de Redes",
                "description": "Actualizaciones o expansiones de redes empresariales"
              },
              {
                "@type": "Offer",
                "name": "Instalación de Cámaras CCTV",
                "description": "Instalación y venta de cámaras de videovigilancia"
              },
              {
                "@type": "Offer",
                "name": "Sistemas POS",
                "description": "Sistemas POS para negocios"
              },
              {
                "@type": "Offer",
                "name": "Backups de Energía UPS",
                "description": "Backups de energía vía UPS"
              },
              {
                "@type": "Offer",
                "name": "Productos de Biometría",
                "description": "Productos de biometría para seguridad"
              },
              {
                "@type": "Offer",
                "name": "Productos para WISP",
                "description": "Productos para proveedores de internet inalámbrico"
              },
              {
                "@type": "Offer",
                "name": "NAS Servers",
                "description": "Servidores NAS para almacenamiento"
              },
              {
                "@type": "Offer",
                "name": "Ventix - ERP & POS",
                "description": "Software ERP y punto de venta en la nube para PyMEs con facturación CAI/SAR, inventario y CRM",
                "url": "https://ventix.smartbusiness.site/"
              }
            ]
          })
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Smart Business - Tienda Online de Tecnología",
            "url": "https://www.smartbusiness.site",
            "description": "Tienda online líder en Honduras especializada en tecnología, redes, videovigilancia y soluciones IT. Productos originales, soporte experto y envíos a todo el país.",
            "publisher": {
              "@type": "Organization",
              "name": "SMART BUSINESS S. DE R.L."
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.smartbusiness.site/tienda/buscar?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            "inLanguage": "es-HN"
          })
        }}
      />

      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://www.smartbusiness.site/#organization",
            "name": "SMART BUSINESS S. DE R.L.",
            "image": "https://www.smartbusiness.site/images/corporate/logo-smart-business.png",
            "description": "Proveedor líder de tecnología en Honduras especializado en redes, videovigilancia, fibra óptica y soluciones IT empresariales.",
            "url": "https://www.smartbusiness.site",
            "telephone": "+504-8818-7765",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "HN",
              "addressRegion": "Honduras"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "15.5049",
              "longitude": "-88.0256"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "08:00",
              "closes": "17:00"
            },
            "priceRange": "$$",
            "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
            "currenciesAccepted": "HNL",
            "areaServed": {
              "@type": "Country",
              "name": "Honduras"
            }
          })
        }}
      />

      <HeroComponent />
      {/* <HappyHolidaysComponent/> */}
      <BrandingComponent />
      <CertificatesComponent />
      <CorporateResumeComponent />
      <UbiquitiSectionComponent />
      <UbiquitiWispSectionComponent />
      <Hikvision />
      <VentixSectionComponent />
    </>
  );
}

export const metadata = {
  title: "Smart Business | Tienda Online de Tecnología en Honduras - Redes, CCTV, Fibra Óptica",
  description: "🏢 Proveedor líder de tecnología en Honduras. Especialistas en cableado estructurado, sistemas CCTV, fibra óptica, equipos Ubiquiti, Hikvision y Mikrotik. ✅ Productos originales, soporte experto, envíos a todo el país. 📞 +504-8818-7765",
  keywords: [
    "tienda online Honduras",
    "tecnología Honduras",
    "redes empresariales",
    "videovigilancia Honduras",
    "cableado estructurado",
    "fibra óptica Honduras",
    "Ubiquiti Honduras",
    "Hikvision Honduras",
    "Mikrotik Honduras",
    "productos tecnológicos",
    "Smart Business",
    "comprar tecnología Honduras",
    "equipos de red",
    "sistemas CCTV",
    "cámaras de seguridad",
    "switches de red",
    "routers empresariales",
    "sistemas POS",
    "backups de energía",
    "productos de biometría",
    "WISP Honduras",
    "NAS servers",
    "Synology Honduras",
    "soluciones IT",
    "infraestructura de red",
    "call center Honduras",
    "actualización de equipos"
  ],
  authors: [{ name: "SMART BUSINESS S. DE R.L." }],
  creator: "SMART BUSINESS S. DE R.L.",
  publisher: "SMART BUSINESS S. DE R.L.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.smartbusiness.site"),
  alternates: {
    canonical: "https://www.smartbusiness.site/"
  },
  openGraph: {
    title: "Smart Business | Tienda Online de Tecnología en Honduras",
    description: "🏢 Proveedor líder de tecnología en Honduras. Especialistas en redes, CCTV, fibra óptica y equipos Ubiquiti, Hikvision, Mikrotik. ✅ Productos originales, soporte experto.",
    url: "https://www.smartbusiness.site/",
    siteName: "Smart Business",
    locale: "es_HN",
    type: "website",
    images: [
      {
        url: "https://www.smartbusiness.site/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Business - Tienda Online de Tecnología en Honduras - Redes, CCTV, Fibra Óptica"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Business | Tienda Online de Tecnología en Honduras",
    description: "🏢 Proveedor líder de tecnología en Honduras. Especialistas en redes, CCTV, fibra óptica y equipos Ubiquiti, Hikvision, Mikrotik.",
    site: "@smartbusinesshn",
    creator: "@smartbusinesshn",
    images: [
      {
        url: "https://www.smartbusiness.site/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Business - Tienda Online de Tecnología en Honduras"
      }
    ]
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
    'DC.title': 'Smart Business - Tienda Online de Tecnología en Honduras',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Tecnología, Redes, CCTV, Fibra Óptica, Ubiquiti, Hikvision, Mikrotik',
    'DC.description': 'Proveedor líder de tecnología en Honduras especializado en redes, videovigilancia, fibra óptica y soluciones IT empresariales',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.type': 'Website',
    'DC.format': 'text/html',
    'DC.identifier': 'https://www.smartbusiness.site/',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
    'business:contact_data:street_address': 'Honduras',
    'business:contact_data:locality': 'San Pedro Sula',
    'business:contact_data:region': 'Honduras',
    'business:contact_data:postal_code': 'Honduras',
    'business:contact_data:country_name': 'Honduras',
    'business:contact_data:phone_number': '+504-8818-7765',
    'business:contact_data:website': 'https://www.smartbusiness.site',
    'place:location:latitude': '15.5049',
    'place:location:longitude': '-88.0256',
  },
  verification: {
    google: 'S-MABBGjddcLo8_kNkNfuqVi7etsoBNnLSR-OpHJBeg',
  },
  language: "es-HN"
};
