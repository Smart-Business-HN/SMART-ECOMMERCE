// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCartsByCustomerId } from "@/services/cart.service";
import { CartDto, CartStatus, CartStatusLabels } from "@/interfaces/cart/cart.interface";
import { formatNumber } from "@/utils/number-format";
import Button from "@/components/ui/button.component";

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

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

const cartTotal = (cart: CartDto) =>
  (cart.cartItems || []).reduce((t, it) => t + it.totalPrice, 0);

export default function CartsTab({ userId }: { userId: string }) {
  const [carts, setCarts] = useState<CartDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getCartsByCustomerId(userId);
        if (response.succeeded && response.data) setCarts(response.data);
        else setError(response.message || "Error al cargar los carritos");
      } catch (e) {
        console.error("Error fetching carts:", e);
        setError("Error de conexión. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return (
    <div>
      <h2 className="mb-6 text-[24px] font-bold tracking-[-0.02em] text-text">Mis Carritos</h2>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-44 animate-pulse rounded-container bg-surface-muted" />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-[10px] bg-[#FEF2F2] px-4 py-3 text-[14px] text-[#B91C1C]">{error}</p>
      ) : carts.length === 0 ? (
        <div className="rounded-container border border-line bg-white py-16 text-center">
          <p className="text-[15px] text-ink2-500">No tienes carritos guardados.</p>
          <Link href="/tienda" className="sb-link mt-3 inline-block text-[14px] font-semibold text-accent">
            Ir a la tienda
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-[18px]">
          {carts.map((cart) => (
            <div key={cart.id} className="sb-card rounded-container border border-line bg-white p-7 transition-shadow">
              <div className="mb-[18px] flex items-start justify-between gap-4">
                <div>
                  <div className="mb-1 flex items-center gap-2.5">
                    <span className="text-[17px] font-bold tracking-[-0.01em] text-text">
                      Carrito #{cart.id.slice(-8)}
                    </span>
                    <span className={`rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${statusBadge(cart.status)}`}>
                      {CartStatusLabels[cart.status] || "Desconocido"}
                    </span>
                  </div>
                  <div className="text-[13.5px] text-ink2-400">Creado el {formatDate(cart.creationDate)}</div>
                </div>
                <div className="flex-none text-right">
                  <div className="text-[20px] font-bold tracking-[-0.01em] text-success">
                    L. {formatNumber(cartTotal(cart))}
                  </div>
                  <div className="text-[13px] text-ink2-400">
                    {cart.cartItems?.length || 0} producto{(cart.cartItems?.length || 0) !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {cart.cartItems && cart.cartItems.length > 0 && (
                <div className="mb-[18px] border-t border-line-soft pt-4">
                  <div className="mb-2.5 text-[12.5px] font-semibold text-ink2-400">Productos</div>
                  <div className="flex flex-col gap-1">
                    {cart.cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3.5 py-1.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-[42px] w-[42px] flex-none overflow-hidden rounded-[9px] bg-surface">
                            <Image
                              src={item.product?.productImages?.[0]?.url || NO_IMAGE}
                              alt={item.product?.name || "Producto"}
                              fill
                              sizes="42px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <div className="text-[14px] font-semibold text-text">
                              {item.product?.name || "Producto no disponible"}
                            </div>
                            <div className="text-[12.5px] text-ink2-400">
                              {item.quantity} × L. {formatNumber(item.unitPrice)}
                            </div>
                          </div>
                        </div>
                        <div className="text-[14px] font-semibold text-text">L. {formatNumber(item.totalPrice)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3">
                <Button href={`/cart/${cart.id}`} variant="secondary" size="sm">Ver detalles</Button>
                {cart.status === CartStatus.Active && (
                  <Button href={`/checkout/${cart.id}`} variant="primary" size="sm">Continuar compra</Button>
                )}
                {cart.status === CartStatus.PaymentLinkSent && cart.paymentLinkUrl && (
                  <Button href={cart.paymentLinkUrl} external variant="primary" size="sm">Ir a pagar</Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
