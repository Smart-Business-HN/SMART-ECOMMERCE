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

export interface CityDto {
  id: number;
  name: string;
  isActive: boolean;
  departmentId: number;
}

export interface DepartmentDto {
  id: number;
  name: string;
  isActive: boolean;
  regionId?: number;
  countryId: number;
  cities?: CityDto[];
}

export interface PagedDepartmentResponse {
  succeeded: boolean;
  message: string;
  errors: string[];
  data: DepartmentDto[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
