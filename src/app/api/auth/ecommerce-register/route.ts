import { NextRequest, NextResponse } from 'next/server';
import { CreateEcommerceUserCommand } from '@/interfaces/auth/auth.interface';

export async function POST(request: NextRequest) {
  try {
    const body: CreateEcommerceUserCommand = await request.json();
    
    // Construir URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    const url = `${baseUrl}/User/Create`;
    
    const response = await fetch(url, {
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
          succeeded: errorData.Succeeded,
          message: errorData.Message || `Error del servidor: ${response.status}`,
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
