import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth.config';
import { getCartById } from '@/services/cart.service';
import CheckoutPageClient from '@/components/customer/checkout-page-client.component';

interface CheckoutPageProps {
  params: Promise<{ cartId: string }>;
}

export const metadata: Metadata = {
  title: 'Checkout | SMART BUSINESS',
  description: 'Completa tu compra seleccionando tu método de pago preferido.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const { cartId } = await params;

  const cartResponse = await getCartById(cartId);

  if (!cartResponse.succeeded || !cartResponse.data) {
    redirect('/profile?tab=carts');
  }

  return (
    <CheckoutPageClient
      cart={cartResponse.data}
      user={{
        id: session.user.id,
        name: session.user.name || '',
        email: session.user.email || '',
      }}
    />
  );
}
