import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Iniciar Sesión | SMART BUSINESS - Autenticación',
    template: '%s | SMART BUSINESS'
  },
  description: 'Accede a tu cuenta de SMART BUSINESS con tu usuario o email. Gestiona tus compras, carritos y preferencias de usuario.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    title: 'Acceso de Usuario | SMART BUSINESS',
    description: 'Accede a tu cuenta de SMART BUSINESS para gestionar tus compras y preferencias.',
    type: 'website',
    siteName: 'SMART BUSINESS',
    locale: 'es_HN',
  },
  twitter: {
    card: 'summary',
    title: 'Acceso de Usuario | SMART BUSINESS',
    description: 'Accede a tu cuenta de SMART BUSINESS para gestionar tus compras y preferencias.',
  },
  other: {
    'DC.title': 'Acceso de Usuario - SMART BUSINESS',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Autenticación, Login, Registro, E-commerce',
    'DC.description': 'Accede a tu cuenta de SMART BUSINESS para gestionar tus compras, carritos y preferencias de usuario.',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.type': 'WebPage',
    'DC.format': 'text/html',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
  },
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
