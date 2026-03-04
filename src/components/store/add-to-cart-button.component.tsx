//@ts-nocheck
'use client';
import { useState } from 'react';
import { Button, Alert } from '@/utils/MTailwind';
import { useSession } from 'next-auth/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCartSelection } from '@/hooks/useCartSelection';
import CartSelectorModal from '@/components/store/cart-selector-modal.component';
import { AddProductToCartResponse } from '@/services/cart.service';

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outlined' | 'gradient' | 'text';
  color?: 'blue' | 'red' | 'green' | 'amber' | 'purple' | 'teal' | 'cyan' | 'pink' | 'indigo' | 'gray';
  onSuccess?: (cartId: string) => void;
  onError?: (message: string) => void;
}

export default function AddToCartButton({
  productId,
  productName,
  disabled = false,
  className = '',
  size = 'lg',
  variant = 'filled',
  color = 'blue',
  onSuccess,
  onError
}: AddToCartButtonProps) {
  const { data: session } = useSession();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const cartSelection = useCartSelection(session?.user?.id);

  const handleResult = (response: AddProductToCartResponse) => {
    if (response.succeeded && response.data) {
      setSuccess(`${productName} agregado al carrito exitosamente`);
      onSuccess?.(response.data.id);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      const errorMessage = response.message || 'Error al agregar el producto al carrito';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      setError('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    setError('');
    setSuccess('');

    try {
      const result = await cartSelection.initiateAddToCart(productId, 1, productName);
      if (result) {
        handleResult(result);
      }
      // If null, modal is shown - wait for user selection
    } catch (error) {
      console.error('Error adding product to cart:', error);
      const errorMessage = 'Error de conexión. Por favor, intenta de nuevo.';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  };

  const handleCartSelected = async (cartId: string) => {
    try {
      const result = await cartSelection.confirmCartSelection(cartId);
      if (result) handleResult(result);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    }
  };

  const handleCreateNewCart = async () => {
    try {
      const result = await cartSelection.confirmNewCart();
      if (result) handleResult(result);
    } catch (error) {
      console.error('Error creating new cart:', error);
      setError('Error de conexión. Por favor, intenta de nuevo.');
    }
  };

  const isLoading = cartSelection.isLoadingCarts;

  return (
    <div className="space-y-2">
      <Button
        size={size}
        variant={variant}
        color={color}
        className={`flex items-center justify-center ${className}`}
        disabled={disabled || isLoading}
        onClick={handleAddToCart}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Agregando...
          </>
        ) : (
          <>
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            {disabled ? 'Sin Stock' : 'Agregar al Carrito'}
          </>
        )}
      </Button>

      {error && (
        <Alert color="red" className="text-sm">
          {error}
        </Alert>
      )}

      {success && (
        <Alert color="green" className="text-sm">
          {success}
        </Alert>
      )}

      <CartSelectorModal
        open={cartSelection.showModal}
        carts={cartSelection.carts}
        productName={cartSelection.pendingProduct?.name || productName}
        isAdding={cartSelection.isAdding}
        onSelect={handleCartSelected}
        onCreateNew={handleCreateNewCart}
        onClose={cartSelection.closeModal}
      />
    </div>
  );
}
