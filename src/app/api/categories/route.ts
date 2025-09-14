import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // URL del backend - cambiar esta URL por la de tu backend en producción
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    const url = `${baseUrl}/Category/GetAllNavCategory`;
    
    console.log('Proxy request to:', url);
    console.log('Request headers:', {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'https://www.smartbusiness.site'
      },
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      
      // Devolver el error 401 directamente para debuggear
      return NextResponse.json(
        { 
          error: 'Backend error', 
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url: url
        },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 