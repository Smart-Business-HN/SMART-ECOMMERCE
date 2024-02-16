"use client"
import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { Product } from '@/interfaces/product/product.interface'
import { GetAllProductsForNavbar } from '@/services/product/product.service'
import Image from 'next/image'
import Link from 'next/link'

function Searcher() {
    const [selectedProduct, setSelectedPerson] = useState<null | Product>(null)
    const [query, setQuery] = useState('')
    const [products, setProducts] = useState<Product[]>([]);
    const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-icon-vector.jpg";
    async function loadProducts() {
        try {
            const response: any = await GetAllProductsForNavbar();
            const serializeResponse: Product[] = response.data;
            setProducts(serializeResponse);
        } catch (error: any) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadProducts();
    }, [])
    const filteredProducts =
        query === ''
            ? products
            : products.filter((product) => {
                return product.name.toLowerCase().includes(query.toLowerCase()) || product.description?.toLowerCase().includes(query.toLowerCase());
            })
    return (
        <div className='flex relative'>
            <Combobox value={selectedProduct} onChange={setSelectedPerson}>
                <Combobox.Input className="w-full h-full px-5 py-2 rounded-md font-medium focus:border-blue-600" placeholder='Buscar tus productos aqui...' onChange={(event) => setQuery(event.target.value)} />
                <Combobox.Options className="absolute top-11 w-full shadow-lg">
                    {filteredProducts.map((product, key) => {
                        if (key < 5) {
                            return (
                                <Combobox.Option className='bg-white px-5 py-1 first:rounded-t-xl first:pt-4 last:rounded-b-xl last:pb-4' key={key} value={product}>
                                    <Link href={`/shop/${product.subCategory.category.slug}/${product.subCategory.slug}/${product.slug}`} className='grid grid-cols-12'>
                                        <Image className='col-span-1' height={50} width={50} src={product?.productImages.length == 0 ? noImage : product?.productImages[0].url} alt={product.name} />
                                        <div className=' col-span-4'>
                                            <h6 className='font-semibold text-left text-sm'>{product.name}</h6>
                                            <p className='text-xs'>{product.description}</p>
                                        </div>
                                    </Link>
                                </Combobox.Option>
                            )
                        }
                    })}
                </Combobox.Options>
            </Combobox>
        </div>
    )
}

export default Searcher