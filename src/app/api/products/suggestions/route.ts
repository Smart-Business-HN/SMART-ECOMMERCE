import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const searchTerm = (searchParams.get('searchTerm') || '').trim();
    const limit = searchParams.get('limit') || '10';

    // Espeja la guarda del backend: <2 caracteres -> vacío, sin ir al backend.
    if (searchTerm.length < 2) {
      return NextResponse.json({ succeeded: true, data: [], message: '' });
    }

    const params = new URLSearchParams();
    params.append('searchTerm', searchTerm);
    params.append('limit', limit);

    const url = `${baseUrl}/Product/SearchSuggestions?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Suggestions proxy error:', error);
    // Forma segura: el cliente trata el fallo como "sin sugerencias" sin lanzar.
    return NextResponse.json(
      { succeeded: false, data: [], message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
