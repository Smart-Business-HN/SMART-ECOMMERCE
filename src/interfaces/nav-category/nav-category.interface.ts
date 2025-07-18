export interface ResumeSubcategoryDto {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface NavCategoryDto {
    id: number;
    category: string;
    slug: string;
    subCategories: ResumeSubcategoryDto[];
  }