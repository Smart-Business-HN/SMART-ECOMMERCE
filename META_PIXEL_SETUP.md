# Meta (Facebook) Pixel + Conversions API — Setup

Implementación de doble transporte: **Pixel del navegador (`fbq`)** + **Conversions API (CAPI) server-side**, con **deduplicación por `event_id`**, **Advanced Matching**, **consentimiento opt-out** y cobertura completa del funnel de ecommerce.

## Arquitectura

- **Un solo `event_id` por evento**, compartido entre el navegador (`fbq(..., { eventID })`) y el servidor (CAPI). Meta deduplica navegador + servidor.
- **Helper único** [`src/lib/meta/fbpixel.ts`](src/lib/meta/fbpixel.ts) → `trackFbEvent(name, customData, userFields?)`:
  1. dispara `fbq('track', ...)` con el `eventID`, y
  2. hace `POST /api/events/capi` con el mismo `eventID` (fire-and-forget).
- **Route handler** [`src/app/api/events/capi/route.ts`](src/app/api/events/capi/route.ts) enriquece server-side: cookies `_fbp`/`_fbc`, IP (`x-forwarded-for`), `user-agent` y la sesión NextAuth (email/nombre). Hashea PII (SHA-256) y llama al Graph API. El **token de CAPI nunca se expone al cliente**.
- **Advanced Matching es client-side** ([`pixel-advanced-matching.component.tsx`](src/components/analytics/pixel-advanced-matching.component.tsx)): el código base en `<head>` solo hace `fbq('init', id)` (sin leer sesión) para que el root layout **siga estático/ISR**; el matching del usuario logueado se aplica tras la hidratación con `useSession`. La CAPI server-side igual hashea email/nombre desde la sesión por evento.
- **GTM/GA4/Clarity quedan intactos** y Meta **NO** se enruta por GTM (para que el `event_id` viva en un solo lugar y no haya doble disparo sin dedup).
- **Purchase**: no hay confirmación síncrona. Se dispara **server-to-server** desde SMART-ERP-API cuando un carrito pasa a `Verified` (`AdminUpdateCartStatusCommand`) → `POST /api/events/purchase` (autenticado con `BACKEND_SECRET_KEY`, `event_id = cart.id`, idempotente).

## Eventos instrumentados

| Evento | Dónde dispara | Matching |
|--------|---------------|----------|
| `PageView` | `PixelTracker` (carga inicial + cada cambio de ruta) | base |
| `ViewContent` | página de producto (`ProductViewTracker`) | sesión |
| `Search` | `search-input` al buscar | sesión |
| `AddToCart` | `useCartSelection` (cubre botón y grid) | sesión |
| `InitiateCheckout` | `cart-page-client` → Proceder al pago | sesión + email |
| `AddPaymentInfo` | `checkout-page-client` (transferencia y payment-link) | email (+ teléfono en payment-link) |
| `CompleteRegistration` | `sign-up-form` tras registro | email + teléfono + nombre |
| `Contact` | `contact-form` tras enviar | email + teléfono + nombre |
| `Lead` | vista de cotización (`/cotizacion/preview/[token]`) | teléfono |
| `Purchase` | webhook backend en carrito `Verified` | email + teléfono |

> `value` usa el **subtotal de mercancía** (sin impuesto), consistente con `item_price` de `contents`. `content_ids`/`contents[].id` usan el **`code` (SKU)** del producto.

## Variables de entorno

### Ecommerce (`.env` / Vercel)
```
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=   # Pixel/Dataset ID (público)
CAPI_PIXEL_ID=                   # mismo ID, server-side (puede igualar al público)
CAPI_ACCESS_TOKEN=               # token de Conversions API (SECRETO)
META_TEST_EVENT_CODE=            # TESTxxxxx solo en dev/staging; vaciar en prod
META_GRAPH_VERSION=              # opcional, por defecto v23.0
BACKEND_SECRET_KEY=...           # ya existente; usado también por el webhook de Purchase
```

### Backend (`appsettings*.json`)
```jsonc
"MetaCapiSettings": {
  "PurchaseWebhookUrl": "https://www.smartbusiness.site/api/events/purchase",
  "BackendSecretKey": ""   // debe coincidir con BACKEND_SECRET_KEY del ecommerce
}
```
Si `BackendSecretKey` o `PurchaseWebhookUrl` están vacíos, el envío de Purchase es no-op (no rompe la verificación del carrito).

