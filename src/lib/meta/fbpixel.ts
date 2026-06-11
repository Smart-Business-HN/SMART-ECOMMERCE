'use client';

// Helper de cliente para emitir eventos de Meta en LOS DOS transportes con un
// único event_id compartido:
//   - el Pixel del navegador (fbq) para atribución inmediata basada en cookies
//   - la Conversions API (servidor) vía POST /api/events/capi, resistente a
//     bloqueadores / iOS y deduplicada por event_id.
import type { MetaCustomData } from './meta-custom-data';

// Identificadores provistos por un formulario (Advanced Matching en CAPI para
// eventos donde el dato está en el form pero aún no en la sesión, p. ej. registro).
export interface PixelUserFields {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}

export function newEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Política opt-out: se rastrea por defecto; el banner solo escribe la cookie
// cuando el usuario revoca.
export function isConsentGranted(): boolean {
  if (typeof document === 'undefined') return true;
  return !/(?:^|;\s*)meta_consent=revoked/.test(document.cookie);
}

// Dispara un evento estándar de Meta en navegador + servidor con el mismo
// event_id. El POST a la API es fire-and-forget: la analítica nunca debe
// bloquear ni romper la UI.
export function trackFbEvent(
  eventName: string,
  customData: MetaCustomData = {},
  userFields?: PixelUserFields,
): string {
  const eventId = newEventId();
  if (!isConsentGranted()) return eventId;

  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', eventName, customData as Record<string, unknown>, { eventID: eventId });
  }

  if (typeof window !== 'undefined') {
    const payload = {
      eventName,
      eventId,
      eventSourceUrl: window.location.href,
      customData,
      userFields,
    };
    void fetch('/api/events/capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      /* la analítica nunca debe lanzar excepciones hacia la app */
    });
  }

  return eventId;
}
