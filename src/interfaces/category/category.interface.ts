import { subCategory } from "../sub-category/sub-category.interface";

export interface Category{
    id:number,
    slug:string,
    name:string,
    image:string,
    isPartCategory:boolean,
    isActive:boolean
    subcategories?: subCategory[];
}