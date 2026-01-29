import { getProductsByCategorySlug } from "@/services/products.service";
import { slugToTitle } from "@/utils/string.utils";
import CategoryClient from "@/components/store/category-client.component";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
    searchParams: Promise<{ page?: string; pageSize?: string }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const { category } = await params;
    const query = await searchParams;
    const page = Number(query.page) || 1;
    const pageSize = Number(query.pageSize) || 20;
    const categoryTitle = slugToTitle(category);

    let products: any[] = [];
    let totalPages = 0;
    let totalCount = 0;

    try {
        const response = await getProductsByCategorySlug(
            category,
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
        console.error('Error fetching products by category:', error);
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
                        "name": `${categoryTitle} - SMART BUSINESS`,
                        "description": `Productos de ${categoryTitle.toLowerCase()} para soluciones tecnológicas`,
                        "url": `https://smartbusiness.site/tienda/${category}`,
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
                                }
                            ]
                        },
                        "category": "Electronics Store",
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": `Productos de ${categoryTitle}`,
                            "itemListElement": products.map((product) => ({
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "offer",
                                    "name": product.name,
                                    "description": product.description || `Producto de ${categoryTitle.toLowerCase()}`,
                                    "url": `https://smartbusiness.site/tienda/${category}/${product.subCategory?.slug}/${product.slug}`,
                                    "image": product.productImages && product.productImages.length > 0 ? product.productImages[0].url : undefined,
                                    "category": categoryTitle
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

            <CategoryClient
                categorySlug={category}
                categoryTitle={categoryTitle}
                initialProducts={products}
                initialTotalPages={totalPages}
                initialTotalCount={totalCount}
                initialPage={page}
                initialPageSize={pageSize}
            />
        </>
    );
}
