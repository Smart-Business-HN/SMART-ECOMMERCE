'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatNumber } from '@/utils/number-format';
import type { ProductDto } from '@/interfaces/product/product.interface';

/**
 * "Los más buscados" featured grid. Fetched client-side so the homepage stays
 * statically rendered (no session coupling) and the LCP is unaffected.
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
    <section aria-labelledby="destacados-titulo" className="bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-16 md:py-[88px]">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[12.5px] tracking-[0.12em] uppercase text-accent font-bold mb-2.5">
              Destacados
            </p>
            <h2
              id="destacados-titulo"
              className="text-[28px] md:text-[38px] tracking-[-0.03em] font-bold text-text"
            >
              Los más buscados
            </h2>
          </div>
          <Link
            href="/tienda"
            className="sb-link shrink-0 text-ink2-700 font-semibold text-[15px] hover:text-accent flex items-center gap-1.5"
          >
            <span className="hidden sm:inline">Ver toda la tienda</span>
            <span className="sm:hidden">Ver tienda</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {status === 'loading'
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-line bg-white overflow-hidden"
                >
                  <div className="aspect-square w-full animate-pulse bg-surface" />
                  <div className="p-[18px]">
                    <div className="h-3 w-1/3 animate-pulse rounded bg-surface-muted" />
                    <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-surface-muted" />
                    <div className="mt-4 h-5 w-1/3 animate-pulse rounded bg-surface-muted" />
                  </div>
                </div>
              ))
            : products.map((product) => {
                const href = `/tienda/${product.subCategory?.category?.slug}/${product.subCategory?.slug}/${product.slug}`;
                const img =
                  product.productImages?.[0]?.url ||
                  '/images/products/no-image-available-icon-vector.webp';
                const brand = product.brand?.name;
                const spec = product.subCategory?.name;
                return (
                  <Link
                    key={product.id}
                    href={href}
                    className="sb-card text-inherit bg-white border border-line rounded-2xl overflow-hidden flex flex-col shadow-card"
                  >
                    <div className="relative aspect-square bg-surface overflow-hidden flex items-center justify-center">
                      <div className="sb-card-img w-full h-full bg-white flex items-center justify-center p-[18px]">
                        <Image
                          src={img}
                          alt={product.name}
                          width={260}
                          height={260}
                          sizes="(max-width: 1024px) 50vw, 22vw"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="p-[18px] pb-5 flex flex-col flex-1">
                      {brand && (
                        <div className="text-xs text-ink2-400 font-semibold tracking-[0.02em] mb-1.5">
                          {brand}
                        </div>
                      )}
                      <div className="text-[15.5px] font-semibold leading-snug line-clamp-2 mb-1.5">
                        {product.name}
                      </div>
                      {spec && (
                        <div className="text-[13px] text-ink2-500 leading-snug mb-4 line-clamp-1">
                          {spec}
                        </div>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[18px] font-bold tracking-[-0.02em]">
                          L. {formatNumber(product.recomendedSalePrice)}
                        </span>
                        <span className="sb-btn bg-surface-muted text-accent w-[38px] h-[38px] rounded-[10px] flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}
