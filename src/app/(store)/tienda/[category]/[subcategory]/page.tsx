'use client';
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Select, Option, Button, ButtonGroup } from "@/utils/MTailwind";
import { useState, useEffect } from "react";
import { use } from "react";
import { getProductsBySubCategorySlug } from "@/services/products.service";
import { ProductDto } from "@/interfaces/product/product.interface";
import ProductsGrid from "@/components/store/products-grid.component";
import ProductsList from "@/components/store/products-list.component";
import Pagination from "@/components/store/pagination.component";
import { slugToTitle } from "@/utils/string.utils";

interface SubCategoryPageProps {
    params: Promise<{ category: string; subcategory: string }>;
}

export default function SubCategoryPage({ params }: SubCategoryPageProps) {
    const { category, subcategory } = use(params);
    const [showInGrid, setShowInGrid] = useState(true);
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const loadProducts = async (page: number = 1) => {
        setLoading(true);
        try {
            const response = await getProductsBySubCategorySlug(
                subcategory,
                page,
                pageSize,
                "", // parameter
                undefined, // order
                undefined, // column
                false, // isUserSignIn
                undefined // customerTypeId
            );

            if (response.succeeded) {
                setProducts(response.data);
                // Calcular totalPages basado en totalItems y pageSize
                const calculatedTotalPages = Math.ceil(response.totalItems / response.pageSize);
                setTotalPages(calculatedTotalPages);
                setTotalCount(response.totalItems);
                setCurrentPage(page);
            } else {
                console.error('Error loading products by subcategory:', response.message);
            }
        } catch (error) {
            console.error('Error fetching products by subcategory:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts(1);
    }, [pageSize, subcategory]);

    const handlePageChange = (page: number) => {
        loadProducts(page);
    };

    const handlePageSizeChange = (newPageSize: string | undefined) => {
        if (newPageSize) {
            setPageSize(parseInt(newPageSize));
        }
    };

    const categoryTitle = slugToTitle(category);
    const subcategoryTitle = slugToTitle(subcategory);

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
                            "itemListElement": products.map((product, index) => ({
                                "@type": "Offer",
                                "itemOffered": {
                                    "@type": "Product",
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

            <main className='col-span-4 md:col-span-3' role="main" aria-labelledby="subcategoria-titulo">
                <header className='flex justify-between items-center mb-6'>
                    <h1 id="subcategoria-titulo" className='text-gray-400 font-semibold text-3xl grow'>
                        {subcategoryTitle}
                    </h1>
                    <div className='flex gap-2 items-center' role="group" aria-label="Controles de visualización y paginación">
                        {/* @ts-expect-error Material Tailwind ButtonGroup type definitions are overly strict; props are correct per docs */}
                        <ButtonGroup color='gray' variant='outlined' size='sm' ripple={true}>
                            {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                            <Button 
                                className={showInGrid ? 'text-[#0068E1] border-blue-500' : 'text-gray-400 border-gray-400'} 
                                onClick={() => { setShowInGrid(true) }}
                                aria-label="Ver productos en cuadrícula"
                                aria-pressed={showInGrid}
                            >
                                <Squares2X2Icon height={20} width={20} />
                            </Button>
                            {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                            <Button 
                                className={!showInGrid ? 'text-[#0068E1] border-blue-500' : 'text-gray-400 border-gray-400'} 
                                onClick={() => { setShowInGrid(false) }}
                                aria-label="Ver productos en lista"
                                aria-pressed={!showInGrid}
                            >
                                <ListBulletIcon height={20} width={20} />
                            </Button>
                        </ButtonGroup>

                        <div className=''>
                            {/* @ts-expect-error Material Tailwind Select type definitions are overly strict; props are correct per docs */}
                            <Select 
                                color='blue' 
                                variant='outlined' 
                                label='Tamaño de página' 
                                placeholder='Tamaño de página'
                                value={pageSize.toString()}
                                onChange={(value) => handlePageSizeChange(value)}
                                aria-label="Seleccionar número de productos por página"
                            >
                                <Option value='10'>10</Option>
                                <Option value='20'>20</Option>
                                <Option value='30'>30</Option>
                                <Option value='40'>40</Option>
                                <Option value='50'>50</Option>
                            </Select>
                        </div>
                    </div>
                </header>

                <section aria-labelledby="productos-subcategoria-titulo">
                    <h2 id="productos-subcategoria-titulo" className="sr-only">Productos de {subcategoryTitle} en {categoryTitle}</h2>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-64" role="status" aria-live="polite">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Cargando productos"></div>
                        </div>
                    ) : (
                        <>
                            {products.length > 0 ? (
                                <>
                                    <div role="region" aria-label={`Mostrando ${products.length} productos de ${subcategoryTitle} en ${categoryTitle} de ${totalCount} total`}>
                                        {showInGrid ? (
                                            <ProductsGrid products={products} />
                                        ) : (
                                            <ProductsList products={products} />
                                        )}
                                    </div>
                                    
                                    <Pagination 
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                </>
                            ) : (
                                <div className="text-center py-12" role="status">
                                    <p className="text-gray-500 text-lg">No se encontraron productos en esta subcategoría</p>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </>
    );
} 