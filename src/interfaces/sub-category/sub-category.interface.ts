import { Category } from "../category/category.interface";

export interface subCategory{
    id:number,
    slug: string,
    name:string,
    categoryId:number,
    category:Category,
    isActive:boolean
}