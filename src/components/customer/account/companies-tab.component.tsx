// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { EcommerceUserDto } from "@/interfaces/auth/auth.interface";
import {
  AssociatedCompanyDto,
  CreateAssociatedCompanyCommand,
  UpdateAssociatedCompanyCommand,
} from "@/interfaces/associated-company/associated-company.interface";
import {
  getAllAssociatedCompanies,
  createAssociatedCompany,
  updateAssociatedCompany,
  deleteAssociatedCompany,
} from "@/services/associated-company.service";
import Button from "@/components/ui/button.component";

const labelCls = "mb-1.5 block text-[12.5px] font-semibold text-ink2-700";
const fieldCls =
  "sb-in w-full rounded-[10px] border border-line-input bg-white px-3 py-2.5 text-[14px] text-text outline-none placeholder:text-ink2-400 disabled:opacity-60";
const errBox = "rounded-[10px] bg-[#FEF2F2] px-4 py-2.5 text-[14px] text-[#B91C1C]";
const okBox = "rounded-[10px] bg-success-soft px-4 py-2.5 text-[14px] text-success";

export default function CompaniesTab({ user }: { user: EcommerceUserDto }) {
  const [companies, setCompanies] = useState<AssociatedCompanyDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingCompany, setEditingCompany] = useState<AssociatedCompanyDto | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const emptyForm: CreateAssociatedCompanyCommand = { ecommerceUserId: user.id, name: "", rtn: "", phoneNumber: "", address: "", email: "" };
  const [formData, setFormData] = useState<CreateAssociatedCompanyCommand>(emptyForm);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await getAllAssociatedCompanies(user.id);
      if (response.succeeded && response.data) setCompanies(response.data);
      else setError(response.message || "Error al cargar las sociedades");
    } catch (err) {
      console.error("Error fetching associated companies:", err);
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchCompanies(); }, [user.id]);
  useEffect(() => {
    if (success) { const t = setTimeout(() => setSuccess(""), 4000); return () => clearTimeout(t); }
  }, [success]);

  const handleInputChange = (field: string, value: string) => { setFormData((p) => ({ ...p, [field]: value })); setFormError(""); };
  const handlePhoneChange = (value: string) => {
    let v = value.replace(/\D/g, "");
    if (v.length > 4) v = v.substring(0, 4) + "-" + v.substring(4, 8);
    setFormData((p) => ({ ...p, phoneNumber: v })); setFormError("");
  };
  const handleRtnChange = (value: string) => { setFormData((p) => ({ ...p, rtn: value.replace(/\D/g, "").substring(0, 14) })); setFormError(""); };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) { setFormError("El nombre es requerido"); return false; }
    if (formData.name.length > 100) { setFormError("El nombre no debe exceder 100 caracteres"); return false; }
    if (formData.email && formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setFormError("El correo electrónico no es válido"); return false; }
    }
    if (formData.rtn && formData.rtn.trim()) {
      if (!/^\d{14}$/.test(formData.rtn)) { setFormError("El RTN debe tener exactamente 14 dígitos numéricos"); return false; }
    }
    if (formData.phoneNumber && formData.phoneNumber.trim()) {
      if (!/^\d{4}-\d{4}$/.test(formData.phoneNumber)) { setFormError("El teléfono debe tener el formato 0000-0000"); return false; }
    }
    if (formData.address && formData.address.length > 300) { setFormError("La dirección no debe exceder 300 caracteres"); return false; }
    return true;
  };

  const handleCreate = () => { setFormData(emptyForm); setFormError(""); setView("create"); };
  const handleEdit = (c: AssociatedCompanyDto) => {
    setEditingCompany(c);
    setFormData({ ecommerceUserId: user.id, name: c.name, rtn: c.rtn || "", phoneNumber: c.phoneNumber || "", address: c.address || "", email: c.email || "" });
    setFormError(""); setView("edit");
  };
  const handleCancel = () => { setView("list"); setEditingCompany(null); setFormData(emptyForm); setFormError(""); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setFormError("");
    try {
      if (view === "create") {
        const cmd: CreateAssociatedCompanyCommand = {
          ecommerceUserId: formData.ecommerceUserId, name: formData.name,
          rtn: formData.rtn || undefined, phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined, email: formData.email || undefined,
        };
        const response = await createAssociatedCompany(cmd);
        if (response.succeeded) { setSuccess("Sociedad creada correctamente"); setView("list"); await fetchCompanies(); }
        else setFormError(response.message || "Error al crear la sociedad");
      } else if (view === "edit" && editingCompany) {
        const cmd: UpdateAssociatedCompanyCommand = {
          id: editingCompany.id, name: formData.name,
          rtn: formData.rtn || undefined, phoneNumber: formData.phoneNumber || undefined,
          address: formData.address || undefined, email: formData.email || undefined, isActive: editingCompany.isActive,
        };
        const response = await updateAssociatedCompany(editingCompany.id, cmd);
        if (response.succeeded) { setSuccess("Sociedad actualizada correctamente"); setView("list"); setEditingCompany(null); await fetchCompanies(); }
        else setFormError(response.message || "Error al actualizar la sociedad");
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
      const response = await deleteAssociatedCompany(id);
      if (response.succeeded) { setSuccess("Sociedad eliminada correctamente"); await fetchCompanies(); }
      else setError(response.message || "Error al eliminar la sociedad");
    } catch (err) {
      console.error("Error deleting associated company:", err);
      setError("Error de conexión. Por favor, intenta de nuevo.");
    } finally {
      setDeletingId(null);
    }
  };

  // ---- Form view ----
  if (view === "create" || view === "edit") {
    return (
      <div>
        <h2 className="mb-6 text-[24px] font-bold tracking-[-0.02em] text-text">
          {view === "create" ? "Nueva sociedad" : "Editar sociedad"}
        </h2>
        <div className="rounded-container border border-line bg-white p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelCls}>Nombre *</label>
              <input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} disabled={isSubmitting} className={fieldCls} />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>RTN</label>
                <input type="text" maxLength={14} placeholder="01019021333211" value={formData.rtn || ""} onChange={(e) => handleRtnChange(e.target.value)} disabled={isSubmitting} className={fieldCls} />
              </div>
              <div>
                <label className={labelCls}>Teléfono</label>
                <input type="tel" placeholder="0000-0000" value={formData.phoneNumber || ""} onChange={(e) => handlePhoneChange(e.target.value)} disabled={isSubmitting} className={fieldCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Correo electrónico</label>
              <input type="email" value={formData.email || ""} onChange={(e) => handleInputChange("email", e.target.value)} disabled={isSubmitting} className={fieldCls} />
            </div>
            <div>
              <label className={labelCls}>Dirección</label>
              <input type="text" value={formData.address || ""} onChange={(e) => handleInputChange("address", e.target.value)} disabled={isSubmitting} className={fieldCls} />
            </div>
            {formError && <p className={errBox}>{formError}</p>}
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" size="md" onClick={handleCancel} disabled={isSubmitting}>Cancelar</Button>
              <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : view === "create" ? "Crear sociedad" : "Actualizar sociedad"}
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
        <h2 className="text-[24px] font-bold tracking-[-0.02em] text-text">Sociedades</h2>
        <Button variant="primary" size="sm" onClick={handleCreate}><PlusIcon className="h-4 w-4" />Nueva sociedad</Button>
      </div>

      {success && <p className={`mb-4 ${okBox}`}>{success}</p>}
      {error && <p className={`mb-4 ${errBox}`}>{error}</p>}

      {isLoading ? (
        <div className="flex flex-col gap-4">{[0, 1].map((i) => <div key={i} className="h-32 animate-pulse rounded-container bg-surface-muted" />)}</div>
      ) : companies.length === 0 ? (
        <div className="flex flex-col items-center rounded-container border border-line bg-white px-6 py-[72px] text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[16px] bg-surface text-ink2-400"><BuildingOffice2Icon className="h-7 w-7" /></div>
          <div className="mb-1.5 text-[17px] font-semibold text-text">No tienes sociedades registradas</div>
          <p className="mb-6 text-[14px] text-ink2-500">Agrega tu primera sociedad para gestionar tus clientes.</p>
          <Button variant="primary" size="md" onClick={handleCreate}><PlusIcon className="h-4 w-4" />Nueva sociedad</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-[18px]">
          {companies.map((company) => (
            <div key={company.id} className="rounded-container border border-line bg-white p-7">
              <div className="mb-[18px] flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-[12px] bg-ink text-white"><BuildingOffice2Icon className="h-5 w-5" /></span>
                  <div className="text-[17px] font-bold tracking-[-0.01em] text-text">{company.name}</div>
                </div>
                <div className="flex flex-none gap-1.5">
                  <button type="button" onClick={() => handleEdit(company)} aria-label="Editar" className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-ink2-400 hover:bg-accent-soft hover:text-accent"><PencilIcon className="h-4 w-4" /></button>
                  <button type="button" onClick={() => handleDelete(company.id)} disabled={deletingId === company.id} aria-label="Eliminar" className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] text-ink2-400 hover:bg-[#FEECEC] hover:text-[#E5484D] disabled:opacity-50"><TrashIcon className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-3.5 border-t border-line-soft pt-[18px] sm:grid-cols-2">
                {[
                  company.rtn && { label: "RTN", value: company.rtn },
                  company.phoneNumber && { label: "Teléfono", value: company.phoneNumber },
                  company.email && { label: "Email", value: company.email },
                  company.address && { label: "Dirección", value: company.address },
                ].filter(Boolean).map((f) => (
                  <div key={f.label} className="flex gap-2 text-[14px]">
                    <span className="min-w-[74px] text-ink2-400">{f.label}</span>
                    <span className="font-medium text-text">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
