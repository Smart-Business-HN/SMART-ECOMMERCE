// @ts-nocheck
"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CreditCardIcon,
  BuildingLibraryIcon,
  LinkIcon,
  ArrowLeftIcon,
  DocumentArrowUpIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { CartDto, CartStatus } from "@/interfaces/cart/cart.interface";
import { formatNumber } from "@/utils/number-format";
import { requestPaymentLink } from "@/services/checkout.service";
import { trackFbEvent } from "@/lib/meta/fbpixel";
import { buildProductCustomData } from "@/lib/meta/meta-custom-data";
import Button from "@/components/ui/button.component";

interface CheckoutUser { id: string; name: string; email: string; }
interface CheckoutPageClientProps { cart: CartDto; user: CheckoutUser; }
type PaymentOption = "transfer" | "payment-link" | null;

const BANK_ACCOUNTS = [
  { bank: "BAC Credomatic", accountType: "Cuenta Corriente", accountNumber: "XXXX-XXXX-XXXX", holder: "SMART BUSINESS S. DE R.L.", currency: "Lempiras (HNL)" },
  { bank: "Banco Atlántida", accountType: "Cuenta Corriente", accountNumber: "XXXX-XXXX-XXXX", holder: "SMART BUSINESS S. DE R.L.", currency: "Lempiras (HNL)" },
];

const labelCls = "mb-1.5 block text-[12.5px] font-semibold text-ink2-700";
const fieldCls = "sb-in w-full rounded-[10px] border border-line-input bg-white px-3 py-2.5 text-[14px] text-text outline-none placeholder:text-ink2-400 disabled:bg-surface disabled:opacity-70";

function StatusScreen({ icon, title, text, children }: any) {
  return (
    <div className="flex flex-col items-center rounded-container border border-line bg-white px-6 py-16 text-center">
      <div className="mb-4">{icon}</div>
      <h2 className="text-[22px] font-bold text-text">{title}</h2>
      <p className="mt-2 max-w-md text-[15px] leading-[1.55] text-ink2-500">{text}</p>
      {children}
    </div>
  );
}

