export interface ProductSearchParameter {
  searchTerm?: string;
  pageNumber: number;
  pageSize: number;
  order?: string;
  column?: string;
  all: boolean;
  isUserSignIn: boolean;
  customerTypeId?: number;
  
  // Filtros adicionales para mejorar la búsqueda
  minPrice?: number;
  maxPrice?: number;
  brandId?: number;
  categoryId?: number;
  subCategoryId?: number;
  inStock?: boolean;
  hasImages?: boolean;
  sortBy?: string; // relevance, price, name, newest
}

export interface ProductSearchResponse {
  data: any[]; // ProductDto[]
  succeeded: boolean;
  message?: string;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}
