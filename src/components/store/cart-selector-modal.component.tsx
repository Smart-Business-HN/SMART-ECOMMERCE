'use client';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography, Card, Spinner } from '@/utils/MTailwind';
import { CartDto } from '@/interfaces/cart/cart.interface';
import { formatNumber } from '@/utils/number-format';
import { PlusCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

interface CartSelectorModalProps {
  open: boolean;
  carts: CartDto[];
  productName: string;
  isAdding: boolean;
  onSelect: (cartId: string) => void;
  onCreateNew: () => void;
  onClose: () => void;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function calculateCartTotal(cart: CartDto) {
  if (!cart.cartItems) return 0;
  return cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
}

export default function CartSelectorModal({
  open,
  carts,
  productName,
  isAdding,
  onSelect,
  onCreateNew,
  onClose
}: CartSelectorModalProps) {
  return (
    <Dialog open={open} handler={onClose} size="md">
      <DialogHeader className="flex flex-col items-start gap-1">
        <Typography variant="h5" color="blue-gray">
          Seleccionar Carrito
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Elige en cual carrito deseas agregar <strong>{productName}</strong>
        </Typography>
      </DialogHeader>

      <DialogBody className="max-h-[60vh] overflow-y-auto space-y-3">
        {carts.map((cart) => (
          <Card
            key={cart.id}
            className="p-4 cursor-pointer border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200"
            onClick={() => !isAdding && onSelect(cart.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingCartIcon className="h-6 w-6 text-blue-gray-500" />
                <div>
                  <Typography variant="h6" color="blue-gray" className="text-sm">
                    Carrito #{cart.id.slice(-8)}
                  </Typography>
                  <Typography variant="small" color="gray">
                    {formatDate(cart.creationDate)} - {cart.cartItems?.length || 0} productos
                  </Typography>
                </div>
              </div>
              <div className="text-right">
                <Typography variant="h6" color="green" className="text-sm">
                  L. {formatNumber(calculateCartTotal(cart))}
                </Typography>
                <Button
                  size="sm"
                  color="blue"
                  variant="outlined"
                  className="mt-1"
                  disabled={isAdding}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    onSelect(cart.id);
                  }}
                >
                  {isAdding ? <Spinner className="h-4 w-4" /> : 'Agregar aqui'}
                </Button>
              </div>
            </div>
          </Card>
        ))}

        <div className="border-t border-gray-200 pt-3">
          <Card
            className="p-4 cursor-pointer border border-dashed border-gray-300 hover:border-blue-400 hover:shadow-md transition-all duration-200"
            onClick={() => !isAdding && onCreateNew()}
          >
            <div className="flex items-center justify-center gap-2">
              <PlusCircleIcon className="h-6 w-6 text-blue-500" />
              <Typography variant="h6" color="blue" className="text-sm">
                Crear nuevo carrito
              </Typography>
            </div>
          </Card>
        </div>
      </DialogBody>

      <DialogFooter>
        <Button variant="text" color="gray" onClick={onClose} disabled={isAdding}>
          Cancelar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
