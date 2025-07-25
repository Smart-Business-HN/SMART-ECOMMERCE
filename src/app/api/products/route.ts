import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // URL del backend - cambiar esta URL por la de tu backend en producción
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // Construir los parámetros de query
    const params = new URLSearchParams();
    
    // Parámetros requeridos
    const pageNumber = searchParams.get('pageNumber') || '0';
    const pageSize = searchParams.get('pageSize') || '20';
    const all = searchParams.get('all') || 'false';
    const isUserSignIn = searchParams.get('isUserSignIn') || 'false';
    
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    params.append('all', all);
    params.append('isUserSignIn', isUserSignIn);
    
    // Parámetros opcionales
    const parameter = searchParams.get('parameter');
    const order = searchParams.get('order');
    const column = searchParams.get('column');
    const customerTypeId = searchParams.get('customerTypeId');
    
    if (parameter) params.append('parameter', parameter);
    if (order) params.append('order', order);
    if (column) params.append('column', column);
    if (customerTypeId) params.append('customerTypeId', customerTypeId);
    
    const url = `${baseUrl}/Product/GetAll?${params.toString()}`;
    
    console.log('Proxy request to:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 