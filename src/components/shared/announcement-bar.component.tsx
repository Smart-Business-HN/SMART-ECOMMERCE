/**
 * Top promotional strip rendered above the sticky navbar on every page.
 * Scrolls away with the page (the navbar stays sticky underneath it).
 */
export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-surface-alt text-[13px] tracking-[0.01em] text-center px-4 py-[9px] font-medium">
      Envío <span className="text-accent-light">gratis</span> en compras mayores a L.
      1,000 &nbsp;·&nbsp; Distribuidor oficial Ubiquiti · Hikvision · Mikrotik
    </div>
  );
}
