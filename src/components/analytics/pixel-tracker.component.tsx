'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { isConsentGranted } from '@/lib/meta/fbpixel';

// Dispara un único PageView en la carga inicial y en cada cambio de ruta del
// lado del cliente. El código base NO dispara PageView, por lo que esta es la
// única fuente (evita el doble conteo de la página de aterrizaje).
//
// Debe ir envuelto en <Suspense> por quien lo renderiza: useSearchParams lo
// exige en Next 16 o el build de producción falla.
export default function PixelTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Guarda la última URL rastreada para deduplicar: evita el doble disparo de
  // React StrictMode (dev) y re-renders sin cambio real de ruta, sin impedir
  // los PageView de navegaciones reales (URL distinta).
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    const url = `${pathname}?${searchParams.toString()}`;
    if (lastTracked.current === url) return;
    lastTracked.current = url;

    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
    if (!isConsentGranted()) return; // respeta el opt-out
    window.fbq('track', 'PageView');
  }, [pathname, searchParams]);

  return null;
}
