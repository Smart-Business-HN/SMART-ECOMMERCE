import type { ReactNode } from "react";

/**
 * Placeholder honesto para tabs cuyo backend ecommerce aún no existe
 * (Cotizaciones, Facturas, Direcciones). Sin datos falsos.
 */
export default function ComingSoonTab({
  icon,
  text,
}: {
  icon: ReactNode;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-container border border-line bg-white px-6 py-20 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[16px] bg-surface-muted text-ink2-400">
        {icon}
      </div>
      <div className="mb-1.5 text-[17px] font-semibold text-text">Próximamente</div>
      <p className="max-w-[420px] text-[14px] leading-[1.5] text-ink2-500">{text}</p>
    </div>
  );
}
