// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import {
  UserIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  ReceiptRefundIcon,
  MapPinIcon,
  CreditCardIcon,
  BuildingOffice2Icon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { EcommerceUserDto } from "@/interfaces/auth/auth.interface";
import ProfileTab from "@/components/customer/account/profile-tab.component";
import CartsTab from "@/components/customer/account/carts-tab.component";
import PaymentMethodsTab from "@/components/customer/account/payment-methods-tab.component";
import CompaniesTab from "@/components/customer/account/companies-tab.component";
import ComingSoonTab from "@/components/customer/account/coming-soon-tab.component";

interface ProfileLayoutProps {
  user: EcommerceUserDto;
}

const TABS = [
  { id: "profile", label: "Perfil", Icon: UserIcon },
  { id: "carts", label: "Mis Carritos", Icon: ShoppingCartIcon },
  { id: "quotations", label: "Mis Cotizaciones", Icon: DocumentTextIcon },
  { id: "invoices", label: "Mis Facturas", Icon: ReceiptRefundIcon },
  { id: "addresses", label: "Direcciones", Icon: MapPinIcon },
  { id: "payment-methods", label: "Métodos de Pago", Icon: CreditCardIcon },
  { id: "companies", label: "Sociedades", Icon: BuildingOffice2Icon },
];
const TAB_IDS = TABS.map((t) => t.id);

export default function ProfileLayout({ user }: ProfileLayoutProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [currentUser, setCurrentUser] = useState<EcommerceUserDto>(user);

  // Deep-link inicial (?tab=) sin requerir Suspense de useSearchParams.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("tab");
    if (t && TAB_IDS.includes(t)) setActiveTab(t);
  }, []);

  const selectTab = (id: string) => {
    setActiveTab(id);
    const url = `${window.location.pathname}?tab=${id}`;
    window.history.replaceState(null, "", url);
  };

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileTab
            user={currentUser}
            onImageUpdate={(url) => setCurrentUser((p) => ({ ...p, photo: url }))}
            onUserUpdate={(u) => setCurrentUser(u)}
          />
        );
      case "carts":
        return <CartsTab userId={currentUser.id} />;
      case "payment-methods":
        return <PaymentMethodsTab user={currentUser} />;
      case "companies":
        return <CompaniesTab user={currentUser} />;
      case "quotations":
        return (
          <ComingSoonTab
            icon={<DocumentTextIcon className="h-8 w-8" />}
            text="Aquí verás tus cotizaciones aprobadas y pendientes. Estamos habilitando esta sección."
          />
        );
      case "invoices":
        return (
          <ComingSoonTab
            icon={<ReceiptRefundIcon className="h-8 w-8" />}
            text="Aquí podrás consultar y descargar tus facturas. Estamos habilitando esta sección."
          />
        );
      case "addresses":
        return (
          <ComingSoonTab
            icon={<MapPinIcon className="h-8 w-8" />}
            text="Aquí podrás gestionar tus direcciones de envío y facturación. Estamos habilitando esta sección."
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-[1280px] px-4 pt-10 sm:px-6 lg:px-8">
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-text md:text-[40px]">Mi cuenta</h1>
        <p className="mt-1 text-[15px] text-ink2-500 md:text-[16px]">
          Gestiona tu información, pedidos y preferencias
        </p>
      </div>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[260px_1fr] lg:gap-8 lg:px-8 lg:pb-24">
        {/* Sidebar / barra de tabs */}
        <aside className="lg:sticky lg:top-[88px] lg:self-start">
          <nav className="flex gap-1.5 overflow-x-auto rounded-container border border-line bg-white p-2.5 lg:flex-col lg:gap-0.5">
            {TABS.map(({ id, label, Icon }) => {
              const active = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => selectTab(id)}
                  className={`flex flex-none items-center gap-3 whitespace-nowrap rounded-[11px] px-3.5 py-3 text-left text-[14.5px] transition-colors ${
                    active
                      ? "border border-accent-border bg-accent-soft font-semibold text-accent"
                      : "border border-transparent text-ink2-700 hover:bg-surface"
                  }`}
                >
                  <Icon className={`h-[19px] w-[19px] flex-none ${active ? "text-accent" : "text-ink2-400"}`} />
                  {label}
                </button>
              );
            })}
            <div className="my-2 hidden h-px bg-line-soft lg:block" />
            <button
              type="button"
              onClick={handleSignOut}
              className="flex flex-none items-center gap-3 whitespace-nowrap rounded-[11px] px-3.5 py-3 text-left text-[14.5px] font-medium text-[#E5484D] transition-colors hover:bg-[#FEECEC]"
            >
              <ArrowRightStartOnRectangleIcon className="h-[19px] w-[19px] flex-none" />
              Cerrar sesión
            </button>
          </nav>
        </aside>

        {/* Contenido */}
        <div>{renderTab()}</div>
      </div>
    </div>
  );
}
