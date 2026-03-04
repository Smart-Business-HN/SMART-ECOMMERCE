import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // URL del backend - usar v1 para Country controller
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/v2', '/v1') || 'https://localhost:7211/api/v1';

    const url = `${baseUrl}/Country/GetAll?All=true&includeCities=false`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      // En desarrollo, ignorar errores de certificado SSL auto-firmado
      ...(process.env.NODE_ENV === 'development' && {
        // @ts-ignore - Esta opción no está en los tipos de fetch pero es necesaria para Node.js
        rejectUnauthorized: false
      })
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy countries error:', error);
    return NextResponse.json(
      {
        succeeded: false,
        error: 'Failed to fetch countries',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
