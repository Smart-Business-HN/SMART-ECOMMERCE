// @ts-nocheck
'use client';
import { ListBulletIcon } from "@heroicons/react/24/outline";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import { Select, Option, Button, ButtonGroup } from "@/utils/MTailwind";
import { useState } from "react";
import { getProductsBySubCategorySlug } from "@/services/products.service";
import { ProductDto } from "@/interfaces/product/product.interface";
import ProductsGrid from "@/components/store/products-grid.component";
import ProductsList from "@/components/store/products-list.component";
import Pagination from "@/components/store/pagination.component";

interface SubcategoryClientProps {
    subcategorySlug: string;
    categoryTitle: string;
    subcategoryTitle: string;
    initialProducts: ProductDto[];
    initialTotalPages: number;
    initialTotalCount: number;
    initialPage: number;
    initialPageSize: number;
}

export default function SubcategoryClient({
    subcategorySlug,
    categoryTitle,
    subcategoryTitle,
    initialProducts,
    initialTotalPages,
    initialTotalCount,
    initialPage,
    initialPageSize,
}: SubcategoryClientProps) {
    const [showInGrid, setShowInGrid] = useState(true);
    const [products, setProducts] = useState<ProductDto[]>(initialProducts);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [totalCount, setTotalCount] = useState(initialTotalCount);

    const loadProducts = async (page: number = 1, newPageSize?: number) => {
        setLoading(true);
        try {
            const response = await getProductsBySubCategorySlug(
                subcategorySlug,
                page,
                newPageSize ?? pageSize,
                "",
                undefined,
                undefined,
                false,
                undefined
            );

            if (response.succeeded) {
                setProducts(response.data);
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

    const handlePageChange = (page: number) => {
        loadProducts(page);
    };

    const handlePageSizeChange = (newPageSize: string | undefined) => {
        if (newPageSize) {
            const parsed = parseInt(newPageSize);
            setPageSize(parsed);
            loadProducts(1, parsed);
        }
    };

    return (
        <main className='col-span-4 md:col-span-3' role="main" aria-labelledby="subcategoria-titulo">
            <header className='flex flex-col md:flex-row justify-between items-center mb-6'>
                <h1 id="subcategoria-titulo" className='text-gray-400 font-semibold text-4xl grow'>
                    {subcategoryTitle}
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
    );
}
