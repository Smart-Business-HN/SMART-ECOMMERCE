//@ts-nocheck
'use client';
import { Card, Typography, Button, IconButton, Spinner, Alert } from "@/utils/MTailwind";
import { ProductDto } from "@/interfaces/product/product.interface";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/utils/number-format";
import { ShoppingCartIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCartSelection } from "@/hooks/useCartSelection";
import CartSelectorModal from "@/components/store/cart-selector-modal.component";

interface ProductsGridProps {
  products: ProductDto[];
}

// Iconos para las alertas
const SuccessIcon = () => (
  <CheckCircleIcon className="h-6 w-6" />
);

const ErrorIcon = () => (
  <ExclamationTriangleIcon className="h-6 w-6" />
);

const WarningIcon = () => (
  <ExclamationTriangleIcon className="h-6 w-6" />
);

export default function ProductsGrid({ products }: ProductsGridProps) {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const router = useRouter();
  const [loadingProducts, setLoadingProducts] = useState<Set<number>>(new Set());
  const [alert, setAlert] = useState<{
    show: boolean;
    type: 'success' | 'error' | 'warning';
    message: string;
    isClosing: boolean;
  }>({
    show: false,
    type: 'success',
    message: '',
    isClosing: false
  });

  const cartSelection = useCartSelection(session?.user?.id);

  // Funcion para mostrar alertas
  const showAlert = (type: 'success' | 'error' | 'warning', message: string) => {
    setAlert({
      show: true,
      type,
      message,
      isClosing: false
    });

    // Auto-ocultar la alerta despues de 5 segundos
    setTimeout(() => {
      closeAlert();
    }, 5000);
  };

  // Funcion para cerrar la alerta con animacion
  const closeAlert = () => {
    // Iniciar animacion de cierre
    setAlert(prev => ({ ...prev, isClosing: true }));

    // Ocultar completamente despues de la animacion (1.5s)
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false, isClosing: false }));
    }, 1500);
  };

  const handleAddToCart = async (productId: number) => {
    if (!session?.user?.id) {
      showAlert('warning', 'Debes iniciar sesión para agregar productos al carrito');
      setTimeout(() => router.push('/login'), 2000);
      return;
    }

    const product = products.find(p => p.id === productId);
    const productName = product?.name || 'Producto';

    // Agregar el producto al estado de loading
    setLoadingProducts(prev => new Set(prev).add(productId));

    try {
      const result = await cartSelection.initiateAddToCart(productId, 1, productName);

      if (result) {
        // Direct add (0 or 1 cart)
        if (result.succeeded) {
          showAlert('success', 'Producto agregado al carrito');
        } else {
          showAlert('error', result.message || 'Error al agregar el producto al carrito');
        }
      }
      // If null, modal is shown - wait for user selection
    } catch (error) {
      console.error('Error adding product to cart:', error);
      showAlert('error', 'Error al agregar el producto al carrito');
    } finally {
      // Remover el producto del estado de loading
      setLoadingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleCartSelected = async (cartId: string) => {
    try {
      const result = await cartSelection.confirmCartSelection(cartId);
      if (result) {
        if (result.succeeded) {
          showAlert('success', 'Producto agregado al carrito');
        } else {
          showAlert('error', result.message || 'Error al agregar el producto al carrito');
        }
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      showAlert('error', 'Error al agregar el producto al carrito');
    }
  };

  const handleCreateNewCart = async () => {
    try {
      const result = await cartSelection.confirmNewCart();
      if (result) {
        if (result.succeeded) {
          showAlert('success', 'Producto agregado a un nuevo carrito');
        } else {
          showAlert('error', result.message || 'Error al crear nuevo carrito');
        }
      }
    } catch (error) {
      console.error('Error creating new cart:', error);
      showAlert('error', 'Error al crear nuevo carrito');
    }
  };

  // Funcion para obtener el icono segun el tipo de alerta
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      default:
        return <SuccessIcon />;
    }
  };

  return (
    <div>
      {/* Alerta de Material Tailwind */}
      {alert.show && (
        <div className={`mb-6 transition-all duration-1500 ease-in-out transform ${
          alert.isClosing
            ? 'opacity-0 scale-95 translate-y-[-10px]'
            : 'opacity-100 scale-100 translate-y-0'
        }`}>
          <Alert
            icon={getAlertIcon()}
            color={alert.type === 'success' ? 'green' : alert.type === 'error' ? 'red' : 'amber'}
            className="relative"
            action={
              <IconButton
                variant="text"
                color="white"
                size="sm"
                className="!absolute top-3 right-3"
                onClick={closeAlert}>
                <XMarkIcon className="h-4 w-4" />
              </IconButton>
            }
          >
            {alert.message}
          </Alert>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <Card key={product.id} className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-4">
            <div className="flex justify-center items-center mb-4">
              {
                isLoggedIn &&
                <button
                  className="absolute top-2 bg-white hover:bg-blue-100 right-2 border border-solid border-blue-400 rounded-lg p-1 z-10 shadow-md"
                  onClick={() => handleAddToCart(product.id)}
                  disabled={loadingProducts.has(product.id) || cartSelection.isLoadingCarts}>
                   {(loadingProducts.has(product.id) || cartSelection.isLoadingCarts) ? (
                     <Spinner className="w-6 h-6 text-blue-gray-700" color="blue"/>
                   ) : (
                     <ShoppingCartIcon className="w-6 h-6 text-blue-gray-700" />
                   )}
                </button>
              }
              <Image
                src={product.productImages?.[0]?.url || "/images/products/no-image-available-icon-vector.webp"}
                alt={product.name}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <h6  className="mb-2 line-clamp-2 font-semibold text-center">
              {product.name}
            </h6>
            <p  className="mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-center items-center mb-4">
              <Typography variant="h6" color="blue-gray" className="font-bold text-center">
                L. {formatNumber(product.recomendedSalePrice)}
              </Typography>
              {/* <Typography variant="small" color="gray">
                Stock: {product.currentStock}
              </Typography> */}
            </div>
            <Link href={`/tienda/${product.subCategory?.category?.slug}/${product.subCategory?.slug}/${product.slug}`} className="w-full block">
              <Button size="sm" className="w-full" color="blue">
                Ver Detalles
              </Button>
            </Link>
          </div>
        </Card>
      ))}
      </div>

      <CartSelectorModal
        open={cartSelection.showModal}
        carts={cartSelection.carts}
        productName={cartSelection.pendingProduct?.name || ''}
        isAdding={cartSelection.isAdding}
        onSelect={handleCartSelected}
        onCreateNew={handleCreateNewCart}
        onClose={cartSelection.closeModal}
      />
    </div>
  );
}
