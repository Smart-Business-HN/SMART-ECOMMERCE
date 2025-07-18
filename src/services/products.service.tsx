import { ProductResponse, ProductsEcommerceResponse } from "../interfaces/http/responses.interface";

export async function getProductBySlug(slug: string, isLogged: boolean, customerTypeId: number): Promise<ProductResponse> {
  // Determinar si estamos en el cliente o servidor
  const isClient = typeof window !== 'undefined';
  
  let url: string;
  if (isClient) {
    // En el cliente, usar URL relativa
    url = `/api/products/${encodeURIComponent(slug)}?isLogged=${isLogged}&customerTypeId=${customerTypeId}`;
  } else {
    // En el servidor, usar URL completa
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'https://localhost:3000' 
      : process.env.NEXT_PUBLIC_BASE_URL || '';
    url = `${baseUrl}/api/products/${encodeURIComponent(slug)}?isLogged=${isLogged}&customerTypeId=${customerTypeId}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });

  if (!res.ok) {
    let errorResponse: ProductResponse | undefined = undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  const data: ProductResponse = await res.json();
  return data;
}

export async function getProductsEcommerce(
  pageNumber: number = 1,
  pageSize: number = 20,
  parameter?: string,
  order?: string,
  column?: string,
  all: boolean = false,
  isUserSignIn: boolean = false,
  customerTypeId?: number
): Promise<ProductsEcommerceResponse> {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    all: all.toString(),
    isUserSignIn: isUserSignIn.toString(),
  });

  if (parameter) params.append('parameter', parameter);
  if (order) params.append('order', order);
  if (column) params.append('column', column);
  if (customerTypeId) params.append('customerTypeId', customerTypeId.toString());

  // Determinar si estamos en el cliente o servidor
  const isClient = typeof window !== 'undefined';
  
  let url: string;
  if (isClient) {
    // En el cliente, usar URL relativa
    url = `/api/products?${params.toString()}`;
  } else {
    // En el servidor, usar URL completa
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'https://localhost:7211' 
      : process.env.NEXT_PUBLIC_BASE_URL || '';
    url = `${baseUrl}/api/products?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    let errorResponse: ProductsEcommerceResponse | undefined = undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  const data: ProductsEcommerceResponse = await res.json();
  return data;
}

export async function getProductsByCategorySlug(
  categorySlug: string,
  pageNumber: number = 1,
  pageSize: number = 20,
  parameter?: string,
  order?: string,
  column?: string,
  isUserSignIn: boolean = false,
  customerTypeId?: number
): Promise<ProductsEcommerceResponse> {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    isUserSignIn: isUserSignIn.toString(),
  });

  if (parameter) params.append('parameter', parameter);
  if (order) params.append('order', order);
  if (column) params.append('column', column);
  if (customerTypeId) params.append('customerTypeId', customerTypeId.toString());

  // Determinar si estamos en el cliente o servidor
  const isClient = typeof window !== 'undefined';
  
  let url: string;
  if (isClient) {
    // En el cliente, usar URL relativa
    url = `/api/products/category/${encodeURIComponent(categorySlug)}?${params.toString()}`;
  } else {
    // En el servidor, usar URL completa
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'https://localhost:7211' 
      : process.env.NEXT_PUBLIC_BASE_URL || '';
    url = `${baseUrl}/api/products/category/${encodeURIComponent(categorySlug)}?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    let errorResponse: ProductsEcommerceResponse | undefined = undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  const data: ProductsEcommerceResponse = await res.json();
  return data;
}

export async function getProductsBySubCategorySlug(
  subCategorySlug: string,
  pageNumber: number = 1,
  pageSize: number = 20,
  parameter?: string,
  order?: string,
  column?: string,
  isUserSignIn: boolean = false,
  customerTypeId?: number
): Promise<ProductsEcommerceResponse> {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    isUserSignIn: isUserSignIn.toString(),
  });

  if (parameter) params.append('parameter', parameter);
  if (order) params.append('order', order);
  if (column) params.append('column', column);
  if (customerTypeId) params.append('customerTypeId', customerTypeId.toString());

  // Determinar si estamos en el cliente o servidor
  const isClient = typeof window !== 'undefined';
  
  let url: string;
  if (isClient) {
    // En el cliente, usar URL relativa
    url = `/api/products/subcategory/${encodeURIComponent(subCategorySlug)}?${params.toString()}`;
  } else {
    // En el servidor, usar URL completa
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'https://localhost:7211' 
      : process.env.NEXT_PUBLIC_BASE_URL || '';
    url = `${baseUrl}/api/products/subcategory/${encodeURIComponent(subCategorySlug)}?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    let errorResponse: ProductsEcommerceResponse | undefined = undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  const data: ProductsEcommerceResponse = await res.json();
  return data;
}
