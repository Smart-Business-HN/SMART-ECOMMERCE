import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth.config';
import { sendCapiEvent } from '@/services/capi.service';
import type { MetaCustomData } from '@/lib/meta/meta-custom-data';

// Route handler que recibe los eventos del Pixel del navegador y los reenvía a
// la Conversions API, enriqueciéndolos con datos que solo existen en el contexto
// del request: cookies _fbp/_fbc, IP del cliente, user agent y la sesión NextAuth
// (email/nombre para Advanced Matching). El event_id lo acuña el cliente y se
// comparte con fbq para que Meta deduplique navegador + servidor.

interface CapiRequestBody {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  customData?: MetaCustomData;
  userFields?: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}

function readCookie(request: NextRequest, name: string): string | undefined {
  return request.cookies.get(name)?.value;
}

function getClientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? undefined;
}

export async function POST(request: NextRequest) {
  try {
    // Respeta el consentimiento (opt-out): el banner marca meta_consent=revoked.
    if (readCookie(request, 'meta_consent') === 'revoked') {
      return NextResponse.json({ succeeded: true, skipped: true });
    }

    const body = (await request.json()) as CapiRequestBody;
    if (!body?.eventName || !body?.eventId) {
      return NextResponse.json(
        { succeeded: false, message: 'Faltan datos del evento' },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOptions);

    const result = await sendCapiEvent({
      eventName: body.eventName,
      eventId: body.eventId,
      eventSourceUrl: body.eventSourceUrl,
      customData: body.customData,
      user: {
        // El valor del formulario tiene prioridad (presente en registro/contacto);
        // si no, se usa la sesión autenticada.
        email: body.userFields?.email ?? session?.user?.email ?? null,
        phone: body.userFields?.phone ?? null,
        firstName: body.userFields?.firstName ?? session?.firstName ?? null,
        lastName: body.userFields?.lastName ?? session?.lastName ?? null,
        externalId: session?.user?.id ?? null,
      },
      transport: {
        fbp: readCookie(request, '_fbp') ?? null,
        fbc: readCookie(request, '_fbc') ?? null,
        clientIp: getClientIp(request) ?? null,
        userAgent: request.headers.get('user-agent') ?? null,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('[CAPI route] error:', error);
    return NextResponse.json(
      { succeeded: false, message: 'Error al registrar evento' },
      { status: 500 },
    );
  }
}
