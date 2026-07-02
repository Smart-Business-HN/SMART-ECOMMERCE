// @ts-nocheck
export const revalidate = 3600; // ISR: revalidar cada 1 hora

import { getProductBySlug, getProductsBySubCategorySlug } from '@/services/products.service';
import { ProductDto } from '@/interfaces/product/product.interface';
import { notFound } from 'next/navigation';
import { formatNumber } from '@/utils/number-format';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth.config';
import Link from 'next/link';
import { CheckIcon, TruckIcon, LockClosedIcon, ShieldCheckIcon, PhoneIcon } from '@heroicons/react/24/outline';
import ProductViewTracker from '@/components/store/product-view-tracker.component';
import { buildProductCustomData } from '@/lib/meta/meta-custom-data';
import Breadcrumb from '@/components/ui/breadcrumb.component';
import Badge from '@/components/ui/badge.component';
import ProductGallery from '@/components/store/product-gallery.component';
import ProductPurchasePanel from '@/components/store/product-purchase-panel.component';
import ProductCard from '@/components/store/product-card.component';

interface ProductPageProps {
    params: Promise<{ category: string; subcategory: string; product: string }>;
}

// SEO Metadata dinámico mejorado
export async function generateMetadata({ params }: { params: Promise<{ category: string; subcategory: string; product: string }> }): Promise<Metadata> {
    const { product } = await params;
    const response = await getProductBySlug(product, false, 0);
    if (!response.succeeded || !response.data) {
        return {
            title: 'Producto no encontrado | SMART BUSINESS',
            description: 'El producto solicitado no existe o no está disponible.',
            robots: { index: false, follow: false },
        };
    }
    const productData: ProductDto = response.data;
    const brand = productData.brand?.name || '';
    const category = productData.subCategory?.category?.name || '';
    const subcategory = productData.subCategory?.name || '';
    const name = productData.name || '';
    const sku = productData.code || '';
    const description = productData.ecommerceDescription
        ? productData.ecommerceDescription.replace(/<[^>]+>/g, '').slice(0, 160)
        : productData.description?.slice(0, 160) || '';
    const keywords = [
        name,
        brand,
        category,
        subcategory,
        sku,
        'cableado estructurado',
        'sistemas CCTV',
        'fibra óptica',
        'equipos de red',
        'soluciones tecnológicas',
        'SMART BUSINESS',
        'tecnología Honduras'
    ].filter(Boolean);
    const ogImage = productData.productImages && productData.productImages.length > 0
        ? productData.productImages[0].url
        : 'https://www.smartbusiness.site/images/og-image.jpg';
    const canonical = `https://smartbusiness.site/tienda/${productData.subCategory?.category?.slug || ''}/${productData.subCategory?.slug || ''}/${productData.slug}`;

    return {
        title: `${name} | ${brand} | ${category} | SMART BUSINESS - Soluciones Tecnológicas`,
        description: `${description} Producto de ${brand} en ${category} - ${subcategory}. Precio: L. ${formatNumber(productData.recomendedSalePrice)}. Envío a todo Honduras.`,
        keywords,
        authors: [{ name: 'SMART BUSINESS S. DE R.L.' }],
        creator: 'SMART BUSINESS S. DE R.L.',
        publisher: 'SMART BUSINESS S. DE R.L.',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        metadataBase: new URL('https://smartbusiness.site'),
        alternates: {
            canonical,
        },
        openGraph: {
            title: `${name} | ${brand} | SMART BUSINESS`,
            description: `${description} Producto de ${brand} en ${category} - ${subcategory}.`,
            url: canonical,
            siteName: 'SMART BUSINESS',
            locale: 'es_HN',
            type: 'website',
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${name} - ${brand} - SMART BUSINESS`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${name} | ${brand} | SMART BUSINESS`,
            description: `${description} Producto de ${brand} en ${category} - ${subcategory}.`,
            images: [ogImage],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        category: 'technology',
        classification: 'electronics product',
        other: {
            'geo.region': 'HN',
            'geo.placename': 'Honduras',
            'DC.title': `${name} - ${brand} - SMART BUSINESS`,
            'DC.creator': 'SMART BUSINESS S. DE R.L.',
            'DC.subject': `${name}, ${brand}, ${category}, ${subcategory}, Cableado Estructurado, CCTV, Fibra Óptica`,
            'DC.description': `${description} Producto de ${brand} en ${category} - ${subcategory}`,
            'DC.publisher': 'SMART BUSINESS S. DE R.L.',
            'DC.type': 'Product',
            'DC.format': 'text/html',
            'DC.identifier': canonical,
            'DC.language': 'es',
            'DC.coverage': 'Honduras',
            'product:price:amount': productData.recomendedSalePrice.toString(),
            'product:price:currency': 'HNL',
            'product:availability': productData.ecommerceStock > 0 ? 'in stock' : 'out of stock',
            'product:brand': brand,
            'product:category': category,
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, subcategory, product } = await params;
    
    // Obtener la sesión del servidor
    const session = await getServerSession(authOptions);
    const isUserSignIn = session?.user?.id ? true : false;
    const customerTypeId = session?.customerType?.id ? session?.customerType?.id : undefined;
    
    try {
        const response = await getProductBySlug(product, isUserSignIn, customerTypeId != undefined ? customerTypeId : 0);
        
        if (!response.succeeded || !response.data) {
            notFound();
        }
        
        const productData: ProductDto = response.data;
        let hasMoreInformation = false;
        if(productData.ecommerceDescription || productData.productFeatures || productData.productDataSheets) {
            hasMoreInformation = true;
        }

        // El editor enriquecido a veces pega el texto con espacios duros (&nbsp; / U+00A0)
        // en lugar de espacios normales, lo que impide el salto de línea y desborda el
        // contenedor. Los normalizamos a espacios normales para que el texto fluya.
        const ecommerceDescriptionHtml = (productData.ecommerceDescription || '').replace(/&nbsp;|\u00A0/g, ' ');
        const hasFeatures = !!(productData.productFeatures && productData.productFeatures.length > 0);

        const categoryTitle = productData.subCategory?.category?.name || '';
        const subcategoryTitle = productData.subCategory?.name || '';
        const brandName = productData.brand?.name || '';
        const categorySlug = productData.subCategory?.category?.slug || '';
        const subcategorySlug = productData.subCategory?.slug || '';
        const canonicalUrl = `https://smartbusiness.site/tienda/${categorySlug}/${subcategorySlug}/${productData.slug}`;

        // Productos relacionados: misma subcategoría (no existe endpoint de relacionados).
        let related: ProductDto[] = [];
        try {
            if (subcategorySlug) {
                const rel = await getProductsBySubCategorySlug(subcategorySlug, 1, 5, '', undefined, undefined, false, undefined);
                if (rel.succeeded) {
                    related = rel.data.filter((p) => p.id !== productData.id).slice(0, 4);
                }
            }
        } catch (e) {
            console.error('Error fetching related products:', e);
        }

        return (
            <>
                {/* Meta Pixel: ViewContent (navegador + Conversions API con dedup por event_id) */}
                <ProductViewTracker
                    customData={buildProductCustomData(
                        [{ code: productData.code, quantity: 1, unitPrice: productData.recomendedSalePrice }],
                        { contentName: productData.name, contentCategory: categoryTitle },
                    )}
                />
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Product",
                            "name": productData.name,
                            "description": productData.description || productData.ecommerceDescription?.replace(/<[^>]+>/g, '') || `Producto ${productData.name}`,
                            "sku": productData.code,
                            "brand": {
                                "@type": "Brand",
                                "name": brandName
                            },
                            "category": categoryTitle,
                            "url": `https://smartbusiness.site/tienda/${productData.subCategory?.category?.slug || ''}/${productData.subCategory?.slug || ''}/${productData.slug}`,
                            "image": productData.productImages && productData.productImages.length > 0 
                                ? productData.productImages.map(img => img.url)
                                : ['https://www.smartbusiness.site/images/og-image.jpg'],
                            "offers": {
                                "@type": "Offer",
                                "price": productData.recomendedSalePrice,
                                "priceCurrency": "HNL",
                                "availability": productData.ecommerceStock > 0 
                                    ? "https://schema.org/InStock" 
                                    : "https://schema.org/OutOfStock",
                                "seller": {
                                    "@type": "Organization",
                                    "name": "SMART BUSINESS S. DE R.L.",
                                    "url": "https://smartbusiness.site"
                                },
                                "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                            },
                            "breadcrumb": {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Inicio",
                                        "item": "https://smartbusiness.site"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Tienda",
                                        "item": "https://smartbusiness.site/tienda"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": categoryTitle,
                                        "item": `https://smartbusiness.site/tienda/${productData.subCategory?.category?.slug || ''}`
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 4,
                                        "name": subcategoryTitle,
                                        "item": `https://smartbusiness.site/tienda/${productData.subCategory?.category?.slug || ''}/${productData.subCategory?.slug || ''}`
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 5,
                                        "name": productData.name,
                                        "item": `https://smartbusiness.site/tienda/${productData.subCategory?.category?.slug || ''}/${productData.subCategory?.slug || ''}/${productData.slug}`
                                    }
                                ]
                            },
                            "additionalProperty": [
                                {
                                    "@type": "PropertyValue",
                                    "name": "Stock",
                                    "value": productData.ecommerceStock
                                },
                                {
                                    "@type": "PropertyValue",
                                    "name": "Estado",
                                    "value": productData.status?.name || "Activo"
                                }
                            ],
                            "publisher": {
                                "@type": "Organization",
                                "name": "SMART BUSINESS S. DE R.L.",
                                "url": "https://smartbusiness.site",
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "+504-8818-7765",
                                    "email": "consultas@smartbusiness.site",
                                    "contactType": "customer service"
                                }
                            }
                        })
                    }}
                />
                <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8" role="main" aria-labelledby="producto-titulo">
                    <Breadcrumb
                        className="mb-6"
                        items={[
                            { label: 'Inicio', href: '/' },
                            { label: 'Tienda', href: '/tienda' },
                            { label: categoryTitle, href: `/tienda/${categorySlug}` },
                            { label: subcategoryTitle, href: `/tienda/${categorySlug}/${subcategorySlug}` },
                            { label: productData.name },
                        ]}
                    />

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
                        {/* Galería */}
                        <section aria-labelledby="imagenes-producto-titulo" className="lg:sticky lg:top-[92px] lg:self-start">
                            <h2 id="imagenes-producto-titulo" className="sr-only">Imágenes del producto</h2>
                            <ProductGallery images={productData.productImages || []} name={productData.name} />
                        </section>

                        {/* Información del Producto */}
                        <section aria-labelledby="producto-titulo">
                            <div className="flex flex-wrap items-center gap-3">
                                {brandName && <span className="text-[13px] font-bold text-accent">{brandName}</span>}
                                <span className="text-[12px] text-ink2-400">SKU: {productData.code}</span>
                                <Badge variant="success">{productData.ecommerceStock > 0 ? 'En stock' : 'Consultar stock'}</Badge>
                            </div>

                            <h1 id="producto-titulo" className="mt-3 text-[28px] font-bold tracking-[-0.02em] text-text md:text-[34px]">
                                {productData.name}
                            </h1>

                            {productData.description && (
                                <p className="mt-4 text-[15.5px] leading-[1.6] text-ink2-600">{productData.description}</p>
                            )}

                            {/* Precio */}
                            <div className="mt-6">
                                <p className="text-[34px] font-extrabold tracking-[-0.03em] text-text" aria-label={`Precio: Lempiras ${formatNumber(productData.recomendedSalePrice)}`}>
                                    L. {formatNumber(productData.recomendedSalePrice)}
                                </p>
                                <p className="mt-1 text-[13px] text-ink2-500">
                                    Precio con impuestos incluidos · Envío gratis en compras mayores a L. 1,000
                                </p>
                                {!isUserSignIn && (
                                    <p className="mt-2 text-[14px] text-ink2-600">
                                        Consigue hasta un <strong className="text-accent">10% de descuento</strong> solo por{' '}
                                        <Link className="sb-link font-semibold text-accent" href="/sign-up">registrarte</Link>.
                                    </p>
                                )}
                            </div>

                            {/* Specs destacadas */}
                            {productData.productFeatures && productData.productFeatures.length > 0 && (
                                <div className="mt-6 rounded-[14px] bg-surface p-5">
                                    <ul className="space-y-2.5">
                                        {productData.productFeatures.slice(0, 4).map((feature, index) => (
                                            <li key={index} className="flex items-start gap-2.5">
                                                <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-accent" />
                                                <span className="text-[14px] text-text">
                                                    <strong className="font-semibold">{feature.title}</strong>
                                                    {feature.description ? ` — ${feature.description}` : ''}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Cantidad + acciones (carrito real + cotización) */}
                            <div className="mt-7">
                                <ProductPurchasePanel
                                    productId={productData.id}
                                    productName={productData.name}
                                    productUrl={canonicalUrl}
                                    inStock={productData.ecommerceStock > 0}
                                />
                            </div>

                            {/* Sellos de confianza */}
                            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-6">
                                {[
                                    { Icon: TruckIcon, t: 'Envío a todo Honduras', s: 'Gratis en +L.1,000' },
                                    { Icon: LockClosedIcon, t: 'Pago seguro', s: 'Procesado por BAC' },
                                    { Icon: ShieldCheckIcon, t: 'Garantía', s: 'Productos originales' },
                                    { Icon: PhoneIcon, t: 'Soporte 24/7', s: 'Asesoría experta' },
                                ].map(({ Icon, t, s }, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <div>
                                            <p className="text-[13.5px] font-semibold text-text">{t}</p>
                                            <p className="text-[12px] text-ink2-500">{s}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Descripción extendida + ficha técnica */}
                    {hasMoreInformation && (
                        <section className="mt-10 md:mt-14 rounded-container bg-surface p-6 md:p-10" aria-labelledby="informacion-adicional-titulo">
                            <h2 id="informacion-adicional-titulo" className="sr-only">Información adicional del producto</h2>
                            <div className={`grid grid-cols-1 gap-10 ${hasFeatures ? 'lg:grid-cols-[1.4fr_1fr]' : ''}`}>
                                <div className="min-w-0">
                                    {productData.ecommerceDescription ? (
                                        <>
                                            <h3 className="mb-4 text-[24px] font-bold text-text">Descripción</h3>
                                            <div
                                                className="prose description max-w-none break-words text-ink2-600"
                                                dangerouslySetInnerHTML={{ __html: ecommerceDescriptionHtml }}
                                            />
                                        </>
                                    ) : productData.description ? (
                                        <>
                                            <h3 className="mb-4 text-[24px] font-bold text-text">Descripción</h3>
                                            <p className="text-[15.5px] leading-[1.7] text-ink2-600">{productData.description}</p>
                                        </>
                                    ) : null}
                                </div>
                                {hasFeatures && (
                                    <div className="min-w-0">
                                        <h3 className="mb-4 text-[24px] font-bold text-text">Características</h3>
                                        <div className="overflow-hidden rounded-card border border-line bg-white">
                                            {productData.productFeatures.map((feature, index) => (
                                                <div key={index} className="flex flex-col gap-0.5 border-b border-line-soft px-5 py-3 last:border-b-0">
                                                    <span className="text-[14px] font-semibold text-text">{feature.title}</span>
                                                    {feature.description && (
                                                        <span className="text-[13.5px] text-ink2-500">{feature.description}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Productos relacionados */}
                    {related.length > 0 && (
                        <section className="mt-10 md:mt-14" aria-label="Productos relacionados">
                            <h2 className="mb-6 text-[24px] font-bold text-text">Productos relacionados</h2>
                            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                                {related.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </>
        );
    } catch (error) {
        console.error('Error fetching product:', error);
        console.error('Product slug:', product);
        console.error('Category:', category);
        console.error('Subcategory:', subcategory);
        
        // Si el error es específico de producto no encontrado, mostrar 404
        if (error instanceof Error && error.message.includes('404')) {
            notFound();
        }
        
        // Para otros errores, también mostrar 404 pero loguear el error completo
        notFound();
    }
}