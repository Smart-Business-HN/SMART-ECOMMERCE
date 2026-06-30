import React from "react";
import Image from "next/image";
import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    head: "Tienda",
    links: [
      { label: "Conectividad", href: "/tienda" },
      { label: "Videovigilancia", href: "/tienda" },
      { label: "Cableado estructurado", href: "/tienda" },
      { label: "Energía", href: "/tienda" },
      { label: "Control de acceso", href: "/tienda" },
    ],
  },
  {
    head: "Empresa",
    links: [
      { label: "Quiénes somos", href: "/quienes-somos" },
      { label: "Servicios", href: "/servicios" },
      { label: "Ventix", href: "/ventix" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    head: "Ayuda",
    links: [
      { label: "Envíos y entregas", href: "/terminos-y-condiciones" },
      { label: "Pago seguro BAC", href: "/terminos-y-condiciones" },
      { label: "Garantías", href: "/terminos-y-condiciones" },
      { label: "Soporte 24/7", href: "/contacto" },
    ],
  },
];

const SOCIAL = {
  facebook: "https://www.facebook.com/SmartBusiness504",
  instagram: "https://www.instagram.com/smartbusiness504/",
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-line">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          {/* Brand + contact */}
          <div>
            <Link href="/" className="flex items-center mb-[18px]" aria-label="Smart Business - Inicio">
              <Image
                src="/images/corporate/logo-smart-business.png"
                alt="Smart Business"
                width={429}
                height={113}
                style={{ width: "auto" }}
                className="h-8 object-contain"
              />
            </Link>
            <p className="text-sm leading-relaxed text-ink2-500 max-w-[300px] mb-[18px]">
              Cableado estructurado, CCTV, redes y software a la medida. Somos tus
              aliados tecnológicos.
            </p>
            <div className="text-[13.5px] text-ink2-500 leading-[1.8]">
              San Pedro Sula, Honduras
              <br />
              ventas@smartbusiness.site
              <br />
              (+504) 2445-1515 · (+504) 8818-7765
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.head}>
              <div className="text-[13px] font-bold tracking-[0.02em] text-text mb-4">
                {col.head}
              </div>
              <div className="flex flex-col gap-[11px]">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="sb-link text-ink2-500 text-sm hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-line-soft flex-wrap gap-3.5">
          <span className="text-[13px] text-ink2-400">
            © {year} Smart Business S. de R.L. · Todos los derechos reservados.
          </span>
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-ink2-400">
              Lun–Vie 8:00–17:00 · @smartbusiness504
            </span>
            <a
              href={SOCIAL.facebook}
              aria-label="Facebook de Smart Business"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink2-400 transition-colors hover:text-accent"
            >
              <svg width="9" height="16" viewBox="0 0 7 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.52032 14H2.05764V7.63755H0V5.16979H2.05764V3.33996C2.05764 2.28795 2.34117 1.47935 2.90823 0.914173C3.4753 0.348995 4.21248 0.0664062 5.11979 0.0664062C5.56264 0.0664062 5.95418 0.0803958 6.29442 0.108375C6.63466 0.136354 6.85878 0.155939 6.9668 0.167131V2.38308H5.70305C5.2062 2.38308 4.88486 2.49499 4.73904 2.71883C4.59323 2.94266 4.52032 3.23364 4.52032 3.59177V5.16979H6.88579L6.57795 7.63755H4.52032V14Z" />
              </svg>
            </a>
            <a
              href={SOCIAL.instagram}
              aria-label="Instagram de Smart Business"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink2-400 transition-colors hover:text-accent"
            >
              <svg width="15" height="15" viewBox="0 0 14 14" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.82761 3.20685C9.82761 3.68358 10.2141 4.07001 10.6907 4.07001C11.1675 4.07001 11.5539 3.68358 11.5539 3.20685C11.5539 2.73015 11.1675 2.34372 10.6907 2.34372C10.2141 2.34372 9.82761 2.73015 9.82761 3.20685ZM9.50522 9.6269C10.1903 8.93594 10.5795 8.01214 10.6011 7.02566C10.6236 5.99516 10.3065 5.09921 9.68399 4.43469C9.02718 3.73348 8.07091 3.34507 6.91858 3.31149C5.95527 3.28335 5.03714 3.64392 4.33416 4.32671C3.61311 5.02702 3.19958 6.00578 3.19958 7.01204C3.19958 9.05267 4.85977 10.7129 6.9004 10.7129C7.88577 10.7129 8.81085 10.3272 9.50522 9.6269ZM4.10217 0.0664062H9.69866C11.8928 0.0664062 13.6778 1.85142 13.6778 4.04553V10.0173C13.6778 12.2114 11.8928 13.9964 9.69866 13.9964H4.10217C1.90806 13.9964 0.123047 12.2114 0.123047 10.0173V4.04553C0.123047 1.85142 1.90806 0.0664062 4.10217 0.0664062ZM6.81501 4.55701C6.83736 4.55701 6.85979 4.55736 6.88223 4.558C7.69511 4.58171 8.34921 4.83387 8.77388 5.28723C9.16887 5.7089 9.36961 6.30064 9.35433 6.99845C9.3241 8.38207 8.2462 9.46587 6.90041 9.46587C5.54737 9.46587 4.44658 8.3651 4.44658 7.01206C4.44658 6.34086 4.7223 5.68815 5.20298 5.22129C5.64558 4.79138 6.21573 4.55701 6.81501 4.55701Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
