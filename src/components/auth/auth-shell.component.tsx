import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";
import type { ReactNode } from "react";

const PERKS = [
  "Precios y descuentos para empresas",
  "Historial de compras y cotizaciones",
  "Checkout más rápido y seguro",
];

/**
 * Split-panel auth layout ("Smart Business Rediseño"): dark brand panel (left, lg+) +
 * form slot (right). Used by login, sign-up and password recovery.
 */
export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-10 sm:py-14">
      <div className="grid overflow-hidden rounded-container border border-line bg-white shadow-card lg:grid-cols-[1fr_1.05fr]">
        {/* Brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 lg:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-25"
          >
            <Image
              src="/images/corporate/landing_smart_business_background.webp"
              alt=""
              fill
              sizes="500px"
              className="object-cover"
            />
          </div>
          {/* Scrim lineal: unifica imagen + fondo en un degradado diagonal limpio */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(155deg, rgba(10,13,20,.35) 0%, rgba(10,13,20,.78) 55%, rgba(10,13,20,.96) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-[360px] w-[360px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(0,111,255,.5) 0%, rgba(0,111,255,0) 70%)",
            }}
          />
          <div className="relative">
            <Image
              src="/images/corporate/smart_business_logo_white_letters.png"
              alt="Smart Business"
              width={150}
              height={34}
              className="h-[34px] w-auto"
            />
          </div>
          <div className="relative">
            <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-white">
              Tu cuenta, toda tu tecnología.
            </h2>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink2-300">
              Accede a precios para empresas, da seguimiento a tus pedidos y
              compra más rápido en Smart Business.
            </p>
            <ul className="mt-6 space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-white">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[14.5px] text-surface-alt">{perk}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative text-[12.5px] text-ink2-400">
            Distribuidor oficial · UniFi · Hikvision · Mikrotik
          </div>
        </div>

        {/* Form slot */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[404px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
