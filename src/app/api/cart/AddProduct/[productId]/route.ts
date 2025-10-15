import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    // Obtener query parameters
    const { searchParams } = new URL(request.url);
    const quantity = searchParams.get('quantity');
    const customerId = searchParams.get('customerId');
    const cartId = searchParams.get('cartId');
    
    if (!quantity || !customerId) {
      return NextResponse.json(
        { 
          succeeded: false, 
          message: 'Parámetros requeridos faltantes', 
          errors: ['quantity y customerId son requeridos'] 
        },
        { status: 400 }
      );
    }
    
    // URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/Cart/AddProduct/${productId}`;
    
    // Construir query parameters para el backend
    const backendQueryParams = new URLSearchParams({
      quantity: quantity,
      customerId: customerId
    });
    
    if (cartId) {
      backendQueryParams.append('cartId', cartId);
    }
    
    const fullUrl = `${url}?${backendQueryParams.toString()}`;
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
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
    console.error('Error adding product to cart:', error);
    return NextResponse.json(
      { 
        succeeded: false, 
        message: 'Error al agregar producto al carrito', 
        errors: [error instanceof Error ? error.message : 'Unknown error'] 
      },
      { status: 500 }
    );
  }
}
