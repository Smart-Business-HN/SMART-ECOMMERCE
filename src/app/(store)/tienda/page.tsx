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
                console.log('Products response:', response);
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
        <div className='col-span-4 md:col-span-3'>
            <div className='flex justify-between'>
                <h1 className='text-gray-400 font-semibold md:text-3xl text-2xl grow'>Tienda</h1>
                <div className='md:flex gap-2 items-center hidden'>
                    <ButtonGroup color='gray' variant='outlined' size='sm' ripple={true}>
                        <Button 
                            className={showInGrid ? 'text-[#0068E1] border-blue-500' : 'text-gray-400 border-gray-400'} 
                            onClick={() => { setShowInGrid(true) }}
                        >
                            <Squares2X2Icon height={20} width={20} />
                        </Button>
                        <Button 
                            className={!showInGrid ? 'text-[#0068E1] border-blue-500' : 'text-gray-400 border-gray-400'} 
                            onClick={() => { setShowInGrid(false) }}
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
                        >
                            <Option value='10'>10</Option>
                            <Option value='20'>20</Option>
                            <Option value='30'>30</Option>
                            <Option value='40'>40</Option>
                            <Option value='50'>50</Option>
                        </Select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <>
                    {products.length > 0 ? (
                        <>
                            {showInGrid ? (
                                <ProductsGrid products={products} />
                            ) : (
                                <ProductsList products={products} />
                            )}
                            
                            <Pagination 
                                
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No se encontraron productos</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}