import Link from "next/link";
import { Metadata } from 'next';
import ContactForm from '@/components/contact/contact-form.component';

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

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CHANNELS = [
  {
    label: 'Teléfono',
    value: '(+504) 2445-1515',
    href: 'tel:+50424451515',
    sub: '(+504) 8818-7765 · WhatsApp',
    icon: (
      <svg {...iconProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Correo',
    value: 'ventas@smartbusiness.site',
    href: 'mailto:ventas@smartbusiness.site',
    sub: 'Respuesta el mismo día hábil',
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </svg>
    ),
  },
  {
    label: 'Ubicación',
    value: 'San Pedro Sula, Cortés',
    sub: 'Honduras · envíos a todo el país',
    icon: (
      <svg {...iconProps}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Horario',
    value: 'Lunes a Viernes',
    sub: '8:00 a.m. – 5:00 p.m.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

export default function Contact() {
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
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
          }
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Pedro Sula",
        "addressRegion": "Cortés",
        "addressCountry": "HN"
      },
      "sameAs": [
        "https://www.facebook.com/SmartBusiness504",
        "https://www.instagram.com/smartbusiness504/"
      ]
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.smartbusiness.site/contacto"
    }
  };

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb + hero */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-14 pb-6">
        <nav aria-label="Breadcrumb" className="text-[13px] text-ink2-400 mb-3.5">
          <Link href="/" className="sb-link hover:text-accent">Inicio</Link>
          <span className="mx-1.5">/</span>
          <span className="text-text font-medium">Contacto</span>
        </nav>
        <h1 className="text-[34px] md:text-[44px] tracking-[-0.035em] font-bold mb-3 text-text">
          Hablemos
        </h1>
        <p className="text-[17px] text-ink2-500 max-w-[560px] leading-[1.55]">
          Cotizaciones, soporte o asesoría técnica. Escríbenos y un asesor te
          responde el mismo día hábil.
        </p>
      </div>

      {/* Info cards + form */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-8 pb-[88px] grid grid-cols-1 lg:grid-cols-[1fr_1.25fr] gap-12 items-start">
        {/* Contact channels */}
        <div className="flex flex-col gap-3.5">
          {CHANNELS.map((c) => (
            <div
              key={c.label}
              className="sb-contact flex gap-4 items-start border border-line rounded-2xl p-[22px] bg-white"
            >
              <span className="w-[46px] h-[46px] rounded-xl bg-accent-soft text-accent flex items-center justify-center flex-none">
                {c.icon}
              </span>
              <div>
                <div className="text-[13px] font-bold tracking-[0.04em] uppercase text-ink2-400 mb-1.5">
                  {c.label}
                </div>
                {c.href ? (
                  <a
                    href={c.href}
                    className="sb-link text-[15.5px] font-semibold text-text leading-[1.5] hover:text-accent"
                  >
                    {c.value}
                  </a>
                ) : (
                  <div className="text-[15.5px] font-semibold text-text leading-[1.5]">
                    {c.value}
                  </div>
                )}
                {c.sub && (
                  <div className="text-[13.5px] text-ink2-500 mt-0.5">{c.sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-white border border-line rounded-container p-6 sm:p-9 shadow-[0_1px_3px_rgba(10,14,30,0.04)]">
          <h2 className="text-[22px] tracking-[-0.02em] font-bold mb-1.5 text-text">
            Envíanos un mensaje
          </h2>
          <p className="text-[14.5px] text-ink2-500 mb-[26px]">
            Completa el formulario y te contactamos a la brevedad.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
