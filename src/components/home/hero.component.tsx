import Link from "next/link";
import Image from "next/image";

const STATS = [
  { value: "7", label: "marcas oficiales" },
  { value: "+15 años", label: "en el mercado" },
  { value: "24/7", label: "soporte técnico" },
];

export default function HeroComponent() {
  return (
    <section className="relative bg-ink text-white overflow-hidden">
      {/* Background image (LCP element) */}
      <Image
        src="/images/corporate/landing_smart_business_background.webp"
        alt="Infraestructura de red empresarial Smart Business"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[right_center] opacity-90"
      />
      {/* Gradient + glow overlays */}
      {/* Móvil: velo oscuro fuerte para que el texto (que abarca casi todo el ancho) tenga contraste */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(160deg,rgba(10,13,20,.95) 0%,rgba(10,13,20,.88) 50%,rgba(10,13,20,.78) 100%)",
        }}
      />
      {/* Desktop: fade direccional para que la imagen siga protagonista a la derecha */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(100deg,#0A0D14 0%,#0A0D14 34%,rgba(10,13,20,.78) 50%,rgba(10,13,20,.2) 72%,rgba(10,13,20,.05) 100%)",
        }}
      />
      <div
        className="absolute -top-[180px] -left-[140px] w-[540px] h-[540px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(0,111,255,.16),transparent 65%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 pt-[72px] pb-20 md:pt-[108px] md:pb-[116px]">
        <div className="max-w-[560px]">
          <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.12] rounded-full px-3.5 py-[7px] text-[13px] font-medium text-[#AFC4E6] mb-7">
            <span className="w-[7px] h-[7px] rounded-full bg-success-light" />
            Tus aliados tecnológicos en Honduras
          </div>

          <h1 className="text-[34px] md:text-[60px] leading-[1.08] md:leading-[1.04] tracking-[-0.035em] font-bold mb-[22px]">
            Infraestructura de red de
            <br className="hidden md:block" />{" "}
            <span className="text-accent-light">nivel empresarial.</span>
          </h1>

          <p className="text-[17px] md:text-[19px] leading-[1.55] text-ink2-300 max-w-[480px] mb-9 font-normal">
            Cableado estructurado, CCTV, redes y energía. Distribuidor oficial de
            las marcas líderes, con soporte técnico local.
          </p>

          <div className="flex flex-wrap gap-3.5 items-center">
            <Link
              href="/tienda"
              className="sb-btn inline-flex text-white font-semibold text-[15.5px] px-7 py-[15px] rounded-btn bg-accent"
              style={{ boxShadow: "0 10px 30px -8px rgba(0,111,255,.6)" }}
            >
              Explorar la tienda
            </Link>
            <Link
              href="/ventix"
              className="sb-btn sb-link inline-flex text-white font-medium text-[15.5px] px-[26px] py-[15px] rounded-btn bg-white/[0.07] border border-white/[0.14] hover:bg-white/[0.12]"
            >
              Conocer Ventix
            </Link>
          </div>

          <div className="flex items-stretch gap-7 md:gap-9 mt-12">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="flex items-stretch gap-7 md:gap-9">
                {i > 0 && <div className="w-px bg-white/[0.14]" />}
                <div>
                  <div className="text-[22px] md:text-[26px] font-bold tracking-[-0.02em]">
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-ink2-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
