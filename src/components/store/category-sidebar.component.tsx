"use client";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { NavCategoryDto } from "@/interfaces/nav-category/nav-category.interface";
import PriceRange from "@/components/store/price-range.component";

export interface BrandOption {
  id: number;
  name: string;
}

interface CategorySidebarProps {
  categories: NavCategoryDto[];
  /** slug of the active category, if any (highlights the list) */
  activeCategorySlug?: string;
  brandOptions: BrandOption[];
  selectedBrand: number | null;
  onBrandChange: (id: number | null) => void;
  priceMin: number | null;
  priceMax: number | null;
  onPriceApply: (min: number | null, max: number | null) => void;
}

const labelCls =
  "mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink2-400";

export default function CategorySidebar({
  categories,
  activeCategorySlug,
  brandOptions,
  selectedBrand,
  onBrandChange,
  priceMin,
  priceMax,
  onPriceApply,
}: CategorySidebarProps) {
  return (
    <div className="flex flex-col gap-7">
      {/* Search */}
      <form action="/tienda/buscar" method="get" role="search">
        <div className="relative">
          <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink2-400" />
          <input
            type="search"
            name="q"
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="sb-in w-full rounded-[11px] border border-line-input bg-white py-2.5 pl-9 pr-3 text-[14px] text-text outline-none placeholder:text-ink2-400"
          />
        </div>
      </form>

      {/* Categories */}
      <div>
        <h2 className={labelCls}>Categorías</h2>
        <ul className="flex flex-col gap-0.5">
          <li>
            <Link
              href="/tienda"
              className={`block rounded-[10px] px-3 py-2 text-[14px] transition-colors ${
                !activeCategorySlug
                  ? "bg-accent-soft font-semibold text-accent"
                  : "text-ink2-700 hover:bg-surface"
              }`}
            >
              Todos los productos
            </Link>
          </li>
          {categories.map((cat) => {
            const active = cat.slug === activeCategorySlug;
            return (
              <li key={cat.id}>
                <Link
                  href={`/tienda/${cat.slug}`}
                  className={`block rounded-[10px] px-3 py-2 text-[14px] transition-colors ${
                    active
                      ? "bg-accent-soft font-semibold text-accent"
                      : "text-ink2-700 hover:bg-surface"
                  }`}
                >
                  {cat.category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Brands (single-select; derived from loaded products — no backend brand facet) */}
      {brandOptions.length > 0 && (
        <div>
          <h2 className={labelCls}>Marcas</h2>
          <div className="flex flex-col gap-0.5">
            <button
              type="button"
              onClick={() => onBrandChange(null)}
              className={`rounded-[10px] px-3 py-2 text-left text-[14px] transition-colors ${
                selectedBrand === null
                  ? "bg-accent-soft font-semibold text-accent"
                  : "text-ink2-700 hover:bg-surface"
              }`}
            >
              Todas las marcas
            </button>
            {brandOptions.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => onBrandChange(b.id)}
                className={`rounded-[10px] px-3 py-2 text-left text-[14px] transition-colors ${
                  selectedBrand === b.id
                    ? "bg-accent-soft font-semibold text-accent"
                    : "text-ink2-700 hover:bg-surface"
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price */}
      <div>
        <h2 className={labelCls}>Precio (L.)</h2>
        <PriceRange min={priceMin} max={priceMax} onApply={onPriceApply} />
      </div>
    </div>
  );
}
