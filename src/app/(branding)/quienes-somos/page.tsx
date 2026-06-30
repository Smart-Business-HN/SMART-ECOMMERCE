//@ts-nocheck
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import Button from '@/components/ui/button.component';
import SectionHeading from '@/components/ui/section-heading.component';
import {
  BuildingOfficeIcon,
  HomeModernIcon,
  GlobeAltIcon,
  SignalIcon,
  WifiIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  LightBulbIcon,
  HeartIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  TrophyIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
    title: 'Quiénes Somos | SMART Business Honduras - Líder en Soluciones Informáticas',
    description: 'Conoce la historia de SMART Business, líder en soluciones informáticas en Honduras. Más de 15 años brindando tecnología de calidad a empresas y emprendedores. Distribuidor confiable de equipos informáticos.',
    keywords: [
        'SMART Business Honduras',
        'soluciones informáticas',
        'tecnología Honduras',
        'empresa tecnológica',
        'distribuidor informático',
        'historia empresa',
        'tecnología empresarial',
        'equipos informáticos',
        'proveedor tecnología',
        'confianza empresarial',
        '15 años experiencia',
        'pequeñas empresas',
        'medianas empresas',
        'grandes empresas'
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
        canonical: '/quienes-somos',
    },
    openGraph: {
        title: 'Quiénes Somos | SMART Business Honduras',
        description: 'Conoce la historia de SMART Business, líder en soluciones informáticas en Honduras. Más de 15 años brindando tecnología de calidad a empresas y emprendedores.',
        url: 'https://www.smartbusiness.site/quienes-somos',
        siteName: 'SMART Business',
        images: [
            {
                url: 'https://www.smartbusiness.site/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'SMART Business Honduras - Logo corporativo',
            }
        ],
        locale: 'es_HN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Quiénes Somos | SMART Business Honduras',
        description: 'Conoce la historia de SMART Business, líder en soluciones informáticas en Honduras.',
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
        'DC.title': 'Quiénes Somos | SMART Business Honduras',
        'DC.creator': 'SMART BUSINESS S. DE R.L.',
        'DC.subject': 'Historia empresa, soluciones informáticas, tecnología Honduras',
        'DC.description': 'Conoce la historia de SMART Business, líder en soluciones informáticas en Honduras',
        'DC.publisher': 'SMART Business',
        'DC.contributor': 'SMART Business',
        'DC.date': new Date().toISOString(),
        'DC.type': 'Organization',
        'DC.format': 'text/html',
        'DC.identifier': 'https://www.smartbusiness.site/quienes-somos',
        'DC.language': 'es',
        'DC.coverage': 'Honduras',
        'DC.rights': '© 2024 SMART Business. Todos los derechos reservados.',
    },
};

