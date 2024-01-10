'use client'
import toast from 'react-hot-toast';
import { Product } from "@/interfaces/product/product.interface";
import { useEffect, useState } from "react";
import { getProductBySameCategorySlug } from '@/services/product/product.service';
import Link from 'next/link';
import { FormatValues } from '@/utils/number-format';
import { CalculateProductPrice } from '@/utils/product-price';
import Image from 'next/image';

export default function ProductsWithSameCategory(props:any) {
    const [products, setProducts] = useState<Product[]|null>(null);
    const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-icon-vector.jpg";
    const loadProducts = async (categorySlug: string,productSlug:string) => {
        const productFromApi: any = await getProductBySameCategorySlug(categorySlug,productSlug);
        if (productFromApi.succeeded) {
          setProducts(productFromApi.data)
        }
        else {
          toast.error(productFromApi.Message, {
            position: 'top-right',
            className: 'text-xs mt-10'
          })
        }
      }
    useEffect(()=>{
        loadProducts(props.categorySlug,props.productSlug)
    },[]);
    return (
        <>
        <h2 className='font-semibold text-gray-900 text-md'>Quiza tambien te interese</h2>
        <hr className='w-[20%] -mb-1 border-[#1C68E1] border'></hr>
        <hr className='mt-1'></hr>
        <div className='container '>
            {
                products != null ? products.map((item:any,key:number)=>{
                    return(
                        <div key={key} className='w-full grid grid-cols-3 mt-2 border '>
                            <div className='h-[100px] w-[100px] col-span-1 overflow-hidden flex justify-center items-center object-contain	'>
                                <Image className='contain' src={item?.productImages.length == 0 ? noImage :item?.productImages[0].url} alt={item.name} width={100} height={100} />
                            </div>
                            <div className='col-span-2 pt-2 pl-2'>
                                <Link href={`/shop/${item.subcategory.category.slug}/${item.subcategory.slug}/${item.slug}`}>
                                    <h6 className=' font-medium line-clamp-2 text-sm text-[#191919]'>{item.name}</h6>
                                </Link>
                                <div className='font-semibold my-2 text-[#1C68E1]'>
                                 {FormatValues(CalculateProductPrice(item.costPrice))}
                                </div>
                            </div>
                        </div>
                    )
                }) :null
            }
        </div>
        </>
    )
}