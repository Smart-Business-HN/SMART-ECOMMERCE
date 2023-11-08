import { Product } from "../product/product.interface";
import { ApiResponse } from "./api-response.interface";

export interface ProductsResponse extends ApiResponse {
    data: Product[];
  }
  export interface ProductDetailResponse extends ApiResponse {
    data: Product;
  }