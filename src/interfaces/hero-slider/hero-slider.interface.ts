import { Product } from "../product/product.interface"
import { BasicProduct } from "./basic-product.interface"

export interface HeroSlider {
    id: number
    position: number
    productId: number
    product: BasicProduct
  }