"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ShoppingCartIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useCartSelection } from "@/hooks/useCartSelection";
import CartSelectorModal from "@/components/store/cart-selector-modal.component";
import QuantityStepper from "@/components/store/quantity-stepper.component";
import Button from "@/components/ui/button.component";
import { AddProductToCartResponse } from "@/services/cart.service";

interface ProductPurchasePanelProps {
  productId: number;
  productName: string;
  productUrl: string;
  inStock: boolean;
}

const WHATSAPP_PHONE = "50488187765";

/**
 * PDP purchase panel — quantity + "Agregar al carrito" + "Comprar ahora" + "Solicitar cotización".
 * Preserves the real cart logic (useCartSelection: 0/1/2+ carts, Meta AddToCart) and the
 * CartSelectorModal. "Cotizar" uses the existing WhatsApp deep-link (no self-serve quote endpoint).
 */
export default function ProductPurchasePanel({
  productId,
  productName,
  productUrl,
  inStock,
}: ProductPurchasePanelProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const cartSelection = useCartSelection(session?.user?.id);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const buyNowRef = useRef(false);

  const handleResult = (response: AddProductToCartResponse) => {
    if (response.succeeded && response.data) {
      if (buyNowRef.current && response.data.id) {
        router.push(`/cart/${response.data.id}`);
        return;
      }
      setFeedback({ type: "success", msg: `${productName} agregado al carrito.` });
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({
        type: "error",
        msg: response.message || "Error al agregar el producto al carrito.",
      });
    }
  };

  const add = async (buyNow: boolean) => {
    if (!session?.user?.id) {
      setFeedback({
        type: "error",
        msg: "Debes iniciar sesión para agregar productos al carrito.",
      });
      setTimeout(() => router.push("/login"), 1500);
      return;
    }
    buyNowRef.current = buyNow;
    setFeedback(null);
    try {
      const result = await cartSelection.initiateAddToCart(
        productId,
        quantity,
        productName,
      );
      if (result) handleResult(result);
      // else: cart selector modal is shown
    } catch (e) {
      console.error("Error adding product to cart:", e);
      setFeedback({ type: "error", msg: "Error de conexión. Intenta de nuevo." });
    }
  };

  const onCartSelected = async (cartId: string) => {
    try {
      const result = await cartSelection.confirmCartSelection(cartId);
      if (result) handleResult(result);
    } catch (e) {
      console.error("Error adding product to cart:", e);
      setFeedback({ type: "error", msg: "Error de conexión. Intenta de nuevo." });
    }
  };

  const onCreateNewCart = async () => {
    try {
      const result = await cartSelection.confirmNewCart();
      if (result) handleResult(result);
    } catch (e) {
      console.error("Error creating new cart:", e);
      setFeedback({ type: "error", msg: "Error de conexión. Intenta de nuevo." });
    }
  };

  const cotizar = () => {
    const message = `¡Hola! Me interesa obtener más información sobre el siguiente producto:\n\n*Enlace del producto:* ${productUrl}\n\n¿Podrían brindarme más detalles sobre disponibilidad y opciones de envío?\n\n¡Gracias!`;
    window.open(
      `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const busy = cartSelection.isLoadingCarts || cartSelection.isAdding;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={quantity} onChange={setQuantity} />
        <Button
          variant="primary"
          size="lg"
          onClick={() => add(false)}
          disabled={!inStock || busy}
          className="flex-1"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          {inStock ? "Agregar al carrito" : "Sin stock"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          variant="dark"
          size="lg"
          onClick={() => add(true)}
          disabled={!inStock || busy}
        >
          Comprar ahora
        </Button>
        <Button variant="secondary" size="lg" onClick={cotizar}>
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          Solicitar cotización
        </Button>
      </div>

      {feedback && (
        <p
          role="status"
          className={`rounded-[10px] px-4 py-2.5 text-[14px] ${
            feedback.type === "success"
              ? "bg-success-soft text-success"
              : "bg-[#FEF2F2] text-[#B91C1C]"
          }`}
        >
          {feedback.msg}
        </p>
      )}

      <CartSelectorModal
        open={cartSelection.showModal}
        carts={cartSelection.carts}
        productName={cartSelection.pendingProduct?.name || productName}
        isAdding={cartSelection.isAdding}
        onSelect={onCartSelected}
        onCreateNew={onCreateNewCart}
        onClose={cartSelection.closeModal}
      />
    </div>
  );
}
