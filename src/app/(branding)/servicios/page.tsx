import { PhoneArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Soluciones Informáticas | SMART Business - Desarrollo Web, Cableado, VoIP, POS",
  description: "Servicios profesionales de soluciones informáticas en Honduras. Desarrollo de sitios web, UI/UX Design, cableado estructurado, telefonía IP, sistemas POS y más. Expertos en tecnología empresarial.",
  keywords: [
    "servicios informáticos",
    "desarrollo web",
    "cableado estructurado",
    "telefonía IP",
    "sistemas POS",
    "UI/UX design",
    "soluciones tecnológicas",
    "Honduras",
    "SMART Business",
    "tecnología empresarial",
    "CCTV",
    "redes empresariales",
    "UPS",
    "energía ininterrumpida"
  ],
  authors: [{ name: "SMART BUSINESS S. DE R.L." }],
  creator: "SMART BUSINESS S. DE R.L.",
  publisher: "SMART BUSINESS S. DE R.L.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.smartbusiness.site'),
  alternates: {
    canonical: '/servicios',
  },
  openGraph: {
    title: "Servicios de Soluciones Informáticas | SMART Business",
    description: "Servicios profesionales de soluciones informáticas en Honduras. Desarrollo de sitios web, UI/UX Design, cableado estructurado, telefonía IP, sistemas POS y más.",
    url: 'https://www.smartbusiness.site/servicios',
    siteName: 'SMART Business',
    images: [
      {
        url: '/images/backgrounds/building-background.jpg',
        width: 1200,
        height: 630,
        alt: 'SMART Business - Servicios de Soluciones Informáticas',
      },
    ],
    locale: 'es_HN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Servicios de Soluciones Informáticas | SMART Business",
    description: "Servicios profesionales de soluciones informáticas en Honduras. Desarrollo web, cableado, VoIP, POS y más.",
    images: ['https://www.smartbusiness.site/images/og-image.jpg'],
    creator: 'SMART BUSINESS S. DE R.L.',
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
    'geo.position': '15.199999;-86.241905',
    'ICBM': '15.199999, -86.241905',
    'DC.title': 'Servicios de Soluciones Informáticas | SMART Business',
    'DC.creator': 'SMART Business',
    'DC.subject': 'Servicios informáticos, desarrollo web, tecnología empresarial',
    'DC.description': 'Servicios profesionales de soluciones informáticas en Honduras',
    'DC.publisher': 'SMART Business',
    'DC.contributor': 'SMART Business',
    'DC.date': new Date().toISOString(),
    'DC.type': 'Service',
    'DC.format': 'text/html',
    'DC.identifier': 'https://www.smartbusiness.site/servicios',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
    'DC.rights': '© 2024 SMART Business. Todos los derechos reservados.',
  },
};

