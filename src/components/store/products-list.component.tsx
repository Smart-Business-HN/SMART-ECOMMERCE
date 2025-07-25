'use client';
import { ProductDto } from "@/interfaces/product/product.interface";
import Image from "next/image";
import Link from "next/link";

interface ProductsListProps {
  products: ProductDto[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="space-y-4 mt-6">
      {products.map((product) => (
        <div key={product.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={product.productImages?.[0]?.url || "/images/products/no-image-available-icon-vector.webp"}
              alt={product.name}
              fill
              className="object-contain rounded"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">L. {product.recomendedSalePrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500">Stock: {product.currentStock}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link href={`/tienda/${product.subCategory?.category?.slug}/${product.subCategory?.slug}/${product.slug}`}>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Ver Detalles
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 