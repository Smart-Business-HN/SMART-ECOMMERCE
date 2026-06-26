"use client";
import { useEffect, useState } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { ProductDto } from "@/interfaces/product/product.interface";
import { getProductsBySubCategorySlug } from "@/services/products.service";
import { searchProducts } from "@/services/search.service";
import ProductCard from "@/components/store/product-card.component";
import Pagination from "@/components/store/pagination.component";
import Breadcrumb from "@/components/ui/breadcrumb.component";
import SortDropdown from "@/components/store/sort-dropdown.component";

interface SubcategoryClientProps {
  subcategorySlug: string;
  categorySlug: string;
  categoryTitle: string;
  subcategoryTitle: string;
  subCategoryId?: number;
  initialProducts: ProductDto[];
  initialTotalPages: number;
  initialTotalCount: number;
  initialPage: number;
  initialPageSize: number;
}

export default function SubcategoryClient({
  subcategorySlug,
  categorySlug,
  categoryTitle,
  subcategoryTitle,
  subCategoryId,
  initialProducts,
  initialTotalPages,
  initialTotalCount,
  initialPage,
  initialPageSize,
}: SubcategoryClientProps) {
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize] = useState(initialPageSize);

  const [products, setProducts] = useState<ProductDto[]>(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);

  const canSort = subCategoryId != null;
  const activeSort = canSort ? sort : "";

  useEffect(() => {
    if (!activeSort && page === initialPage) {
      setProducts(initialProducts);
      setTotalCount(initialTotalCount);
      setTotalPages(initialTotalPages);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const resp =
          activeSort && subCategoryId != null
            ? await searchProducts({
                searchTerm: "",
                pageNumber: page - 1,
                pageSize,
                all: false,
                isUserSignIn: false,
                subCategoryId,
                sortBy: activeSort || undefined,
              })
            : await getProductsBySubCategorySlug(
                subcategorySlug,
                page,
                pageSize,
                "",
                undefined,
                undefined,
                false,
                undefined,
              );
        if (cancelled) return;
        if (resp.succeeded) {
          setProducts(resp.data);
          setTotalCount(resp.totalItems);
          setTotalPages(Math.max(1, Math.ceil(resp.totalItems / pageSize)));
        }
      } catch (e) {
        console.error("Error loading subcategory products:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSort, page, pageSize]);

  const changeSort = (v: string) => {
    setSort(v || null);
    setPage(1);
  };

  return (
    <div>
      <section className="relative overflow-hidden bg-ink">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-[460px] w-[460px] rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(0,111,255,.45) 0%, rgba(0,111,255,0) 70%)",
          }}
        />
        <div className="relative mx-auto max-w-[1280px] px-4 py-10 md:py-14 sm:px-6 lg:px-8">
          <Breadcrumb
            tone="dark"
            items={[
              { label: "Inicio", href: "/" },
              { label: "Tienda", href: "/tienda" },
              { label: categoryTitle, href: `/tienda/${categorySlug}` },
              { label: subcategoryTitle },
            ]}
          />
          <h1 className="mt-5 text-[34px] font-bold tracking-[-0.03em] text-white md:text-[44px]">
            {subcategoryTitle}
          </h1>
          <p className="mt-3 max-w-[560px] text-[16px] leading-[1.55] text-ink2-300">
            {subcategoryTitle} en {categoryTitle} — equipos y soluciones
            disponibles en Smart Business.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[14px] text-ink2-500">
            {totalCount > 0
              ? `${totalCount} producto${totalCount !== 1 ? "s" : ""}`
              : ""}
          </p>
          {canSort && <SortDropdown value={sort} onChange={changeSort} />}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] animate-pulse rounded-card bg-surface-muted"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </>
        ) : (
          <div className="rounded-card border border-line bg-white py-16 text-center">
            <p className="text-[15px] text-ink2-500">
              No se encontraron productos en esta subcategoría.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
