'use server';
import { NavCategoryResponse } from "../interfaces/http/responses.interface";
import { getApiUrl } from "@/utils/server-url";
export async function getAllNavCategory(): Promise<NavCategoryResponse> {
  const url = getApiUrl(`/api/categories`);
  
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
