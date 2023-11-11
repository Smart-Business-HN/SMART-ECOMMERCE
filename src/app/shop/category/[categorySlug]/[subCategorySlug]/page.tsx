'use client'
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Listbox } from '@headlessui/react'
import CategoryTree from '@/components/shop/layout/category-tree-menu'
import { ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { useRouter, usePathname, useSearchParams, useParams } from 'next/navigation'
import { GetAllNavCategory } from '@/services/category/category.service'
import { NavCategory } from '@/interfaces/category/nav-category.interface'
import { getProductByCategorySlug, getProductBySubCategorySlug } from '@/services/product/product.service'
import { Product } from '@/interfaces/product/product.interface'
import ProductsGrid from '@/components/shop/layout/products-grid'
import ProductsList from '@/components/shop/layout/products-list'

const pageSizes = [
    { size: 20 },
    { size: 40 },
    { size: 60 }
];

export default function Subcategory() {
    const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);
    const [navCategories, setNavCategories] = useState<NavCategory[] | null>(null);
    const [showInGrid, setShowInGrid] = useState(true);
    const [products, setProducts] = useState<Product[] | null>(null);
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
    function GoNextPage() {
        if (searchParams.has('PageSize')) {
            let nextPage: string = (parseInt(searchParams.get('PageNumber')!) + 1).toString();
            router.push(pathname + '?' + createQueryString('PageNumber', nextPage))
        }
        else {
            router.push(pathname + '?' + createQueryString('PageNumber', "2"))
        }
    }
    function GoPreviousPage() {
        if (searchParams.has('PageSize')) {
            if (parseInt(searchParams.get('PageNumber')!) > 1) {
                let nextPage: string = (parseInt(searchParams.get('PageNumber')!) - 1).toString();
                router.push(pathname + '?' + createQueryString('PageNumber', nextPage))
            }
        }
        else {
            router.push(pathname + '?' + createQueryString('PageNumber', "2"))
        }
    }
    const loadProducts = async () => {
        let paramss = {
            pageSize: selectedPageSize.size,
            pageNumber: 0,
            parameter: ''
        }
        const producsResponse: any = await getProductBySubCategorySlug(params.subCategorySlug.toString(), paramss);
        setProducts(producsResponse.data);
    }
    const loadCategories = async () => {
        const nav: any = await GetAllNavCategory();
        setNavCategories(nav);
    }

    useEffect(() => {
        router.push(pathname + '?' + createQueryString('PageSize', selectedPageSize.size.toString()))
    }, [selectedPageSize])

    useEffect(() => {
        if (!searchParams.has('PageNumber')) {
            router.push(pathname + '?' + createQueryString('PageNumber', '1'))
        }
        if (searchParams.has('PageSize')) {
            let pageSize = pageSizes.find(x => x.size.toString() == searchParams.get('PageSize'));
            setSelectedPageSize(pageSize!)
        }
        loadCategories();
        loadProducts();
    }, [])

    return (
        <div className='w-full mx-auto max-w-7xl py-5 container'>
            <div className='flex items-center gap-1 text-sm text-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <Link href='/'><h6>Home</h6></Link>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                <Link href='/shop'><h6 className='text-gray-300'>Tienda</h6></Link>
            </div>
            <div className='w-full grid gap-5 pt-5 grid-cols-4'>
                <div className='col-span-1  '>
                    {
                        navCategories != null ? <CategoryTree categories={navCategories} /> : null
                    }
                </div>
                <div className='col-span-3 '>
                <div className='flex p-10 bg-gray-400 mb-2'>
                    </div>
                    <div className='flex justify-between'>
                        <h1 className='text-gray-400 font-semibold text-3xl'>Tienda</h1>
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
                            <button onClick={() => { GoPreviousPage() }} className='text-gray-400 rounded-md hover:bg-gray-100 hover:text-[#0068E1]'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                            {/* klsdkafjsdj */}
                            <button className='text-gray-400 px-2 rounded-md hover:bg-gray-100 hover:text-[#0068E1]'>1</button>
                            <button onClick={() => { GoNextPage() }} className='text-gray-400 rounded-md hover:bg-gray-100 hover:text-[#0068E1]'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
