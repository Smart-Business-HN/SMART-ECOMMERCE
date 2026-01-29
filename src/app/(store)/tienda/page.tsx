import { Metadata } from "next";
import { getProductsEcommerce } from "@/services/products.service";
import StoreClient from "@/components/store/store-client.component";

export const metadata: Metadata = {
    title: 'Tienda Online | Catálogo Completo de Productos | SMART Business',
    description: 'Explora nuestro catálogo completo de productos tecnológicos: switches, routers, cámaras CCTV, fibra óptica, equipos Ubiquiti, Hikvision y más. Envíos a todo Honduras.',
    keywords: [
        'tienda online Honduras',
        'productos tecnológicos',
        'catálogo equipos de red',
        'comprar switches Honduras',
        'cámaras CCTV Honduras',
        'fibra óptica venta',
        'Ubiquiti Honduras',
        'Hikvision Honduras'
    ],
    alternates: {
        canonical: 'https://www.smartbusiness.site/tienda'
    },
    openGraph: {
        title: 'Tienda Online | Catálogo Completo | SMART Business',
        description: 'Catálogo completo de productos tecnológicos en Honduras',
        url: 'https://www.smartbusiness.site/tienda',
    }
};

export default async function Store({ searchParams }: { searchParams: Promise<{ page?: string; pageSize?: string }> }) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;

    let products: any[] = [];
    let totalPages = 0;
    let totalCount = 0;

    try {
        const response = await getProductsEcommerce(
            page,
            pageSize,
            "",
            undefined,
            undefined,
            false,
            false,
            undefined
        );

        if (response.succeeded) {
            products = response.data;
            totalPages = Math.ceil(response.totalItems / response.pageSize);
            totalCount = response.totalItems;
        }
    } catch (error) {
        console.error('Error fetching products on server:', error);
    }

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Store",
                        "name": "SMART BUSINESS - Tienda",
                        "description": "Tienda especializada en cableado estructurado, sistemas CCTV, fibra óptica y equipos de red",
                        "url": "https://smartbusiness.site/tienda",
                        "mainEntity": {
                            "@type": "Organization",
                            "name": "SMART BUSINESS S. DE R.L.",
                            "url": "https://smartbusiness.site",
                            "description": "Empresa especializada en soluciones tecnológicas y equipos de infraestructura",
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "telephone": "+504-8818-7765",
                                "email": "consultas@smartbusiness.site",
                                "contactType": "customer service",
                                "availableLanguage": "Spanish"
                            },
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "HN",
                                "addressRegion": "Honduras"
                            }
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
                                }
                            ]
                        },
                        "category": "Electronics Store",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Productos Tecnológicos",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Offer",
                                        "name": "Cableado Estructurado",
                                        "description": "Soluciones de cableado estructurado para redes de datos"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Offer",
                                        "name": "Sistemas CCTV",
                                        "description": "Sistemas de videovigilancia y seguridad"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Offer",
                                        "name": "Fibra Óptica",
                                        "description": "Equipos y soluciones de fibra óptica"
                                    }
                                }
                            ]
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "SMART BUSINESS S. DE R.L.",
                            "url": "https://smartbusiness.site"
                        }
                    })
                }}
            />

            <StoreClient
                initialProducts={products}
                initialTotalPages={totalPages}
                initialTotalCount={totalCount}
                initialPage={page}
                initialPageSize={pageSize}
            />
        </>
    );
}
