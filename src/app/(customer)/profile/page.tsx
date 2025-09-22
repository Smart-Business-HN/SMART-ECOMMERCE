import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserById } from '@/services/auth.service';
import ProfileLayout from '@/components/customer/profile-layout.component';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mi Perfil | SMART BUSINESS - Gestión de Cuenta',
  description: 'Gestiona tu información personal, carritos de compra, cotizaciones y preferencias de cuenta en SMART BUSINESS.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    title: 'Mi Perfil | SMART BUSINESS',
    description: 'Gestiona tu información personal y preferencias de cuenta.',
    type: 'website',
    siteName: 'SMART BUSINESS',
    locale: 'es_HN',
  },
  twitter: {
    card: 'summary',
    title: 'Mi Perfil | SMART BUSINESS',
    description: 'Gestiona tu información personal y preferencias de cuenta.',
  },
  other: {
    'DC.title': 'Mi Perfil - SMART BUSINESS',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Perfil de Usuario, Gestión de Cuenta, E-commerce',
    'DC.description': 'Gestiona tu información personal, carritos de compra, cotizaciones y preferencias de cuenta.',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.type': 'WebPage',
    'DC.format': 'text/html',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
  },
};

export default async function ProfilePage() {
  // Verificar autenticación
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/login');
  }
  // Obtener datos del usuario
  const userResponse = await getUserById(session.user.id);
  if (!userResponse.succeeded || !userResponse.data) {
    console.error('Error fetching user data:', userResponse.message);
    // Redirigir a login si no se pueden obtener los datos
    redirect('/login');
  }

  return (
    <ProfileLayout user={userResponse.data} />
  );
}