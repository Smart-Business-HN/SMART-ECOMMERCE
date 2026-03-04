// @ts-nocheck
'use client';
import { useState } from 'react';
import { Card, Typography, Button, Alert, Input, Dialog, DialogHeader, DialogBody, DialogFooter } from '@/utils/MTailwind';
import { CartDto, CartStatus, CartStatusLabels } from '@/interfaces/cart/cart.interface';
import { formatNumber } from '@/utils/number-format';
import {
  CreditCardIcon,
  BuildingLibraryIcon,
  LinkIcon,
  ArrowLeftIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { requestPaymentLink } from '@/services/checkout.service';

interface CheckoutUser {
  id: string;
  name: string;
  email: string;
}

interface CheckoutPageClientProps {
  cart: CartDto;
  user: CheckoutUser;
}

type PaymentOption = 'card' | 'transfer' | 'payment-link' | null;

const BANK_ACCOUNTS = [
  {
    bank: 'BAC Credomatic',
    accountType: 'Cuenta Corriente',
    accountNumber: 'XXXX-XXXX-XXXX',
    holder: 'SMART BUSINESS S. DE R.L.',
    currency: 'Lempiras (HNL)',
    logo: '/images/banks/bac.png',
  },
  {
    bank: 'Banco Atlantida',
    accountType: 'Cuenta Corriente',
    accountNumber: 'XXXX-XXXX-XXXX',
    holder: 'SMART BUSINESS S. DE R.L.',
    currency: 'Lempiras (HNL)',
    logo: '/images/banks/atlantida.png',
  },
];

export default function CheckoutPageClient({ cart, user }: CheckoutPageClientProps) {
  const cartItems = cart.cartItems || [];
  const [selectedOption, setSelectedOption] = useState<PaymentOption>(null);
  const [showCardModal, setShowCardModal] = useState(false);

  // Transfer state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState('');
  const [isSubmittingTransfer, setIsSubmittingTransfer] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferError, setTransferError] = useState('');

  // Payment link state
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmittingLink, setIsSubmittingLink] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [linkError, setLinkError] = useState('');

  const calculateSubtotal = () => cartItems.reduce((total, item) => total + item.totalPrice, 0);
  const calculateTax = () => calculateSubtotal() * 0.15;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const handleOptionSelect = (option: PaymentOption) => {
    if (option === 'card') {
      setShowCardModal(true);
      return;
    }
    setSelectedOption(option === selectedOption ? null : option);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setTransferError('Solo se aceptan archivos PDF, JPG, PNG o WebP');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setTransferError('El archivo no puede exceder 10MB');
      return;
    }

    setSelectedFile(file);
    setTransferError('');

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmitTransfer = async () => {
    if (!selectedFile) {
      setTransferError('Debes adjuntar el comprobante de pago');
      return;
    }
    if (!selectedBank) {
      setTransferError('Selecciona a que banco realizaste la transferencia');
      return;
    }

    setIsSubmittingTransfer(true);
    setTransferError('');

    try {
      const formData = new FormData();
      formData.append('cartId', cart.id);
      formData.append('customerId', user.id);
      formData.append('customerName', user.name);
      formData.append('customerEmail', user.email);
      formData.append('bankName', selectedBank);
      formData.append('receipt', selectedFile);

      const response = await fetch('/api/checkout/submit-transfer-receipt', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.succeeded) {
        setTransferSuccess(true);
      } else {
        setTransferError(result.message || 'Error al enviar el comprobante');
      }
    } catch {
      setTransferError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmittingTransfer(false);
    }
  };

  const handleRequestPaymentLink = async () => {
    if (!phone.trim()) {
      setLinkError('El teléfono es requerido');
      return;
    }

    setIsSubmittingLink(true);
    setLinkError('');

    try {
      const result = await requestPaymentLink({
        cartId: cart.id,
        customerId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        customerPhone: phone,
        message: message || undefined,
      });

      if (result.succeeded) {
        setLinkSuccess(true);
      } else {
        setLinkError(result.message || 'Error al solicitar el link de pago');
      }
    } catch {
      setLinkError('Error de conexión. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmittingLink(false);
    }
  };

  return (
    <div className="bg-gray-50 md:py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/cart/${cart.id}`}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Volver al Carrito
          </Link>
          <Typography variant="h1" color="blue-gray" className="text-2xl md:text-3xl">
            Checkout
          </Typography>
          <Typography color="gray" className="mt-2">
            Selecciona tu metodo de pago preferido
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Options or Status Screen */}
          <div className="lg:col-span-2 space-y-4">
            {cart.status !== CartStatus.Active ? (
              /* Status-based display when cart is not active */
              <Card className="p-8">
                {cart.status === CartStatus.ReceiptSubmitted && (
                  <div className="text-center space-y-4">
                    <ClockIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <Typography variant="h4" color="blue-gray">
                      Comprobante en Revision
                    </Typography>
                    <Typography color="gray" className="max-w-md mx-auto">
                      Tu comprobante de pago esta siendo revisado por nuestro equipo.
                      Te notificaremos por correo electronico una vez que sea verificado.
                    </Typography>
                  </div>
                )}
                {cart.status === CartStatus.PaymentLinkRequested && (
                  <div className="text-center space-y-4">
                    <ClockIcon className="h-16 w-16 text-yellow-500 mx-auto" />
                    <Typography variant="h4" color="blue-gray">
                      Link de Pago Solicitado
                    </Typography>
                    <Typography color="gray" className="max-w-md mx-auto">
                      Tu solicitud de link de pago esta siendo procesada.
                      Recibiras el link en tu correo electronico a la brevedad.
                    </Typography>
                  </div>
                )}
                {cart.status === CartStatus.PaymentLinkSent && (
                  <div className="text-center space-y-4">
                    <LinkIcon className="h-16 w-16 text-blue-500 mx-auto" />
                    <Typography variant="h4" color="blue-gray">
                      Link de Pago Disponible
                    </Typography>
                    <Typography color="gray" className="max-w-md mx-auto">
                      Tu link de pago esta listo. Haz click en el boton para proceder con el pago.
                    </Typography>
                    {cart.paymentLinkUrl && (
                      <a href={cart.paymentLinkUrl} target="_blank" rel="noopener noreferrer">
                        <Button color="blue" size="lg" className="mt-4">
                          Ir a Pagar
                        </Button>
                      </a>
                    )}
                  </div>
                )}
                {cart.status === CartStatus.Verified && (
                  <div className="text-center space-y-4">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
                    <Typography variant="h4" color="blue-gray">
                      Pago Verificado
                    </Typography>
                    <Typography color="gray" className="max-w-md mx-auto">
                      Tu pago fue verificado exitosamente. Gracias por tu compra.
                    </Typography>
                  </div>
                )}
                {cart.status === CartStatus.Rejected && (
                  <div className="text-center space-y-4">
                    <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto" />
                    <Typography variant="h4" color="blue-gray">
                      Pago Rechazado
                    </Typography>
                    <Typography color="gray" className="max-w-md mx-auto">
                      Tu pago fue rechazado. Por favor, contactanos para mas informacion
                      o intenta con otro metodo de pago.
                    </Typography>
                  </div>
                )}
              </Card>
            ) : (
            /* Active cart: show payment options */
            <>
            {/* Option 1: Card Payment */}
            <Card
              className="p-6 cursor-pointer border-2 border-gray-200 opacity-75 hover:border-gray-400 transition-all"
              onClick={() => handleOptionSelect('card')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <CreditCardIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Pagar ahora con TC/TD
                    </Typography>
                    <Typography variant="small" color="gray">
                      Tarjeta de credito o debito
                    </Typography>
                  </div>
                </div>
                <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium">
                  Proximamente
                </span>
              </div>
            </Card>

            {/* Option 2: Transfer */}
            <Card
              className={`p-6 cursor-pointer border-2 transition-all ${
                selectedOption === 'transfer' ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => !transferSuccess && handleOptionSelect('transfer')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedOption === 'transfer' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <BuildingLibraryIcon className={`h-6 w-6 ${
                    selectedOption === 'transfer' ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Transferencia o deposito
                  </Typography>
                  <Typography variant="small" color="gray">
                    Realiza una transferencia bancaria y sube tu comprobante
                  </Typography>
                </div>
              </div>
            </Card>

            {/* Transfer expanded section */}
            {selectedOption === 'transfer' && !transferSuccess && (
              <Card className="p-6 border border-blue-200 bg-blue-50/30">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Cuentas Bancarias
                </Typography>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {BANK_ACCOUNTS.map((account, i) => (
                    <Card
                      key={i}
                      className={`p-4 cursor-pointer border-2 transition-all ${
                        selectedBank === account.bank
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        setSelectedBank(account.bank);
                      }}
                    >
                      <Typography variant="h6" color="blue-gray" className="text-sm mb-2">
                        {account.bank}
                      </Typography>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-500">Tipo:</span> {account.accountType}</p>
                        <p><span className="text-gray-500">Cuenta:</span> <strong>{account.accountNumber}</strong></p>
                        <p><span className="text-gray-500">Titular:</span> {account.holder}</p>
                        <p><span className="text-gray-500">Moneda:</span> {account.currency}</p>
                      </div>
                    </Card>
                  ))}
                </div>

                <Typography variant="h6" color="blue-gray" className="mb-3">
                  Subir Comprobante
                </Typography>

                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer mb-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('receipt-upload')?.click();
                  }}
                >
                  <input
                    id="receipt-upload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,application/pdf"
                    className="hidden"
                    onChange={handleFileChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                  {selectedFile ? (
                    <div className="space-y-2">
                      {filePreview && (
                        <Image
                          src={filePreview}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="mx-auto rounded-lg object-contain max-h-48"
                        />
                      )}
                      <div className="flex items-center justify-center gap-2">
                        <DocumentArrowUpIcon className="h-5 w-5 text-green-600" />
                        <Typography variant="small" color="green">
                          {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </Typography>
                      </div>
                      <Typography variant="small" color="gray">
                        Haz click para cambiar el archivo
                      </Typography>
                    </div>
                  ) : (
                    <div>
                      <DocumentArrowUpIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <Typography color="gray">
                        Haz click para subir tu comprobante
                      </Typography>
                      <Typography variant="small" color="gray">
                        PDF, JPG, PNG o WebP (max. 10MB)
                      </Typography>
                    </div>
                  )}
                </div>

                {transferError && (
                  <Alert color="red" className="mb-4 text-sm">
                    {transferError}
                  </Alert>
                )}

                <Button
                  color="blue"
                  className="w-full"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleSubmitTransfer();
                  }}
                  disabled={isSubmittingTransfer || !selectedFile || !selectedBank}
                >
                  {isSubmittingTransfer ? 'Enviando...' : 'Enviar Comprobante'}
                </Button>
              </Card>
            )}

            {/* Transfer success */}
            {transferSuccess && (
              <Card className="p-6 border border-green-200 bg-green-50">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                  <div>
                    <Typography variant="h6" color="green">
                      Comprobante enviado exitosamente
                    </Typography>
                    <Typography variant="small" color="gray">
                      Nuestro equipo verificara tu pago y te contactara para confirmar tu pedido.
                    </Typography>
                  </div>
                </div>
              </Card>
            )}

            {/* Option 3: Payment Link */}
            <Card
              className={`p-6 cursor-pointer border-2 transition-all ${
                selectedOption === 'payment-link' ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-blue-300'
              }`}
              onClick={() => !linkSuccess && handleOptionSelect('payment-link')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  selectedOption === 'payment-link' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <LinkIcon className={`h-6 w-6 ${
                    selectedOption === 'payment-link' ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                </div>
                <div>
                  <Typography variant="h6" color="blue-gray">
                    Solicitar Link de Pago
                  </Typography>
                  <Typography variant="small" color="gray">
                    Te enviaremos un link seguro para realizar el pago
                  </Typography>
                </div>
              </div>
            </Card>

            {/* Payment link expanded section */}
            {selectedOption === 'payment-link' && !linkSuccess && (
              <Card className="p-6 border border-blue-200 bg-blue-50/30">
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Datos de Contacto
                </Typography>

                <div className="space-y-4" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                  <div>
                    <Typography variant="small" color="gray" className="mb-1">
                      Nombre
                    </Typography>
                    <Input
                      value={user.name}
                      disabled
                      className="!border-gray-300"
                      labelProps={{ className: "before:content-none after:content-none" }}
                    />
                  </div>

                  <div>
                    <Typography variant="small" color="gray" className="mb-1">
                      Email
                    </Typography>
                    <Input
                      value={user.email}
                      disabled
                      className="!border-gray-300"
                      labelProps={{ className: "before:content-none after:content-none" }}
                    />
                  </div>

                  <div>
                    <Typography variant="small" color="gray" className="mb-1">
                      Telefono *
                    </Typography>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej: +504 9999-9999"
                      className="!border-gray-300"
                      labelProps={{ className: "before:content-none after:content-none" }}
                    />
                  </div>

                  <div>
                    <Typography variant="small" color="gray" className="mb-1">
                      Mensaje (opcional)
                    </Typography>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Alguna nota o instruccion especial..."
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-blue-500 focus:outline-none resize-none"
                    />
                  </div>

                  {linkError && (
                    <Alert color="red" className="text-sm">
                      {linkError}
                    </Alert>
                  )}

                  <Button
                    color="blue"
                    className="w-full"
                    onClick={handleRequestPaymentLink}
                    disabled={isSubmittingLink || !phone.trim()}
                  >
                    {isSubmittingLink ? 'Enviando solicitud...' : 'Solicitar Link de Pago'}
                  </Button>
                </div>
              </Card>
            )}

            {/* Payment link success */}
            {linkSuccess && (
              <Card className="p-6 border border-green-200 bg-green-50">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-8 w-8 text-green-600" />
                  <div>
                    <Typography variant="h6" color="green">
                      Solicitud enviada exitosamente
                    </Typography>
                    <Typography variant="small" color="gray">
                      Recibiras un link de pago en tu correo electronico a la brevedad.
                    </Typography>
                  </div>
                </div>
              </Card>
            )}
            </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20">
              <Typography variant="h6" color="blue-gray" className="mb-4">
                Resumen del Pedido
              </Typography>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 mr-2">
                      <Typography variant="small" color="blue-gray" className="line-clamp-2">
                        {item.product?.name || 'Producto'}
                      </Typography>
                      <Typography variant="small" color="gray">
                        x{item.quantity}
                      </Typography>
                    </div>
                    <Typography variant="small" color="blue-gray" className="font-medium whitespace-nowrap">
                      L. {formatNumber(item.totalPrice)}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    Subtotal ({cartItems.length} productos)
                  </Typography>
                  <Typography variant="small" color="blue-gray">
                    L. {formatNumber(calculateSubtotal())}
                  </Typography>
                </div>

                <div className="flex justify-between">
                  <Typography variant="small" color="gray">
                    Impuestos (15%)
                  </Typography>
                  <Typography variant="small" color="blue-gray">
                    L. {formatNumber(calculateTax())}
                  </Typography>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <Typography variant="h6" color="blue-gray">
                      Total
                    </Typography>
                    <Typography variant="h6" color="blue">
                      L. {formatNumber(calculateTotal())}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <Typography variant="small" color="gray" className="text-center">
                  Envio gratuito en compras superiores a L. 5,000
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Card Payment Not Available Modal */}
      <Dialog open={showCardModal} handler={() => setShowCardModal(false)} size="sm">
        <DialogHeader className="flex items-center gap-2">
          <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
          <Typography variant="h5" color="blue-gray">
            Opcion no disponible
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography color="gray">
            El pago con tarjeta de credito o debito aun no esta disponible.
            Proximamente habilitaremos esta opcion. Por favor, utiliza una de
            las otras opciones de pago disponibles.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button color="blue" onClick={() => setShowCardModal(false)}>
            Entendido
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
