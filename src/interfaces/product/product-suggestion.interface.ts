export interface ProductSuggestionDto {
  id: number;
  code: string;
  name: string;
  slug: string;
  thumbnail?: string;
  brandName?: string;
  price: number;
  // Slugs para construir la URL de la PDP (/tienda/[category]/[subcategory]/[product]).
  subCategorySlug?: string;
  categorySlug?: string;
}

// Espeja Application.Wrappers.Response<T> del backend.
export interface ProductSuggestionResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data: ProductSuggestionDto[];
}
