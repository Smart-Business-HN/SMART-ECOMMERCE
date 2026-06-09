'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatNumber } from '@/utils/number-format';
import type { ProductDto } from '@/interfaces/product/product.interface';

/**
 * Below-the-fold "Productos Destacados" row. Fetched client-side so the homepage
 * stays statically rendered (no session coupling) and the LCP is unaffected.
 * Renders nothing on error/empty so it can never break the page.
 */
export default function FeaturedProductsComponent() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [status, setStatus] = useState<'loading' | 'done' | 'empty'>('loading');

  useEffect(() => {
    let active = true;
    fetch('/api/products?pageNumber=1&pageSize=8&all=false&isUserSignIn=false', {
      headers: { Accept: 'application/json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!active) return;
        const list: ProductDto[] = json?.data ?? [];
        setProducts(list);
        setStatus(list.length ? 'done' : 'empty');
      })
      .catch(() => {
        if (active) setStatus('empty');
      });
    return () => {
      active = false;
    };
  }, []);

  if (status === 'empty') return null;

  return (
    <section aria-labelledby="destacados-titulo" className="container mx-auto px-4 my-10">
      <div className="flex items-center justify-between mb-5">
        <h2 id="destacados-titulo" className="text-2xl md:text-3xl font-bold text-gray-900">
          Productos Destacados
        </h2>
        <Link
          href="/tienda"
          className="inline-flex items-center min-h-[44px] px-4 text-sm font-semibold text-blue-700 hover:text-blue-900"
        >
          Ver todo el catálogo →
        </Link>
      </div>

      <div className="grid grid-flow-col auto-cols-[70%] sm:auto-cols-[40%] md:auto-cols-[25%] lg:auto-cols-[22%] gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {status === 'loading'
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="snap-start rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-100" />
                <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-gray-100" />
                <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-gray-100" />
              </div>
            ))
          : products.map((product) => {
              const href = `/tienda/${product.subCategory?.category?.slug}/${product.subCategory?.slug}/${product.slug}`;
              const img =
                product.productImages?.[0]?.url || '/images/products/no-image-available-icon-vector.webp';
              return (
                <Link
                  key={product.id}
                  href={href}
                  className="snap-start group rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 25vw, 22vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-sm font-semibold text-gray-800">{product.name}</h3>
                  <p className="mt-1 font-bold text-blue-700">L. {formatNumber(product.recomendedSalePrice)}</p>
                </Link>
              );
            })}
      </div>
    </section>
  );
}
