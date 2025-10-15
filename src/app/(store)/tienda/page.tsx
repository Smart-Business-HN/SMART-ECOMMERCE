// @ts-nocheck
'use client';
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Select, Option, Button, ButtonGroup } from "@/utils/MTailwind";
import { useState, useEffect } from "react";
import { getProductsEcommerce } from "@/services/products.service";
import { ProductDto } from "@/interfaces/product/product.interface";
import ProductsGrid from "@/components/store/products-grid.component";
import ProductsList from "@/components/store/products-list.component";
import Pagination from "@/components/store/pagination.component";

export default function Store() {
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
            const response = await getProductsEcommerce(
                page, // El backend usa base 0
                pageSize,
                "", // parameter
                undefined, // order
                undefined, // column
                false, // all
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
                console.error('Error loading products:', response.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts(1);
    }, [pageSize]);

    const handlePageChange = (page: number) => {
        loadProducts(page);
    };

    const handlePageSizeChange = (newPageSize: string | undefined) => {
        if (newPageSize) {
            setPageSize(parseInt(newPageSize));
        }
    };

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

            <main className='col-span-4 md:col-span-3' role="main" aria-labelledby="tienda-titulo">
                <header className='flex flex-col md:flex-row justify-between items-center mb-6'>
                    <h1 id="tienda-titulo" className='text-gray-400 font-semibold md:text-3xl text-4xl grow'>
                        Tienda
                    </h1>
                    <div className='flex gap-2 items-center mt-2 md:mt-0' role="group" aria-label="Controles de visualización y paginación">
                        <ButtonGroup color='gray' variant='outlined' size='sm' ripple={true}>
                            <Button 
                                className={showInGrid ? 'text-[#0068E1] border-blue-500' : 'text-gray-400 border-gray-400'} 
                                onClick={() => { setShowInGrid(true) }}
                                aria-label="Ver productos en cuadrícula"
                                aria-pressed={showInGrid}
                            >
                                <Squares2X2Icon height={20} width={20} />
                            </Button>
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

                <section aria-labelledby="productos-titulo">
                    <h2 id="productos-titulo" className="sr-only">Catálogo de Productos</h2>
                    
                    {loading ? (
                        <div className="flex justify-center items-center h-64" role="status" aria-live="polite">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Cargando productos"></div>
                        </div>
                    ) : (
                        <>
                            {products.length > 0 ? (
                                <>
                                    <div role="region" aria-label={`Mostrando ${products.length} productos de ${totalCount} total`}>
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
                                    <p className="text-gray-500 text-lg">No se encontraron productos</p>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </main>
        </>
    );
}