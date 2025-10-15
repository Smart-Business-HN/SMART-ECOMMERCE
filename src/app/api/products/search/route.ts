import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    // URL del backend - cambiar esta URL por la de tu backend en producción
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    // Construir los parámetros de query
    const params = new URLSearchParams();
    
    // Parámetros requeridos
    const searchTerm = searchParams.get('searchTerm') || '';
    const pageNumber = searchParams.get('pageNumber') || '0';
    const pageSize = searchParams.get('pageSize') || '10';
    const order = searchParams.get('order') || 'asc';
    const column = searchParams.get('column') || 'name';
    const all = searchParams.get('all') || 'false';
    const isUserSignIn = searchParams.get('isUserSignIn') || 'false';
    
    params.append('searchTerm', searchTerm);
    params.append('pageNumber', pageNumber);
    params.append('pageSize', pageSize);
    params.append('order', order);
    params.append('column', column);
    params.append('all', all);
    params.append('isUserSignIn', isUserSignIn);
    
    // Parámetros opcionales
    const customerTypeId = searchParams.get('customerTypeId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const brandId = searchParams.get('brandId');
    const categoryId = searchParams.get('categoryId');
    const subCategoryId = searchParams.get('subCategoryId');
    const inStock = searchParams.get('inStock');
    const hasImages = searchParams.get('hasImages');
    const sortBy = searchParams.get('sortBy');
    
    if (customerTypeId) params.append('customerTypeId', customerTypeId);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (brandId) params.append('brandId', brandId);
    if (categoryId) params.append('categoryId', categoryId);
    if (subCategoryId) params.append('subCategoryId', subCategoryId);
    if (inStock) params.append('inStock', inStock);
    if (hasImages) params.append('hasImages', hasImages);
    if (sortBy) params.append('sortBy', sortBy);
    
    const url = `${baseUrl}/Product/Search?${params.toString()}`;
      
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
    console.error('Search proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to search products', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
