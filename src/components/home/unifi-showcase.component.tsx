import Image from "next/image";
import Link from "next/link";

export default function UnifiShowcaseComponent() {
  return (
    <section className="bg-white border-t border-line-soft">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-20 pb-10 text-center">
        <Image
          src="/images/corporate/unifi-icon-smart-business.png"
          alt="UniFi"
          width={512}
          height={512}
          style={{ width: "auto" }}
          className="h-[44px] object-contain mx-auto mb-[22px]"
        />
        <h2 className="text-[28px] md:text-[38px] tracking-[-0.03em] font-bold text-text mb-3.5">
          Una sola plataforma para toda tu red
        </h2>
        <p className="text-[16px] md:text-[17px] leading-[1.55] text-ink2-500 max-w-[580px] mx-auto mb-4">
          Gateways, switches PoE, access points WiFi 6, cámaras y control de
          acceso UniFi — administrados desde una sola consola.
        </p>
        <Link
          href="/tienda"
          className="sb-link inline-block text-accent font-semibold text-[15px] mb-6 hover:opacity-80"
        >
          Explorar línea UniFi →
        </Link>
        <div className="max-w-[1000px] mx-auto">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-line">
            <Image
              src="/images/products/project-ubiquiti.png"
              alt="Infraestructura UniFi desplegada en un edificio"
              fill
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
