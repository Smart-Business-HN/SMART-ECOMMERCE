'use client';
import { useState } from 'react';
import { CartDto } from '@/interfaces/cart/cart.interface';
import { getCartsByCustomerId, addProductToCart, AddProductToCartResponse } from '@/services/cart.service';
import { useCartCount } from '@/components/providers/cart-count-provider';

interface PendingProduct {
  id: number;
  name: string;
  quantity: number;
}

export function useCartSelection(customerId: string | undefined) {
  const { refreshCartCount } = useCartCount();
  const [carts, setCarts] = useState<CartDto[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<PendingProduct | null>(null);
  const [isLoadingCarts, setIsLoadingCarts] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const initiateAddToCart = async (
    productId: number,
    quantity: number,
    productName: string
  ): Promise<AddProductToCartResponse | null> => {
    if (!customerId) return null;

    setIsLoadingCarts(true);
    try {
      const cartsResponse = await getCartsByCustomerId(customerId);
      const activeCarts = cartsResponse.succeeded && cartsResponse.data ? cartsResponse.data : [];

      if (activeCarts.length <= 1) {
        // 0 or 1 cart: add directly (current behavior)
        const result = await addProductToCart(productId, quantity, customerId);
        if (result.succeeded) refreshCartCount();
        return result;
      }

      // Multiple carts: show modal
      setCarts(activeCarts);
      setPendingProduct({ id: productId, name: productName, quantity });
      setShowModal(true);
      return null;
    } finally {
      setIsLoadingCarts(false);
    }
  };

  const confirmCartSelection = async (cartId: string): Promise<AddProductToCartResponse | null> => {
    if (!pendingProduct || !customerId) return null;

    setIsAdding(true);
    try {
      const result = await addProductToCart(
        pendingProduct.id,
        pendingProduct.quantity,
        customerId,
        cartId
      );
      if (result.succeeded) refreshCartCount();
      setShowModal(false);
      setPendingProduct(null);
      return result;
    } finally {
      setIsAdding(false);
    }
  };

  const confirmNewCart = async (): Promise<AddProductToCartResponse | null> => {
    if (!pendingProduct || !customerId) return null;

    setIsAdding(true);
    try {
      const result = await addProductToCart(
        pendingProduct.id,
        pendingProduct.quantity,
        customerId,
        undefined,
        true // forceNewCart
      );
      if (result.succeeded) refreshCartCount();
      setShowModal(false);
      setPendingProduct(null);
      return result;
    } finally {
      setIsAdding(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPendingProduct(null);
  };

  return {
    showModal,
    carts,
    isLoadingCarts,
    isAdding,
    pendingProduct,
    initiateAddToCart,
    confirmCartSelection,
    confirmNewCart,
    closeModal
  };
}
