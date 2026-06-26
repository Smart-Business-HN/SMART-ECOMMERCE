"use client";
import { useEffect, useMemo, useState } from "react";
import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/button.component";
import { ProductDto } from "@/interfaces/product/product.interface";
import { NavCategoryDto } from "@/interfaces/nav-category/nav-category.interface";
import { getProductsEcommerce } from "@/services/products.service";
import { searchProducts } from "@/services/search.service";
import ProductCard from "@/components/store/product-card.component";
import CategorySidebar, {
  BrandOption,
} from "@/components/store/category-sidebar.component";
import SortDropdown, {
  sortLabel,
} from "@/components/store/sort-dropdown.component";
import FilterChip from "@/components/ui/filter-chip.component";
import Pagination from "@/components/store/pagination.component";

interface StoreClientProps {
  initialProducts: ProductDto[];
  initialTotalPages: number;
  initialTotalCount: number;
  initialPage: number;
  initialPageSize: number;
  categories: NavCategoryDto[];
}

export default function StoreClient({
  initialProducts,
  initialTotalPages,
  initialTotalCount,
  initialPage,
  initialPageSize,
  categories,
}: StoreClientProps) {
  const [brand, setBrand] = useQueryState("brand", parseAsInteger);
  const [priceMin, setPriceMin] = useQueryState("min", parseAsInteger);
  const [priceMax, setPriceMax] = useQueryState("max", parseAsInteger);
  const [sort, setSort] = useQueryState("sort", parseAsString.withDefault(""));
  const [page, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1),
  );
  const [pageSize] = useState(initialPageSize);

  const [products, setProducts] = useState<ProductDto[]>(initialProducts);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Brand facet derived from the initial product page (no backend brand endpoint).
  const brandOptions: BrandOption[] = useMemo(() => {
    const map = new Map<number, string>();
    initialProducts.forEach((p) => {
      if (p.brand?.id && p.brand?.name) map.set(p.brand.id, p.brand.name);
    });
    return Array.from(map, ([id, name]) => ({ id, name })).sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }, [initialProducts]);

  const hasFilters =
    brand != null || priceMin != null || priceMax != null || !!sort;

  useEffect(() => {
    const noFilters = !hasFilters;
    // Default view: reuse the server-rendered first page (no extra fetch).
    if (noFilters && page === initialPage) {
      setProducts(initialProducts);
      setTotalCount(initialTotalCount);
      setTotalPages(initialTotalPages);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const resp = noFilters
          ? await getProductsEcommerce(
              page,
              pageSize,
              "",
              undefined,
              undefined,
              false,
              false,
              undefined,
            )
          : await searchProducts({
              searchTerm: "",
              pageNumber: page - 1, // API uses 0-based paging
              pageSize,
              all: false,
              isUserSignIn: false,
              brandId: brand ?? undefined,
              minPrice: priceMin ?? undefined,
              maxPrice: priceMax ?? undefined,
              sortBy: sort || undefined,
            });
        if (cancelled) return;
        if (resp.succeeded) {
          setProducts(resp.data);
          setTotalCount(resp.totalItems);
          setTotalPages(Math.max(1, Math.ceil(resp.totalItems / pageSize)));
        }
      } catch (e) {
        console.error("Error loading products:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, priceMin, priceMax, sort, page, pageSize]);

  // Bloquear scroll de fondo mientras el drawer de filtros (móvil) está abierto.
  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilters]);

  const changeBrand = (id: number | null) => {
    setBrand(id);
    setPage(1);
  };
  const applyPrice = (lo: number | null, hi: number | null) => {
    setPriceMin(lo);
    setPriceMax(hi);
    setPage(1);
  };
  const changeSort = (v: string) => {
    setSort(v || null);
    setPage(1);
  };

  const brandName = brandOptions.find((b) => b.id === brand)?.name;
  const priceChipLabel =
    priceMin != null || priceMax != null
      ? `L. ${priceMin ?? 0} – ${priceMax ?? "∞"}`
      : null;

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-text md:text-[34px]">
            Tienda
          </h1>
          <p className="mt-1 text-[14px] text-ink2-500">
            {totalCount > 0
              ? `${totalCount} producto${totalCount !== 1 ? "s" : ""}`
              : "Catálogo"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFilters((s) => !s)}
            className="inline-flex min-h-[40px] items-center gap-2 rounded-[10px] border border-line-input bg-white px-4 text-[14px] font-medium text-text lg:hidden"
            aria-expanded={showFilters}
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4" />
            Filtros
          </button>
          <SortDropdown value={sort} onChange={changeSort} />
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">
        {/* Sidebar sticky (solo desktop) */}
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-[92px]">
            <CategorySidebar
              categories={categories}
              brandOptions={brandOptions}
              selectedBrand={brand}
              onBrandChange={changeBrand}
              priceMin={priceMin}
              priceMax={priceMax}
              onPriceApply={applyPrice}
            />
          </div>
        </aside>

        <div>
          {/* Active filter chips */}
          {hasFilters && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {brand != null && (
                <FilterChip
                  label={brandName ?? "Marca"}
                  removable
                  onRemove={() => changeBrand(null)}
                />
              )}
              {priceChipLabel && (
                <FilterChip
                  label={priceChipLabel}
                  removable
                  onRemove={() => applyPrice(null, null)}
                />
              )}
              {sort && (
                <FilterChip
                  label={sortLabel(sort)}
                  removable
                  onRemove={() => changeSort("")}
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setBrand(null);
                  setPriceMin(null);
                  setPriceMax(null);
                  setSort(null);
                  setPage(1);
                }}
                className="sb-link text-[13px] font-semibold text-ink2-500 hover:text-accent"
              >
                Limpiar todo
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] animate-pulse rounded-card bg-surface-muted"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    sizes="(max-width: 768px) 50vw, 30vw"
                  />
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
                No se encontraron productos con los filtros seleccionados.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Drawer de filtros (móvil) */}
      {showFilters && (
        <div
          className="fixed inset-0 z-[70] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
        >
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setShowFilters(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-[15px] font-semibold text-text">Filtros</span>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                aria-label="Cerrar filtros"
                className="flex h-11 w-11 items-center justify-center rounded-[10px] text-ink2-500 transition-colors hover:bg-surface-muted"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <CategorySidebar
                categories={categories}
                brandOptions={brandOptions}
                selectedBrand={brand}
                onBrandChange={changeBrand}
                priceMin={priceMin}
                priceMax={priceMax}
                onPriceApply={applyPrice}
              />
            </div>
            <div className="border-t border-line p-4">
              <Button
                variant="primary"
                fullWidth
                onClick={() => setShowFilters(false)}
              >
                Ver resultados{totalCount > 0 ? ` (${totalCount})` : ""}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
