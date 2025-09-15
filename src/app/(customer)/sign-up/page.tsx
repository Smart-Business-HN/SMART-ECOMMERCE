import React from 'react';
import { departments as departmentsSeed } from '@/utils/seeds/departments.seed';
import { genders as gendersSeed } from '@/utils/seeds/genders.seed';
import type { Metadata } from 'next';
import SignUpForm from '@/components/customer/sign-up-form.component';

// Metadatos SEO para la página de registro
export const metadata: Metadata = {
  title: 'Crear Cuenta | Registro de Usuario | SMART BUSINESS',
  description: 'Regístrate en SMART BUSINESS y accede a soluciones tecnológicas de cableado estructurado, CCTV, fibra óptica y equipos de red. Envío a todo Honduras.',
  keywords: [
    'registro',
    'crear cuenta',
    'usuario',
    'SMART BUSINESS',
    'cableado estructurado',
    'CCTV',
    'fibra óptica',
    'equipos de red',
    'tecnología Honduras',
    'soluciones tecnológicas'
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
    canonical: 'https://smartbusiness.site/sign-up',
  },
  openGraph: {
    title: 'Crear Cuenta | SMART BUSINESS',
    description: 'Regístrate en SMART BUSINESS y accede a soluciones tecnológicas profesionales. Envío a todo Honduras.',
    url: 'https://smartbusiness.site/sign-up',
    siteName: 'SMART BUSINESS',
    locale: 'es_HN',
    type: 'website',
    images: [
      {
        url: 'https://www.smartbusiness.site/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SMART BUSINESS - Registro de Usuario',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crear Cuenta | SMART BUSINESS',
    description: 'Regístrate en SMART BUSINESS y accede a soluciones tecnológicas profesionales.',
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
  classification: 'registration page',
  other: {
    'geo.region': 'HN',
    'geo.placename': 'Honduras',
    'DC.title': 'Crear Cuenta - SMART BUSINESS',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Registro, Usuario, Cableado Estructurado, CCTV, Fibra Óptica, Tecnología',
    'DC.description': 'Regístrate en SMART BUSINESS y accede a soluciones tecnológicas profesionales',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.type': 'WebPage',
    'DC.format': 'text/html',
    'DC.identifier': 'https://smartbusiness.site/sign-up',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
  },
};

export default function SignUpPage() {
  const departments = departmentsSeed;
  const genders = gendersSeed;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Crear Cuenta - SMART BUSINESS",
            "description": "Regístrate en SMART BUSINESS y accede a soluciones tecnológicas de cableado estructurado, CCTV, fibra óptica y equipos de red.",
            "url": "https://smartbusiness.site/sign-up",
            "mainEntity": {
              "@type": "Organization",
              "name": "SMART BUSINESS S. DE R.L.",
              "url": "https://smartbusiness.site",
              "logo": "https://www.smartbusiness.site/images/corporate/logo-smart-business.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+504-8818-7765",
                "email": "consultas@smartbusiness.site",
                "contactType": "customer service"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "HN",
                "addressRegion": "Cortés"
              },
              "sameAs": [
                "https://www.facebook.com/smartbusinesshn",
                "https://www.instagram.com/smartbusinesshn"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://smartbusiness.site"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Crear Cuenta",
                  "item": "https://smartbusiness.site/sign-up"
                }
              ]
            },
            "potentialAction": {
              "@type": "RegisterAction",
              "target": "https://smartbusiness.site/sign-up",
              "object": {
                "@type": "WebPage",
                "name": "Formulario de Registro"
              }
            }
          })
        }}
      />
      
      <div className="flex items-center justify-center bg-gray-50 py-5 md:pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignUpForm departments={departments} genders={genders} />
        </div>
      </div>
    </>
  );
}