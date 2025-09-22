import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCartById } from '@/services/cart.service';
import CartPageClient from '@/components/customer/cart-page-client.component';

interface CartPageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: 'Mi Carrito | SMART BUSINESS - Gestión de Compras',
  description: 'Gestiona los productos en tu carrito de compras, revisa precios y continúa con tu compra en SMART BUSINESS.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
  openGraph: {
    title: 'Mi Carrito | SMART BUSINESS',
    description: 'Gestiona los productos en tu carrito de compras.',
    type: 'website',
    siteName: 'SMART BUSINESS',
    locale: 'es_HN',
  },
  twitter: {
    card: 'summary',
    title: 'Mi Carrito | SMART BUSINESS',
    description: 'Gestiona los productos en tu carrito de compras.',
  },
  other: {
    'DC.title': 'Mi Carrito - SMART BUSINESS',
    'DC.creator': 'SMART BUSINESS S. DE R.L.',
    'DC.subject': 'Carrito de Compras, E-commerce, Productos',
    'DC.description': 'Gestiona los productos en tu carrito de compras, revisa precios y continúa con tu compra.',
    'DC.publisher': 'SMART BUSINESS S. DE R.L.',
    'DC.type': 'WebPage',
    'DC.format': 'text/html',
    'DC.language': 'es',
    'DC.coverage': 'Honduras',
  },
};

export default async function CartPage({ params }: CartPageProps) {
  // Verificar autenticación
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect('/login');
  }

  const { id } = await params;
  
  // Obtener datos del carrito
  const cartResponse = await getCartById(id);
  
  if (!cartResponse.succeeded || !cartResponse.data) {
    redirect('/profile?tab=carts');
  }

  return <CartPageClient cart={cartResponse.data} />;
}