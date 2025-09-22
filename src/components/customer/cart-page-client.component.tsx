'use client';
import { useState } from 'react';
import { Card, Typography, Button, Alert, Input, IconButton } from '@/utils/MTailwind';
import { CartDto, CartItemDto } from '@/interfaces/cart/cart.interface';
import { formatNumber } from '@/utils/number-format';
import { 
  ShoppingCartIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  TruckIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

interface CartPageClientProps {
  cart: CartDto;
}

export default function CartPageClient({ cart }: CartPageClientProps) {
  const [cartItems, setCartItems] = useState<CartItemDto[]>(cart.cartItems || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string>('');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const calculateTax = () => {
    // Asumiendo un 15% de impuesto
    return calculateSubtotal() * 0.15;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity, totalPrice: item.unitPrice * newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleUpdateCart = async () => {
    setIsUpdating(true);
    setError('');
    
    try {
      // Aquí iría la lógica para actualizar el carrito en el backend
      console.log('Actualizando carrito...', cartItems);
      // Simular actualización
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error updating cart:', error);
      setError('Error al actualizar el carrito');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCheckout = () => {
    // Aquí iría la lógica para proceder al checkout
    console.log('Procediendo al checkout...');
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link 
              href="/profile?tab=carts"
              className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Volver a Mis Carritos
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h1" color="blue-gray" className="text-2xl md:text-3xl" placeholder="">
                Mi Carrito
              </Typography>
              <Typography color="gray" className="mt-2" placeholder="">
                Carrito #{cart.id.slice(-8)} • Creado el {formatDate(cart.creationDate)}
              </Typography>
            </div>
            
            <div className="flex items-center space-x-2">
              <ShoppingCartIcon className="h-8 w-8 text-blue-600" />
              <span className="text-sm text-gray-500">
                {cartItems.length} producto{cartItems.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <Alert color="red" className="mb-6">
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <Card className="p-8 text-center" placeholder="">
                <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <Typography variant="h6" color="gray" className="mb-2" placeholder="">
                  Tu carrito está vacío
                </Typography>
                <Typography color="gray" className="mb-6" placeholder="">
                  Agrega productos para continuar con tu compra
                </Typography>
                <Link href="/tienda">
                  <Button color="blue" placeholder="">
                    Ir a la Tienda
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="p-6" placeholder="">
                    <div className="flex items-start space-x-4">
                      {/* Imagen del producto */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          {item.product?.productImages && item.product.productImages.length > 0 ? (
                            <Image
                              src={item.product.productImages[0].url}
                              alt={item.product.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400 text-xs">Sin imagen</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <Typography variant="h6" color="blue-gray" className="mb-2" placeholder="">
                          {item.product?.name || 'Producto no disponible'}
                        </Typography>
                        <Typography variant="small" color="gray" className="mb-2" placeholder="">
                          SKU: {item.product?.code || 'N/A'}
                        </Typography>
                        <Typography variant="small" color="gray" className="mb-2" placeholder="">
                          {item.product?.brand?.name || 'Marca no especificada'}
                        </Typography>
                        <div className="flex items-center space-x-4">
                          <Typography variant="h6" color="blue" placeholder="">
                            L. {formatNumber(item.unitPrice)}
                          </Typography>
                          {item.discount && item.discount > 0 && (
                            <Typography variant="small" color="green" placeholder="">
                              Descuento: L. {formatNumber(item.discount)}
                            </Typography>
                          )}
                        </div>
                      </div>

                      {/* Controles de cantidad */}
                      <div className="flex flex-col items-end space-y-4">
                        <div className="flex items-center space-x-2">
                        <div className="relative w-full">
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
          className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        />
        <div className="absolute right-1 top-1 flex gap-0.5">
          <IconButton
            size="sm"
            variant="text"
            className="rounded"
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
            </svg>
          </IconButton>
          <IconButton
            size="sm"
            variant="text"
            className="rounded"
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4"
            >
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </IconButton>
        </div>
      </div>
                        </div>

                        <div className="text-right">
                          <Typography variant="h6" color="blue-gray" placeholder="">
                            L. {formatNumber(item.totalPrice)}
                          </Typography>
                        </div>

                        <Button
                          size="sm"
                          color="red"
                          variant="outlined"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={isUpdating}
                          placeholder=""
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4" placeholder="">
              <Typography variant="h6" color="blue-gray" className="mb-6" placeholder="">
                Resumen del Pedido
              </Typography>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Typography color="gray" placeholder="">
                    Subtotal ({cartItems.length} productos)
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    L. {formatNumber(calculateSubtotal())}
                  </Typography>
                </div>

                <div className="flex justify-between">
                  <Typography color="gray" placeholder="">
                    Impuestos (15%)
                  </Typography>
                  <Typography color="blue-gray" placeholder="">
                    L. {formatNumber(calculateTax())}
                  </Typography>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <Typography variant="h6" color="blue-gray" placeholder="">
                      Total
                    </Typography>
                    <Typography variant="h6" color="blue" placeholder="">
                      L. {formatNumber(calculateTotal())}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  color="blue"
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0 || isUpdating}
                  placeholder=""
                  className="flex items-center justify-center w-full"
                >
                  <CreditCardIcon className="h-5 w-5 mr-2" />
                  Proceder al Pago
                </Button>

                <Button
                  variant="outlined"
                  size="lg"
                  className="w-full"
                  onClick={handleUpdateCart}
                  disabled={isUpdating}
                  placeholder=""
                >
                  {isUpdating ? 'Actualizando...' : 'Actualizar Carrito'}
                </Button>

                <Link href="/tienda" className="block">
                  <Button
                    variant="outlined"
                    size="lg"
                    className="w-full"
                    placeholder=""
                    className="flex items-center justify-center w-full"
                  >
                    <TruckIcon className="h-5 w-5 mr-2" />
                    Seguir Comprando
                  </Button>
                </Link>
              </div>

              {/* Información adicional */}
              <div className="mt-6 pt-6 border-t">
                <Typography variant="small" color="gray" className="text-center" placeholder="">
                  Envío gratuito en compras superiores a L. 5,000
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
