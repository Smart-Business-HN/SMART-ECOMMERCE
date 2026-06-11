'use client';

import { useEffect, useRef } from 'react';
import { trackFbEvent, type PixelUserFields } from '@/lib/meta/fbpixel';
import type { MetaCustomData } from '@/lib/meta/meta-custom-data';

// Tracker genérico para disparar un evento estándar de Meta UNA sola vez al
// montar. Útil cuando el evento ocurre en una página server-rendered (sin click),
// p. ej. Lead en la vista de una cotización. El custom_data / userFields se
// construyen en el servidor y se pasan como props serializables. trackFbEvent
// acuña el event_id y lo comparte entre navegador y Conversions API (dedup).
interface MetaEventTrackerProps {
  eventName: string;
  customData?: MetaCustomData;
  userFields?: PixelUserFields;
}

export default function MetaEventTracker({ eventName, customData, userFields }: MetaEventTrackerProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackFbEvent(eventName, customData ?? {}, userFields);
    // Intencionalmente una sola vez al montar (props estáticas en server render);
    // el ref evita además el doble disparo de StrictMode.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
