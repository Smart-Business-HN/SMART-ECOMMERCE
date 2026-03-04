//@ts-nocheck
import {
  ChatBubbleLeftRightIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Metadata } from 'next';
import { Card, Typography } from '@/utils/MTailwind';
import ContactForm from '@/components/contact/contact-form.component';
import SolutionCard from '@/components/contact/solution-card.component';
import ContactMethodCard from '@/components/contact/contact-method-card.component';

export const metadata: Metadata = {
  title: 'Contacto | SMART Business Honduras - Soluciones Informáticas y Soporte Técnico',
  description: 'Contáctanos para soluciones en CCTV, cableado estructurado y equipos de oficina. Estamos disponibles de lunes a sábado para atenderte. Llámanos al +504 8818-7765. Soporte técnico especializado en Honduras.',
  keywords: [
    'contacto SMART Business',
    'SMART Business Honduras',
    'CCTV Honduras',
    'cableado estructurado',
    'equipos de oficina',
    'Honduras',
    'Tegucigalpa',
    'soporte técnico',
    'atención al cliente',
    'teléfono contacto',
    'WhatsApp SMART Business',
    'Facebook SMART Business',
    'Instagram SMART Business',
    'horarios atención',
    'cotización proyectos',
    'asesoría técnica'
  ],
  authors: [{ name: "SMART Business" }],
  creator: "SMART Business",
  publisher: "SMART Business",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.smartbusiness.site'),
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: 'Contacto | SMART Business Honduras',
    description: 'Contáctanos para soluciones en CCTV, cableado estructurado y equipos de oficina. Estamos disponibles de lunes a sábado para atenderte.',
    url: 'https://www.smartbusiness.site/contacto',
    siteName: 'SMART Business',
    images: [
      {
        url: '/images/backgrounds/computadora-dell-y-plano.jpg',
        width: 1200,
        height: 630,
        alt: 'SMART Business Honduras - Página de contacto y soporte técnico',
      },
    ],
    locale: 'es_HN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | SMART Business Honduras',
    description: 'Contáctanos para soluciones en CCTV, cableado estructurado y equipos de oficina. Estamos disponibles de lunes a sábado para atenderte.',
    images: ['/images/backgrounds/computadora-dell-y-plano.jpg'],
    creator: '@smartbusiness',
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
  classification: 'business',
  other: {
    'geo.region': 'HN',
    'geo.placename': 'Honduras',
    'DC.title': 'Contacto | SMART Business Honduras',
    'DC.creator': 'SMART Business',
    'DC.subject': 'Contacto, soporte técnico, soluciones informáticas, Honduras',
    'DC.description': 'Contáctanos para soluciones en CCTV, cableado estructurado y equipos de oficina',
    'DC.publisher': 'SMART Business',
    'DC.contributor': 'SMART Business',
    'DC.date': new Date().toISOString(),
    'DC.type': 'ContactPage',
    'DC.format': 'text/html',
    'DC.identifier': 'https://www.smartbusiness.site/contacto',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
    'DC.rights': '© 2024 SMART Business. Todos los derechos reservados.',
  },
};

