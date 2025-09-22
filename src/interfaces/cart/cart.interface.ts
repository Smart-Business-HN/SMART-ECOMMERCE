export interface CartDto {
  id: string;
  ecomerceUserId: string;
  ecommerceUser?: EcommerceUserDto;
  isActive: boolean;
  creationDate: string;
  destinationQuotationId?: number;
  destinationQuotation?: QuotationDto;
  convertionDate?: string;
  cartItems?: CartItemDto[];
}

export interface CartItemDto {
  id: number;
  cartId: string;
  cart?: CartDto;
  productId: number;
  product?: ProductDto;
  quantity: number;
  unitPrice: number;
  discount?: number;
  totalPrice: number;
  creationDate: string;
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

export interface QuotationDto {
  id: number;
  // Agregar más propiedades según sea necesario
}

export interface BrandDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface UnitOfMeasurementDto {
  id: number;
  name: string;
  abbreviation: string;
  isActive: boolean;
}

export interface SubcategoryDto {
  id: number;
  name: string;
  isActive: boolean;
  categoryId: number;
  category?: CategoryDto;
}

export interface CategoryDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface StatusDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ProviderDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface TaxDto {
  id: number;
  name: string;
  percentage: number;
  isActive: boolean;
}

export interface ProductDataSheetDto {
  id: number;
  productId: number;
  name: string;
  fileUrl: string;
  isActive: boolean;
}

export interface ProductFeatureDto {
  id: number;
  productId: number;
  name: string;
  value: string;
  isActive: boolean;
}

export interface ProductImageDto {
  id: number;
  productId: number;
  imageUrl: string;
  isMain: boolean;
  isActive: boolean;
}

export interface ProductPurchasePriceLogDto {
  id: number;
  productId: number;
  price: number;
  date: string;
}

export interface InventoryDistributionDto {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
  isActive: boolean;
}

export interface EcommerceUserDto {
  id: string;
  email: string;
  userName: string;
  fullName: string;
  firstName: string;
  lastName: string;
  photo?: string;
  phoneNumber: string;
  departmentId?: number;
  department?: DepartmentDto;
  genderId: number;
  gender?: GenderDto;
  creationDate: string;
  isActive: boolean;
  birthDay?: string;
  lastPasswordChange?: string;
  modificationDate?: string;
  customerTypeId: number;
  customerType?: CustomerType;
}

export interface DepartmentDto {
  id: number;
  name: string;
  isActive: boolean;
  regionId?: number;
  countryId: number;
  cities?: CityDto[];
}

export interface CityDto {
  id: number;
  name: string;
  isActive: boolean;
  departmentId: number;
}

export interface GenderDto {
  id: number;
  name: string;
  isActive: boolean;
}

export interface CustomerType {
  id: number;
  name: string;
  isActive: boolean;
}

export interface GetCartsResponse {
  succeeded: boolean;
  message?: string;
  errors?: string[];
  data?: CartDto[];
}
