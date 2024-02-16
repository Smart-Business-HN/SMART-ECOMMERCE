import toast from 'react-hot-toast';
import { Product } from "@/interfaces/product/product.interface";
import Link from 'next/link';
import { FormatValues } from '@/utils/number-format';
import { CalculateProductPrice } from '@/utils/product-price';
import { getProductBySameSubCategorySlug } from '@/services/product/product.service';
import Image from 'next/image';

export default async function RelatedProducts(props:any) {
    let products: any[] = [];
    const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-icon-vector.jpg";

        const productFromApi: any = await getProductBySameSubCategorySlug(props.subCategorySlug,props.productSlug);
        if (productFromApi.succeeded) {
         products = productFromApi.data;
        }
        else {
          toast.error(productFromApi.Message, {
            position: 'top-right',
            className: 'text-xs mt-10'
          })
        }
      
    return (
        <>
        <h2 className='font-semibold text-gray-900 text-md'>Productos relacionados</h2>
        <hr className='w-[10%] -mb-1 border-[#1C68E1] border'></hr>
        <hr className='mt-1'></hr>
        <div className='container flex gap-5'>
            {
                products != null ? products.map((item:any,key:number)=>{
                    return(
                        <div key={key} className='w-full mt-2 border hover:shadow-2xl relative'>
                            <div className='p-4 col-span-1 overflow-hidden h-[200px] flex justify-center items-center object-contain'>
                                <Image src={item?.productImages.length == 0 ? noImage :item?.productImages[0].url} alt={item.name} width={160} height={160} />
                            </div>
                            <div className='col-span-2 px-2'>
                                <Link href={`/shop/${item.subcategory.category.slug}/${item.subcategory.slug}/${item.slug}`}>
                                    <h6 className=' font-medium  line-clamp-2 text-center text-ellipsis text-sm text-[#2e2e2e]'>{item.name}</h6>
                                </Link>
                                <div className='w-full border-b border-gray-200 mt-1'></div>
                                
                            </div>
                            <div className='h-8'></div>
                            <div className=' bg-[#0068E1] px-1 py-2 absolute bottom-[10px] rounded-r-full'></div>
                            <div className='font-semibold absolute bottom-2 left-4 text-center text-sm text-[#1C68E1]'>
                                 {FormatValues(CalculateProductPrice(item.costPrice))}
                            </div>
                        </div>
                    )
                }) :null
            }
        </div>
        </>
    )
}