import { ApiResponse } from "@/interfaces/http-responses/api-response.interface";
import { ProductDetailResponse, ProductsResponse } from "@/interfaces/http-responses/http-responses.interface";
import axios from "axios";

export const GetAllProducts = async (searchParams:any) => {
  try {
    const response: any = await axios.get('https://localhost:7211/api/v2/Product/GetAll',{params:searchParams});
    const serializeResponse: ProductsResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    return data;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const response: any = await axios.get(`https://localhost:7211/api/v2/Product/GetBySlug/${slug}`)
    const serializeResponse: ProductDetailResponse = response.data;
    console.log(serializeResponse)
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductBySameCategorySlug = async (categorySlug: string, productSlug:string) => {
  try {
    const response: any = await axios.get(`https://localhost:7211/api/v2/Product/GetProductsBySameCategorySlug/${categorySlug}/${productSlug}`)
    const serializeResponse: ProductsResponse = response.data;
    console.log(serializeResponse)
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductBySameSubCategorySlug = async (subCategorySlug: string, productSlug:string) => {
  try {
    const response: any = await axios.get(`https://localhost:7211/api/v2/Product/GetProductsBySameSubCategorySlug/${subCategorySlug}/${productSlug}`)
    const serializeResponse: ProductsResponse = response.data;
    console.log(serializeResponse)
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductBySubCategorySlug = async (subCategorySlug: string, searchParams:any) => {
  try {
    const response: any = await axios.get(`https://localhost:7211/api/v2/Product/GetProductsBySubCategorySlug/${subCategorySlug}`,{params:searchParams})
    const serializeResponse: ProductsResponse = response.data;
    console.log(serializeResponse)
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductByCategorySlug = async (categorySlug: string, searchParams:any) => {
  try {
    const response: any = await axios.get(`https://localhost:7211/api/v2/Product/GetProducsByCategorySlug/${categorySlug}`,{params:searchParams})
    const serializeResponse: ProductsResponse = response.data;
    console.log(serializeResponse)
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}