import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) {
  try {
    const { customerId } = await params;
    const token = request.headers.get('Authorization')?.split(' ')[1];
    
    // URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const url = `${baseUrl}/Cart/GetCarts/${customerId}`;
    
    const response = await fetch(url, {
      method: 'GET',
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
    console.error('Error fetching carts:', error);
    return NextResponse.json(
      { 
        succeeded: false, 
        message: 'Error al obtener los carritos', 
        errors: [error instanceof Error ? error.message : 'Unknown error'] 
      },
      { status: 500 }
    );
  }
}
