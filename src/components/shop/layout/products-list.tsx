import { Product } from "@/interfaces/product/product.interface";
import { FormatValues } from "@/utils/number-format";
import { CalculateProductPrice } from "@/utils/product-price";
import Image from "next/image";
import Link from "next/link";

export default function ProductsList(props: any) {
    const products: Product[] = props.products;
    const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-icon-vector.jpg";
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                products.map((item: Product, key: number) => {
                    return (
                        <Link prefetch={false} key={key} href={`/shop/${item.subCategory.category.slug}/${item.subCategory.slug}/${item.slug}`}>
                            <div className='mt-2 border rounded-md hover:shadow-lg grid grid-cols-3 gap-5 relative'>
                                <span className="absolute right-2 top-2 rounded-md text-xs text-white bg-green-500 py-1 px-2">{item.status.name}</span>
                                <div className='p-4 col-span-1 overflow-hidden h-[200px] flex justify-center items-center object-contain'>
                                    <Image loading="lazy" src={item?.productImages.length == 0 ? noImage : item?.productImages[0].url} alt={item.name} width={160} height={160} />
                                </div>
                                <div className='col-span-2 mt-7 relative px-2'>
                                    <h6 className=' font-medium  line-clamp-2 text-ellipsis text-[#2e2e2e]'>{item.name}</h6>
                                    <p className="text-sm line-clamp-3 text-gray-500">{item.description}</p>
                                    <div className='w-full border-b border-gray-200 mt-1'></div>
                                    <div className='font-semibold text-left flex gap-2 text-[#1C68E1]'>
                                    <div className=' bg-[#0068E1] px-1 max-h-4 mt-1 rounded-r-full'></div>
                                        {FormatValues(item.recomendedSalePrice)}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}