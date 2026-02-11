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
    const url = `${baseUrl}/AssociatedCompany/GetAll/${ecommerceUserId}${queryString ? `?${queryString}` : '?all=true'}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching associated companies:', error);
    return NextResponse.json(
      {
        succeeded: false,
        message: 'Error al obtener las sociedades',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      },
      { status: 500 }
    );
  }
}
