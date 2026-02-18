//@ts-nocheck
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, Typography, Button } from '@/utils/MTailwind';
import {
  PhoneArrowUpRightIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  WifiIcon,
  PhoneIcon,
  ShoppingCartIcon,
  ShieldCheckIcon,
  SignalIcon,
  BoltIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";

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

    const services = [
      {
        icon: CodeBracketIcon,
        title: "Desarrollo de Sitios Web",
        description: "Traemos a la realidad tus sueños. Hoy en día, un negocio sin sitio web es inconcebible. Sitios modernos, responsivos y optimizados.",
        gradient: "from-blue-500 to-blue-700"
      },
      {
        icon: PaintBrushIcon,
        title: "UI/UX Design",
        description: "Diseñamos experiencias digitales intuitivas y atractivas. Interfaces que conectan con tus usuarios y potencian tu marca.",
        gradient: "from-purple-500 to-purple-700"
      },
      {
        icon: WifiIcon,
        title: "Cableado Estructurado",
        description: "Instalación profesional de infraestructura de red. Certificación de cableado Cat6/Cat6a para redes de alto rendimiento.",
        gradient: "from-green-500 to-green-700"
      },
      {
        icon: PhoneIcon,
        title: "Telefonía IP",
        description: "Sistemas de comunicación empresarial modernos. VoIP de última generación para optimizar tus comunicaciones.",
        gradient: "from-orange-500 to-orange-700"
      },
      {
        icon: ShoppingCartIcon,
        title: "Sistemas POS",
        description: "Soluciones de punto de venta integradas. Control total de tu comercio con tecnología confiable y fácil de usar.",
        gradient: "from-pink-500 to-pink-700"
      }
    ];

    const whyChooseUs = [
      {
        icon: UserGroupIcon,
        title: "Expertos Certificados",
        description: "Personal altamente calificado con años de experiencia"
      },
      {
        icon: CheckCircleIcon,
        title: "Calidad Garantizada",
        description: "Productos y servicios de las mejores marcas del mercado"
      },
      {
        icon: ClockIcon,
        title: "Soporte 24/7",
        description: "Asistencia técnica cuando la necesites"
      }
    ];

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

        {/* Hero Section Moderno */}
        <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/backgrounds/building-background.jpg')]
                          bg-center bg-cover opacity-15"></div>

          <div className="container mx-auto px-5 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white animate-fade-right">
                <Typography variant="h1" className="text-5xl md:text-6xl font-bold mb-6"
                            placeholder={undefined}>
                  Escoge a la <span className="text-blue-200">MEJOR</span><br />
                  Empresa de Soluciones Informáticas
                </Typography>

                <div className="bg-white/10 backdrop-blur-lg border-l-4 border-blue-300 p-6 rounded-lg mb-8">
                  <Typography className="text-blue-50 text-lg mb-3" placeholder={undefined}>
                    No queremos venderte productos, no queremos venderte una instalación.
                  </Typography>
                  <Typography className="text-white text-xl font-semibold" placeholder={undefined}>
                    Queremos ser quien le dé <span className="text-blue-200">solución</span> a tus problemas
                  </Typography>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50
                               shadow-xl hover:shadow-2xl transition-all"
                    placeholder={undefined}
                  >
                    <Link href="/contacto">
                      Contactar Ahora
                    </Link>
                  </Button>

                  <Link
                    href="tel:+50488187765"
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-lg
                               border-2 border-white/30 hover:bg-white/20 px-6 py-3 rounded-lg
                               transition-all group"
                  >
                    <div className="bg-blue-500 group-hover:bg-blue-400 p-2 rounded-full transition-colors">
                      <PhoneArrowUpRightIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-left">
                      <Typography className="text-white text-sm font-semibold" placeholder={undefined}>
                        Consulta por proyectos
                      </Typography>
                      <Typography className="text-blue-100 text-sm" placeholder={undefined}>
                        +504 8818-7765
                      </Typography>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 gap-4 animate-fade-left">
                {whyChooseUs.map((item, index) => (
                  <Card key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                                                hover:bg-white/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center
                                      flex-shrink-0">
                        <item.icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <Typography variant="h6" className="text-white font-bold mb-1"
                                    placeholder={undefined}>
                          {item.title}
                        </Typography>
                        <Typography className="text-blue-100 text-sm" placeholder={undefined}>
                          {item.description}
                        </Typography>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Nuestros Servicios */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-5">
            <div className="text-center mb-12">
              <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                          placeholder={undefined} id="nuestros-servicios">
                Nuestros Servicios
              </Typography>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              <Typography className="text-gray-600 text-xl max-w-2xl mx-auto" placeholder={undefined}>
                Tenemos una variedad de servicios profesionales a tu disposición
              </Typography>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <Card key={index} className={`overflow-hidden border-0 shadow-xl hover:shadow-2xl
                                               hover:-translate-y-2 transition-all duration-300
                                               animate-fade-up animate-delay-${(index + 1) * 100}`}>
                  <div className={`bg-gradient-to-br ${service.gradient} p-8`}>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-xl
                                    flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <Typography variant="h5" className="font-bold text-gray-800 mb-3 text-center"
                                placeholder={undefined}>
                      {service.title}
                    </Typography>
                    <Typography className="text-gray-600 text-sm leading-relaxed text-center"
                                placeholder={undefined}>
                      {service.description}
                    </Typography>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Seguridad CCTV */}
        <div className="container mx-auto px-5 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-right">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg
                                  flex items-center justify-center">
                    <ShieldCheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <Typography variant="h2" className="text-3xl font-bold text-gray-800"
                              placeholder={undefined}>
                    Cuida a los Tuyos
                  </Typography>
                </div>
                <div className="w-20 h-1 bg-blue-600 mb-6"></div>

                <Typography className="text-gray-600 text-lg mb-4" placeholder={undefined}>
                  Sabemos que eres responsable con los tuyos y que quieres lo mejor para ellos.
                </Typography>

                <Typography className="text-gray-700 font-semibold mb-4" placeholder={undefined}>
                  Por eso te brindamos:
                </Typography>

                <ul className="space-y-3 mb-6">
                  {[
                    "Instalación de sistemas de circuito cerrado CCTV",
                    "Instalación de sistemas de control de acceso biométrico",
                    "Planificación de sistemas de control térmico para plantas químicas"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <Typography className="text-gray-700" placeholder={undefined}>{item}</Typography>
                    </li>
                  ))}
                </ul>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-6">
                  <Typography className="text-gray-700 font-semibold" placeholder={undefined}>
                    Con la mejor tecnología al mejor precio
                  </Typography>
                </div>

                <div className="flex items-center">
                  <Image
                    src='/images/corporate/Hikvision_logo_smart_business.png'
                    width={200}
                    height={100}
                    alt='Logo de Hikvision - Sistemas de seguridad CCTV'
                  />
                </div>
              </div>

              <div className="animate-fade-left">
                <Card className="overflow-hidden shadow-2xl border-0">
                  <Image
                    src='/images/corporate/cctv-room.jpg'
                    width={600}
                    height={400}
                    alt='Sala de monitoreo CCTV con pantallas de seguridad'
                    className="w-full h-auto"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Redes Empresariales */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-5">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1 animate-fade-right">
                  <Card className="overflow-hidden shadow-2xl border-0">
                    <div className="relative">
                      <video className='w-full h-auto' autoPlay muted loop>
                        <source src='/videos/fast-network.mp4' type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  </Card>
                </div>

                <div className="order-1 md:order-2 animate-fade-left">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-lg
                                    flex items-center justify-center">
                      <SignalIcon className="h-6 w-6 text-white" />
                    </div>
                    <Typography variant="h2" className="text-3xl font-bold text-gray-800"
                                placeholder={undefined}>
                      Tu Red Debe Ser la Mejor
                    </Typography>
                  </div>
                  <div className="w-20 h-1 bg-green-600 mb-6"></div>

                  <Typography className="text-gray-600 text-lg mb-4" placeholder={undefined}>
                    No dejes que una mala red atrase a tus colaboradores y tu negocio.
                  </Typography>

                  <Typography className="text-gray-700 font-semibold mb-4" placeholder={undefined}>
                    Lo que podemos hacer por ti:
                  </Typography>

                  <ul className="space-y-3 mb-6">
                    {[
                      "Certificación de red profesional",
                      "Instalación de puntos de red empresarial",
                      "Reestructuración y optimización de redes"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <Typography className="text-gray-700" placeholder={undefined}>{item}</Typography>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-6">
                    <Typography className="text-gray-700 font-semibold" placeholder={undefined}>
                      Solamente con materiales de calidad
                    </Typography>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <Image src='/images/corporate/unifi-icon-smart-business.png' width={40} height={40}
                           alt='Logo de Ubiquiti' />
                    <Image src='/images/corporate/mikrotik-logo.png' width={120} height={60}
                           alt='Logo de MikroTik' />
                    <Image src='/images/corporate/belden_logo.png' width={100} height={40}
                           alt='Logo de Belden' />
                    <Image src='/images/corporate/legrand-logo.png' width={100} height={40}
                           alt='Logo de Legrand' />
                    <Image src='/images/corporate/tp-link.png' width={80} height={40}
                           alt='Logo de TP-Link' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Switches POE */}
        <div className="container mx-auto px-5 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                          placeholder={undefined}>
                Te Brindamos lo Más Práctico para tu Red
              </Typography>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              <Typography className="text-gray-600 text-2xl" placeholder={undefined}>
                Switches FULL-POE
              </Typography>
            </div>

            <Card className="overflow-hidden shadow-2xl border-0">
              <video className='w-full h-auto' autoPlay muted loop>
                <source src='/videos/switch-poe.mp4' type="video/mp4" />
              </video>
            </Card>
          </div>
        </div>

        {/* Sistemas UPS */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-16">
          <div className="container mx-auto px-5">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                            placeholder={undefined}>
                  Protege tu Equipo
                </Typography>
                <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
                <Typography className="text-gray-600 text-2xl" placeholder={undefined}>
                  Sistemas de Energía Ininterrumpida
                </Typography>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-right">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg
                                    flex items-center justify-center">
                      <BoltIcon className="h-6 w-6 text-white" />
                    </div>
                    <Typography variant="h3" className="text-2xl font-bold text-gray-800"
                                placeholder={undefined}>
                      Sistemas UPS Profesionales
                    </Typography>
                  </div>

                  <Typography className="text-gray-600 text-lg mb-4" placeholder={undefined}>
                    Prevenir es mejor que lamentar. Cuida el equipo de tu hogar u empresa con
                    marcas avaladas por años de experiencia.
                  </Typography>

                  <Typography className="text-gray-700 font-semibold mb-4" placeholder={undefined}>
                    Te brindamos soporte para:
                  </Typography>

                  <ul className="space-y-3">
                    {[
                      "Equipo de oficina y estaciones de trabajo",
                      "Data Centers de nivel corporativo",
                      "Estudio de necesidades energéticas personalizado"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                        <Typography className="text-gray-700" placeholder={undefined}>{item}</Typography>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="animate-fade-left">
                  <Card className="overflow-hidden shadow-2xl border-0">
                    <Image
                      src='/images/backgrounds/apc-background.jpg'
                      width={600}
                      height={400}
                      alt='Sistemas UPS APC - Energía ininterrumpida para equipos críticos'
                      className="w-full h-auto"
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 py-20">
          <div className="container mx-auto px-5 text-center">
            <Typography variant="h2" className="text-white text-4xl md:text-5xl font-bold mb-6"
                        placeholder={undefined}>
              ¿Listo para Transformar tu Infraestructura Tecnológica?
            </Typography>
            <Typography className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto"
                        placeholder={undefined}>
              Contáctanos hoy y descubre cómo nuestros servicios pueden impulsar tu negocio
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50
                           shadow-2xl hover:shadow-3xl px-8 py-4 text-lg"
                placeholder={undefined}
              >
                <Link href="/contacto">
                  Solicitar Cotización
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outlined"
                className="border-2 border-white text-white hover:bg-white/10
                           px-8 py-4 text-lg"
                placeholder={undefined}
              >
                <Link href="tel:+50488187765">
                  Llamar Ahora
                </Link>
              </Button>
            </div>
          </div>
        </div>
    </>
    );
}
