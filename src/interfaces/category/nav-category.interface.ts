import { ResumeSubcategory } from "../sub-category/resume-subcategory.interface";

export interface NavCategory{
    id:number,
    category: string,
    slug: string,
    subCategories: ResumeSubcategory[];
}