import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    // URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { slug: categorySlug } = await params;
    
    // Construir los parámetros de query
    const paramsQuery = new URLSearchParams();
    
    // Parámetros requeridos
    const pageNumber = searchParams.get('pageNumber') || '0';
    const pageSize = searchParams.get('pageSize') || '20';
    const isUserSignIn = searchParams.get('isUserSignIn') || 'false';
    
    paramsQuery.append('pageNumber', pageNumber);
    paramsQuery.append('pageSize', pageSize);
    paramsQuery.append('isUserSignIn', isUserSignIn);
    
    // Parámetros opcionales
    const parameter = searchParams.get('parameter');
    const order = searchParams.get('order');
    const column = searchParams.get('column');
    const customerTypeId = searchParams.get('customerTypeId');
    
    if (parameter) paramsQuery.append('parameter', parameter);
    if (order) paramsQuery.append('order', order);
    if (column) paramsQuery.append('column', column);
    if (customerTypeId) paramsQuery.append('customerTypeId', customerTypeId);

    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    const url = `${baseUrl}/Product/GetProducsByCategorySlug/${encodeURIComponent(categorySlug)}?${paramsQuery.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
      { error: 'Failed to fetch products by category', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 