## Puesta en marcha

1. En **Events Manager** crea/usa un Pixel (dataset) y genera un **token de Conversions API**.
2. Rellena `NEXT_PUBLIC_FACEBOOK_PIXEL_ID`, `CAPI_PIXEL_ID`, `CAPI_ACCESS_TOKEN`.
3. Pon el mismo `BACKEND_SECRET_KEY` en `MetaCapiSettings:BackendSecretKey` del backend.
4. **Auditar GTM (`GTM-W4PPLW2`)**: confirmar que NO tiene un tag de Meta Pixel (evita doble disparo sin dedup).
5. **Catálogo**: si usas Advantage+/anuncios dinámicos, el feed del catálogo debe llavearse por el **`code` (SKU)** para que `content_ids` empareje. Si tu feed usa el id numérico, cambia el identificador canónico en [`src/lib/meta/meta-custom-data.ts`](src/lib/meta/meta-custom-data.ts).

## Pruebas

- **Test Events** (Events Manager): pon `META_TEST_EVENT_CODE` y verifica que cada evento llega por **ambos** transportes y aparece como **Deduplicated**.
- **Meta Pixel Helper** (extensión Chrome): verifica un solo `PageView` por navegación (sin doble conteo).
- Verifica que **EMQ** (Event Match Quality) sea razonable y, si aplica, que el **catalog match rate** sea alto.
- **Quitar `META_TEST_EVENT_CODE` en producción** o los eventos no cuentan para atribución.

## Consentimiento

Política **opt-out** (Honduras): el rastreo está activo por defecto; el banner ([`meta-consent-banner.component.tsx`](src/components/analytics/meta-consent-banner.component.tsx)) permite **Rechazar**, lo que llama `fbq('consent','revoke')` y marca la cookie `meta_consent=revoked` (el route handler y el helper la respetan). La elección persiste en `localStorage` y se reaplica en cada visita.

## Catálogo de productos (anuncios dinámicos / Advantage+)

El catálogo viejo de Meta venía de WooCommerce (sitio en WordPress) y quedó congelado; además sus `content_id` (IDs de WooCommerce) **no coinciden** con lo que envía el Pixel. Se reemplaza por un **feed propio**:

- **Endpoint:** [`/api/meta/catalog-feed`](src/app/api/meta/catalog-feed/route.ts) → CSV con todos los productos `showInEcommerce` activos.
- **URL pública:** `https://www.smartbusiness.site/api/meta/catalog-feed`
- El `id` de cada producto es el **mismo SKU (`code`)** que envía el Pixel (con fallback al id numérico), así catálogo y eventos emparejan byte-a-byte.
- Cacheado en CDN ~1h (`s-maxage=3600`).

**Pasos en Commerce Manager (lado Meta):**
1. Commerce Manager → Catálogo → **Orígenes de datos** → **Agregar artículos** → **Feed de datos** → **Usar una URL**.
2. Pegar `https://www.smartbusiness.site/api/meta/catalog-feed`, moneda **HNL**, programar actualización (diaria o cada hora).
3. Tras la primera importación, **pausar/quitar** el origen "WooCommerce By Meta".
4. Asociar el catálogo al Pixel (`597632531349718`) para anuncios dinámicos.

> Caveat: los productos con precio `L.0,00` se exportan con ese precio y Meta los marcará en diagnósticos (precio inválido). Corregir el precio en el ERP o se omiten al anunciar. Si el feed se mueve a otra ruta/extensión, actualizar la URL en Commerce Manager.

## Notas / pendientes

- **Dev → webhook Purchase**: en local el backend (`https://localhost:7211`) llamaría a `https://localhost:3000` con cert auto-firmado; .NET puede rechazarlo. Probar Purchase en un entorno con certificados reales o ajustar el manejo de TLS solo para dev.
- El **teléfono no está en la sesión** NextAuth: `ViewContent`/`AddToCart`/`InitiateCheckout` solo emparejan por email en usuarios logueados (menor EMQ en anónimos). Aceptable.
- `Lead` se dispara en cada **vista** de cotización (el token puede abrirlo un usuario anónimo). Ajustar si se prefiere solo en comentarios autenticados.