export default function Services() {
    // Datos estructurados JSON-LD para SEO
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Servicios de Soluciones Informáticas",
      "description": "Servicios profesionales de soluciones informáticas en Honduras. Desarrollo de sitios web, UI/UX Design, cableado estructurado, telefonía IP, sistemas POS y más.",
      "provider": {
        "@type": "Organization",
        "name": "SMART Business",
        "url": "https://www.smartbusiness.site",
        "logo": "https://www.smartbusiness.site/images/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "HN",
          "addressRegion": "Honduras"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+50488187765",
          "contactType": "customer service"
        }
      },
      "areaServed": {
        "@type": "Country",
        "name": "Honduras"
      },
      "serviceType": [
        "Desarrollo de Sitios Web",
        "UI/UX Design", 
        "Cableado Estructurado",
        "Telefonía IP",
        "Sistemas POS",
        "Sistemas CCTV",
        "Redes Empresariales",
        "Sistemas UPS"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Servicios Informáticos",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Desarrollo de Sitios Web",
              "description": "Desarrollo profesional de sitios web modernos y responsivos"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "UI/UX Design",
              "description": "Diseño de interfaces de usuario y experiencia de usuario"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Cableado Estructurado",
              "description": "Instalación y certificación de cableado estructurado empresarial"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Telefonía IP", 
              "description": "Implementación de sistemas de telefonía IP empresarial"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sistemas POS",
              "description": "Sistemas de punto de venta para comercios"
            }
          }
        ]
      },
      "url": "https://www.smartbusiness.site/servicios",
      "image": "https://www.smartbusiness.site/images/backgrounds/building-background.jpg",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.smartbusiness.site/servicios"
      }
    };

    return(
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
              <span className="text-blue-500 font-medium">Servicios</span>
            </li>
          </ol>
        </nav>
        
      <div className='container mx-auto'>
        <div className='grid md:grid-cols-2 gap-10 my-5'>
                      <div 
              className='bg-cover bg-center p-24 rounded-md mx-5' 
              style={{ backgroundImage: `url('/images/backgrounds/building-background.jpg')`, }}
              role="img"
              aria-label="Edificio corporativo moderno representando soluciones empresariales"
            >
          </div>
          <div className='flex flex-col justify-center md:py-24 px-5 md:px-0'>
            <h1 className='font-bold text-2xl md:text-4xl'>
              Escoge a la <strong className='text-blue-500'>MEJOR</strong> <br /> 
              empresa de Soluciones Informáticas<strong className='text-blue-500'>.</strong>
            </h1>
            <div className='border-l-2 border-blue-500 p-2 my-5 md:text-xl'>
              <p>No queremos venderte productos, no queremos venderte una instalacion.</p>
              <p>Queremos ser quien le de <strong className='font-bold text-blue-500'>solucion</strong> a tus problemas</p>
            </div>
            <div className='flex border-t'></div>
            <div className='grid md:grid-cols-2 lg:px-10 py-5'>
              <div className='flex gap-4 items-center mb-5 md:mb-0'>
                <div className='p-10 bg-gray-300 rounded'></div>
                <h3>Expertos Realizando</h3>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='p-10 bg-gray-300 rounded'></div>
                <h3>Expertos Proveyendo</h3>
              </div>
            </div>
            <div className='flex border-t'></div>
            <div className='flex flex-col sm:flex-row mt-5 gap-5'>
              <div className='grow justify-center items-center'>
              <Link 
                href='/contacto' 
                className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                aria-label="Contactar con SMART Business para servicios informáticos"
              >
                Contactar
              </Link>
              </div>
              <Link 
                href="tel:+50488187765" 
                className='flex group hover:shadow-sm justify-center items-center gap-4 border-2 p-2 rounded-md'
                aria-label="Llamar al +504 8818-7765 para consultas sobre proyectos"
              >
                <div className=' rounded-full bg-gray-400 group-hover:bg-blue-500 p-3'>
                  <PhoneArrowUpRightIcon className='text-white' height={30} width={30} />
                </div>
                <div>
                  <h6 className='text-gray-900 font-semibold'>Consulta por proyectos</h6>
                  <p>+504 8818-7765</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 px-5 md:px-0 bg-gray-50 bg-opacity-60 py-10 object-fit' style={{ backgroundImage: `url('/images/backgrounds/pattern-9.png')`, }}>
        <h2 className='font-bold text-center text-3xl' id="nuestros-servicios">Nuestros Servicios</h2>
        <div className='pt-1 flex border-t-2 border-blue-400 w-[5%] ml-[50%] -translate-x-[50%]'></div>
        <p className='text-center text-2xl'>Tenemos una variedad de servicios a tu disposición</p>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-16 lg:gap-5 mt-28 container mx-auto' aria-labelledby="nuestros-servicios">
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-light-blue-400 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='Icono de desarrollo de sitios web' className='-rotate-45 brightness-0 invert' src="/images/icons/web-pages.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Desarrollo de Sitios Web</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-light-blue-400 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='Icono de diseño UI/UX' className='-rotate-45 brightness-0 invert' src="/images/icons/project-management.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>UI/UX Design</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-light-blue-400 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='Icono de cableado estructurado' className='-rotate-45 brightness-0 invert' src="/images/icons/cabling.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Cableado Estructurado</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-light-blue-400 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='Icono de telefonía IP' className='-rotate-45 brightness-0 invert' src="/images/icons/voip.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Telefonía IP</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sueños, hoy en dia un negocio sin sitio web es inconcebible.
            </p>
          </div>
          <div className='shadow-xl p-4 rounded-tl-[100px] rounded-b-md rounded-tr-md relative bg-white'>
            <div className='bg-gradient-to-bl from-light-blue-400 via-blue-500 to-blue-700 rounded-xl absolute left-[50%] -translate-x-[50%] -top-10 rotate-45 shadow-md shadow-gray-400'>
              <Image alt='Icono de sistemas POS' className='-rotate-45 brightness-0 invert' src="/images/icons/certificate.png" width={100} height={100} />
            </div>
            <h5 className='mt-20 text-center text-xl font-bold'>Sistemas POS</h5>
            <p className='mt-2  text-center text-gray-500 text-lg'>
              Traemos a la realidad tus sue;os, hoy en dia un negocio sin sitio web es incenvible.
            </p>
          </div>
        </section>
      </div>
      <div className='pt-48 relative pb-10 bg-opacity-10 bg-gray-50 bg-cover' >
        <div className='absolute md:w-72 md:h-72 w-48 h-48 animate-blob rounded-full bg-blue-200 blur-xl top-[15%] left-24 mix-blend-multiply'></div>
        <div className='absolute md:w-72 md:h-72 w-48 h-48 animate-blob rounded-full bg-blue-400 opacity-70 blur-xl top-[40%] md:-right-4 right-0 mix-blend-multiply'></div>
        <h2 className='font-bold text-center text-5xl' id="smart-solutions">Si quieres triunfar tienes que ser<br /> <strong className='text-blue-500'>SMART</strong></h2>
      <div className='pt-1 flex border-t-2 border-blue-400 w-[5%] ml-[50%] -translate-x-[50%]'></div>
        <div className='container relative mx-auto'>
          <div className='grid md:grid-cols-2 mt-10 items-start justify-start'>
            <div className='px-4 md:px-0'>
              <h4 className='flex text-3xl font-semibold text-gray-900'>Cuida a los tuyos</h4>
              <div className='border-t-2 border-blue-500 w-[5%] mb-5'></div>
              <p>Sabemos que eres responsable con los tuyos y que quieres lo mejor para ellos</p>
              <p>Por eso te brindamos:</p>
              <ul className=' text-gray-700'>
                <li>-Instalación de sistemas de circuito cerrado CCTV.</li>
                <li>-Instalación de sistemas de control de acceso biometrico.</li>
                <li>-Planificación de sistemas de control térmico para plantas químicas.</li>
              </ul>
              <p className='font-bold mt-5 text-gray-700'>Con la mejor tecnología al mejor precio</p>
              <div className='flex p-4'>
                <div>
                  <Image src='/images/corporate/Hikvision_logo_smart_business.png' width={200} height={100} alt='Logo de Hikvision - Sistemas de seguridad CCTV' />
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center md:justify-end'>
              <Image className='rounded-md shadow-sm' src='/images/corporate/cctv-room.jpg' width={600} height={400} alt='Sala de monitoreo CCTV con pantallas de seguridad' />
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-10 mt-48 items-start justify-start'>
            <video className='w-full rounded-xl mb-2 md:mb-0' autoPlay muted loop>
                    <source src='/videos/fast-network.mp4' type="video/mp4" />
            </video>
            <div className='grid  container px-4 md:px-0'>
              <div className=''>
                <h4 className='flex text-3xl font-semibold text-gray-900'>Tu red debe ser la mejor</h4>
                <div className='border-t-2 border-blue-500 w-[5%] mb-5'></div>
                <p>No dejes que una mala red atrase a tus colaboradores y tu negocio</p>
                <p>Lo que podemos hacer por ti:</p>
                <ul className=' text-gray-700'>
                  <li>-Certificación de red.</li>
                  <li>-Instalación de puntos de red empresarial.</li>
                  <li>-Reestructuración de redes.</li>
                </ul>
                <p className='font-bold mt-5 text-gray-700'>Solamente con materiales de calidad</p>
                <div className='flex gap-5 items-center pt-4'>
                  <div>
                    <Image src='/images/corporate/unifi-icon-smart-business.png' width={40} height={40} alt='Logo de Ubiquiti - Soluciones de red empresarial' />
                  </div>
                  <div>
                    <Image src='/images/corporate/mikrotik-logo.png' width={200} height={100} alt='Logo de MikroTik - Equipos de red y enrutadores' />
                  </div>
                  
                  <div>
                    <Image src='/images/corporate/belden_logo.png' width={120} height={40} alt='Logo de Belden - Cableado de alta calidad' />
                  </div>
                  <div>
                    <Image src='/images/corporate/legrand-logo.png' width={150} height={40} alt='Logo de Legrand - Soluciones de infraestructura eléctrica' />
                  </div>
                  <div>
                    <Image src='/images/corporate/tp-link.png' width={100} height={40} alt='Logo de TP-Link - Equipos de red y conectividad' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container mt-48 mx-auto py-5'>
            <h3 className='font-semibold text-4xl text-gray-700 text-center'>Te brindamos lo mas practico para tu red</h3>
            <h4 className='font-semibold text-2xl text-gray-500 text-center'>Switches FULL-POE</h4>
            <video className='container mx-auto rounded-xl mt-24 md:mb-0' autoPlay muted loop>
                    <source src='/videos/switch-poe.mp4' type="video/mp4" />
            </video>
          </div>
          <div className='container mt-24 mx-auto p-5'>
            <h3 className='font-semibold text-3xl text-gray-700 text-center'>Protege tu Equipo</h3>
            <h4 className='font-semibold text-2xl text-gray-500 text-center'>Sistemas de Energía Ininterrumpida</h4>
              <div className='grid md:grid-cols-2 mt-24 gap-10'>
                <div>
                  <h4 className='flex text-3xl font-semibold text-gray-900'>Sistemas de energía ininterrumpida</h4>
                  <div className='border-t-2 border-blue-500 w-[5%] mb-5'></div>
                  <p>Prevenir es mejor que lamentar cuida el equipo de tu hogar u empresa con marcas avaladas por años de experiencia.</p>
                  <p>Te brindamos soporte para:</p>
                  <ul className=' text-gray-700'>
                    <li>-Equipo de oficina.</li>
                    <li>-Data Centers de nivel corporativo.</li>
                    <li>-Estudio de necesidades energéticas.</li>
                  </ul>
                </div>
              <div className='flex items-center justify-center md:justify-end'>
                <Image className='rounded-md shadow-sm' src='/images/backgrounds/apc-background.jpg' width={600} height={400} alt='Sistemas UPS APC - Energía ininterrumpida para equipos críticos' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    );
}