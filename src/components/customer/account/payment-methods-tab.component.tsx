// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import {
  CreditCardIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { EcommerceUserDto } from "@/interfaces/auth/auth.interface";
import {
  PaymentMethodDto,
  CreatePaymentMethodCommand,
  UpdatePaymentMethodCommand,
} from "@/interfaces/payment-method/payment-method.interface";
import {
  getAllPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from "@/services/payment-method.service";
import Button from "@/components/ui/button.component";

const labelCls = "mb-1.5 block text-[12.5px] font-semibold text-ink2-700";
const fieldCls =
  "sb-in w-full rounded-[10px] border border-line-input bg-white px-3 py-2.5 text-[14px] text-text outline-none placeholder:text-ink2-400 disabled:opacity-60";
const errBox = "rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-[14px] text-[#B91C1C]";
const okBox = "rounded-[10px] bg-success-soft px-4 py-2.5 text-[14px] text-success";

export default function PaymentMethodsTab({ user }: { user: EcommerceUserDto }) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingMethod, setEditingMethod] = useState<PaymentMethodDto | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const currentYear = new Date().getFullYear();
  const emptyCreateForm = {
    ecommerceUserId: user.id,
    alias: "",
    cardholderName: "",
    cardNumber: "",
    expirationMonth: 1,
    expirationYear: currentYear,
    cardBrand: "",
  };
  const [createFormData, setCreateFormData] = useState(emptyCreateForm);
  const emptyEditForm = { id: 0, alias: "", cardholderName: "", expirationMonth: 1, expirationYear: currentYear, isActive: true };
  const [editFormData, setEditFormData] = useState(emptyEditForm);

  const fetchPaymentMethods = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await getAllPaymentMethods(user.id);
      if (response.succeeded && response.data) setPaymentMethods(response.data);
      else setError(response.message || "Error al cargar los métodos de pago");
    } catch (err) {
      console.error("Error fetching payment methods:", err);
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPaymentMethods(); }, [user.id]);
  useEffect(() => {
    if (success) { const t = setTimeout(() => setSuccess(""), 4000); return () => clearTimeout(t); }
  }, [success]);

  const validateCreateForm = (): boolean => {
    if (!createFormData.alias.trim()) { setFormError("El alias es requerido"); return false; }
    if (createFormData.alias.length > 50) { setFormError("El alias no debe exceder 50 caracteres"); return false; }
    if (!createFormData.cardholderName.trim()) { setFormError("El nombre del titular es requerido"); return false; }
    if (createFormData.cardholderName.length > 100) { setFormError("El nombre del titular no debe exceder 100 caracteres"); return false; }
    const cleanNumber = createFormData.cardNumber.replace(/\s/g, "");
    if (!cleanNumber) { setFormError("El número de tarjeta es requerido"); return false; }
    if (!/^\d+$/.test(cleanNumber)) { setFormError("El número de tarjeta solo debe contener dígitos"); return false; }
    if (cleanNumber.length < 13 || cleanNumber.length > 19) { setFormError("El número de tarjeta debe tener entre 13 y 19 dígitos"); return false; }
    if (!createFormData.cardBrand) { setFormError("La marca de la tarjeta es requerida"); return false; }
    const now = new Date();
    if (createFormData.expirationYear < now.getFullYear() || (createFormData.expirationYear === now.getFullYear() && createFormData.expirationMonth < now.getMonth() + 1)) {
      setFormError("La tarjeta está vencida"); return false;
    }
    return true;
  };

  const validateEditForm = (): boolean => {
    if (!editFormData.alias.trim()) { setFormError("El alias es requerido"); return false; }
    if (editFormData.alias.length > 50) { setFormError("El alias no debe exceder 50 caracteres"); return false; }
    if (!editFormData.cardholderName.trim()) { setFormError("El nombre del titular es requerido"); return false; }
    if (editFormData.cardholderName.length > 100) { setFormError("El nombre del titular no debe exceder 100 caracteres"); return false; }
    const now = new Date();
    if (editFormData.expirationYear < now.getFullYear() || (editFormData.expirationYear === now.getFullYear() && editFormData.expirationMonth < now.getMonth() + 1)) {
      setFormError("La tarjeta está vencida"); return false;
    }
    return true;
  };

  const handleCreate = () => { setCreateFormData(emptyCreateForm); setFormError(""); setView("create"); };
  const handleEdit = (method: PaymentMethodDto) => {
    setEditingMethod(method);
    setEditFormData({ id: method.id, alias: method.alias, cardholderName: method.cardholderName, expirationMonth: method.expirationMonth, expirationYear: method.expirationYear, isActive: method.isActive });
    setFormError(""); setView("edit");
  };
  const handleCancel = () => { setView("list"); setEditingMethod(null); setCreateFormData(emptyCreateForm); setEditFormData(emptyEditForm); setFormError(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");
    try {
      if (view === "create") {
        if (!validateCreateForm()) { setIsSubmitting(false); return; }
        const command: CreatePaymentMethodCommand = {
          ecommerceUserId: createFormData.ecommerceUserId,
          alias: createFormData.alias,
          cardholderName: createFormData.cardholderName,
          cardNumber: createFormData.cardNumber.replace(/\s/g, ""),
          expirationMonth: createFormData.expirationMonth,
          expirationYear: createFormData.expirationYear,
          cardBrand: createFormData.cardBrand,
        };
        const response = await createPaymentMethod(command);
        if (response.succeeded) { setSuccess("Método de pago creado correctamente"); setView("list"); await fetchPaymentMethods(); }
        else setFormError(response.errors?.length ? response.errors.join(". ") : response.message || "Error al crear el método de pago");
      } else if (view === "edit" && editingMethod) {
        if (!validateEditForm()) { setIsSubmitting(false); return; }
        const command: UpdatePaymentMethodCommand = {
          id: editFormData.id, alias: editFormData.alias, cardholderName: editFormData.cardholderName,
          expirationMonth: editFormData.expirationMonth, expirationYear: editFormData.expirationYear, isActive: editFormData.isActive,
        };
        const response = await updatePaymentMethod(editingMethod.id, command);
        if (response.succeeded) { setSuccess("Método de pago actualizado correctamente"); setView("list"); setEditingMethod(null); await fetchPaymentMethods(); }
        else setFormError(response.errors?.length ? response.errors.join(". ") : response.message || "Error al actualizar el método de pago");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setFormError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const response = await deletePaymentMethod(id);
      if (response.succeeded) { setSuccess("Método de pago eliminado correctamente"); await fetchPaymentMethods(); }
      else setError(response.errors?.length ? response.errors.join(". ") : response.message || "Error al eliminar el método de pago");
    } catch (err) {
      console.error("Error deleting payment method:", err);
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setDeletingId(null);
    }
  };

  const cardBrands = ["Visa", "Mastercard", "American Express", "Discover", "Otro"];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 11 }, (_, i) => currentYear + i);

  // ---- Form view (create/edit) ----
  if (view === "create" || view === "edit") {
    const isCreate = view === "create";
    return (
      <div>
        <h2 className="mb-6 text-[24px] font-bold tracking-[-0.02em] text-text">
          {isCreate ? "Nuevo método de pago" : "Editar método de pago"}
        </h2>
        <div className="rounded-container border border-line bg-white p-6 sm:p-8">
          {!isCreate && editingMethod && (
            <div className="mb-5 rounded-[10px] bg-surface px-4 py-3 text-[13.5px] text-ink2-600">
              Tarjeta: {editingMethod.cardBrand} **** {editingMethod.last4Digits}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelCls}>Alias *</label>
              <input type="text" placeholder="Ej: Mi Visa Personal" value={isCreate ? createFormData.alias : editFormData.alias}
                onChange={(e) => { const v = e.target.value; isCreate ? setCreateFormData((p) => ({ ...p, alias: v })) : setEditFormData((p) => ({ ...p, alias: v })); setFormError(""); }}
                disabled={isSubmitting} className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Nombre del titular *</label>
              <input type="text" value={isCreate ? createFormData.cardholderName : editFormData.cardholderName}
                onChange={(e) => { const v = e.target.value; isCreate ? setCreateFormData((p) => ({ ...p, cardholderName: v })) : setEditFormData((p) => ({ ...p, cardholderName: v })); setFormError(""); }}
                disabled={isSubmitting} className={fieldCls} />
            </div>
            {isCreate && (
              <>
                <div>
                  <label className={labelCls}>Número de tarjeta *</label>
                  <input type="text" inputMode="numeric" maxLength={19} placeholder="0000 0000 0000 0000" value={createFormData.cardNumber}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
                      const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
                      setCreateFormData((p) => ({ ...p, cardNumber: formatted })); setFormError("");
                    }} disabled={isSubmitting} className={fieldCls} />
                </div>
                <div>
                  <label className={labelCls}>Marca de tarjeta *</label>
                  <select value={createFormData.cardBrand} onChange={(e) => { setCreateFormData((p) => ({ ...p, cardBrand: e.target.value })); setFormError(""); }} disabled={isSubmitting} className={fieldCls}>
                    <option value="">Selecciona…</option>
                    {cardBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Mes de expiración *</label>
                <select value={String(isCreate ? createFormData.expirationMonth : editFormData.expirationMonth)}
                  onChange={(e) => { const v = Number(e.target.value); isCreate ? setCreateFormData((p) => ({ ...p, expirationMonth: v })) : setEditFormData((p) => ({ ...p, expirationMonth: v })); setFormError(""); }}
                  disabled={isSubmitting} className={fieldCls}>
                  {months.map((m) => <option key={m} value={String(m)}>{String(m).padStart(2, "0")}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Año de expiración *</label>
                <select value={String(isCreate ? createFormData.expirationYear : editFormData.expirationYear)}
                  onChange={(e) => { const v = Number(e.target.value); isCreate ? setCreateFormData((p) => ({ ...p, expirationYear: v })) : setEditFormData((p) => ({ ...p, expirationYear: v })); setFormError(""); }}
                  disabled={isSubmitting} className={fieldCls}>
                  {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
                </select>
              </div>
            </div>
            {formError && <p className={errBox}>{formError}</p>}
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" size="md" onClick={handleCancel} disabled={isSubmitting}>Cancelar</Button>
              <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : isCreate ? "Agregar tarjeta" : "Actualizar tarjeta"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ---- List view ----
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[24px] font-bold tracking-[-0.02em] text-text">Métodos de Pago</h2>
        <Button variant="primary" size="sm" onClick={handleCreate}>
          <PlusIcon className="h-4 w-4" />
          Agregar tarjeta
        </Button>
      </div>

      {success && <p className={`mb-4 ${okBox}`}>{success}</p>}
      {error && <p className={`mb-4 ${errBox}`}>{error}</p>}

      {isLoading ? (
        <div className="flex flex-col gap-4">{[0, 1].map((i) => <div key={i} className="h-24 animate-pulse rounded-container bg-surface-muted" />)}</div>
      ) : paymentMethods.length === 0 ? (
        <div className="flex flex-col items-center rounded-container border border-line bg-white px-6 py-[72px] text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[16px] bg-surface text-ink2-400">
            <CreditCardIcon className="h-7 w-7" />
          </div>
          <div className="mb-1.5 text-[17px] font-semibold text-text">No tienes métodos de pago registrados</div>
          <p className="mb-6 text-[14px] text-ink2-500">Agrega tu primera tarjeta para agilizar tus compras.</p>
          <Button variant="primary" size="md" onClick={handleCreate}><PlusIcon className="h-4 w-4" />Agregar tarjeta</Button>
          <div className="mt-6 flex items-center gap-2 text-[12.5px] text-ink2-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Pagos protegidos · Link de pago BAC
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-start justify-between gap-4 rounded-container border border-line bg-white p-6">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[11px] bg-accent-soft text-accent">
                  <CreditCardIcon className="h-5 w-5" />
                </span>
                <div className="space-y-0.5">
                  <div className="text-[16px] font-semibold text-text">{method.alias}</div>
                  <div className="font-mono text-[13px] text-ink2-500">**** **** **** {method.last4Digits} · {method.cardBrand}</div>
                  <div className="text-[13px] text-ink2-500">
                    <span className="font-medium text-ink2-600">Titular:</span> {method.cardholderName} ·{" "}
                    <span className="font-medium text-ink2-600">Vence:</span> {String(method.expirationMonth).padStart(2, "0")}/{method.expirationYear}
                  </div>
                </div>
              </div>
              <div className="flex flex-none gap-1.5">
                <button type="button" onClick={() => handleEdit(method)} aria-label="Editar" className="flex h-9 w-9 items-center justify-center rounded-[9px] text-ink2-400 hover:bg-accent-soft hover:text-accent">
                  <PencilIcon className="h-[18px] w-[18px]" />
                </button>
                <button type="button" onClick={() => handleDelete(method.id)} disabled={deletingId === method.id} aria-label="Eliminar" className="flex h-9 w-9 items-center justify-center rounded-[9px] text-ink2-400 hover:bg-[#FEECEC] hover:text-[#E5484D] disabled:opacity-50">
                  <TrashIcon className="h-[18px] w-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
