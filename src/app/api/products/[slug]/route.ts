import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    // URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const { slug } = await params;
    
    const isLogged = searchParams.get('isLogged') || 'false';
    const customerTypeId = searchParams.get('customerTypeId') || '0';
    
    const url = `${baseUrl}/Product/GetBySlug/${slug}?isLogged=${isLogged}&customerTypeId=${customerTypeId}`;
    
    
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
      { error: 'Failed to fetch product', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 