export interface BrandDto {
  id: number;
  name: string;
  description?: string;
  logo?: string;
  background?: string;
  isActive: boolean;
}

export interface UnitOfMeasurementDto {
  id: number;
  name: string;
  abbreviation: string;
  isActive: boolean;
}

export interface CategoryDto {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
}

export interface SubcategoryDto {
  id: number;
  slug: string;
  name: string;
  categoryId: number;
  category: CategoryDto;
  isActive: boolean;
}

export interface TypeStatusDto {
  id: number;
  name: string;
  isActive: boolean;
  status: StatusDto[];
}

export interface StatusDto {
  id: number;
  name: string;
  isActive: boolean;
  typeStatusId: number;
  typeStatus: TypeStatusDto;
}

export interface TypeProviderDto {
  id: number;
  name: string;
}

export interface ProviderDto {
  id: number;
  name: string;
  rtn: string;
  phoneNumber: string;
  email: string;
  contactPerson?: string;
  contactPhoneNumber?: string;
  contactEmail?: string;
  address: string;
  websiteUrl?: string;
  isActive: boolean;
  typeProviderId: number;
  typeProvider: TypeProviderDto;
}

export interface TaxDto {
  id: number;
  name: string;
  rate: number;
  textForDocuments: string;
}

export interface DataSheetDto {
  id: number;
  name: string;
  isActive: boolean;
  isOutstanding?: boolean;
}

export interface ProductDataSheetDto {
  id: number;
  title: string;
  dataSheetId: number;
  dataSheet?: DataSheetDto;
  isActive: boolean;
}

export interface ProductFeatureDto {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}

export interface ProductImageDto {
  id: number;
  fileName: string;
  url: string;
}

export interface ProductPurchasePriceLogDto {
  id: number;
  productId: number;
  purchasePrice: number;
  date: string;
  // Agregar más campos según sea necesario
}

export interface InventoryDistributionDto {
  id: number;
  productId: number;
  quantity: number;
  location: string;
  // Agregar más campos según sea necesario
}

export interface ProductDto {
  id: number;
  code: string;
  slug: string;
  name: string;
  description?: string;
  brochure?: string;
  virtualTour?: string;
  urlYoutube?: string;
  isFatherProduct: boolean;
  costPrice: number;
  recomendedSalePrice: number;
  minStock: number;
  currentStock: number;
  brandId: number;
  brand?: BrandDto;
  unitOfMeasurementId: number;
  unitOfMeasurement?: UnitOfMeasurementDto;
  subCategoryId: number;
  subCategory?: SubcategoryDto;
  statusId: number;
  status?: StatusDto;
  providerId: number;
  provider?: ProviderDto;
  isActive: boolean;
  showInEcommerce: boolean;
  taxId: number;
  tax?: TaxDto;
  productDataSheets?: ProductDataSheetDto[];
  productFeatures?: ProductFeatureDto[];
  productImages?: ProductImageDto[];
  productPurchasePriceLogs?: ProductPurchasePriceLogDto[];
  inventoryDistributions?: InventoryDistributionDto[];
  ecommerceDescription?: string;
} 