import { NextResponse } from 'next/server';
import type { ProductDto } from '@/interfaces/product/product.interface';
import { getBaseUrl } from '@/utils/server-url';

// Feed de catálogo para Meta Commerce Manager (formato CSV de productos).
// Se agrega en Commerce Manager como "Feed de datos → desde una URL" con horario.
// El `id` de cada producto es IDÉNTICO al content_id que envía el Pixel (SKU
// `code`, con fallback al id numérico), para que catálogo y Pixel emparejen y
// funcionen los anuncios dinámicos / Advantage+.
//
// URL pública: https://www.smartbusiness.site/api/meta/catalog-feed

export const dynamic = 'force-dynamic'; // se calcula por request; el CDN lo cachea vía Cache-Control

const DEFAULT_IMAGE = 'https://www.smartbusiness.site/images/og-image.jpg';

// Escapa un campo CSV: lo envuelve en comillas y duplica las comillas internas.
function csvField(value: unknown): string {
  return `"${String(value ?? '').replace(/"/g, '""')}"`;
}

// Texto plano para Meta: quita HTML, colapsa espacios/saltos y trunca.
function plain(text: string | undefined, max = 5000): string {
  if (!text) return '';
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

// Identificador canónico, igual al del Pixel (ver lib/meta/meta-custom-data.ts).
function feedId(product: ProductDto): string {
  return product.code?.trim() || String(product.id);
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    return new NextResponse('NEXT_PUBLIC_API_BASE_URL no configurado', { status: 500 });
  }

  const siteUrl = getBaseUrl();

  let products: ProductDto[] = [];
  try {
    const response = await fetch(
      `${baseUrl}/Product/GetAll?pageNumber=1&pageSize=10000&all=true&isUserSignIn=false`,
      { headers: { Accept: 'application/json' }, next: { revalidate: 3600 } },
    );
    if (!response.ok) throw new Error(`backend respondió ${response.status}`);
    const json = await response.json();
    products = Array.isArray(json?.data) ? json.data : [];
  } catch (error) {
    console.error('[catalog-feed] error obteniendo productos:', error);
    return new NextResponse('Error obteniendo productos', { status: 502 });
  }

  const header = [
    'id', 'title', 'description', 'availability', 'condition',
    'price', 'link', 'image_link', 'brand', 'inventory',
  ].join(',');

  const rows: string[] = [header];
  const seenIds = new Set<string>();

  for (const product of products) {
    // Solo productos visibles en el ecommerce y activos.
    if (!product?.showInEcommerce || product?.isActive === false) continue;

    const categorySlug = product.subCategory?.category?.slug;
    const subCategorySlug = product.subCategory?.slug;
    // `link` es obligatorio en Meta; sin slugs no se puede construir → se omite.
    if (!categorySlug || !subCategorySlug || !product.slug) continue;

    // Meta rechaza ids duplicados; si dos productos comparten `code` se emite
    // solo el primero (el SKU duplicado es un dato a corregir en el ERP).
    const id = feedId(product);
    if (seenIds.has(id)) continue;
    seenIds.add(id);

    const link = `${siteUrl}/tienda/${categorySlug}/${subCategorySlug}/${product.slug}`;
    const image = product.productImages?.[0]?.url || DEFAULT_IMAGE;
    const description = plain(product.description || product.ecommerceDescription) || product.name;
    // Disponibilidad de tienda = físico + virtual (ecommerceStock). Fallback a currentStock por compatibilidad.
    const availableStock = product.ecommerceStock ?? product.currentStock ?? 0;
    const availability = availableStock > 0 ? 'in stock' : 'out of stock';
    const price = `${(product.recomendedSalePrice ?? 0).toFixed(2)} HNL`;
    // inventory debe ser entero >= 0 (Meta lo mapea a quantity_to_sell_on_facebook).
    const inventory = Math.max(0, Math.trunc(availableStock));

    rows.push([
      csvField(id),
      csvField(plain(product.name, 200)),
      csvField(description),
      csvField(availability),
      csvField('new'),
      csvField(price),
      csvField(link),
      csvField(image),
      csvField(product.brand?.name || 'SMART BUSINESS'),
      csvField(inventory),
    ].join(','));
  }

  return new NextResponse(rows.join('\n'), {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'inline; filename="catalog-feed.csv"',
      // Cacheado en el CDN ~1h; Meta no necesita pegarle al backend en cada pull.
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
