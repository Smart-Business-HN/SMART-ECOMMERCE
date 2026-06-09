import Link from "next/link";
import Image from "next/image";

export default function HeroComponent() {
  return (
    <div className="w-full sm:px-4">
      <div className="relative w-full px-4 sm:px-0 sm:mx-auto container my-4 h-96 overflow-hidden border-2 rounded-3xl hover:border-blue-400 border-[#F6F6F8]">
        {/* LCP element: prioritized, discoverable, fetchpriority=high via next/image priority */}
        <Image
          src="/images/corporate/landing_smart_business_background.webp"
          alt="Soluciones tecnológicas Smart Business"
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="relative z-10 grid h-full grid-cols-2">
          <div className="col-span-2 md:col-span-1 h-full flex flex-col items-center justify-center gap-5 text-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 animate-fade-down">
              Somos tus aliados<br />Tecnológicos
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-down">
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md transition-colors hover:bg-blue-700"
              >
                Ver Catálogo
              </Link>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-xl border border-blue-600 bg-white/80 text-blue-700 font-semibold transition-colors hover:bg-blue-50"
              >
                Contáctanos
              </Link>
            </div>
            <div className="flex items-center justify-center gap-4 animate-fade-down">
              <Image
                alt="Logo Ubiquiti UniFi"
                src="/images/corporate/unifi-icon-smart-business.png"
                height={40}
                width={40}
              />
              <Image
                alt="Logo MikroTik"
                src="/images/corporate/mikrotik-logo.png"
                height={30}
                width={220}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
