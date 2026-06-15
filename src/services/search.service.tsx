'use server';
import { isServer } from "@/utils/is-server";
import { ProductSearchResponse, ProductSearchParameter } from "../interfaces/product/product-search.interface";
import { getApiUrl } from "@/utils/server-url";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export async function searchProducts(searchParams: ProductSearchParameter): Promise<ProductSearchResponse> {
  const session = await getServerSession(authOptions);
  const isUserSignInFromSession = session?.user?.id ? true : false;
  const customerTypeIdFromSession = session?.customerType?.id ? session?.customerType?.id : undefined;

  // Actualizar parámetros con la sesión actual
  const params = new URLSearchParams({
    searchTerm: searchParams.searchTerm || '',
    pageNumber: searchParams.pageNumber.toString(),
    pageSize: searchParams.pageSize.toString(),
    all: searchParams.all.toString(),
    isUserSignIn: isUserSignInFromSession.toString(),
  });

  // Orden por columna SOLO si se pide explícitamente; de lo contrario el backend ordena por relevancia.
  if (searchParams.order) {
    params.append('order', searchParams.order);
  }
  if (searchParams.column) {
    params.append('column', searchParams.column);
  }

  // Agregar parámetros opcionales solo si están definidos
  if (customerTypeIdFromSession != undefined) {
    params.append('customerTypeId', customerTypeIdFromSession.toString());
  }
  if (searchParams.minPrice !== undefined) {
    params.append('minPrice', searchParams.minPrice.toString());
  }
  if (searchParams.maxPrice !== undefined) {
    params.append('maxPrice', searchParams.maxPrice.toString());
  }
  if (searchParams.brandId !== undefined) {
    params.append('brandId', searchParams.brandId.toString());
  }
  if (searchParams.categoryId !== undefined) {
    params.append('categoryId', searchParams.categoryId.toString());
  }
  if (searchParams.subCategoryId !== undefined) {
    params.append('subCategoryId', searchParams.subCategoryId.toString());
  }
  if (searchParams.inStock !== undefined) {
    params.append('inStock', searchParams.inStock.toString());
  }
  if (searchParams.hasImages !== undefined) {
    params.append('hasImages', searchParams.hasImages.toString());
  }
  if (searchParams.sortBy) {
    params.append('sortBy', searchParams.sortBy);
  }

  // Construir URL absoluta para Server Components
  const url = isServer ? getApiUrl(`/api/products/search?${params.toString()}`) : `/api/products/search?${params.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    let errorResponse: ProductSearchResponse | undefined = undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  const data: ProductSearchResponse = await res.json();
  return data;
}
