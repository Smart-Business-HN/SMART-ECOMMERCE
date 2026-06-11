'use client';

import { useEffect, useRef } from 'react';
import { trackFbEvent } from '@/lib/meta/fbpixel';
import type { MetaCustomData } from '@/lib/meta/meta-custom-data';

// Wrapper de cliente renderizado por el Server Component del producto. Recibe el
// custom_data ya construido en el servidor (donde el precio está en alcance) y
// dispara ViewContent una sola vez. trackFbEvent acuña el event_id y lo comparte
// entre el Pixel del navegador y la Conversions API para que Meta deduplique.
interface ProductViewTrackerProps {
  customData: MetaCustomData;
}

export default function ProductViewTracker({ customData }: ProductViewTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackFbEvent('ViewContent', customData);
    // Intencionalmente una sola vez al montar; el ref evita el doble de StrictMode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
