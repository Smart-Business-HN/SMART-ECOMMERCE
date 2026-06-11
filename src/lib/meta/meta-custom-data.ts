// Builders de custom_data para los eventos estándar de Meta. Es compartido por
// el helper del Pixel (navegador) y el servicio de Conversions API (servidor),
// de modo que ambos transportes envían un payload idéntico para un mismo
// event_id y Meta pueda deduplicarlos.
//
// IMPORTANTE: NO importar dependencias de Node aquí — este módulo se incluye en
// el bundle del cliente.

export interface MetaContent {
  id: string;
  quantity: number;
  item_price: number;
}

export interface MetaCustomData {
  content_type?: string;
  content_ids?: string[];
  contents?: MetaContent[];
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  num_items?: number;
  search_string?: string;
  status?: boolean;
  order_id?: string;
}

export const META_CURRENCY = 'HNL';

// Identificador canónico de catálogo. content_ids / contents[].id DEBEN coincidir
// byte-a-byte con el id usado en el feed del catálogo de Meta (Commerce Manager),
// de lo contrario Advantage+ / anuncios dinámicos no pueden emparejar productos.
// Usamos el `code` (SKU) del producto. Cambiar aquí si el feed se llava por id numérico.
export interface ProductLine {
  code: string;
  quantity: number;
  unitPrice: number;
}

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

interface ProductCustomDataOptions {
  contentName?: string;
  contentCategory?: string;
  includeValue?: boolean;
}

// Construye custom_data para ViewContent / AddToCart / InitiateCheckout /
// AddPaymentInfo / Purchase a partir de las líneas de producto.
export function buildProductCustomData(
  lines: ProductLine[],
  options: ProductCustomDataOptions = {},
): MetaCustomData {
  const { contentName, contentCategory, includeValue = true } = options;

  const contents: MetaContent[] = lines.map((line) => ({
    id: line.code,
    quantity: line.quantity,
    item_price: round2(line.unitPrice),
  }));
  const value = round2(lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0));
  const numItems = lines.reduce((sum, line) => sum + line.quantity, 0);

  const data: MetaCustomData = {
    content_type: 'product',
    content_ids: contents.map((content) => content.id),
    contents,
    currency: META_CURRENCY,
    num_items: numItems,
  };
  if (contentName) data.content_name = contentName;
  if (contentCategory) data.content_category = contentCategory;
  if (includeValue) data.value = value;
  return data;
}

export function buildSearchCustomData(searchString: string): MetaCustomData {
  return {
    content_type: 'product',
    search_string: searchString,
  };
}
