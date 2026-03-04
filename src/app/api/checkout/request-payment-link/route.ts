import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth.config';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    if (!token) {
      return NextResponse.json(
        {
          succeeded: false,
          message: 'No autorizado',
          errors: ['No se encontró sesión activa']
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/Checkout/RequestPaymentLink`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: Record<string, unknown> = {};
      try {
        errorData = JSON.parse(errorText);
      } catch {
        // not JSON
      }
      console.error('Backend error:', response.status, errorText);
      return NextResponse.json(
        {
          succeeded: false,
          message: (errorData as { message?: string }).message || `Error del servidor: ${response.status}`,
          errors: (errorData as { errors?: string[] }).errors || [errorText || 'Error del servidor']
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error requesting payment link:', error);
    return NextResponse.json(
      {
        succeeded: false,
        message: 'Error al solicitar link de pago',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      },
      { status: 500 }
    );
  }
}
