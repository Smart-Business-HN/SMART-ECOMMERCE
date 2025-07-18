import { PagedDepartmentResponse } from "../interfaces/http/responses.interface";

export async function getAllDepartments(
  pageNumber: number = 0,
  pageSize: number = 20,
  parameter?: string,
  order?: string,
  column?: string,
  all: boolean = false
): Promise<PagedDepartmentResponse> {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
    all: all.toString(),
  });

  if (parameter) params.append('parameter', parameter);
  if (order) params.append('order', order);
  if (column) params.append('column', column);

  // Determinar si estamos en el cliente o servidor
  const isClient = typeof window !== 'undefined';
  
  let url: string;
  if (isClient) {
    // En el cliente, usar URL relativa
    url = `/api/departments?${params.toString()}`;
  } else {
    // En el servidor, usar URL completa
    const baseUrl = process.env.NODE_ENV === 'development' 
      ? 'https://localhost:3000' 
      : process.env.NEXT_PUBLIC_BASE_URL || '';
    url = `${baseUrl}/api/departments?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    let errorResponse: PagedDepartmentResponse | undefined = undefined;
    try {
      errorResponse = await res.json();
    } catch (e) {}
    throw new Error(errorResponse?.message || `Error ${res.status}`);
  }

  const data: PagedDepartmentResponse = await res.json();
  return data;
}
