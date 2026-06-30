const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const TRUST = [
  {
    title: "Envío gratis",
    sub: "En compras +L. 1,000",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="1" y="3" width="15" height="13" />
        <path d="M16 8h4l3 3v5h-7" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Pago seguro",
    sub: "Link de pago BAC",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Garantía",
    sub: "Moneyback",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Soporte 24/7",
    sub: "Asistencia técnica",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  },
  {
    title: "Marcas líderes",
    sub: "Productos de calidad",
    icon: (
      <svg {...ICON_PROPS}>
        <polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9" />
      </svg>
    ),
  },
];

export default function TrustBadgesComponent() {
  return (
    <section className="bg-surface">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-11 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {TRUST.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center text-center gap-3 p-2"
          >
            <div className="w-[46px] h-[46px] rounded-xl bg-white border border-[#EAEBEE] flex items-center justify-center text-accent">
              {item.icon}
            </div>
            <div>
              <div className="text-[14.5px] font-semibold text-text">
                {item.title}
              </div>
              <div className="text-[13px] text-ink2-500 mt-0.5">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
