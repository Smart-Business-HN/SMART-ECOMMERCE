import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ecommerceUserId: string }> }
) {
  try {
    const { ecommerceUserId } = await params;
    const token = request.headers.get('Authorization')?.split(' ')[1];

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const url = `${baseUrl}/PaymentMethod/GetAll/${ecommerceUserId}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          succeeded: false,
          message: errorData.message || errorData.Message || `Error del servidor: ${response.status}`,
          errors: errorData.errors || errorData.Errors || ['Error de conexión']
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    return NextResponse.json(
      {
        succeeded: false,
        message: 'Error al obtener los métodos de pago',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      },
      { status: 500 }
    );
  }
}
