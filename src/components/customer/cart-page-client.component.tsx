// @ts-nocheck
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon, ShoppingCartIcon, TrashIcon, CreditCardIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { CartDto, CartItemDto, CartStatus, CartStatusLabels } from "@/interfaces/cart/cart.interface";
import { formatNumber } from "@/utils/number-format";
import { trackFbEvent } from "@/lib/meta/fbpixel";
import { buildProductCustomData } from "@/lib/meta/meta-custom-data";
import Button from "@/components/ui/button.component";
import QuantityStepper from "@/components/store/quantity-stepper.component";

const NO_IMAGE = "/images/products/no-image-available-icon-vector.webp";

function statusBadge(status: number): string {
  switch (status) {
    case CartStatus.Active:
    case CartStatus.Verified:
      return "bg-success-soft text-success";
    case CartStatus.PaymentLinkSent:
      return "bg-accent-soft text-accent";
    case CartStatus.Rejected:
      return "bg-[#FEECEC] text-[#E5484D]";
    default:
      return "bg-[#FFF4E5] text-[#B7791F]";
  }
}

interface CartPageClientProps {
  cart: CartDto;
}

export default function CartPageClient({ cart }: CartPageClientProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemDto[]>(cart.cartItems || []);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });

  const subtotal = cartItems.reduce((t, it) => t + it.totalPrice, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const count = cartItems.length;

  // Edición client-only (no hay endpoint de update/remove de items; comportamiento existente).
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity, totalPrice: item.unitPrice * newQuantity } : item)),
    );
  };
  const handleRemoveItem = (itemId: number) => setCartItems((prev) => prev.filter((item) => item.id !== itemId));

  const handleUpdateCart = async () => {
    setIsUpdating(true);
    setError("");
    try {
      // Lógica de actualización del carrito en backend (pendiente de endpoint).
      console.log("Actualizando carrito...", cartItems);
      await new Promise((r) => setTimeout(r, 800));
    } catch (e) {
      console.error("Error updating cart:", e);
      setError("Error al actualizar el carrito");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCheckout = () => {
    const lines = cartItems.map((item) => ({
      code: item.product?.code?.trim() || String(item.productId),
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));
    if (lines.length > 0) trackFbEvent("InitiateCheckout", buildProductCustomData(lines));
    router.push(`/checkout/${cart.id}`);
  };

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
        <Link href="/profile?tab=carts" className="sb-link mb-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a Mis Carritos
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-1.5 flex items-center gap-3">
              <h1 className="text-[30px] font-bold tracking-[-0.03em] text-text md:text-[36px]">Mi carrito</h1>
              <span className={`rounded-full px-3 py-1 text-[12.5px] font-semibold ${statusBadge(cart.status)}`}>
                {CartStatusLabels[cart.status] || "Desconocido"}
              </span>
            </div>
            <div className="text-[14px] text-ink2-400">
              Carrito #{cart.id.slice(-8)} · Creado el {formatDate(cart.creationDate)}
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-accent">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="text-[14px] font-semibold text-text">{count} producto{count !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-auto max-w-[1280px] px-4 pt-4 sm:px-6 lg:px-8">
          <p className="rounded-[10px] bg-[#FEF2F2] px-4 py-3 text-[14px] text-[#B91C1C]">{error}</p>
        </div>
      )}

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-7 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:pb-24">
        {/* Items */}
        <div className="flex flex-col gap-4">
          {count === 0 ? (
            <div className="flex flex-col items-center rounded-container border border-line bg-white px-6 py-16 text-center">
              <ShoppingCartIcon className="mb-4 h-12 w-12 text-ink2-400" />
              <div className="mb-1.5 text-[17px] font-semibold text-text">Tu carrito está vacío</div>
              <p className="mb-6 text-[14px] text-ink2-500">Agrega productos para continuar con tu compra.</p>
              <Button href="/tienda" variant="primary" size="md">Ir a la tienda</Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-5 rounded-container border border-line bg-white p-5">
                <div className="relative h-24 w-24 flex-none overflow-hidden rounded-[14px] bg-surface">
                  <Image
                    src={item.product?.productImages?.[0]?.url || NO_IMAGE}
                    alt={item.product?.name || "Producto"}
                    fill
                    sizes="96px"
                    className="object-contain p-3"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[16px] font-semibold leading-[1.3] text-text">
                    {item.product?.name || "Producto no disponible"}
                  </div>
                  <div className="text-[12.5px] text-ink2-400">SKU: {item.product?.code || "N/A"}</div>
                  <div className="mb-2 text-[12.5px] text-ink2-400">{item.product?.brand?.name || "Marca no especificada"}</div>
                  <div className="text-[15px] font-bold text-accent">L. {formatNumber(item.unitPrice)}</div>
                </div>
                <div className="flex flex-none flex-col items-end gap-3.5">
                  <QuantityStepper value={item.quantity} onChange={(q) => handleQuantityChange(item.id, q)} />
                  <div className="text-[17px] font-bold tracking-[-0.01em] text-text">L. {formatNumber(item.totalPrice)}</div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={isUpdating}
                    aria-label="Eliminar del carrito"
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-line-input text-ink2-400 transition-colors hover:border-[#F7C9CB] hover:bg-[#FEECEC] hover:text-[#E5484D]"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumen */}
        <div className="lg:sticky lg:top-[92px] lg:self-start">
          <div className="rounded-container border border-line bg-white p-7">
            <div className="mb-5 text-[18px] font-bold tracking-[-0.01em] text-text">Resumen del pedido</div>
            <div className="mb-3 flex justify-between text-[14.5px] text-ink2-600">
              <span>Subtotal ({count} producto{count !== 1 ? "s" : ""})</span>
              <span className="font-medium text-text">L. {formatNumber(subtotal)}</span>
            </div>
            <div className="mb-4 flex justify-between text-[14.5px] text-ink2-600">
              <span>Impuestos (15%)</span>
              <span className="font-medium text-text">L. {formatNumber(tax)}</span>
            </div>
            <div className="my-4 h-px bg-line-soft" />
            <div className="mb-6 flex items-baseline justify-between">
              <span className="text-[16px] font-bold text-text">Total</span>
              <span className="text-[24px] font-extrabold tracking-[-0.02em] text-accent">L. {formatNumber(total)}</span>
            </div>

            <div className="flex flex-col gap-3">
              {cart.status === CartStatus.Active && (
                <Button variant="primary" size="lg" fullWidth onClick={handleCheckout} disabled={count === 0 || isUpdating}>
                  <CreditCardIcon className="h-5 w-5" />
                  Proceder al pago
                </Button>
              )}
              {cart.status === CartStatus.PaymentLinkSent && cart.paymentLinkUrl && (
                <Button href={cart.paymentLinkUrl} external variant="primary" size="lg" fullWidth>
                  <CreditCardIcon className="h-5 w-5" />
                  Ir a pagar
                </Button>
              )}
              {cart.status !== CartStatus.Active && cart.status !== CartStatus.PaymentLinkSent && (
                <Button variant="primary" size="lg" fullWidth disabled>
                  {CartStatusLabels[cart.status] || "En proceso"}
                </Button>
              )}
              <Button variant="secondary" size="md" fullWidth onClick={handleUpdateCart} disabled={isUpdating}>
                {isUpdating ? "Actualizando..." : "Actualizar carrito"}
              </Button>
              <Button href="/tienda" variant="secondary" size="md" fullWidth>
                <ArrowRightIcon className="h-4 w-4" />
                Seguir comprando
              </Button>
            </div>
            <p className="mt-4 text-center text-[12.5px] leading-[1.5] text-ink2-400">
              Envío gratuito en compras superiores a L. 1,000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
