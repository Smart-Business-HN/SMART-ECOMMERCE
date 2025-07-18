import { NavCategoryResponse } from "../interfaces/http/responses.interface";
export async function getAllNavCategory(): Promise<NavCategoryResponse> {
  // Determinar si estamos en el cliente o servidor
  const isClient = typeof window !== 'undefined';
  
  let url: string;
  if (isClient) {
    // En el cliente, usar URL relativa
    url = `/api/categories`;
  } else {
    // En el servidor, usar URL completa
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'https://localhost:7211' 
      : process.env.NEXT_PUBLIC_BASE_URL || '';
    url = `${baseUrl}/api/categories`;
  }
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    }
  });
  if (!res.ok) {
    let errorResponse: NavCategoryResponse | undefined = undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  const data: NavCategoryResponse = await res.json();
  return data;
}
