import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // URL del backend - usar localhost en desarrollo, producción en otros casos
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // Construir los parámetros de query
    const params = new URLSearchParams();
    
    // Parámetros opcionales
    const parameter = searchParams.get('parameter');
    const pageNumber = searchParams.get('pageNumber') || '0';
    const pageSize = searchParams.get('pageSize') || '20';
    const order = searchParams.get('order');
    const column = searchParams.get('column');
    const all = searchParams.get('all') || 'false';
    
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    params.append('all', all);
    
    if (parameter) params.append('parameter', parameter);
    if (order) params.append('order', order);
    if (column) params.append('column', column);
    
    const url = `${baseUrl}/Department/GetAll?All=true`;
    
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
    console.error('Proxy departments error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch departments', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 