export default function Contact() {
  // Datos estructurados JSON-LD para SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contacto SMART Business Honduras",
    "description": "Página de contacto para soluciones informáticas en Honduras. CCTV, cableado estructurado y equipos de oficina.",
    "url": "https://www.smartbusiness.site/contacto",
    "mainEntity": {
      "@type": "Organization",
      "name": "SMART Business",
      "alternateName": "SMART Business Honduras",
      "url": "https://www.smartbusiness.site",
      "logo": "https://www.smartbusiness.site/images/corporate/logo-smart-business.png",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+50488187765",
          "contactType": "customer service",
          "areaServed": "HN",
          "availableLanguage": "Spanish",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "17:00"
          }
        },
        {
          "@type": "ContactPoint",
          "telephone": "+50488187765",
          "contactType": "customer service",
          "areaServed": "HN",
          "availableLanguage": "Spanish",
          "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "08:00",
            "closes": "12:00"
          }
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "HN",
        "addressRegion": "Honduras"
      },
      "sameAs": [
        "https://www.facebook.com/SmartBusiness504",
        "https://www.instagram.com/smartbusiness504/"
      ]
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catálogo de Soluciones",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sistemas CCTV",
            "description": "Productos y accesorios para proyectos CCTV y seguridad"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cableado Estructurado",
            "description": "Marcas líderes para redes corporativas"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Equipos de Oficina",
            "description": "Último equipo ofimático para expansión de oficinas"
          }
        }
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.smartbusiness.site/contacto"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb para SEO */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-5 py-2">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link href="/" className="hover:text-blue-500" aria-label="Ir al inicio">
              Inicio
            </Link>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li aria-current="page">
            <span className="text-blue-500 font-medium">Contacto</span>
          </li>
        </ol>
      </nav>

      {/* Hero Section - Rediseñada */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-24">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/map_contact.png')]
                        bg-center bg-cover opacity-10"></div>
        <div className="container mx-auto px-5 relative z-10">
          <div className="text-center animate-fade-in">
            <Typography variant="h1" className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4" placeholder={undefined}>
              Estamos aquí para ayudarte
            </Typography>
            <Typography className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto" placeholder={undefined}>
              Cuéntanos sobre tu proyecto y te brindaremos la mejor solución en
              CCTV, cableado estructurado y equipos de oficina
            </Typography>
          </div>

          {/* Cards de contacto rápido */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                             hover:bg-white/20 transition-all animate-fade-up animate-delay-100" placeholder={undefined}>
              <PhoneIcon className="h-8 w-8 text-white mb-2" />
              <Typography className="text-white font-semibold" placeholder={undefined}>Llámanos</Typography>
              <Typography className="text-blue-100 text-sm" placeholder={undefined}>+504 8818-7765</Typography>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                             hover:bg-white/20 transition-all animate-fade-up animate-delay-200" placeholder={undefined}>
              <EnvelopeIcon className="h-8 w-8 text-white mb-2" />
              <Typography className="text-white font-semibold" placeholder={undefined}>Email</Typography>
              <Typography className="text-blue-100 text-sm" placeholder={undefined}>consultas@smartbusiness.site</Typography>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                             hover:bg-white/20 transition-all animate-fade-up animate-delay-300" placeholder={undefined}>
              <ClockIcon className="h-8 w-8 text-white mb-2" />
              <Typography className="text-white font-semibold" placeholder={undefined}>Horario</Typography>
              <Typography className="text-blue-100 text-sm" placeholder={undefined}>Lun-Vie 8:00-17:00</Typography>
            </Card>
          </div>
        </div>
      </div>

      {/* Sección Principal - Formulario + Soluciones */}
      <div className="container mx-auto px-5 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Columna 1: Formulario de Contacto */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-gray-800 mb-2" placeholder={undefined}>
                Envíanos un mensaje
              </Typography>
              <Typography className="text-gray-600 mb-6" placeholder={undefined}>
                Completa el formulario y te responderemos en menos de 24 horas
              </Typography>

              <Card className="shadow-2xl border-0 p-6 md:p-8 bg-white" placeholder={undefined}>
                <ContactForm />
              </Card>
            </div>
          </div>

          {/* Columna 2: Nuestras Soluciones */}
          <div className="order-2 lg:order-1">
            <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-gray-800 mb-2" placeholder={undefined}>
              Nuestras Soluciones
            </Typography>
            <Typography className="text-gray-600 mb-8" placeholder={undefined}>
              Especialistas en tecnología para tu negocio
            </Typography>

            <div className="space-y-6">
              <SolutionCard
                title="Sistemas CCTV"
                description="Productos y accesorios para proyectos de videovigilancia y seguridad"
                icon="/images/icons/cctv-icon.svg"
                iconAlt="Icono de sistemas CCTV"
                tags={["Cámaras", "NVR/DVR", "Accesorios"]}
              />

              <SolutionCard
                title="Cableado Estructurado"
                description="Somos proveedores de marcas líderes a nivel mundial para llevar tu red corporativa a niveles que nunca imaginaste"
                icon="/images/icons/cabling.png"
                iconAlt="Icono de cableado estructurado"
                tags={["Cable UTP", "Switches", "APs", "Proyectos"]}
              />

              <SolutionCard
                title="Equipos de Oficina"
                description="Te brindamos lo último en equipo ofimático para la expansión de tu oficina a precios incomparables"
                icon="/images/icons/servers.png"
                iconAlt="Icono de equipos de oficina"
                tags={["UPS", "Monitores", "POS"]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Horarios y Contactos - Rediseñada */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Horarios */}
            <div>
              <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center" placeholder={undefined}>
                Horarios de Atención
              </Typography>
              <Card className="p-8 shadow-lg border-0" placeholder={undefined}>
                <div className="space-y-3">
                  {[
                    { day: 'Lunes - Viernes', hours: '8:00 AM - 5:00 PM' },
                    { day: 'Sábado', hours: '8:00 AM - 12:00 PM' },
                    { day: 'Domingo', hours: 'Cerrado' }
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4
                                 bg-gray-50 rounded-lg hover:bg-blue-50
                                 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ClockIcon className="h-5 w-5 text-blue-600" />
                        <Typography className="font-semibold text-gray-800" placeholder={undefined}>
                          {schedule.day}
                        </Typography>
                      </div>
                      <Typography className="text-gray-600" placeholder={undefined}>
                        {schedule.hours}
                      </Typography>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Canales de Contacto */}
            <div>
              <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center" placeholder={undefined}>
                Canales de Contacto
              </Typography>
              <div className="space-y-4">
                <ContactMethodCard
                  title="WhatsApp"
                  subtitle="+504 8818-7765"
                  href="https://api.whatsapp.com/send?phone=+50488187765&text=Deseo%20contactarme%20con%20un%20asesor%20de%20ventas"
                  icon={<ChatBubbleLeftRightIcon className="h-7 w-7 text-white" />}
                  gradientFrom="from-green-500"
                  gradientTo="to-green-600"
                />

                <ContactMethodCard
                  title="Teléfono"
                  subtitle="+504 8818-7765"
                  href="tel:+50488187765"
                  icon={<PhoneIcon className="h-7 w-7 text-white" />}
                  gradientFrom="from-blue-500"
                  gradientTo="to-blue-600"
                />

                <ContactMethodCard
                  title="Facebook"
                  subtitle="@SmartBusiness504"
                  href="https://www.facebook.com/SmartBusiness504"
                  icon={
                    <svg className='h-7 w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" fill="white">
                      <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h10v-9h-3v-3h3v-1.611c0-3.05,1.486-4.389,4.021-4.389 c1.214,0,1.856,0.09,2.16,0.131v2.869h-1.729c-1.076,0-1.452,0.568-1.452,1.718V13h3.154l-0.428,3h-2.726v9h5 c1.105,0,2-0.895,2-2V6C26,4.895,25.104,4,24,4z"></path>
                    </svg>
                  }
                  gradientFrom="from-blue-600"
                  gradientTo="to-blue-700"
                />

                <ContactMethodCard
                  title="Instagram"
                  subtitle="@smartbusiness504"
                  href="https://www.instagram.com/smartbusiness504/"
                  icon={
                    <svg className='h-7 w-7' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="white">
                      <path d="M 21.580078 7 C 13.541078 7 7 13.544094 7 21.584 L 7 42.417969 C 7 50.457969 13.544094 57.001953 21.584 57.001953 L 42.417969 57.001953 C 50.457969 57.001953 57.001953 50.457969 57.001953 42.417969 L 57.001953 21.584 C 57.001953 13.544 50.457969 7 42.417969 7 L 21.580078 7 z M 47 15 C 48.104 15 49 15.896 49 17 C 49 18.104 48.104 19 47 19 C 45.896 19 45 18.104 45 17 C 45 15.896 45.896 15 47 15 z M 32 19 C 39.17 19 45 24.83 45 32 C 45 39.17 39.169 45 32 45 C 24.83 45 19 39.169 19 32 C 19 24.831 24.83 19 32 19 z M 32 23 C 26.971 23 23 26.971 23 32 C 23 37.029 26.971 41 32 41 C 37.029 41 41 37.029 41 32 C 41 26.971 37.029 23 32 23 z"></path>
                    </svg>
                  }
                  gradientFrom="from-purple-500"
                  gradientTo="to-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
