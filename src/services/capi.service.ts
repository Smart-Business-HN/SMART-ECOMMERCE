// Servicio server-only que arma el payload de la Conversions API de Meta y lo
// envía al Graph API. Lo consumen el route handler /api/events/capi (eventos del
// navegador) y /api/events/purchase (webhook server-to-server del backend).
//
// NO lleva 'use server': no es una server action invocada desde el cliente; el
// cliente llega vía los route handlers. Importa node:crypto a través de hash.ts,
// por lo que jamás debe importarse desde un componente de cliente.
import { buildUserData, type RawUserFields, type RawTransportFields } from '@/lib/meta/hash';
import type { MetaCustomData } from '@/lib/meta/meta-custom-data';

const DEFAULT_GRAPH_VERSION = 'v23.0';

export interface CapiEventInput {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  eventTime?: number; // unix segundos
  actionSource?: string;
  user: RawUserFields;
  transport: RawTransportFields;
  customData?: MetaCustomData;
}

export interface CapiResult {
  succeeded: boolean;
  skipped?: boolean;
  message?: string;
  fbtraceId?: string;
}

function getConfig() {
  const pixelId = process.env.CAPI_PIXEL_ID || process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const accessToken = process.env.CAPI_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_VERSION || DEFAULT_GRAPH_VERSION;
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  return { pixelId, accessToken, version, testEventCode };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Envía un evento a la Conversions API. Reintenta solo en 429 / 5xx conservando
// el mismo event_id (idempotente). Nunca lanza: devuelve un CapiResult.
export async function sendCapiEvent(input: CapiEventInput): Promise<CapiResult> {
  const { pixelId, accessToken, version, testEventCode } = getConfig();

  if (!pixelId || !accessToken) {
    // Sin credenciales (p. ej. dev local): no-op para no romper la app.
    return { succeeded: true, skipped: true, message: 'CAPI no configurada' };
  }

  const userData = buildUserData(input.user, input.transport);
  const eventTime = input.eventTime ?? Math.floor(Date.now() / 1000);

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: eventTime,
        event_id: input.eventId,
        action_source: input.actionSource ?? 'website',
        ...(input.eventSourceUrl ? { event_source_url: input.eventSourceUrl } : {}),
        user_data: userData,
        ...(input.customData ? { custom_data: input.customData } : {}),
      },
    ],
  };
  if (testEventCode) body.test_event_code = testEventCode;

  const url = `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${accessToken}`;

  let lastError = '';
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = (await response.json().catch(() => ({}))) as {
        fbtrace_id?: string;
        error?: { message?: string };
      };

      if (response.ok) {
        return { succeeded: true, fbtraceId: json.fbtrace_id };
      }

      if (response.status === 429 || response.status >= 500) {
        lastError = `HTTP ${response.status}`;
        await sleep(250 * 2 ** attempt + Math.floor(Math.random() * 100));
        continue;
      }

      console.error('[CAPI] error no reintentable', response.status, json);
      return {
        succeeded: false,
        message: json.error?.message || `HTTP ${response.status}`,
        fbtraceId: json.fbtrace_id,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'desconocido';
      await sleep(250 * 2 ** attempt);
    }
  }

  console.error('[CAPI] falló tras reintentos:', lastError);
  return { succeeded: false, message: lastError };
}
