import { ApiResponse } from "@/interfaces/http-responses/api-response.interface";
import { ProductDetailResponse, ProductsResponse } from "@/interfaces/http-responses/http-responses.interface";
import axios from "axios";

export const GetAllProducts = async (searchParams:any) => {
  try {
    const response: any = await axios.get(`${process.env.baseApi}/Product/GetAll`,{params:searchParams});
    const serializeResponse: ProductsResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    return data;
  }
};

export const GetAllProductsForNavbar = async () => {
  try {
    const response: any = await axios.get(`${process.env.baseApi}/Product/GetAll?All=True`);
    const serializeResponse: ProductsResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    return data;
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const response: any = await axios.get(`${process.env.baseApi}/Product/GetBySlug/${slug}`)
    const serializeResponse: ProductDetailResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductBySameCategorySlug = async (categorySlug: string, productSlug:string) => {
  try {
    const response: any = await axios.get(`${process.env.baseApi}/Product/GetProductsBySameCategorySlug/${categorySlug}/${productSlug}`)
    const serializeResponse: ProductsResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductBySameSubCategorySlug = async (subCategorySlug: string, productSlug:string) => {
  try {
    const response: any = await axios.get(`${process.env.baseApi}/Product/GetProductsBySameSubCategorySlug/${subCategorySlug}/${productSlug}`)
    const serializeResponse: ProductsResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductBySubCategorySlug = async (subCategorySlug: string, searchParams:any) => {
  try {
    const response: any = await axios.get(`${process.env.baseApi}/Product/GetProductsBySubCategorySlug/${subCategorySlug}`,{params:searchParams})
    const serializeResponse: ProductsResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}
export const getProductByCategorySlug = async (categorySlug: string, searchParams:any) => {
  try {
    const response: any = await axios.get(`${process.env.baseApi}/Product/GetProducsByCategorySlug/${categorySlug}`,{params:searchParams})
    const serializeResponse: ProductsResponse = response.data;
    return serializeResponse;
  } catch (error: any) {
    const data : ApiResponse = error.response.data;
    console.log(data);
    return data;
  }
}