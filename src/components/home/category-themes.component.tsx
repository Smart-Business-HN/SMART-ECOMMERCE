import Link from "next/link";

const DARK_BG = "linear-gradient(160deg,#0A0D14,#141c2b)";

const THEMES = [
  {
    kicker: "Redes empresariales",
    title: "Línea completa UniFi",
    desc: "APs, switches y gateways gestionados desde una sola consola.",
    bg: DARK_BG,
    fg: "#fff",
    muted: "#A7B0BE",
    accent: "#5AA0FF",
    slot: "UniFi stack",
    href: "/tienda",
  },
  {
    kicker: "Conectividad WISP",
    title: "Enlaces airMAX & LTU",
    desc: "Antenas y radios para cobertura de largo alcance.",
    bg: "#fff",
    fg: "#14171C",
    muted: "#79808B",
    accent: "#006FFF",
    slot: "antena",
    href: "/tienda",
  },
  {
    kicker: "Videovigilancia",
    title: "CCTV Hikvision",
    desc: "Cámaras IP y análogas, NVRs y almacenamiento.",
    bg: "#fff",
    fg: "#14171C",
    muted: "#79808B",
    accent: "#006FFF",
    slot: "cámara CCTV",
    href: "/tienda",
  },
  {
    kicker: "Cableado estructurado",
    title: "Cat6A, gabinetes y más",
    desc: "Todo para tu data center: Panduit, canalización y herramientas.",
    bg: DARK_BG,
    fg: "#fff",
    muted: "#A7B0BE",
    accent: "#5AA0FF",
    slot: "patch panel",
    href: "/servicios",
  },
];

export default function CategoryThemesComponent() {
  return (
    <section className="bg-surface">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {THEMES.map((theme) => (
            <Link
              key={theme.title}
              href={theme.href}
              className="sb-card relative rounded-container overflow-hidden min-h-[280px] border border-line flex flex-col justify-end p-[34px]"
              style={{ background: theme.bg }}
            >
              <div
                className="absolute top-[26px] right-[30px] font-mono text-[11px]"
                style={{ color: "#B7BdC6" }}
              >
                [ {theme.slot} ]
              </div>
              <div className="relative z-[2] max-w-[62%]">
                <div
                  className="text-[12.5px] tracking-[0.1em] uppercase font-bold mb-2.5"
                  style={{ color: theme.accent }}
                >
                  {theme.kicker}
                </div>
                <h3
                  className="text-[26px] tracking-[-0.025em] font-bold mb-2"
                  style={{ color: theme.fg }}
                >
                  {theme.title}
                </h3>
                <p
                  className="text-[14.5px] leading-[1.5]"
                  style={{ color: theme.muted }}
                >
                  {theme.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
