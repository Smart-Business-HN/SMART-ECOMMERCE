import Image from "next/image";
import Link from "next/link";

const VENTIX_FEATURES = [
  "Punto de venta rápido e intuitivo",
  "Facturación CAI / SAR conforme",
  "Inventario multi-bodega en tiempo real",
  "CRM y reportes de ventas",
];

export default function VentixSectionComponent() {
  return (
    <section id="ventix" className="bg-ink text-white relative overflow-hidden">
      <div
        className="absolute top-1/2 -left-[160px] -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(0,111,255,.16),transparent 65%)" }}
      />
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-[88px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-14 items-center">
        {/* Copy */}
        <div>
          <div className="mb-[26px]">
            <Image
              src="/images/ventix/logo/logo-text-on-dark.png"
              alt="Ventix by Smart Business"
              width={1746}
              height={485}
              style={{ width: "auto" }}
              className="h-14 object-contain"
            />
          </div>
          <h2 className="text-[32px] md:text-[40px] leading-[1.08] tracking-[-0.03em] font-bold mb-[18px]">
            Tu negocio, en la nube.
          </h2>
          <p className="text-[16px] md:text-[17px] leading-[1.6] text-ink2-300 max-w-[460px] mb-7">
            POS, facturación CAI/SAR, inventario multi-bodega y CRM en un solo
            lugar. El ERP en la nube hecho para Honduras.
          </p>
          <div className="flex flex-col gap-3.5 mb-8">
            {VENTIX_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-[15px] text-[#D4DAE3]">
                <span className="w-[22px] h-[22px] rounded-full bg-[rgba(0,194,168,0.16)] text-success-light flex items-center justify-center flex-none">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                {feature}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Link
              href="/ventix"
              className="sb-btn inline-block bg-white text-ink font-semibold text-[15.5px] px-7 py-3.5 rounded-btn"
            >
              Conocer Ventix
            </Link>
            <a
              href="https://ventix.smartbusiness.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="sb-link inline-flex items-center gap-1.5 text-ink2-300 text-[14.5px] font-medium hover:text-white"
            >
              Visitar sitio oficial
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          </div>
        </div>

        {/* Dashboard mockup */}
        <div
          className="rounded-[18px] border border-white/[0.08] p-3 md:p-4"
          style={{ background: "linear-gradient(160deg,#141a26,#0d111a)" }}
        >
          <Image
            src="/images/ventix/screenshots/Dashboard.png"
            alt="Dashboard de Ventix con reportes y métricas del negocio"
            width={900}
            height={560}
            className="rounded-[10px] w-full h-auto ring-1 ring-white/10"
          />
        </div>
      </div>
    </section>
  );
}
