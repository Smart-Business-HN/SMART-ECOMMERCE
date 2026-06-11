import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';
import { sendCapiEvent } from '@/services/capi.service';
import { META_CURRENCY, type MetaContent } from '@/lib/meta/meta-custom-data';
import { getBaseUrl } from '@/utils/server-url';

// Comparación de secreto en tiempo constante (evita timing side-channels).
function secretsMatch(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

// Webhook server-to-server: el backend SMART-ERP-API lo invoca cuando un carrito
// pasa a "Verified" (compra confirmada). Es la ÚNICA fuente fiable de Purchase,
// ya que no hay página de confirmación síncrona. Se autentica con el secreto
// compartido BACKEND_SECRET_KEY. event_id = cart.id, idempotente/deduplicable.
interface PurchaseRequestBody {
  eventId: string;
  orderId?: string;
  value: number;
  currency?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  contents?: MetaContent[];
}

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-backend-secret');
    if (!secretsMatch(secret, process.env.BACKEND_SECRET_KEY)) {
      return NextResponse.json({ succeeded: false, message: 'No autorizado' }, { status: 401 });
    }

    const body = (await request.json()) as PurchaseRequestBody;
    if (!body?.eventId || typeof body.value !== 'number') {
      return NextResponse.json(
        { succeeded: false, message: 'Datos de compra inválidos' },
        { status: 400 },
      );
    }

    const contents = body.contents ?? [];

    const result = await sendCapiEvent({
      eventName: 'Purchase',
      eventId: body.eventId,
      eventSourceUrl: getBaseUrl(),
      actionSource: 'website',
      user: {
        email: body.email ?? null,
        phone: body.phone ?? null,
        firstName: body.firstName ?? null,
        lastName: body.lastName ?? null,
        externalId: null,
      },
      transport: {},
      customData: {
        content_type: 'product',
        contents,
        content_ids: contents.map((content) => content.id),
        num_items: contents.reduce((sum, content) => sum + content.quantity, 0),
        value: body.value,
        currency: body.currency || META_CURRENCY,
        ...(body.orderId ? { order_id: body.orderId } : {}),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[CAPI purchase route] error:', error);
    return NextResponse.json(
      { succeeded: false, message: 'Error al registrar la compra' },
      { status: 500 },
    );
  }
}
