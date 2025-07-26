import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";

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
    
    <div className='container mx-auto max-w-7xl my-5 scroll-smooth'>
        <section className='grid md:grid-cols-2 gap-4 bg-gray-100 rounded-md' aria-labelledby="nuestra-historia">
            <div className='relative'>
                <Image 
                    height={500} 
                    width={600} 
                    className='opacity-80' 
                    alt='Edificios corporativos Smart Business Honduras - Fondo empresarial' 
                    src='/images/backgrounds/background-buildings.png' 
                />
                <div className='absolute top-0 bottom-0 flex w-full justify-center items-center'>
                    <Image 
                        src='/images/corporate/logo-smart-business.png' 
                        width={350} 
                        height={250} 
                        alt='Logo Smart Business Honduras - Distribuidor de tecnología' 
                    />
                </div>
            </div>
            <div className='flex items-center flex-col justify-center'>
                <h1 className='text-center text-gray-700 text-3xl font-bold' id="nuestra-historia">Nuestra Historia</h1>
                <p className='px-5 text-center md:text-left mt-2 text-gray-600 text-[15px] font-medium'>
                    Smart Business surge como una respuesta al mercado hondureño con la intención de brindar precios accesibles a las pequeñas empresas que están dando su primer salto en el mundo digital. Poco a poco nos hemos convertido en proveedores de medianas y grandes empresas por la confianza que hemos generado en nuestros clientes. <br /><br />
                    Con más de 15 años de experiencia en el rubro informático, Smart Business es una empresa cuya única razón de existir es brindar a nuestros clientes el mejor producto para satisfacer sus necesidades, ya sea a integradores o clientes finales. Somos el distribuidor de tecnología más confiable en Honduras.
                </p>
            </div>
        </section>

        {/* Misión y Visión con estructura semántica */}
        <section className='md:px-4 px-5 grid grid-cols-1 md:grid-cols-2 gap-4 mt-10' aria-labelledby="mision-vision">
            <article className='hover:shadow-md border mx-auto h-full mt-0 bg-gradient-to-br from-blue-600 via-sky-600 to-sky-400 rounded-md p-[2px] max-w-md'>
                <div className='flex flex-col py-2 h-full justify-center w-full items-center bg-white rounded-md'>
                    <h2 className='text-gray-700 text-center font-bold text-xl'>Misión</h2>
                    <p className='text-center px-5 mt-2 text-gray-500 text-[14px] font-semibold'>
                        Ser la mayor empresa distribuidora de equipo informático para emprendedores que necesitan el consejo de una empresa de confianza en Honduras. Brindamos soluciones tecnológicas integrales para el crecimiento empresarial.
                    </p>
                </div>
            </article>
            <article className='hover:shadow-md mx-auto border grow bg-gradient-to-br from-blue-600 via-sky-600 to-sky-400 rounded-md p-[2px] max-w-md'>
                <div className='flex flex-col py-2 h-full justify-center w-full items-center bg-white rounded-md'>
                    <h2 className='text-gray-700 text-center font-bold text-xl'>Visión</h2>
                    <p className='text-center px-5 mt-2 text-gray-500 text-[14px] font-semibold'>
                        Nos especializamos en los pequeños y medianos empresarios porque son las personas que rara vez tienen apoyo de parte de otros. Nosotros somos parte de ellos, por lo tanto tenemos la obligación humana de apoyarlos en su camino hacia el éxito tecnológico.
                    </p>
                </div>
            </article>
        </section>

        {/* Sección de Productos con estructura semántica mejorada */}
        <section className='container w-full mt-24 px-5 md:px-0 mx-auto' aria-labelledby="productos-soluciones">
            <h2 className='text-3xl font-bold text-gray-700 text-center' id="productos-soluciones">Nuestros Productos y Soluciones Tecnológicas</h2>
            
            {/* Seguridad */}
            <div className='mt-5'>
                <div>
                    <h3 className='font-bold text-gray-700 text-xl'>Soluciones de Seguridad Integral</h3>
                    <hr className='w-[5%] -mb-1 border-[#1C68E1] border'></hr>
                    <hr className='mt-1'></hr>
                    <p className='text-gray-600 mt-3 text-sm'>Ofrecemos sistemas de seguridad avanzados para diferentes sectores del mercado hondureño.</p>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-10'>
                        <article className='basis-1/4 border border-gray-300 p-5 rounded-md relative hover:shadow-lg transition-shadow'>
                            <Image 
                                className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' 
                                src='/images/backgrounds/public-security-smart-business.jpg' 
                                alt='Sistemas de seguridad pública y ciudades inteligentes en Honduras' 
                                width={300} 
                                height={300} 
                            />
                            <div className='h-[150px]'></div>
                            <h4 className='text-left text-gray-700 font-bold text-md'>Seguridad Pública</h4>
                            <p className='text-left text-gray-500 text-sm'>
                                Ciudades inteligentes y soluciones de tráfico inteligente para la seguridad y la administración urbana. Sistemas de videovigilancia y control de tráfico para municipalidades.
                            </p>
                        </article>
                        <article className='basis-1/4 border border-gray-300 p-5 rounded-md relative hover:shadow-lg transition-shadow'>
                            <Image 
                                className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' 
                                src='/images/backgrounds/business-smart-business.png' 
                                alt='Soluciones de seguridad empresarial y corporativa en Honduras' 
                                width={300} 
                                height={300} 
                            />
                            <div className='h-[150px]'></div>
                            <h4 className='text-left text-gray-700 font-bold text-md'>Seguridad Empresarial</h4>
                            <p className='text-left text-gray-500 text-sm'>
                                Soluciones inteligentes para la seguridad y las operaciones comerciales que abarcan comercio minorista, logística, energía, educación y mucho más. Protección integral para empresas.
                            </p>
                        </article>
                        <article className='basis-1/4 border border-gray-300 p-5 rounded-md relative hover:shadow-lg transition-shadow'>
                            <Image 
                                className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' 
                                src='/images/backgrounds/pymes-smart-business.png' 
                                alt='Sistemas de seguridad para PYMES y pequeñas empresas en Honduras' 
                                width={300} 
                                height={300} 
                            />
                            <div className='h-[150px]'></div>
                            <h4 className='text-left text-gray-700 font-bold text-md'>Seguridad para PYMES</h4>
                            <p className='text-left text-gray-500 text-sm'>
                                Una completa gama de productos de seguridad inteligente, desde videovigilancia, control de acceso e intercomunicación, hasta alarmas y LED. Soluciones accesibles para pequeñas empresas.
                            </p>
                        </article>
                        <article className='basis-1/4 border border-gray-300 p-5 rounded-md relative hover:shadow-lg transition-shadow'>
                            <Image 
                                className='absolute left-0 -top-0 rounded-t-md right-0 object-cover w-full max-h-[150px]' 
                                src='/images/backgrounds/cliente-fina-smart-business.jpg' 
                                alt='Tecnología domótica y hogares inteligentes para consumidores en Honduras' 
                                width={300} 
                                height={300} 
                            />
                            <div className='h-[150px]'></div>
                            <h4 className='text-left text-gray-700 font-bold text-md'>Hogares Inteligentes</h4>
                            <p className='text-left text-gray-500 text-sm'>
                                Hogares inteligentes y electrónica avanzada para todos los consumidores. Domótica, seguridad residencial y entretenimiento inteligente para familias hondureñas.
                            </p>
                        </article>
                    </div>
                </div>
            </div>

            {/* Redes */}
            <div className='mt-24'>
                <div>
                    <h3 className='font-bold text-gray-700 text-xl'>Soluciones de Redes y Conectividad</h3>
                    <hr className='w-[5%] -mb-1 border-[#1C68E1] border'></hr>
                    <hr className='mt-1'></hr>
                    <p className='text-gray-600 mt-3 text-sm'>Infraestructura de redes profesionales para empresas y proveedores de internet en Honduras.</p>
                    
                    <div className='flex flex-col md:flex-row gap-10 mt-5'>
                        <article className='container mt-5 relative'>
                            <h4 className='text-left font-bold text-gray-700 mb-2 md:hidden'>Productos WISP - Proveedores de Internet</h4>
                            <video 
                                className='w-full rounded-md' 
                                autoPlay 
                                muted 
                                loop
                                aria-label="Video demostrativo de productos WISP para proveedores de internet"
                            >
                                <source src="/videos/uisp.mp4" type="video/mp4" />
                            </video>
                            <div className='hidden absolute left-10 p-2 top-10 text-center bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 md:flex gap-2'>
                                <p className='text-white text-xl font-bold'>Productos WISP</p>
                            </div>
                            <div className='md:absolute right-10 p-2 md:bottom-10 left-10 md:text-center md:bg-gray-600 rounded-md bg-clip-padding backdrop-filter md:backdrop-blur-md md:bg-opacity-30 flex gap-2'>
                                <p className='text-gray-700 md:text-white'>Contamos con todos los productos que necesitas para montar tu propia empresa WISP en Honduras</p>
                            </div>
                        </article>
                        <article className='container mt-5 relative'>
                            <h4 className='text-left font-bold text-gray-700 mb-2 md:hidden'>Redes Corporativas Empresariales</h4>
                            <video 
                                className='w-full rounded-md' 
                                autoPlay 
                                muted 
                                loop
                                aria-label="Video demostrativo de redes corporativas empresariales"
                            >
                                <source src="/videos/networking.mp4" type="video/mp4" />
                            </video>
                            <div className='hidden md:absolute left-10 p-2 top-10 text-center bg-gray-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 md:flex gap-2'>
                                <p className='text-white text-xl font-bold'>Redes Corporativas</p>
                            </div>
                            <div className='md:absolute right-10 p-2 md:bottom-10 left-10 md:text-center md:bg-gray-600 rounded-md bg-clip-padding backdrop-filter md:backdrop-blur-md md:bg-opacity-30 flex gap-2'>
                                <p className='text-gray-700 md:text-white'>Te brindamos todo lo necesario para escalar tu red corporativa al siguiente nivel con tecnología de punta</p>
                            </div>
                        </article>
                    </div>
                    
                    {/* Cableado Estructurado */}
                    <div className='rounded-md bg-gray-100 p-5 md:p-10 mt-10'>
                        <div className='w-full grid md:grid-cols-2 gap-5'>
                            <div className='order-2 md:order-1 flex flex-col justify-center'>
                                <h4 className='leading-none text-center text-gray-700 font-bold text-2xl'>Productos y Proyectos de <br /><strong>Cableado Estructurado</strong></h4>
                                <p className='text-gray-500 mt-5 font-normal md:font-semibold text-center'>
                                    Te brindamos todo lo que necesitas para ejecutar tu proyecto de cableado estructurado a precios altamente competitivos en Honduras. Y en caso de que no tengas quien lo desarrolle, podemos brindarte descuentos importantes al ejecutar el proyecto por ti con garantía de calidad.
                                </p>
                                <div className='flex justify-center mt-4'>
                                    <Link 
                                        href='/contacto' 
                                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors'
                                        aria-label="Solicitar cotización para proyectos de cableado estructurado"
                                    >
                                        Solicitar Cotización
                                    </Link>
                                </div>
                            </div>
                            <div className='flex justify-center rounded-md'>
                                <Image 
                                    className='rounded-xl' 
                                    alt='Proyectos de cableado estructurado profesional en Honduras - Smart Business' 
                                    src='/images/backgrounds/cableado-estructurado-smart-business.jpg' 
                                    width={500} 
                                    height={500} 
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clientes */}
            <section className='mt-24'>
                <h3 className='text-3xl font-bold text-gray-700 text-center'>Clientes que Confían en Smart Business Honduras</h3>
                <p className='text-gray-600 text-center mt-3 text-sm'>Más de 15 años sirviendo a empresas líderes en Honduras con soluciones tecnológicas de calidad.</p>
                
                <div className='px-5 md:px-0 grid mt-10 grid-cols-2 md:grid-cols-5 gap-5'>
                    <div className='flex justify-center p-2 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/911.png' width={100} height={50} alt='Sistema de Emergencias 911 Honduras - Cliente Smart Business' />
                    </div>
                    <div className='flex justify-center items-center md:p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/images/clients/acosa-logo.png' width={180} height={40} alt='ACOSA - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center md:p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/images/clients/BAC_Credomatic_logo.svg.png' width={170} height={40} alt='BAC Credomatic - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center md:p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/Grupo-Karims-smart-business.png' width={80} height={50} alt='Grupo Karims - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center md:p-10 items-center rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/images/clients/grupo-platino-smart-business.png' width={190} height={50} alt='Grupo Platino - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/logo_la_quinta_la_ceiba.jpg' width={100} height={50} alt='Hotel La Quinta La Ceiba - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/images/clients/logo-banco-atlantida.png' width={190} height={40} alt='Banco Atlántida - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center items-center p-2 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image className='h-16' src='/images/clients/logo-funda.png' width={200} height={50} alt='Grupo Comidas - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-2 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/municipalidad-de-san-pedro-sula-logo.png' width={100} height={50} alt='Municipalidad de San Pedro Sula - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-2 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/net-laptech.jpeg' width={100} height={50} alt='Net Laptech - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/unnamed.png' width={200} height={50} alt='UNITEC - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/inversiones_aliadas_smart_business.png' width={200} height={50} alt='Inversiones Aliadas - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/logo_de_claro.png' width={200} height={50} alt='Claro Honduras - Cliente Smart Business' />
                    </div>
                    <div className='flex justify-center p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/grupo_ferraro_logo.jpg' width={200} height={50} alt='Grupo Ferraro - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/cortitelas-logo.png' width={200} height={50} alt='Cortitelas - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/ikigai-logo.png' width={200} height={50} alt='Ikigai - Cliente Smart Business Honduras' />
                    </div>
                    <div className='flex justify-center p-10 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <Image src='/images/clients/logo-yude.png' width={200} height={50} alt='YUDE - Cliente Smart Business Honduras' />
                    </div>
                    <div className='md:col-span-2 flex justify-center items-center rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110'>
                        <h5 className='text-center font-bold text-2xl'>¡Muchos Más Clientes Satisfechos!</h5>
                    </div>
                    <div className='col-span-2 md:col-span-5 flex justify-center items-center p-5 rounded-md bg-gray-50 hover:shadow-md transition-all hover:scale-110 animate-bounce'>
                        <h5 className='text-center font-bold text-2xl'>¡Próximamente Tu Empresa!</h5>
                    </div>
                </div>
            </section>
        </section>
    </div>
    </>
    );
}