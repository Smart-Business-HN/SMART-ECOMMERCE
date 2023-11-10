import { Brand } from "../brand/brand.interface";
import { status } from "../status/status.interface";
import { subCategory } from "../sub-category/sub-category.interface";
import { UnitOfMeasurement } from "../unit-of-measurement/unit-of-measuremente.interface";
import { ProductDataSheet } from "./product-data-sheet.interface";
import { ProductFeature } from "./product-feature.interface";
import { ProductImage } from "./product-image.interface";

export interface Product {
    id: number,
    code: string,
    slug:string,
    name: string,
    description: string,
    brochure: string,
    virtualTour: string,
    urlYoutube: string,
    isFatherProduct: boolean,
    costPrice: number,
    recomendedSalePrice: number,
    minStock: number,
    currentStock: number,
    brandId: number,
    brand: Brand,
    unitOfMeasurementId: number,
    unitOfMeasurement: UnitOfMeasurement,
    subcategoryId: number,
    subCategory: subCategory,
    statusId: number,
    status: status,
    providerId: number,
    isActive: boolean,
    showInEcommerce: boolean,
    productDataSheets: ProductDataSheet[],
    productFeatures: ProductFeature[],
    productImages: ProductImage[]
}