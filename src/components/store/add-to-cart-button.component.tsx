//@ts-nocheck
'use client';
import { useState } from 'react';
import { Button, Alert } from '@/utils/MTailwind';
import { addProductToCart } from '@/services/cart.service';
import { useSession } from 'next-auth/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleAddToCart = async () => {
    if (!session?.user?.id) {
      setError('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await addProductToCart(
        productId,
        1, // Cantidad por defecto
        session.user.id,
        undefined
      );

      if (response.succeeded && response.data) {
        setSuccess(`${productName} agregado al carrito exitosamente`);
        onSuccess?.(response.data.id);
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorMessage = response.message || 'Error al agregar el producto al carrito';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      const errorMessage = 'Error de conexión. Por favor, intenta de nuevo.';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
    </div>
  );
}
