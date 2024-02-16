'use client'
import { ProductsResponse } from "@/interfaces/http-responses/http-responses.interface";
import { GetAllProducts } from "@/services/product/product.service";
import { Listbox } from "@headlessui/react"
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline"
import { useCallback, useEffect, useState } from "react";
import ProductsGrid from "./layout/products-grid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/interfaces/product/product.interface";
import ProductsList from "./layout/products-list";

export function ProductsShop() {
    const pageSizes = [
        { size: 20 },
        { size: 40 },
        { size: 60 }
    ];
    const [selectedPageSize, setSelectedPageSize] = useState(pageSizes[0]);
    const [showInGrid, setShowInGrid] = useState(true);
    const [products, setProducts] = useState<Product[] | null>(null);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [arrayPages, setArrayPages] = useState([1]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [pages, setPages] = useState<number[]>([1]);
    useEffect(()=>{
        setArrayPages(Array.from(Array(pages).keys()));
    },[totalPages])
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams)
            params.set(name, value)
            return params.toString()
        },
        [searchParams]
    );
    function GoNextPage() {
        if (searchParams.has('PageNumber')) {
            let nextPage: string = (parseInt(searchParams.get('PageNumber')!) + 1).toString();
            debugger
            router.push(pathname + '?' + createQueryString('PageNumber', nextPage))
            loadProducts();
        }
        else {
            router.push(pathname + '?' + createQueryString('PageNumber', "2"))
            loadProducts();
        }
        
    }
    function GoPreviousPage() {
        if (searchParams.has('PageNumber')) {
            if (parseInt(searchParams.get('PageNumber')!) > 1) {
                let nextPage: string = (parseInt(searchParams.get('PageNumber')!) - 1).toString();
                debugger
                router.push(pathname + '?' + createQueryString('PageNumber', nextPage))
                loadProducts();
            }
        }
        else {
            router.push(pathname + '?' + createQueryString('PageNumber', "2"))
            loadProducts();
        }
    }
    const loadProducts = async () => {
        let params: any = {
            pageSize: selectedPageSize.size,
            pageNumber: searchParams.has('PageNumber') ? searchParams.get('PageNumber') : 1,
            parameter: ''
        };
        try {
            const producsResponse: any = await GetAllProducts(params);
            let serializeResponse: ProductsResponse = producsResponse;
            setProducts(serializeResponse.data);
            setTotalItems(serializeResponse.totalItems);
        } catch (error: any) {
            console.log(error);
        }
    }
    useEffect(() => {
        let pages: number = Math.round(totalItems / selectedPageSize.size);
        setTotalPages(pages);
    }, [totalItems])
    useEffect(() => {
        router.push(pathname + '?' + createQueryString('PageSize', selectedPageSize.size.toString()))
    }, [selectedPageSize]);

    useEffect(() => {
        if (!searchParams.has('PageNumber')) {
            router.push(pathname + '?' + createQueryString('PageNumber', '1'))
        }
        if (searchParams.has('PageSize')) {
            let pageSize = pageSizes.find(x => x.size.toString() == searchParams.get('PageSize'));
            setSelectedPageSize(pageSize!)
        }
        loadProducts();
    }, []);
    return (
        <div className='col-span-3'>
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
                                        className='text-xs text-gray-700 py-1 bg-white z-50'
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
                    {
                    }
                    <button className='text-gray-400 px-2 py-1 border flex items-center justify-center rounded-md hover:bg-gray-100 hover:text-[#0068E1]'>1</button>
                    <button onClick={() => { GoNextPage() }} className='text-gray-400 rounded-md hover:bg-gray-100 hover:text-[#0068E1]'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}