'use client';
import { ProductDto } from "@/interfaces/product/product.interface";
import { formatNumber } from "@/utils/number-format";
import Image from "next/image";
import Link from "next/link";

interface ProductsListProps {
  products: ProductDto[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="space-y-4 mt-6">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col md:flex-row md:gap-4 p-4 border border-gray-200 rounded-lg items-center md:items-start hover:shadow-md transition-shadow">
          <div className="relative w-full md:w-24 h-24 flex-shrink-0 flex gap-2 items-center justify-center">
            <Image
              src={product.productImages?.[0]?.url || "/images/products/no-image-available-icon-vector.webp"}
              alt={product.name}
              width={100}
              height={100}
            />
            <h3 className="text-lg font-semibold text-gray-900 md:hidden">{product.name}</h3>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 hidden md:block">{product.name}</h3>
            <p className="text-gray-600 text-sm md:mb-2 md:line-clamp-2">{product.description}</p>
            <div className="flex md:justify-between justify-center items-center">
              <span className="text-lg font-bold text-blue-600">L. { formatNumber(product.recomendedSalePrice)}</span>
              
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