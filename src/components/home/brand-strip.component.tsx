import Image from "next/image";

interface Brand {
  src: string;
  alt: string;
  w: number;
  h: number;
  unoptimized?: boolean;
  // Optional display-height override; defaults to h-[30px]. Used to enlarge
  // near-square logos (e.g. APC) so they don't read tiny next to wordmarks.
  cls?: string;
}

const BRANDS: Brand[] = [
  { src: "/images/corporate/unifi-icon-smart-business.png", alt: "Ubiquiti UniFi", w: 512, h: 512 },
  { src: "/images/corporate/Hikvision_logo_smart_business.png", alt: "Hikvision", w: 2560, h: 343 },
  { src: "/images/corporate/mikrotik-logo.png", alt: "MikroTik", w: 2560, h: 442 },
  // SVG served unoptimized (project has no dangerouslyAllowSVG); rendered directly from /public.
  { src: "/images/brands/panduit-icon-smart-business.svg", alt: "Panduit", w: 133, h: 30, unoptimized: true },
  { src: "/images/brands/apc-partnert-smart-business.png", alt: "APC", w: 220, h: 138, cls: "h-[44px]" },
];

export default function BrandStripComponent() {
  return (
    <section className="bg-white border-b border-line-soft">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-[38px]">
        <p className="text-center text-[12.5px] tracking-[0.12em] uppercase text-ink2-400 font-semibold mb-[26px]">
          Distribuidores oficiales de marcas insignia
        </p>
        <div className="flex items-center justify-center md:justify-between gap-8 flex-wrap">
          {BRANDS.map((brand) => (
            <Image
              key={brand.alt}
              src={brand.src}
              alt={`Marca oficial ${brand.alt}`}
              width={brand.w}
              height={brand.h}
              unoptimized={brand.unoptimized}
              style={{ width: "auto" }}
              className={`sb-brand object-contain ${brand.cls ?? "h-[30px]"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
