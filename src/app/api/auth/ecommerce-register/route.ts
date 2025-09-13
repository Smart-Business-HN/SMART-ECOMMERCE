import { NextRequest, NextResponse } from 'next/server';
import { CreateEcommerceUserCommand } from '@/interfaces/auth/auth.interface';
import { getApiUrl } from '@/utils/server-url';

export async function POST(request: NextRequest) {
  try {
    const body: CreateEcommerceUserCommand = await request.json();
    
    // Construir URL del backend
    const backendUrl = getApiUrl('/api/auth/ecommerce-register');
    console.log(backendUrl)
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          succeeded: false,
          message: errorData.message || `Error del servidor: ${response.status}`,
          errors: errorData.errors || ['Error de conexión']
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in ecommerce-register API route:', error);
    return NextResponse.json(
      {
        succeeded: false,
        message: 'Error interno del servidor',
        errors: ['Error de conexión']
      },
      { status: 500 }
    );
  }
}
