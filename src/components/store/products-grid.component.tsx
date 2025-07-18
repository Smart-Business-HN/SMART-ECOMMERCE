'use client';
import { Card, Typography, Button } from "@/utils/MTailwind";
import { ProductDto } from "@/interfaces/product/product.interface";
import Image from "next/image";
import Link from "next/link";

interface ProductsGridProps {
  products: ProductDto[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      {products.map((product) => (
        <Card key={product.id} className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-4">
            <div className="relative h-48 mb-4">
              <Image
                src={product.productImages?.[0]?.url || "/images/products/no-image-available-icon-vector.webp"}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <h6  className="mb-2 line-clamp-2 font-semibold text-center">
              {product.name}
            </h6>
            <p  className="mb-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex justify-between items-center mb-4">
              <Typography variant="h6" color="blue-gray" className="font-bold">
                L. {product.recomendedSalePrice.toFixed(2)}
              </Typography>
              {/* <Typography variant="small" color="gray">
                Stock: {product.currentStock}
              </Typography> */}
            </div>
            <Link href={`/tienda/${product.subCategory?.category?.slug}/${product.subCategory?.slug}/${product.slug}`} className="w-full block">
              <Button size="sm" className="w-full" color="blue">
                Ver Detalles
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
} 