import { Response } from "./response.interface";
import { NavCategoryDto } from "../nav-category/nav-category.interface";
import { ProductDto } from "../product/product.interface";

export interface NavCategoryResponse extends Response {
  data: NavCategoryDto[];
}

export interface ProductResponse extends Response {
  data: ProductDto;
}

export interface ProductsEcommerceResponse extends Response {
  data: ProductDto[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}
