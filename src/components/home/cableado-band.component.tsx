import Image from "next/image";
import Link from "next/link";

export default function CableadoBandComponent() {
  return (
    <section className="relative bg-surface overflow-hidden border-t border-line-soft">
      {/* Background image */}
      <Image
        src="/images/backgrounds/unifi-at-scale.png"
        alt="Cableado estructurado profesional"
        fill
        sizes="100vw"
        className="object-cover object-[center_right]"
      />
      {/* Móvil: velo diagonal fuerte para legibilidad (el texto abarca casi todo el ancho) */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(246,247,248,.97) 0%,rgba(246,247,248,.93) 45%,rgba(246,247,248,.62) 100%)",
        }}
      />
      {/* Desktop: left fade para que la foto siga protagonista a la derecha */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg,#F6F7F8 0%,#F6F7F8 30%,rgba(246,247,248,.7) 50%,rgba(246,247,248,0) 72%)",
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-[88px] min-h-[380px] flex items-center">
        <div className="max-w-[460px]">
          <p className="text-[12.5px] tracking-[0.12em] uppercase text-accent font-bold mb-3">
            Cableado estructurado
          </p>
          <h2 className="text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.03em] font-bold text-text mb-4">
            Infraestructura ordenada que dura años
          </h2>
          <p className="text-[16px] leading-[1.65] text-ink2-600 mb-[26px]">
            Cat6A, fibra óptica, gabinetes Panduit y Belden, canalización y
            certificación. Todo lo que tu data center necesita, con instalación
            profesional.
          </p>
          <Link
            href="/servicios"
            className="sb-btn inline-block bg-ink text-white font-semibold text-[15px] px-[26px] py-3.5 rounded-btn hover:bg-text"
          >
            Ver servicios
          </Link>
        </div>
      </div>
    </section>
  );
}
