import { ProductImage } from "../product/product-image.interface"
import { status } from "../status/status.interface"
import { subCategory } from "../sub-category/sub-category.interface"

export interface BasicProduct {
    id: number
    slug:string,
    name: string
    urlYoutube: any
    brand: any
    status: status
    subcategory: subCategory
    productImages: ProductImage[]
    productDataSheets: any[]
  }