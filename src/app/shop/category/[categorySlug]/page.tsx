'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Listbox } from '@headlessui/react'
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { GetAllNavCategory } from '@/services/category/category.service'
import { NavCategory } from '@/interfaces/category/nav-category.interface'
import { getProductByCategorySlug } from '@/services/product/product.service'
import { Product } from '@/interfaces/product/product.interface'
import ProductsGrid from '@/components/shop/layout/products-grid'
import ProductsList from '@/components/shop/layout/products-list'
import { Pagination } from '@nextui-org/react'
import { ProductsResponse } from '@/interfaces/http-responses/http-responses.interface'

const pageSizes = [
    { size: 20 },
    { size: 40 },
    { size: 60 }
];

export default function Category() {
    const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);
    const [showInGrid, setShowInGrid] = useState(true);
    const [products, setProducts] = useState<Product[] | null>(null);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const paramss = new URLSearchParams(searchParams)
            paramss.set(name, value)

            return paramss.toString()
        },
        [searchParams]
    )
    function updatePageNumber(page: number) {
        router.push(pathname + '?' + createQueryString('PageNumber', page.toString()))
    }
    const loadProducts = async (page: number) => {
        let paramss: any = {
            pageSize: selectedPageSize.size,
            pageNumber: page,
            parameter: ''
        };
        const producsResponse: any = await getProductByCategorySlug(params.categorySlug.toString(), paramss);
        let serializeResponse: ProductsResponse = producsResponse;
        setProducts(serializeResponse.data);
        updatePageNumber(page)
        setTotalItems(serializeResponse.totalItems);
    }
    useEffect(() => {
        router.push(pathname + '?' + createQueryString('PageSize', selectedPageSize.size.toString()))
    }, [selectedPageSize])
    useEffect(() => {
        let pages: number = Math.round(totalItems / selectedPageSize.size);
        setTotalPages(pages);
    }, [totalItems])

    useEffect(() => {
        if (!searchParams.has('PageNumber')) {
            router.push(pathname + '?' + createQueryString('PageNumber', '1'))
        }
        if (searchParams.has('PageSize')) {
            let pageSize = pageSizes.find(x => x.size.toString() == searchParams.get('PageSize'));
            setSelectedPageSize(pageSize!)
        }
        loadProducts(1);
    }, [])

    return (
                <div className='col-span-3 '>
                    <div className='flex p-10 bg-gray-400 mb-2'>

                    </div>
                    <div className='flex justify-between'>
                        {products != null && products.length > 0 ? <h1 className='text-gray-400 font-semibold text-3xl'>{products[0].subCategory.category.name}</h1> : null}
                        <div className='flex gap-2 items-center'>
                            <button className='p-[6px] rounded-md border border-gray-300 hover:shadow-sm' onClick={() => { setShowInGrid(true) }}>
                                <Squares2X2Icon height={20} width={20} className={showInGrid ? 'text-[#0068E1]' : 'text-gray-400'} />
                            </button>
                            <button className='p-[6px] rounded-md border border-gray-300 hover:shadow-sm' onClick={() => { setShowInGrid(false) }}>
                                <ListBulletIcon height={20} width={20} className={!showInGrid ? 'text-[#0068E1]' : 'text-gray-400'} />
                            </button>
                            <div className='parent'>
                                <Listbox value={selectedPageSize} onChange={setSelectedPageSize}>
                                    <Listbox.Button className='border rounded-md border-gray-200  text-xs p-2 flex gap-2'>{selectedPageSize.size} <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                    </Listbox.Button>
                                    <Listbox.Options className='absolute rounded-md border bg-white border-gray-300 w-[60px] pl-2'>
                                        {pageSizes.map((pageSize, key) => (
                                            <Listbox.Option
                                                className='text-xs text-gray-700 py-1 bg-white'
                                                key={key}
                                                value={pageSize}
                                                onClick={() => { setSelectedPageSize(pageSize) }}
                                            >
                                                {pageSize.size}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Listbox>
                            </div>
                        </div>
                    </div>
                    {products != null && showInGrid ? <ProductsGrid products={products} /> : products != null && !showInGrid ? <ProductsList products={products} /> : null}
                    <div className='flex justify-end mt-5'>
                        <div className='flex gap-5 items-center'>
                        <Pagination onChange={(page:number)=>loadProducts(page)} isCompact showControls total={totalPages} page={parseInt(searchParams.get('PageNumber')!)} initialPage={1} />
                        </div>
                    </div>
                </div>
    )
}
