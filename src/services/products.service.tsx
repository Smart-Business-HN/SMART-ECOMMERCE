'use server';
import { isServer } from "@/utils/is-server";
import { ProductResponse, ProductsEcommerceResponse } from "../interfaces/http/responses.interface";
import { getApiUrl } from "@/utils/server-url";
import { getServerSession } from "next-auth";
import { config } from "@/app/api/auth/[...nextauth]/route";

export async function getProductBySlug(slug: string, isLogged: boolean, customerTypeId: number): Promise<ProductResponse> {
  // Usar URL relativa que Next.js resolverá automáticamente
  const url = getApiUrl(`/api/products/${encodeURIComponent(slug)}?isLogged=${isLogged}&customerTypeId=${customerTypeId}`);
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
  const session = await getServerSession(config);
  const isUserSignInFromSession = session?.user?.id ? true : false;
  const customerTypeIdFromSession = session?.customerType?.id ? session?.customerType?.id : undefined;
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    all: all.toString(),
    isUserSignIn: isUserSignInFromSession.toString(),
  });

  if (customerTypeIdFromSession != undefined) {
    params.append('customerTypeId', customerTypeIdFromSession.toString());
  }

  if (parameter) params.append('parameter', parameter);
  if (order) params.append('order', order);
  if (column) params.append('column', column);
  if (customerTypeId) params.append('customerTypeId', customerTypeIdFromSession!.toString());

  // Construir URL absoluta para Server Components
  const url = isServer ? getApiUrl(`/api/products?${params.toString()}`) : `/api/products?${params.toString()}`;

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
  const session = await getServerSession(config);
  const isUserSignInFromSession = session?.user?.id ? true : false;
  const customerTypeIdFromSession = session?.customerType?.id ? session?.customerType?.id : undefined;
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    isUserSignIn: isUserSignInFromSession.toString(),
  });

  if (customerTypeIdFromSession != undefined) {
    params.append('customerTypeId', customerTypeIdFromSession.toString());
  }

  if (parameter) params.append('parameter', parameter);
  if (order) params.append('order', order);
  if (column) params.append('column', column);
  if (customerTypeId) params.append('customerTypeId', customerTypeIdFromSession!.toString());

  // Construir URL absoluta para Server Components
  const url = isServer ? getApiUrl(`/api/products/category/${encodeURIComponent(categorySlug)}?${params.toString()}`) : `/api/products/category/${encodeURIComponent(categorySlug)}?${params.toString()}`;

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
  const session = await getServerSession(config);
const isUserSignInFromSession = session?.user?.id ? true : false;
const customerTypeIdFromSession = session?.customerType?.id ? session?.customerType?.id : undefined;
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    isUserSignIn: isUserSignInFromSession.toString(),
  });

  if (customerTypeIdFromSession != undefined) {
    params.append('customerTypeId', customerTypeIdFromSession.toString());
  }

  if (parameter) params.append('parameter', parameter);
  if (order) params.append('order', order);
  if (column) params.append('column', column);
  if (customerTypeId) params.append('customerTypeId', customerTypeIdFromSession!.toString());

  // Construir URL absoluta para Server Components
    const url = isServer ? getApiUrl(`/api/products/subcategory/${encodeURIComponent(subCategorySlug)}?${params.toString()}`) : `/api/products/subcategory/${encodeURIComponent(subCategorySlug)}?${params.toString()}`;

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