export default function CheckoutPageClient({ cart, user }: CheckoutPageClientProps) {
  const cartItems = cart.cartItems || [];
  const [selectedOption, setSelectedOption] = useState<PaymentOption>("payment-link");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [selectedBank, setSelectedBank] = useState("");
  const [isSubmittingTransfer, setIsSubmittingTransfer] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [transferError, setTransferError] = useState("");

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmittingLink, setIsSubmittingLink] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState(false);
  const [linkError, setLinkError] = useState("");

  const subtotal = cartItems.reduce((t, it) => t + it.totalPrice, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const count = cartItems.length;

  const fireAddPaymentInfo = (includePhone: boolean) => {
    const lines = cartItems.map((item) => ({
      code: item.product?.code?.trim() || String(item.productId),
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));
    if (lines.length === 0) return;
    trackFbEvent("AddPaymentInfo", buildProductCustomData(lines), {
      email: user.email,
      ...(includePhone && phone.trim() ? { phone: phone.trim() } : {}),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!validTypes.includes(file.type)) { setTransferError("Solo se aceptan archivos PDF, JPG, PNG o WebP"); return; }
    if (file.size > 10 * 1024 * 1024) { setTransferError("El archivo no puede exceder 10MB"); return; }
    setSelectedFile(file);
    setTransferError("");
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else setFilePreview(null);
  };

  const handleSubmitTransfer = async () => {
    if (!selectedFile) { setTransferError("Debes adjuntar el comprobante de pago"); return; }
    if (!selectedBank) { setTransferError("Selecciona a qué banco realizaste la transferencia"); return; }
    setIsSubmittingTransfer(true);
    setTransferError("");
    try {
      const formData = new FormData();
      formData.append("cartId", cart.id);
      formData.append("customerId", user.id);
      formData.append("customerName", user.name);
      formData.append("customerEmail", user.email);
      formData.append("bankName", selectedBank);
      formData.append("receipt", selectedFile);
      const response = await fetch("/api/checkout/submit-transfer-receipt", { method: "POST", body: formData });
      const result = await response.json();
      if (result.succeeded) { setTransferSuccess(true); fireAddPaymentInfo(false); }
      else setTransferError(result.message || "Error al enviar el comprobante");
    } catch {
      setTransferError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmittingTransfer(false);
    }
  };

  const handleRequestPaymentLink = async () => {
    if (!phone.trim()) { setLinkError("El teléfono es requerido"); return; }
    setIsSubmittingLink(true);
    setLinkError("");
    try {
      const result = await requestPaymentLink({
        cartId: cart.id, customerId: user.id, customerName: user.name,
        customerEmail: user.email, customerPhone: phone, message: message || undefined,
      });
      if (result.succeeded) { setLinkSuccess(true); fireAddPaymentInfo(true); }
      else setLinkError(result.message || "Error al solicitar el link de pago");
    } catch {
      setLinkError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmittingLink(false);
    }
  };

  const isActive = cart.status === CartStatus.Active;
  const submitting = isSubmittingTransfer || isSubmittingLink;
  const canConfirm =
    (selectedOption === "transfer" && !!selectedFile && !!selectedBank) ||
    (selectedOption === "payment-link" && !!phone.trim());
  const handleConfirm = () => {
    if (selectedOption === "transfer") handleSubmitTransfer();
    else if (selectedOption === "payment-link") handleRequestPaymentLink();
  };

  const methodCard = (key: PaymentOption | "card", Icon, title: string, desc: string, soon = false) => {
    const on = selectedOption === key;
    return (
      <button
        type="button"
        disabled={soon}
        onClick={() => !soon && setSelectedOption(on ? null : (key as PaymentOption))}
        className={`flex w-full items-center gap-[18px] rounded-[16px] border-[1.5px] bg-white px-6 py-5 text-left transition-all ${
          soon ? "cursor-not-allowed border-line opacity-60" : on ? "border-accent shadow-[0_0_0_3px_rgba(0,111,255,.12)]" : "border-line hover:border-accent-border"
        }`}
      >
        <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-[12px] ${on && !soon ? "bg-accent-soft text-accent" : "bg-surface-muted text-ink2-400"}`}>
          <Icon className="h-[22px] w-[22px]" />
        </span>
        <span className="flex-1">
          <span className="block text-[16px] font-semibold text-text">{title}</span>
          <span className="block text-[13.5px] leading-[1.4] text-ink2-400">{desc}</span>
        </span>
        {soon ? (
          <span className="flex-none rounded-full bg-surface-muted px-2.5 py-1 text-[12px] font-semibold text-ink2-400">Próximamente</span>
        ) : (
          <span className={`flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border-2 ${on ? "border-accent bg-accent" : "border-line-input bg-white"}`}>
            {on && <span className="h-[9px] w-[9px] rounded-full bg-white" />}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 pt-8 sm:px-6 lg:px-8">
        <Link href={`/cart/${cart.id}`} className="sb-link mb-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent">
          <ArrowLeftIcon className="h-4 w-4" />
          Volver al carrito
        </Link>
        <h1 className="text-[30px] font-bold tracking-[-0.03em] text-text md:text-[36px]">Checkout</h1>
        <p className="mt-1 text-[16px] text-ink2-500">Selecciona tu método de pago preferido</p>
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-7 px-4 py-7 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:pb-24">
        {/* Left: methods or status */}
        <div className="flex flex-col gap-4">
          {!isActive ? (
            <>
              {cart.status === CartStatus.ReceiptSubmitted && (
                <StatusScreen icon={<ClockIcon className="h-16 w-16 text-[#B7791F]" />} title="Comprobante en revisión" text="Tu comprobante de pago está siendo revisado por nuestro equipo. Te notificaremos por correo una vez verificado." />
              )}
              {cart.status === CartStatus.PaymentLinkRequested && (
                <StatusScreen icon={<ClockIcon className="h-16 w-16 text-[#B7791F]" />} title="Link de pago solicitado" text="Tu solicitud de link de pago está siendo procesada. Recibirás el link en tu correo a la brevedad." />
              )}
              {cart.status === CartStatus.PaymentLinkSent && (
                <StatusScreen icon={<LinkIcon className="h-16 w-16 text-accent" />} title="Link de pago disponible" text="Tu link de pago está listo. Haz click en el botón para proceder con el pago.">
                  {cart.paymentLinkUrl && (
                    <div className="mt-5"><Button href={cart.paymentLinkUrl} external variant="primary" size="lg">Ir a pagar</Button></div>
                  )}
                </StatusScreen>
              )}
              {cart.status === CartStatus.Verified && (
                <StatusScreen icon={<CheckCircleIcon className="h-16 w-16 text-success" />} title="Pago verificado" text="Tu pago fue verificado exitosamente. ¡Gracias por tu compra!" />
              )}
              {cart.status === CartStatus.Rejected && (
                <StatusScreen icon={<ExclamationTriangleIcon className="h-16 w-16 text-[#E5484D]" />} title="Pago rechazado" text="Tu pago fue rechazado. Por favor, contáctanos para más información o intenta con otro método de pago." />
              )}
            </>
          ) : (
            <>
              {methodCard("card", CreditCardIcon, "Pagar ahora con TC/TD", "Tarjeta de crédito o débito", true)}

              {methodCard("transfer", BuildingLibraryIcon, "Transferencia o depósito", "Realiza una transferencia bancaria y sube tu comprobante")}
              {selectedOption === "transfer" && !transferSuccess && (
                <div className="rounded-[16px] border border-accent-border bg-accent-soft/40 p-6">
                  <div className="mb-4 text-[15px] font-bold text-text">Cuentas bancarias</div>
                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {BANK_ACCOUNTS.map((account) => (
                      <button type="button" key={account.bank} onClick={() => setSelectedBank(account.bank)}
                        className={`rounded-[12px] border-2 bg-white p-4 text-left transition-all ${selectedBank === account.bank ? "border-accent" : "border-line hover:border-accent-border"}`}>
                        <div className="mb-2 text-[14px] font-bold text-text">{account.bank}</div>
                        <div className="space-y-0.5 text-[13px] text-ink2-600">
                          <p><span className="text-ink2-400">Tipo:</span> {account.accountType}</p>
                          <p><span className="text-ink2-400">Cuenta:</span> <strong className="text-text">{account.accountNumber}</strong></p>
                          <p><span className="text-ink2-400">Titular:</span> {account.holder}</p>
                          <p><span className="text-ink2-400">Moneda:</span> {account.currency}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mb-3 text-[15px] font-bold text-text">Subir comprobante</div>
                  <div onClick={() => document.getElementById("receipt-upload")?.click()}
                    className="mb-4 cursor-pointer rounded-[12px] border-2 border-dashed border-line-input bg-white p-6 text-center transition-colors hover:border-accent">
                    <input id="receipt-upload" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" className="hidden" onChange={handleFileChange} />
                    {selectedFile ? (
                      <div className="space-y-2">
                        {filePreview && <Image src={filePreview} alt="Comprobante" width={200} height={200} className="mx-auto max-h-48 rounded-lg object-contain" />}
                        <div className="flex items-center justify-center gap-2 text-success"><DocumentArrowUpIcon className="h-5 w-5" /><span className="text-[14px] font-medium">{selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span></div>
                        <p className="text-[13px] text-ink2-400">Haz click para cambiar el archivo</p>
                      </div>
                    ) : (
                      <div>
                        <DocumentArrowUpIcon className="mx-auto mb-2 h-10 w-10 text-ink2-400" />
                        <p className="text-[14px] text-ink2-600">Haz click para subir tu comprobante</p>
                        <p className="text-[13px] text-ink2-400">PDF, JPG, PNG o WebP (máx. 10MB)</p>
                      </div>
                    )}
                  </div>
                  {transferError && <p className="rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-[14px] text-[#B91C1C]">{transferError}</p>}
                </div>
              )}
              {transferSuccess && (
                <div className="flex items-center gap-3 rounded-[16px] border border-success/30 bg-success-soft p-5">
                  <CheckCircleIcon className="h-8 w-8 flex-none text-success" />
                  <div>
                    <div className="text-[15px] font-semibold text-success">Comprobante enviado exitosamente</div>
                    <div className="text-[13.5px] text-ink2-500">Nuestro equipo verificará tu pago y te contactará para confirmar tu pedido.</div>
                  </div>
                </div>
              )}

              {methodCard("payment-link", LinkIcon, "Solicitar link de pago", "Te enviaremos un link seguro de BAC para realizar el pago")}
              {selectedOption === "payment-link" && !linkSuccess && (
                <div className="rounded-[16px] border border-accent-border bg-accent-soft/40 p-6">
                  <div className="mb-4 text-[15px] font-bold text-text">Datos de contacto</div>
                  <div className="space-y-4">
                    <div><label className={labelCls}>Nombre</label><input value={user.name} disabled className={fieldCls} /></div>
                    <div><label className={labelCls}>Email</label><input value={user.email} disabled className={fieldCls} /></div>
                    <div><label className={labelCls}>Teléfono *</label><input value={phone} onChange={(e) => { setPhone(e.target.value); setLinkError(""); }} placeholder="(+504) 0000-0000" className={fieldCls} /></div>
                    <div><label className={labelCls}>Mensaje (opcional)</label><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3} placeholder="Alguna nota o instrucción especial…" className={`${fieldCls} resize-none`} /></div>
                    {linkError && <p className="rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-[14px] text-[#B91C1C]">{linkError}</p>}
                  </div>
                </div>
              )}
              {linkSuccess && (
                <div className="flex items-center gap-3 rounded-[16px] border border-success/30 bg-success-soft p-5">
                  <CheckCircleIcon className="h-8 w-8 flex-none text-success" />
                  <div>
                    <div className="text-[15px] font-semibold text-success">Solicitud enviada exitosamente</div>
                    <div className="text-[13.5px] text-ink2-500">Recibirás un link de pago en tu correo electrónico a la brevedad.</div>
                  </div>
                </div>
              )}

              <div className="mt-1 flex items-center gap-3 rounded-[14px] border border-accent-border bg-accent-soft px-5 py-4">
                <LockClosedIcon className="h-5 w-5 flex-none text-accent" />
                <div className="text-[13.5px] leading-[1.45] text-[#1F4E8C]">
                  Tus pagos están protegidos. Procesamos los cobros mediante el <strong>link de pago seguro de BAC Credomatic</strong>.
                </div>
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-[92px] lg:self-start">
          <div className="rounded-container border border-line bg-white p-7">
            <div className="mb-5 text-[18px] font-bold tracking-[-0.01em] text-text">Resumen del pedido</div>
            <div className="mb-4 space-y-3.5">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between gap-3 text-[14px]">
                  <span className="text-ink2-600">{item.product?.name || "Producto"} <span className="text-ink2-400">×{item.quantity}</span></span>
                  <span className="whitespace-nowrap font-medium text-text">L. {formatNumber(item.totalPrice)}</span>
                </div>
              ))}
            </div>
            <div className="my-3 h-px bg-line-soft" />
            <div className="mb-3 flex justify-between text-[14.5px] text-ink2-600"><span>Subtotal ({count} producto{count !== 1 ? "s" : ""})</span><span className="font-medium text-text">L. {formatNumber(subtotal)}</span></div>
            <div className="mb-4 flex justify-between text-[14.5px] text-ink2-600"><span>Impuestos (15%)</span><span className="font-medium text-text">L. {formatNumber(tax)}</span></div>
            <div className="my-4 h-px bg-line-soft" />
            <div className="mb-6 flex items-baseline justify-between"><span className="text-[16px] font-bold text-text">Total</span><span className="text-[24px] font-extrabold tracking-[-0.02em] text-accent">L. {formatNumber(total)}</span></div>

            {isActive ? (
              <Button variant="primary" size="lg" fullWidth onClick={handleConfirm} disabled={!canConfirm || submitting || transferSuccess || linkSuccess}>
                {submitting ? "Enviando..." : "Confirmar pedido"}
              </Button>
            ) : (
              <Button href="/profile?tab=carts" variant="secondary" size="md" fullWidth>Volver a Mis Carritos</Button>
            )}
            <p className="mt-4 text-center text-[12.5px] leading-[1.5] text-ink2-400">Al confirmar aceptas nuestros términos y políticas de venta.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