export default function AboutUs(){
    // Datos estructurados JSON-LD para SEO
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "SMART Business",
      "alternateName": "SMART Business Honduras",
      "description": "Líder en soluciones informáticas en Honduras. Más de 15 años brindando tecnología de calidad a empresas y emprendedores.",
      "url": "https://www.smartbusiness.site",
      "logo": "https://www.smartbusiness.site/images/corporate/logo-smart-business.png",
      "image": "https://www.smartbusiness.site/images/corporate/logo-smart-business.png",
      "foundingDate": "2009",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "HN",
        "addressRegion": "Honduras"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+50488187765",
        "contactType": "customer service",
        "areaServed": "HN",
        "availableLanguage": "Spanish"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Honduras"
      },
      "serviceArea": {
        "@type": "Country",
        "name": "Honduras"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo de Productos y Servicios",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Soluciones de Seguridad Integral",
              "description": "Sistemas de seguridad para diferentes sectores del mercado hondureño"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Soluciones de Redes y Conectividad",
              "description": "Infraestructura de redes profesionales para empresas"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Cableado Estructurado",
              "description": "Productos y proyectos de cableado estructurado profesional"
            }
          }
        ]
      },
      "knowsAbout": [
        "Soluciones informáticas",
        "Tecnología empresarial",
        "Equipos informáticos",
        "Sistemas de seguridad",
        "Redes empresariales",
        "Cableado estructurado"
      ],
      "slogan": "Si quieres triunfar tienes que ser SMART",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.smartbusiness.site/quienes-somos"
      }
    };

    const stats = [
      { icon: ClockIcon, n: '15+', l: 'Años de Experiencia' },
      { icon: UserGroupIcon, n: '1000+', l: 'Clientes Satisfechos' },
      { icon: TrophyIcon, n: '400+', l: 'Proyectos Completados' },
      { icon: CheckBadgeIcon, n: '100%', l: 'Compromiso y Calidad' },
    ];

    const values = [
      {
        icon: HeartIcon,
        t: 'Confianza',
        d: 'Generamos relaciones duraderas basadas en la transparencia y honestidad',
      },
      {
        icon: CheckBadgeIcon,
        t: 'Calidad',
        d: 'Productos y servicios de primera línea para garantizar tu éxito',
      },
      {
        icon: LightBulbIcon,
        t: 'Innovación',
        d: 'Tecnología de vanguardia para mantener tu negocio competitivo',
      },
      {
        icon: UserGroupIcon,
        t: 'Soporte',
        d: 'Acompañamiento constante en cada etapa de tu proyecto',
      },
    ];

    const securitySolutions = [
      {
        title: "Seguridad Pública",
        image: "/images/backgrounds/public-security-smart-business.jpg",
        description: "Ciudades inteligentes y soluciones de tráfico inteligente para la seguridad y la administración urbana. Sistemas de videovigilancia y control de tráfico para municipalidades.",
        icon: BuildingOfficeIcon
      },
      {
        title: "Seguridad Empresarial",
        image: "/images/backgrounds/business-smart-business.png",
        description: "Soluciones inteligentes para la seguridad y las operaciones comerciales que abarcan comercio minorista, logística, energía, educación y mucho más. Protección integral para empresas.",
        icon: BuildingOfficeIcon
      },
      {
        title: "Seguridad para PYMES",
        image: "/images/backgrounds/pymes-smart-business.png",
        description: "Una completa gama de productos de seguridad inteligente, desde videovigilancia, control de acceso e intercomunicación, hasta alarmas y LED. Soluciones accesibles para pequeñas empresas.",
        icon: UserGroupIcon
      },
      {
        title: "Hogares Inteligentes",
        image: "/images/backgrounds/cliente-fina-smart-business.jpg",
        description: "Hogares inteligentes y electrónica avanzada para todos los consumidores. Domótica, seguridad residencial y entretenimiento inteligente para familias hondureñas.",
        icon: HomeModernIcon
      }
    ];

    const clients = [
      { src: '/images/clients/911.png', width: 100, height: 50, alt: 'Sistema de Emergencias 911 Honduras' },
      { src: '/images/clients/acosa-logo.png', width: 180, height: 40, alt: 'ACOSA' },
      { src: '/images/clients/BAC_Credomatic_logo.svg.png', width: 170, height: 40, alt: 'BAC Credomatic' },
      { src: '/images/clients/Grupo-Karims-smart-business.png', width: 80, height: 50, alt: 'Grupo Karims' },
      { src: '/images/clients/grupo-platino-smart-business.png', width: 190, height: 50, alt: 'Grupo Platino' },
      { src: '/images/clients/logo_la_quinta_la_ceiba.jpg', width: 100, height: 50, alt: 'Hotel La Quinta La Ceiba' },
      { src: '/images/clients/logo-banco-atlantida.png', width: 190, height: 40, alt: 'Banco Atlántida' },
      { src: '/images/clients/logo-funda.png', width: 200, height: 50, alt: 'Grupo Comidas' },
      { src: '/images/clients/municipalidad-de-san-pedro-sula-logo.png', width: 100, height: 50, alt: 'Municipalidad de San Pedro Sula' },
      { src: '/images/clients/net-laptech.jpeg', width: 100, height: 50, alt: 'Net Laptech' },
      { src: '/images/clients/unnamed.png', width: 200, height: 50, alt: 'UNITEC' },
      { src: '/images/clients/inversiones_aliadas_smart_business.png', width: 200, height: 50, alt: 'Inversiones Aliadas' },
      { src: '/images/clients/logo_de_claro.png', width: 200, height: 50, alt: 'Claro Honduras' },
      { src: '/images/clients/grupo_ferraro_logo.jpg', width: 200, height: 50, alt: 'Grupo Ferraro' },
      { src: '/images/clients/cortitelas-logo.png', width: 200, height: 50, alt: 'Cortitelas' },
      { src: '/images/clients/ikigai-logo.png', width: 200, height: 50, alt: 'Ikigai' },
      { src: '/images/clients/logo-yude.png', width: 200, height: 50, alt: 'YUDE' }
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
          <Link href="/" className="sb-link hover:text-accent" aria-label="Ir al inicio">
            Inicio
          </Link>
        </li>
        <li aria-hidden="true">
          <span className="text-ink2-400">/</span>
        </li>
        <li aria-current="page">
          <span className="font-medium text-accent">Quiénes Somos</span>
        </li>
      </ol>
    </nav>

    {/* Hero */}
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[url('/images/backgrounds/background-buildings.png')] bg-cover bg-[position:right_center] opacity-[0.55]" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,#0A0D14_0%,#0A0D14_38%,rgba(10,13,20,.7)_58%,rgba(10,13,20,.25)_100%)]" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-[88px]">
        <div className="max-w-[620px]">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3.5 py-[7px] text-[13px] font-medium text-accent-light">
            Más de 15 años en el mercado
          </span>
          <h1 className="mb-5 text-[32px] sm:text-[44px] md:text-[54px] font-bold leading-[1.05] tracking-[-0.035em]">
            SMART BUSINESS HONDURAS
          </h1>
          <p className="m-0 max-w-[540px] text-[18px] leading-[1.6] text-ink2-300">
            Más de 15 años brindando soluciones tecnológicas de calidad a empresas
            y emprendedores en toda Honduras.
          </p>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-white border-b border-line">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, n, l }) => (
            <div key={l} className="text-center">
              <Icon className="mx-auto mb-2 h-8 w-8 text-accent" aria-hidden="true" />
              <div className="text-[42px] font-extrabold tracking-[-0.03em] text-accent">{n}</div>
              <div className="mt-1 text-[14px] text-ink2-500">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Nuestra Historia */}
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeading
              overline="Nuestra historia"
              title="De San Pedro Sula para todo Honduras"
            />
            <div className="mt-6 space-y-4">
              <p className="text-[15.5px] leading-[1.6] text-ink2-600">
                Smart Business surge como una respuesta al mercado hondureño con la intención de
                brindar <strong className="font-semibold text-accent">precios accesibles</strong> a las pequeñas empresas que
                están dando su primer salto en el mundo digital.
              </p>
              <p className="text-[15.5px] leading-[1.6] text-ink2-600">
                Poco a poco nos hemos convertido en proveedores de medianas y grandes empresas
                por la <strong className="font-semibold text-accent">confianza</strong> que hemos generado en nuestros clientes.
              </p>
              <p className="text-[15.5px] leading-[1.6] text-ink2-600">
                Con más de <strong className="font-semibold text-accent">15 años de experiencia</strong> en el rubro informático,
                nuestra única razón de existir es brindar a nuestros clientes el mejor producto para
                satisfacer sus necesidades, ya sea a integradores o clientes finales.
              </p>
              <div className="rounded-btn border-l-4 border-accent bg-accent-soft px-4 py-3">
                <p className="font-semibold text-text">
                  Somos el distribuidor de tecnología más confiable en Honduras
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-container border border-line bg-surface">
            <Image
              src='/images/backgrounds/background-buildings.png'
              fill
              className="object-cover"
              alt='Edificios corporativos Smart Business Honduras - Fondo empresarial'
            />
            <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/80 to-transparent p-8">
              <p className="text-center text-[22px] font-bold text-white">
                Si quieres triunfar tienes que ser SMART
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Misión y Visión */}
    <section className="bg-white border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Misión - dark card */}
          <div className="relative overflow-hidden rounded-container bg-ink p-10 text-white">
            <div className="pointer-events-none absolute -right-16 -top-20 h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle,rgba(0,111,255,.2),transparent_65%)]" />
            <span className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-[13px] bg-accent/[0.18] text-accent-light">
              <RocketLaunchIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="relative mb-3 text-[24px] font-bold tracking-[-0.02em]">Misión</h3>
            <p className="relative m-0 text-[15.5px] leading-[1.7] text-ink2-300">
              Ser la mayor empresa distribuidora de equipo informático para emprendedores
              que necesitan el consejo de una empresa de confianza en Honduras. Brindamos
              soluciones tecnológicas integrales para el crecimiento empresarial.
            </p>
          </div>
          {/* Visión - light card */}
          <div className="rounded-container border border-line bg-surface p-10">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-[13px] bg-accent-soft text-accent">
              <ChartBarIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mb-3 text-[24px] font-bold tracking-[-0.02em] text-text">Visión</h3>
            <p className="m-0 text-[15.5px] leading-[1.7] text-ink2-600">
              Nos especializamos en los pequeños y medianos empresarios porque son las personas
              que rara vez tienen apoyo de parte de otros. Nosotros somos parte de ellos, por lo
              tanto tenemos la obligación humana de apoyarlos en su camino hacia el éxito tecnológico.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Valores */}
    <section className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <SectionHeading
          overline="Lo que nos define"
          title="Nuestros valores"
          subtitle="Los pilares que sostienen nuestro compromiso con la excelencia"
          align="center"
          className="mb-11"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {values.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-card border border-line bg-white p-[30px]">
              <span className="mb-[18px] flex h-12 w-12 items-center justify-center rounded-[13px] bg-accent-soft text-accent">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mb-2 text-[19px] font-bold tracking-[-0.02em] text-text">{t}</h3>
              <p className="m-0 text-[14.5px] leading-[1.6] text-ink2-500">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Productos y soluciones */}
    <section className="bg-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <SectionHeading
          overline="Productos y soluciones"
          title="Tecnología integral para cada necesidad"
          subtitle="Ofrecemos sistemas de seguridad avanzados para diferentes sectores del mercado hondureño, de la ciudad a tu hogar."
          align="center"
          className="mb-11"
        />

        {/* Seguridad - 4 col image cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
          {securitySolutions.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="sb-card flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card">
                <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-ink p-[18px]">
                  <Image
                    src={item.image}
                    fill
                    className="sb-card-img object-cover opacity-[0.4]"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/20 to-ink/[0.85]" />
                  <span className="relative flex h-[42px] w-[42px] items-center justify-center rounded-[11px] bg-accent/[0.85] text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-[22px]">
                  <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em] text-text">{item.title}</h3>
                  <p className="m-0 text-[14px] leading-[1.6] text-ink2-500">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Redes */}
        <div className="mt-16">
          <SectionHeading
            overline="Redes y conectividad"
            title="Infraestructura de redes profesional"
            subtitle="Infraestructura de redes profesionales para empresas y proveedores de internet en Honduras."
            className="mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-96 overflow-hidden rounded-card border border-line shadow-card">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                aria-label="Video demostrativo de productos WISP para proveedores de internet"
              >
                <source src="/videos/uisp.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[13px] bg-accent/[0.85] text-white">
                    <WifiIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h4 className="text-[22px] font-bold text-white">Productos WISP</h4>
                </div>
                <p className="m-0 text-[15px] leading-[1.6] text-white/90">
                  Contamos con todos los productos que necesitas para montar tu propia
                  empresa WISP en Honduras
                </p>
              </div>
            </div>

            <div className="relative h-96 overflow-hidden rounded-card border border-line shadow-card">
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                aria-label="Video demostrativo de redes corporativas empresariales"
              >
                <source src="/videos/networking.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[13px] bg-accent/[0.85] text-white">
                    <GlobeAltIcon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h4 className="text-[22px] font-bold text-white">Redes Corporativas</h4>
                </div>
                <p className="m-0 text-[15px] leading-[1.6] text-white/90">
                  Te brindamos todo lo necesario para escalar tu red corporativa al
                  siguiente nivel con tecnología de punta
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cableado */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-container border border-line shadow-card">
            <div className="relative h-96 md:h-auto">
              <Image
                src='/images/backgrounds/cableado-estructurado-smart-business.jpg'
                fill
                className="object-cover"
                alt='Proyectos de cableado estructurado profesional en Honduras - Smart Business'
              />
            </div>
            <div className="flex flex-col justify-center bg-ink p-12 text-white">
              <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-[13px] bg-accent/[0.18] text-accent-light">
                <SignalIcon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mb-6 text-[28px] md:text-[34px] font-bold tracking-[-0.025em] leading-[1.1]">
                Cableado Estructurado Profesional
              </h3>
              <p className="mb-4 text-[16px] leading-[1.7] text-ink2-300">
                Te brindamos todo lo que necesitas para ejecutar tu proyecto de cableado
                estructurado a precios altamente competitivos en Honduras.
              </p>
              <p className="mb-8 text-[15.5px] leading-[1.7] text-ink2-300">
                Y en caso de que no tengas quien lo desarrolle, podemos brindarte descuentos
                importantes al ejecutar el proyecto por ti con garantía de calidad.
              </p>
              <div>
                <Button href="/contacto" variant="primary" size="lg">
                  Solicitar Cotización
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Por Qué Elegirnos */}
    <section className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <SectionHeading
          overline="La diferencia Smart Business"
          title="¿Por Qué Elegir SMART Business?"
          align="center"
          className="mb-11"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-card border border-line bg-white p-8 text-center shadow-card">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[16px] bg-accent-soft">
              <span className="text-[24px] font-extrabold tracking-[-0.03em] text-accent">15+</span>
            </div>
            <h3 className="mb-3 text-[19px] font-bold tracking-[-0.02em] text-text">Años de Experiencia</h3>
            <p className="m-0 text-[14.5px] leading-[1.6] text-ink2-500">
              Más de una década ofreciendo soluciones tecnológicas confiables
            </p>
          </div>
          <div className="rounded-card border border-line bg-white p-8 text-center shadow-card">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[16px] bg-success-soft">
              <CheckBadgeIcon className="h-8 w-8 text-success" aria-hidden="true" />
            </div>
            <h3 className="mb-3 text-[19px] font-bold tracking-[-0.02em] text-text">Garantía de Calidad</h3>
            <p className="m-0 text-[14.5px] leading-[1.6] text-ink2-500">
              Productos certificados y soporte técnico profesional
            </p>
          </div>
          <div className="rounded-card border border-line bg-white p-8 text-center shadow-card">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[16px] bg-accent-soft">
              <UserGroupIcon className="h-8 w-8 text-accent" aria-hidden="true" />
            </div>
            <h3 className="mb-3 text-[19px] font-bold tracking-[-0.02em] text-text">Clientes Satisfechos</h3>
            <p className="m-0 text-[14.5px] leading-[1.6] text-ink2-500">
              Cientos de empresas confían en nosotros para sus necesidades
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Clientes */}
    <section className="bg-surface border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <SectionHeading
          overline="Clientes que confían en nosotros"
          title="Empresas líderes de Honduras"
          subtitle="Más de 15 años sirviendo a empresas líderes en Honduras con soluciones tecnológicas de calidad."
          align="center"
          className="mb-11"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {clients.map((client) => (
            <div key={client.src} className="flex h-24 items-center justify-center rounded-card border border-line bg-white p-[18px]">
              <span className="sb-brand inline-flex items-center justify-center">
                <Image
                  src={client.src}
                  width={client.width}
                  height={client.height}
                  alt={client.alt}
                  className="max-h-16 w-auto object-contain"
                />
              </span>
            </div>
          ))}
          <div className="flex h-24 items-center justify-center rounded-card border border-dashed border-accent-border bg-accent-soft p-4 text-center text-[13px] font-semibold text-accent">
            ¡Próximamente tu empresa!
          </div>
        </div>
      </div>
    </section>

    {/* CTA Final */}
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-[72px] text-center">
        <SectionHeading
          title="¿Listo para Impulsar tu Negocio?"
          subtitle="Únete a más de 500 empresas que confían en SMART Business para sus soluciones tecnológicas."
          align="center"
          tone="dark"
          className="mb-8"
        />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/contacto" variant="primary" size="lg">
            Solicitar Cotización
          </Button>
          <Button href="/catalogo" variant="secondary" size="lg" className="border-white/[0.16] bg-white/[0.08] text-white hover:border-white/30 hover:bg-white/[0.12]">
            Ver Catálogo
          </Button>
        </div>
      </div>
    </section>
    </>
    );
}
