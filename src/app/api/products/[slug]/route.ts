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
    
    // Codificar el slug para evitar problemas con caracteres especiales
    const encodedSlug = encodeURIComponent(slug);
    const url = `${baseUrl}/Product/GetBySlug/${encodedSlug}?isLogged=${isLogged}&customerTypeId=${customerTypeId}`;
    
    // Log para debugging
    console.log('Fetching product from backend:', { 
      slug, 
      encodedSlug, 
      url, 
      baseUrl,
      isLogged,
      customerTypeId
    });
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      // Log adicional para debugging
      console.error('Backend error:', {
        status: response.status,
        statusText: response.statusText,
        url,
        slug,
        encodedSlug
      });
      
      // Si es un 404, devolver un error más específico
      if (response.status === 404) {
        return NextResponse.json(
          { 
            error: 'Product not found', 
            message: `El producto con slug "${slug}" no fue encontrado en el backend`,
            slug,
            url
          },
          { status: 404 }
        );
      }
      
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);

    // Si el error incluye información sobre el slug, incluirla en la respuesta
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch product', 
        message: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 