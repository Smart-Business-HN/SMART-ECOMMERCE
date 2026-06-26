//@ts-nocheck
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/button.component";
import SectionHeading from "@/components/ui/section-heading.component";
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
        <nav aria-label="Breadcrumb" className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-[13px] text-ink2-500">
            <li>
              <Link href="/" className="sb-link" aria-label="Ir al inicio">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-ink2-400">/</li>
            <li aria-current="page">
              <span className="font-medium text-accent">Servicios</span>
            </li>
          </ol>
        </nav>

        {/* Hero — dark con glow azul + badge */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,111,255,.45) 0%, rgba(0,111,255,0) 70%)' }}
          />
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-24">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-4 py-1.5 text-[13px] font-medium text-accent-light">
                  Servicios profesionales
                </span>
                <h1 className="mb-6 text-[32px] sm:text-[44px] md:text-[54px] font-bold leading-[1.05] tracking-[-0.03em]">
                  Escoge a la <span className="text-accent-light">MEJOR</span>
                  <br />
                  Empresa de Soluciones Informáticas
                </h1>

                <div className="mb-8 rounded-card border border-white/10 bg-white/[0.06] p-6">
                  <p className="mb-3 text-[15.5px] leading-[1.6] text-ink2-300">
                    No queremos venderte productos, no queremos venderte una instalación.
                  </p>
                  <p className="text-[19px] font-semibold text-white">
                    Queremos ser quien le dé <span className="text-accent-light">solución</span> a tus problemas
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button href="/contacto" variant="primary" size="lg">
                    Contactar Ahora
                  </Button>

                  <Link
                    href="tel:+50488187765"
                    className="sb-btn group inline-flex min-h-[50px] items-center gap-3 rounded-btn border border-white/15 bg-white/[0.06] px-5 py-3 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent transition-colors group-hover:brightness-110">
                      <PhoneArrowUpRightIcon className="h-5 w-5 text-white" />
                    </span>
                    <span className="text-left">
                      <span className="block text-[14px] font-semibold text-white">
                        Consulta por proyectos
                      </span>
                      <span className="block text-[13.5px] text-ink2-300">
                        +504 8818-7765
                      </span>
                    </span>
                  </Link>
                </div>
              </div>

              {/* Tarjetas de valor */}
              <div className="grid grid-cols-1 gap-4">
                {whyChooseUs.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-card border border-white/10 bg-white/[0.06] p-5 transition-colors hover:bg-white/10"
                  >
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-accent-soft">
                      <item.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="mb-1 text-[16px] font-bold text-white">
                        {item.title}
                      </h2>
                      <p className="text-[13.5px] leading-[1.5] text-ink2-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nuestros Servicios — grid 3-col con cuadros de ícono azul */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <SectionHeading
              align="center"
              overline="Lo que hacemos"
              title={<span id="nuestros-servicios">Nuestros Servicios</span>}
              subtitle="Tenemos una variedad de servicios profesionales a tu disposición"
              className="mb-12"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="sb-card flex flex-col rounded-card border border-line bg-white p-8 shadow-card"
                >
                  <span className="mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-accent-soft text-accent">
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mb-2.5 text-[20px] font-bold tracking-[-0.02em] text-text">
                    {service.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-ink2-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seguridad CCTV — surface, ícono azul + checklist */}
        <section className="bg-surface">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] bg-accent-soft text-accent">
                    <ShieldCheckIcon className="h-6 w-6" />
                  </span>
                  <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.025em] text-text">
                    Cuida a los Tuyos
                  </h2>
                </div>

                <p className="mb-4 text-[15.5px] leading-[1.6] text-ink2-600">
                  Sabemos que eres responsable con los tuyos y que quieres lo mejor para ellos.
                </p>

                <p className="mb-4 font-semibold text-text">
                  Por eso te brindamos:
                </p>

                <ul className="mb-6 space-y-3">
                  {[
                    "Instalación de sistemas de circuito cerrado CCTV",
                    "Instalación de sistemas de control de acceso biométrico",
                    "Planificación de sistemas de control térmico para plantas químicas"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="mt-0.5 h-6 w-6 flex-none text-accent" />
                      <span className="text-[15.5px] leading-[1.6] text-ink2-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6 rounded-card border border-accent-border bg-accent-soft px-5 py-4">
                  <p className="font-semibold text-text">
                    Con la mejor tecnología al mejor precio
                  </p>
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

              <div className="overflow-hidden rounded-container shadow-card">
                <Image
                  src='/images/corporate/cctv-room.jpg'
                  width={600}
                  height={400}
                  alt='Sala de monitoreo CCTV con pantallas de seguridad'
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Redes Empresariales — banner oscuro con glow + CTA */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -right-36 h-[480px] w-[480px] -translate-y-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,111,255,.45) 0%, rgba(0,111,255,0) 70%)' }}
          />
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="order-2 overflow-hidden rounded-container shadow-card lg:order-1">
                <div className="relative">
                  <video className='h-auto w-full' autoPlay muted loop>
                    <source src='/videos/fast-network.mp4' type="video/mp4" />
                  </video>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-accent-light">
                  Redes empresariales
                </p>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] bg-white/10 text-accent-light">
                    <SignalIcon className="h-6 w-6" />
                  </span>
                  <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.025em] text-white">
                    Tu Red Debe Ser la Mejor
                  </h2>
                </div>

                <p className="mb-4 text-[15.5px] leading-[1.6] text-ink2-300">
                  No dejes que una mala red atrase a tus colaboradores y tu negocio.
                </p>

                <p className="mb-4 font-semibold text-white">
                  Lo que podemos hacer por ti:
                </p>

                <ul className="mb-6 space-y-3">
                  {[
                    "Certificación de red profesional",
                    "Instalación de puntos de red empresarial",
                    "Reestructuración y optimización de redes"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="mt-0.5 h-6 w-6 flex-none text-accent-light" />
                      <span className="text-[15.5px] leading-[1.6] text-ink2-300">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-8 rounded-card border border-white/10 bg-white/[0.06] px-5 py-4">
                  <p className="font-semibold text-white">
                    Solamente con materiales de calidad
                  </p>
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
        </section>

        {/* Switches POE — white, heading centrado + media card */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <SectionHeading
              align="center"
              overline="Equipamiento de red"
              title="Te Brindamos lo Más Práctico para tu Red"
              subtitle="Switches FULL-POE"
              className="mb-12"
            />

            <div className="overflow-hidden rounded-container shadow-card">
              <video className='h-auto w-full' autoPlay muted loop>
                <source src='/videos/switch-poe.mp4' type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        {/* Sistemas UPS — surface, ícono azul + checklist */}
        <section className="bg-surface">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <SectionHeading
              align="center"
              overline="Energía respaldada"
              title="Protege tu Equipo"
              subtitle="Sistemas de Energía Ininterrumpida"
              className="mb-12"
            />

            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] bg-accent-soft text-accent">
                    <BoltIcon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[22px] md:text-[26px] font-bold tracking-[-0.02em] text-text">
                    Sistemas UPS Profesionales
                  </h3>
                </div>

                <p className="mb-4 text-[15.5px] leading-[1.6] text-ink2-600">
                  Prevenir es mejor que lamentar. Cuida el equipo de tu hogar u empresa con
                  marcas avaladas por años de experiencia.
                </p>

                <p className="mb-4 font-semibold text-text">
                  Te brindamos soporte para:
                </p>

                <ul className="space-y-3">
                  {[
                    "Equipo de oficina y estaciones de trabajo",
                    "Data Centers de nivel corporativo",
                    "Estudio de necesidades energéticas personalizado"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="mt-0.5 h-6 w-6 flex-none text-accent" />
                      <span className="text-[15.5px] leading-[1.6] text-ink2-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overflow-hidden rounded-container shadow-card">
                <Image
                  src='/images/backgrounds/apc-background.jpg'
                  width={600}
                  height={400}
                  alt='Sistemas UPS APC - Energía ininterrumpida para equipos críticos'
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Cableado / Data Center — banner oscuro con imagen de racks + CTA */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="absolute inset-0">
            <Image
              src="/images/backgrounds/cableado-estructurado-smart-business.jpg"
              alt="Cableado estructurado y data center"
              fill
              sizes="100vw"
              className="object-cover object-right"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, #0A0D14 0%, rgba(10,13,20,.92) 38%, rgba(10,13,20,.45) 70%, rgba(10,13,20,.2) 100%)",
              }}
            />
          </div>
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-[540px]">
              <p className="mb-3.5 text-[12.5px] font-bold uppercase tracking-[0.12em] text-accent-light">
                Cableado estructurado &amp; data center
              </p>
              <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[40px]">
                Proyectos de cableado y data center llave en mano
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-ink2-300">
                Diseño, certificación Cat6A/fibra, gabinetes y organización
                impecable. Ejecutamos tu proyecto con garantía de calidad y
                precios competitivos.
              </p>
              <div className="mt-8">
                <Button href="/contacto" variant="primary" size="lg">
                  Solicitar cotización
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Software / Ventix — banda oscura con logo + CTA */}
        <section className="bg-ink text-white">
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:px-8 py-14 md:py-20 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="mb-3 text-[12.5px] font-bold uppercase tracking-[0.12em] text-accent-light">
                Desarrollo de software a la medida
              </p>
              <h2 className="text-[28px] font-bold tracking-[-0.03em] md:text-[34px]">
                Software que se adapta a tu operación
              </h2>
              <p className="mt-4 max-w-[520px] text-[16px] leading-[1.65] text-ink2-300">
                Creamos sistemas a la medida e integramos Ventix, nuestro POS/ERP
                en la nube con facturación CAI/SAR, inventario multi-bodega y CRM.
                Tecnología hecha para el mercado hondureño.
              </p>
              <div className="mt-7">
                <Button href="/ventix" variant="secondary" size="lg">
                  Conocer Ventix
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/ventix/logo/logo-text-on-dark.png"
                alt="Ventix"
                width={280}
                height={64}
                className="h-16 w-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA Final — white, centrado */}
        <section className="bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20 text-center">
            <SectionHeading
              align="center"
              title="¿Listo para Transformar tu Infraestructura Tecnológica?"
              subtitle="Contáctanos hoy y descubre cómo nuestros servicios pueden impulsar tu negocio"
              className="mb-8"
            />
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/contacto" variant="primary" size="lg">
                Solicitar Cotización
              </Button>
              <Button href="tel:+50488187765" variant="secondary" size="lg">
                Llamar Ahora
              </Button>
            </div>
          </div>
        </section>
    </>
    );
}
