import { ProductsShop } from '@/components/shop/ProductsShop'
import { Suspense } from 'react'
export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsShop />
    </Suspense>
  )
}
