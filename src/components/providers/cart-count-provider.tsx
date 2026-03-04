'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { getCartsByCustomerId } from '@/services/cart.service';

interface CartCountContextType {
  cartItemsCount: number;
  refreshCartCount: () => Promise<void>;
}

const CartCountContext = createContext<CartCountContextType>({
  cartItemsCount: 0,
  refreshCartCount: async () => {},
});

export function useCartCount() {
  return useContext(CartCountContext);
}

export default function CartCountProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const refreshCartCount = useCallback(async () => {
    if (!session?.user?.id) {
      setCartItemsCount(0);
      return;
    }

    try {
      const response = await getCartsByCustomerId(session.user.id);
      if (response.succeeded && response.data) {
        const total = response.data.reduce(
          (sum, cart) => sum + (cart.cartItems?.length || 0),
          0
        );
        setCartItemsCount(total);
      }
    } catch (error) {
      console.error('Error fetching cart count:', error);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (status === 'authenticated') {
      refreshCartCount();
    } else {
      setCartItemsCount(0);
    }
  }, [status, refreshCartCount]);

  return (
    <CartCountContext.Provider value={{ cartItemsCount, refreshCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}
