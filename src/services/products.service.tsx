import { ProductResponse, ProductsEcommerceResponse } from "../interfaces/http/responses.interface";

export async function getProductBySlug(slug: string, isLogged: boolean, customerTypeId: number): Promise<ProductResponse> {
  // Usar URL relativa que Next.js resolverá automáticamente
  const url = `/api/products/${encodeURIComponent(slug)}?isLogged=${isLogged}&customerTypeId=${customerTypeId}`;

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

  // Usar URL relativa que Next.js resolverá automáticamente
  const url = `/api/products?${params.toString()}`;

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

  // Usar URL relativa que Next.js resolverá automáticamente
  const url = `/api/products/category/${encodeURIComponent(categorySlug)}?${params.toString()}`;

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

  // Usar URL relativa que Next.js resolverá automáticamente
  const url = `/api/products/subcategory/${encodeURIComponent(subCategorySlug)}?${params.toString()}`;

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
