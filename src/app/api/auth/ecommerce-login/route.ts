import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // URL del backend
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const body = await request.json();
    
    const url = `${baseUrl}/User/Login`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy ecommerce login error:', error);
    return NextResponse.json(
      { 
        succeeded: false,
        message: 'Error de conexión. Por favor, intenta de nuevo.',
        errors: ['Error de conexión']
      },
      { status: 500 }
    );
  }
} 