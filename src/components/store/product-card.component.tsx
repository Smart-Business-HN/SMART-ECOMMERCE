import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { ProductDto } from "@/interfaces/product/product.interface";
import { formatNumber } from "@/utils/number-format";
import { stripHtml } from "@/utils/string.utils";
import Badge from "@/components/ui/badge.component";

const NO_IMAGE = "/images/products/no-image-available-icon-vector.webp";

/** Build the PDP URL from a product's category/subcategory slugs. */
export function productUrl(product: ProductDto): string {
  const cat = product.subCategory?.category?.slug;
  const sub = product.subCategory?.slug;
  if (cat && sub && product.slug) {
    return `/tienda/${cat}/${sub}/${product.slug}`;
  }
  return "/tienda";
}

interface ProductCardProps {
  product: ProductDto;
  badge?: { label: string; variant?: "success" | "dark" | "accent" };
  /** sizes attr for the responsive image (defaults to a 4-up grid) */
  sizes?: string;
}

/**
 * Product card ("Smart Business Rediseño"). Server component — the whole card is a
 * Link to the PDP; the "+" is a presentational affordance (real add-to-cart lives on the PDP).
 */
export default function ProductCard({
  product,
  badge,
  sizes = "(max-width: 600px) 50vw, (max-width: 980px) 33vw, 25vw",
}: ProductCardProps) {
  // Preferir la descripción plana; `ecommerceDescription` es HTML → limpiarlo.
  const desc = stripHtml(product.description || product.ecommerceDescription);
  return (
    <Link
      href={productUrl(product)}
      className="sb-card group relative flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-shadow"
    >
      {badge && (
        <span className="absolute left-3 top-3 z-10">
          <Badge variant={badge.variant ?? "dark"}>{badge.label}</Badge>
        </span>
      )}
      <div className="relative aspect-square w-full bg-white">
        <Image
          src={product.productImages?.[0]?.url || NO_IMAGE}
          alt={product.name}
          fill
          sizes={sizes}
          className="sb-card-img object-contain p-6"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-line-soft p-[18px]">
        {product.brand?.name && (
          <p className="mb-1 text-[12px] font-semibold text-ink2-400">
            {product.brand.name}
          </p>
        )}
        <h3 className="mb-1.5 line-clamp-2 text-[14.5px] font-semibold text-text">
          {product.name}
        </h3>
        {desc && (
          <p className="mb-3.5 line-clamp-2 text-[13px] text-ink2-500">{desc}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[16px] font-bold tracking-[-0.02em] text-text">
            L. {formatNumber(product.recomendedSalePrice)}
          </span>
          <span
            aria-hidden="true"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-surface-muted text-accent transition-colors group-hover:bg-accent group-hover:text-white"
          >
            <PlusIcon className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
