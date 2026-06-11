'use client';
import { useState } from 'react';
import { CartDto } from '@/interfaces/cart/cart.interface';
import { getCartsByCustomerId, addProductToCart, AddProductToCartResponse } from '@/services/cart.service';
import { useCartCount } from '@/components/providers/cart-count-provider';
import { trackFbEvent } from '@/lib/meta/fbpixel';
import { buildProductCustomData } from '@/lib/meta/meta-custom-data';

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

  // Meta Pixel: AddToCart. Centralizado aquí para cubrir TODAS las vías de
  // agregado (botón de producto y grid) una sola vez. El SKU (code) y el
  // unitPrice se leen del carrito devuelto por el backend, que ya incluye el
  // producto. Dispara navegador + Conversions API con un event_id compartido.
  const fireAddToCart = (addedProductId: number, quantityAdded: number, cart: CartDto | undefined) => {
    const item = cart?.cartItems?.find((cartItem) => cartItem.productId === addedProductId);
    if (!item) return;
    const code = item.product?.code?.trim() || String(addedProductId);
    const customData = buildProductCustomData(
      [{ code, quantity: quantityAdded, unitPrice: item.unitPrice }],
      { contentName: item.product?.name },
    );
    trackFbEvent('AddToCart', customData);
  };

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
        if (result.succeeded) {
          refreshCartCount();
          fireAddToCart(productId, quantity, result.data);
        }
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
      if (result.succeeded) {
        refreshCartCount();
        fireAddToCart(pendingProduct.id, pendingProduct.quantity, result.data);
      }
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
      if (result.succeeded) {
        refreshCartCount();
        fireAddToCart(pendingProduct.id, pendingProduct.quantity, result.data);
      }
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
