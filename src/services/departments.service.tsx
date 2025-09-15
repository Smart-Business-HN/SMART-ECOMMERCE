'use server';
import { isServer } from "@/utils/is-server";
import { getApiUrl } from "@/utils/server-url";
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

  const url = getApiUrl(`api/departments?${params.toString()}`);
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
