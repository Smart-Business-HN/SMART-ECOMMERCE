//@ts-nocheck
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import { Card, Typography, Button, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@/utils/MTailwind';
import {
  ShieldCheckIcon,
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

    const tabsData = [
      {
        label: "Seguridad",
        value: "seguridad",
        icon: ShieldCheckIcon,
        content: [
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
        ]
      },
      {
        label: "Redes",
        value: "redes",
        icon: GlobeAltIcon,
        content: "redes"
      },
      {
        label: "Cableado",
        value: "cableado",
        icon: SignalIcon,
        content: "cableado"
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
          <span className="text-blue-500 font-medium">Quiénes Somos</span>
        </li>
      </ol>
    </nav>

    {/* Hero Section Moderno */}
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/backgrounds/background-buildings.png')]
                      bg-center bg-cover opacity-10"></div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="text-center animate-fade-in">
          <Typography variant="h1" className="text-white text-5xl md:text-6xl font-bold mb-4"
                      placeholder={undefined}>
            SMART BUSINESS HONDURAS
          </Typography>
          <Typography variant="lead" className="text-blue-100 text-xl max-w-3xl mx-auto mb-8"
                      placeholder={undefined}>
            Más de 15 años brindando soluciones tecnológicas de calidad a empresas
            y emprendedores en toda Honduras
          </Typography>
          <div className="flex justify-center">
            <Image
              src='/images/corporate/smart_business_logo_white_letters.png'
              width={300}
              height={200}
              alt='Logo Smart Business Honduras - Distribuidor de tecnología'
              className="animate-fade-up"
            />
          </div>
        </div>

        {/* Stats Cards Flotantes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-5xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                           hover:bg-white/20 transition-all animate-fade-up animate-delay-100">
            <div className="text-center">
              <ClockIcon className="h-10 w-10 text-white mx-auto mb-2" />
              <Typography variant="h2" className="text-white text-4xl font-bold"
                          placeholder={undefined}>15+</Typography>
              <Typography className="text-blue-100 text-sm" placeholder={undefined}>Años de Experiencia</Typography>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                           hover:bg-white/20 transition-all animate-fade-up animate-delay-200">
            <div className="text-center">
              <UserGroupIcon className="h-10 w-10 text-white mx-auto mb-2" />
              <Typography variant="h2" className="text-white text-4xl font-bold"
                          placeholder={undefined}>1000+</Typography>
              <Typography className="text-blue-100 text-sm" placeholder={undefined}>Clientes Satisfechos</Typography>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                           hover:bg-white/20 transition-all animate-fade-up animate-delay-300">
            <div className="text-center">
              <TrophyIcon className="h-10 w-10 text-white mx-auto mb-2" />
              <Typography variant="h2" className="text-white text-4xl font-bold"
                          placeholder={undefined}>400+</Typography>
              <Typography className="text-blue-100 text-sm" placeholder={undefined}>Proyectos Completados</Typography>
            </div>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 p-6
                           hover:bg-white/20 transition-all animate-fade-up animate-delay-400">
            <div className="text-center">
              <CheckBadgeIcon className="h-10 w-10 text-white mx-auto mb-2" />
              <Typography variant="h2" className="text-white text-4xl font-bold"
                          placeholder={undefined}>100%</Typography>
              <Typography className="text-blue-100 text-sm" placeholder={undefined}>Compromiso y Calidad</Typography>
            </div>
          </Card>
        </div>
      </div>
    </div>

    {/* Nuestra Historia */}
    <div className="container mx-auto px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                      placeholder={undefined} id="nuestra-historia">
            Nuestra Historia
          </Typography>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-right">
            <Card className="shadow-2xl border-0 overflow-hidden">
              <div className="relative h-96">
                <Image
                  src='/images/backgrounds/background-buildings.png'
                  fill
                  className="object-cover"
                  alt='Edificios corporativos Smart Business Honduras - Fondo empresarial'
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent
                                flex items-end justify-center p-8">
                  <Typography variant="h3" className="text-white text-2xl font-bold text-center"
                              placeholder={undefined}>
                    Si quieres triunfar tienes que ser SMART
                  </Typography>
                </div>
              </div>
            </Card>
          </div>

          <div className="animate-fade-left space-y-6">
            <Typography className="text-gray-600 text-lg leading-relaxed" placeholder={undefined}>
              Smart Business surge como una respuesta al mercado hondureño con la intención de
              brindar <strong className="text-blue-600">precios accesibles</strong> a las pequeñas empresas que
              están dando su primer salto en el mundo digital.
            </Typography>
            <Typography className="text-gray-600 text-lg leading-relaxed" placeholder={undefined}>
              Poco a poco nos hemos convertido en proveedores de medianas y grandes empresas
              por la <strong className="text-blue-600">confianza</strong> que hemos generado en nuestros clientes.
            </Typography>
            <Typography className="text-gray-600 text-lg leading-relaxed" placeholder={undefined}>
              Con más de <strong className="text-blue-600">15 años de experiencia</strong> en el rubro informático,
              nuestra única razón de existir es brindar a nuestros clientes el mejor producto para
              satisfacer sus necesidades, ya sea a integradores o clientes finales.
            </Typography>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <Typography className="text-gray-700 font-semibold" placeholder={undefined}>
                Somos el distribuidor de tecnología más confiable en Honduras
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Misión y Visión Modernizadas */}
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                        placeholder={undefined} id="mision-vision">
              Misión y Visión
            </Typography>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl
                             hover:-translate-y-2 transition-all duration-300
                             animate-fade-up animate-delay-100">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full
                                  flex items-center justify-center">
                    <RocketLaunchIcon className="h-8 w-8 text-white" />
                  </div>
                  <Typography variant="h3" className="text-white text-2xl font-bold"
                              placeholder={undefined}>
                    Misión
                  </Typography>
                </div>
              </div>
              <div className="p-6 bg-white">
                <Typography className="text-gray-600 text-base leading-relaxed"
                            placeholder={undefined}>
                  Ser la mayor empresa distribuidora de equipo informático para emprendedores
                  que necesitan el consejo de una empresa de confianza en Honduras. Brindamos
                  soluciones tecnológicas integrales para el crecimiento empresarial.
                </Typography>
              </div>
            </Card>

            <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl
                             hover:-translate-y-2 transition-all duration-300
                             animate-fade-up animate-delay-200">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full
                                  flex items-center justify-center">
                    <ChartBarIcon className="h-8 w-8 text-white" />
                  </div>
                  <Typography variant="h3" className="text-white text-2xl font-bold"
                              placeholder={undefined}>
                    Visión
                  </Typography>
                </div>
              </div>
              <div className="p-6 bg-white">
                <Typography className="text-gray-600 text-base leading-relaxed"
                            placeholder={undefined}>
                  Nos especializamos en los pequeños y medianos empresarios porque son las personas
                  que rara vez tienen apoyo de parte de otros. Nosotros somos parte de ellos, por lo
                  tanto tenemos la obligación humana de apoyarlos en su camino hacia el éxito tecnológico.
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>

    {/* Valores Corporativos */}
    <div className="container mx-auto px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                      placeholder={undefined}>
            Nuestros Valores
          </Typography>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <Typography className="text-gray-600 max-w-2xl mx-auto" placeholder={undefined}>
            Los pilares que sostienen nuestro compromiso con la excelencia
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center border-2 border-gray-100 hover:border-blue-500
                           hover:shadow-xl transition-all duration-300 group cursor-pointer
                           animate-fade-up animate-delay-100">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 mx-auto
                            rounded-full flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform">
              <HeartIcon className="h-8 w-8 text-white" />
            </div>
            <Typography variant="h5" className="font-bold text-gray-800 mb-2"
                        placeholder={undefined}>
              Confianza
            </Typography>
            <Typography className="text-gray-600 text-sm" placeholder={undefined}>
              Generamos relaciones duraderas basadas en la transparencia y honestidad
            </Typography>
          </Card>

          <Card className="p-6 text-center border-2 border-gray-100 hover:border-blue-500
                           hover:shadow-xl transition-all duration-300 group cursor-pointer
                           animate-fade-up animate-delay-200">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 mx-auto
                            rounded-full flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform">
              <CheckBadgeIcon className="h-8 w-8 text-white" />
            </div>
            <Typography variant="h5" className="font-bold text-gray-800 mb-2"
                        placeholder={undefined}>
              Calidad
            </Typography>
            <Typography className="text-gray-600 text-sm" placeholder={undefined}>
              Productos y servicios de primera línea para garantizar tu éxito
            </Typography>
          </Card>

          <Card className="p-6 text-center border-2 border-gray-100 hover:border-blue-500
                           hover:shadow-xl transition-all duration-300 group cursor-pointer
                           animate-fade-up animate-delay-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 mx-auto
                            rounded-full flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform">
              <LightBulbIcon className="h-8 w-8 text-white" />
            </div>
            <Typography variant="h5" className="font-bold text-gray-800 mb-2"
                        placeholder={undefined}>
              Innovación
            </Typography>
            <Typography className="text-gray-600 text-sm" placeholder={undefined}>
              Tecnología de vanguardia para mantener tu negocio competitivo
            </Typography>
          </Card>

          <Card className="p-6 text-center border-2 border-gray-100 hover:border-blue-500
                           hover:shadow-xl transition-all duration-300 group cursor-pointer
                           animate-fade-up animate-delay-400">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 mx-auto
                            rounded-full flex items-center justify-center mb-4
                            group-hover:scale-110 transition-transform">
              <UserGroupIcon className="h-8 w-8 text-white" />
            </div>
            <Typography variant="h5" className="font-bold text-gray-800 mb-2"
                        placeholder={undefined}>
              Soporte
            </Typography>
            <Typography className="text-gray-600 text-sm" placeholder={undefined}>
              Acompañamiento constante en cada etapa de tu proyecto
            </Typography>
          </Card>
        </div>
      </div>
    </div>

    {/* Productos y Soluciones con Tabs */}
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                        placeholder={undefined} id="productos-soluciones">
              Nuestros Productos y Soluciones
            </Typography>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <Typography className="text-gray-600 max-w-2xl mx-auto" placeholder={undefined}>
              Tecnología integral para cada necesidad de tu negocio
            </Typography>
          </div>

          <Tabs value="seguridad">
            <TabsHeader className="bg-white shadow-md" placeholder={undefined}>
              {tabsData.map(({ label, value, icon: Icon }) => (
                <Tab key={value} value={value} className="text-base" placeholder={undefined}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>

            <TabsBody placeholder={undefined}>
              {/* Tab Seguridad */}
              <TabPanel value="seguridad" className="px-0">
                <Typography className="text-gray-600 mb-8 text-center" placeholder={undefined}>
                  Ofrecemos sistemas de seguridad avanzados para diferentes sectores del mercado hondureño
                </Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tabsData[0].content.map((item, index) => (
                    <Card key={index} className="overflow-hidden border-0 shadow-lg
                                                  hover:shadow-xl hover:-translate-y-2
                                                  transition-all duration-300">
                      <div className="relative h-48">
                        <Image
                          src={item.image}
                          fill
                          className="object-cover"
                          alt={item.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full
                                          flex items-center justify-center mb-2">
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <Typography variant="h5" className="font-bold text-gray-800 mb-3"
                                    placeholder={undefined}>
                          {item.title}
                        </Typography>
                        <Typography className="text-gray-600 text-sm leading-relaxed"
                                    placeholder={undefined}>
                          {item.description}
                        </Typography>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPanel>

              {/* Tab Redes */}
              <TabPanel value="redes" className="px-0">
                <Typography className="text-gray-600 mb-8 text-center" placeholder={undefined}>
                  Infraestructura de redes profesionales para empresas y proveedores de internet en Honduras
                </Typography>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="overflow-hidden shadow-xl border-0">
                    <div className="relative h-96">
                      <video
                        className='w-full h-full object-cover'
                        autoPlay
                        muted
                        loop
                        aria-label="Video demostrativo de productos WISP para proveedores de internet"
                      >
                        <source src="/videos/uisp.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full
                                          flex items-center justify-center">
                            <WifiIcon className="h-6 w-6 text-white" />
                          </div>
                          <Typography variant="h4" className="text-white font-bold"
                                      placeholder={undefined}>
                            Productos WISP
                          </Typography>
                        </div>
                        <Typography className="text-white" placeholder={undefined}>
                          Contamos con todos los productos que necesitas para montar tu propia
                          empresa WISP en Honduras
                        </Typography>
                      </div>
                    </div>
                  </Card>

                  <Card className="overflow-hidden shadow-xl border-0">
                    <div className="relative h-96">
                      <video
                        className='w-full h-full object-cover'
                        autoPlay
                        muted
                        loop
                        aria-label="Video demostrativo de redes corporativas empresariales"
                      >
                        <source src="/videos/networking.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-full
                                          flex items-center justify-center">
                            <GlobeAltIcon className="h-6 w-6 text-white" />
                          </div>
                          <Typography variant="h4" className="text-white font-bold"
                                      placeholder={undefined}>
                            Redes Corporativas
                          </Typography>
                        </div>
                        <Typography className="text-white" placeholder={undefined}>
                          Te brindamos todo lo necesario para escalar tu red corporativa al
                          siguiente nivel con tecnología de punta
                        </Typography>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabPanel>

              {/* Tab Cableado */}
              <TabPanel value="cableado" className="px-0">
                <Card className="overflow-hidden shadow-2xl border-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative h-96 md:h-auto">
                      <Image
                        src='/images/backgrounds/cableado-estructurado-smart-business.jpg'
                        fill
                        className="object-cover"
                        alt='Proyectos de cableado estructurado profesional en Honduras - Smart Business'
                      />
                    </div>
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-12
                                    flex flex-col justify-center text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full
                                      flex items-center justify-center mb-6">
                        <SignalIcon className="h-8 w-8 text-white" />
                      </div>
                      <Typography variant="h3" className="text-white text-3xl font-bold mb-6"
                                  placeholder={undefined}>
                        Cableado Estructurado Profesional
                      </Typography>
                      <Typography className="text-blue-100 mb-6 text-lg leading-relaxed"
                                  placeholder={undefined}>
                        Te brindamos todo lo que necesitas para ejecutar tu proyecto de cableado
                        estructurado a precios altamente competitivos en Honduras.
                      </Typography>
                      <Typography className="text-blue-100 mb-8 leading-relaxed"
                                  placeholder={undefined}>
                        Y en caso de que no tengas quien lo desarrolle, podemos brindarte descuentos
                        importantes al ejecutar el proyecto por ti con garantía de calidad.
                      </Typography>
                      <div>
                        <Button
                          size="lg"
                          className="bg-white text-blue-600 hover:bg-blue-50
                                     shadow-xl hover:shadow-2xl transition-all"
                          placeholder={undefined}
                        >
                          <Link href="/contacto">
                            Solicitar Cotización
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </div>

    {/* Por Qué Elegirnos */}
    <div className="container mx-auto px-5 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                      placeholder={undefined}>
            ¿Por Qué Elegir SMART Business?
          </Typography>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center shadow-lg border-0 hover:shadow-xl
                           transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 mx-auto
                            rounded-2xl flex items-center justify-center mb-6
                            transform hover:rotate-6 transition-transform">
              <Typography variant="h2" className="text-white text-3xl font-bold"
                          placeholder={undefined}>
                15+
              </Typography>
            </div>
            <Typography variant="h5" className="font-bold text-gray-800 mb-3"
                        placeholder={undefined}>
              Años de Experiencia
            </Typography>
            <Typography className="text-gray-600" placeholder={undefined}>
              Más de una década ofreciendo soluciones tecnológicas confiables
            </Typography>
          </Card>

          <Card className="p-8 text-center shadow-lg border-0 hover:shadow-xl
                           transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 mx-auto
                            rounded-2xl flex items-center justify-center mb-6
                            transform hover:rotate-6 transition-transform">
              <CheckBadgeIcon className="h-12 w-12 text-white" />
            </div>
            <Typography variant="h5" className="font-bold text-gray-800 mb-3"
                        placeholder={undefined}>
              Garantía de Calidad
            </Typography>
            <Typography className="text-gray-600" placeholder={undefined}>
              Productos certificados y soporte técnico profesional
            </Typography>
          </Card>

          <Card className="p-8 text-center shadow-lg border-0 hover:shadow-xl
                           transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 mx-auto
                            rounded-2xl flex items-center justify-center mb-6
                            transform hover:rotate-6 transition-transform">
              <UserGroupIcon className="h-12 w-12 text-white" />
            </div>
            <Typography variant="h5" className="font-bold text-gray-800 mb-3"
                        placeholder={undefined}>
              Clientes Satisfechos
            </Typography>
            <Typography className="text-gray-600" placeholder={undefined}>
              Cientos de empresas confían en nosotros para sus necesidades
            </Typography>
          </Card>
        </div>
      </div>
    </div>

    {/* Clientes Mejorado */}
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Typography variant="h2" className="text-4xl font-bold text-gray-800 mb-4"
                        placeholder={undefined}>
              Clientes que Confían en Nosotros
            </Typography>
            <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
            <Typography className="text-gray-600 max-w-2xl mx-auto" placeholder={undefined}>
              Más de 15 años sirviendo a empresas líderes en Honduras con soluciones tecnológicas de calidad
            </Typography>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
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
            ].map((client, index) => (
              <Card key={index} className="flex items-center justify-center p-6 bg-white
                                           hover:shadow-xl hover:scale-105 transition-all
                                           duration-300 border-0 cursor-pointer">
                <Image
                  src={client.src}
                  width={client.width}
                  height={client.height}
                  alt={client.alt}
                  className="object-contain max-h-16"
                />
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block p-8 bg-gradient-to-r from-blue-600 to-blue-800
                             border-0 shadow-2xl animate-bounce">
              <Typography variant="h4" className="text-white font-bold"
                          placeholder={undefined}>
                ¡Próximamente Tu Empresa!
              </Typography>
            </Card>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Final */}
    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 py-20">
      <div className="container mx-auto px-5 text-center">
        <Typography variant="h2" className="text-white text-4xl md:text-5xl font-bold mb-6"
                    placeholder={undefined}>
          ¿Listo para Impulsar tu Negocio?
        </Typography>
        <Typography className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto"
                    placeholder={undefined}>
          Únete a más de 500 empresas que confían en SMART Business para sus
          soluciones tecnológicas
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
            <Link href="/catalogo">
              Ver Catálogo
            </Link>
          </Button>
        </div>
      </div>
    </div>
    </>
    );
}
