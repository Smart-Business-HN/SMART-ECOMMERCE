export const revalidate = 300; // ISR: revalidar cada 5 minutos

import { getProductsBySubCategorySlug } from "@/services/products.service";
import { slugToTitle } from "@/utils/string.utils";
import SubcategoryClient from "@/components/store/subcategory-client.component";

interface SubCategoryPageProps {
    params: Promise<{ category: string; subcategory: string }>;
    searchParams: Promise<{ page?: string; pageSize?: string }>;
}

export default async function SubCategoryPage({ params, searchParams }: SubCategoryPageProps) {
    const { category, subcategory } = await params;
    const query = await searchParams;
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 20;
    const categoryTitle = slugToTitle(category);
    const subcategoryTitle = slugToTitle(subcategory);

    let products: any[] = [];
    let totalPages = 0;
    let totalCount = 0;

    try {
        const response = await getProductsBySubCategorySlug(
            subcategory,
            page,
            pageSize,
            "",
            undefined,
            undefined,
            false,
            undefined
        );

        if (response.succeeded) {
            products = response.data;
            totalPages = Math.ceil(response.totalItems / response.pageSize);
            totalCount = response.totalItems;
        }
    } catch (error) {
        console.error('Error fetching products by subcategory:', error);
    }

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "name": `${subcategoryTitle} - ${categoryTitle} - SMART BUSINESS`,
                        "description": `Productos de ${subcategoryTitle.toLowerCase()} en ${categoryTitle.toLowerCase()} para soluciones tecnológicas`,
                        "url": `https://smartbusiness.site/tienda/${category}/${subcategory}`,
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
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 3,
                                    "name": categoryTitle,
                                    "item": `https://smartbusiness.site/tienda/${category}`
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 4,
                                    "name": subcategoryTitle,
                                    "item": `https://smartbusiness.site/tienda/${category}/${subcategory}`
                                }
                            ]
                        },
                        "category": "Electronics Store",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": `Productos de ${subcategoryTitle} en ${categoryTitle}`,
                            "itemListElement": products.map((product) => ({
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "offer",
                                    "name": product.name,
                                    "description": product.description || `Producto de ${subcategoryTitle.toLowerCase()} en ${categoryTitle.toLowerCase()}`,
                                    "url": `https://smartbusiness.site/tienda/${category}/${subcategory}/${product.slug}`,
                                    "image": product.productImages && product.productImages.length > 0 ? product.productImages[0].url : undefined,
                                    "category": subcategoryTitle,
                                    "additionalProperty": {
                                        "@type": "PropertyValue",
                                        "name": "Categoría Principal",
                                        "value": categoryTitle
                                    }
                                }
                            }))
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "SMART BUSINESS S. DE R.L.",
                            "url": "https://smartbusiness.site"
                        }
                    })
                }}
            />

            <SubcategoryClient
                subcategorySlug={subcategory}
                categoryTitle={categoryTitle}
                subcategoryTitle={subcategoryTitle}
                initialProducts={products}
                initialTotalPages={totalPages}
                initialTotalCount={totalCount}
                initialPage={page}
                initialPageSize={pageSize}
            />
        </>
    );
}
