// @ts-nocheck
export const revalidate = 3600; // ISR: revalidar cada 1 hora

import { getProductBySlug } from '@/services/products.service';
import { ProductDto } from '@/interfaces/product/product.interface';
import Image from 'next/image';
import { Card, Typography, Button, Carousel, Tabs, TabsBody, TabPanel, TabsHeader, Tab } from '@/utils/MTailwind';
import { notFound } from 'next/navigation';
import { formatNumber } from '@/utils/number-format';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth.config';
import Link from 'next/link';
import WhatsAppContactButton from '@/components/store/whatsapp-contact-button.component';

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
            'product:availability': productData.currentStock > 0 ? 'in stock' : 'out of stock',
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

        // Determinar la tab inicial según la jerarquía y disponibilidad
        const initialTab = productData.ecommerceDescription
          ? 'ecommerceDescription'
          : productData.productFeatures && productData.productFeatures.length > 0
          ? 'productFeatures'
          : productData.productDataSheets && productData.productDataSheets.length > 0
          ? 'productDataSheets'
          : undefined;

        const categoryTitle = productData.subCategory?.category?.name || '';
        const subcategoryTitle = productData.subCategory?.name || '';
        const brandName = productData.brand?.name || '';

        return (
            <>
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "offer",
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
                                "availability": productData.currentStock > 0 
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
                                    "value": productData.currentStock
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
                <main className="container mx-auto max-w-7xl px-4 py-8" role="main" aria-labelledby="producto-titulo">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Carrusel de Imágenes del Producto */}
                        <section aria-labelledby="imagenes-producto-titulo">
                            <h2 id="imagenes-producto-titulo" className="sr-only">Imágenes del producto</h2>
                            <div className="space-y-4">
                                {productData.productImages && productData.productImages.length > 0 ? (
                                    <Carousel loop={true} autoplay={true} className="rounded-xl h-96">
                                        {productData.productImages.map((image, index) => (
                                            <div key={index} className="relative h-full w-full">
                                                <Image
                                                    src={image.url}
                                                    alt={`${productData.name} - Imagen ${index + 1}`}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                                                    priority={index === 0}
                                                    quality={85}
                                                    className="object-cover object-center"
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                ) : (
                                    <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                                        <Image
                                            src="/images/products/no-image-available-icon-vector.webp"
                                            alt={productData.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Información del Producto */}
                        <section aria-labelledby="producto-titulo">
                            <header>
                                <h1 id="producto-titulo" className="text-3xl font-bold text-gray-900 mb-2">{productData.name}</h1>
                                <p className="text-gray-600 text-lg" aria-label={`SKU: ${productData.code}`}>SKU: {productData.code}</p>
                            </header>

                            {/* Precio */}
                            <div className="bg-blue-50 p-4 rounded-lg my-6">
                                <p className="text-sm text-gray-600 mb-1">Precio</p>
                                <div>

                                <p className="text-3xl font-bold text-blue-600" aria-label={`Precio: Lempiras ${formatNumber(productData.recomendedSalePrice)}`}>
                                    L. {formatNumber(productData.recomendedSalePrice)}
                                </p>
                                {!isUserSignIn && (
                                    <div>Consigue hasta un <strong><span className="text-blue-600">10%</span> de descuento</strong> solo por <Link className="text-blue-600" href="/sign-up">registrarte.</Link></div>
                                )}
                                </div>
                            </div>

                            {/* Descripción */}
                            {productData.description && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h3>
                                    <p className="text-gray-600 leading-relaxed">{productData.description}</p>
                                </div>
                            )}

                            {/* Información del Stock */}
                            <div className="gap-4 mb-6">
                                <div className="bg-gray-50 p-3 rounded">
                                    <p className="text-sm text-gray-600">Stock Actual</p>
                                    <p className="text-lg font-semibold text-gray-900" aria-label={`Estado del stock: ${productData.currentStock > 0 ? 'Disponible' : 'Consultar Stock'}`}>
                                        {productData.currentStock > 0 ? 'Disponible' : 'Consultar Stock'}
                                    </p>
                                </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="flex gap-4 pt-4">
                                <Button 
                                    size="lg" 
                                    color="blue" 
                                    className="flex-1"
                                    disabled={productData.currentStock <= 0}
                                    aria-label={productData.currentStock > 0 ? 'Agregar al carrito' : 'Producto sin stock'}
                                >
                                    {productData.currentStock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                                </Button>
                                <WhatsAppContactButton 
                                    productUrl={`https://smartbusiness.site/tienda/${productData.subCategory?.category?.slug || ''}/${productData.subCategory?.slug || ''}/${productData.slug}`}
                                    size="lg"
                                    variant="outlined"
                                    color="blue"
                                    aria-label="Contactar sobre este producto"
                                />
                            </div>

                            {/* Información Adicional */}
                            <div className="border-t pt-4 mt-6">
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <p><strong>Marca:</strong> {productData.brand?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p><strong>Estado:</strong> {productData.status?.name || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Información Adicional con Tabs */}
                    {hasMoreInformation && (
                        <section className="mt-8" aria-labelledby="informacion-adicional-titulo">
                            <h2 id="informacion-adicional-titulo" className="sr-only">Información adicional del producto</h2>
                            <Tabs id="custom-animation" value={initialTab}>
                                <TabsHeader>
                                   {productData.ecommerceDescription && (
                                    <Tab value="ecommerceDescription">Descripción</Tab>
                                   )}
                                   {productData.productFeatures && productData.productFeatures.length > 0 && (
                                    <Tab value="productFeatures">Características</Tab>
                                   )}
                                   {productData.productDataSheets && productData.productDataSheets.length > 0 && (
                                    <Tab value="productDataSheets">Ficha Técnica</Tab>
                                   )}
                                </TabsHeader>
                                <TabsBody
                                animate={{
                                initial: { y: 250 },
                                mount: { y: 0 },
                                unmount: { y: 250 },
                                }}
                            >
                                {productData.ecommerceDescription && (
                                    <TabPanel key="ecommerceDescription" value="ecommerceDescription">
                                    <div
                                        className="prose description"
                                        dangerouslySetInnerHTML={{ __html: productData.ecommerceDescription || '' }}
                                    />
                                </TabPanel>
                                )}
                                        {productData.productFeatures && productData.productFeatures.length > 0 && (
                                             <TabPanel key="productFeatures" value="productFeatures">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Características</h3>
                                            <div className="space-y-2">
                                                {productData.productFeatures.map((feature, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{feature.title}</p>
                                                            <p className="text-gray-600 text-sm">{feature.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabPanel>
                                )}
                                {productData.productDataSheets && productData.productDataSheets.length > 0 && (
                                    <TabPanel key="productDataSheets" value="productDataSheets">
                                        
                                    </TabPanel>
                                )}
                            </TabsBody>
                            </Tabs>
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