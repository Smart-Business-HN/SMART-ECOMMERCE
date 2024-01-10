import { Product } from "@/interfaces/product/product.interface";
import { FormatValues } from "@/utils/number-format";
import { CalculateProductPrice } from "@/utils/product-price";
import { ShareIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function ProductsGrid(props: any) {
    const products: Product[] = props.products;
    const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-icon-vector.jpg";
    return (
        <div className="grid grid-cols-4 gap-4">
            {
                products.map((item: Product, key: number) => {
                    return (
                        <Link prefetch={false} className="h-full" key={key} href={`/shop/${item.subCategory.category.slug}/${item.subCategory.slug}/${item.slug}`}>
                            <div className='h-full w-full mt-2 border rounded-md group hover:shadow-lg relative'>
                                <button className="invisible hastooltip p-1 z-50 rounded-md absolute top-10 right-2 bg-gray-100 hover:bg-gray-300 group-hover:visible transition-all">
                                    <ShoppingBagIcon className="text-gray-500" height={20} width={20}/>
                                </button>
                                <Link className="z-50"  rel="noopener noreferrer" target="_blank" href={`/shop/${item.subCategory.category.slug}/${item.subCategory.slug}/${item.slug}`}>
                                <button className="invisible hastooltip p-1 z-50 rounded-md absolute top-20 right-2 bg-gray-100 hover:bg-gray-300 group-hover:visible transition-all">
                                    <ShareIcon className="text-gray-500" height={20} width={20}/>
                                </button>
                                </Link>
                                <span className="absolute right-2 top-2 rounded-md text-xs text-white bg-green-500 py-1 px-2">{item.status.name}</span>
                                <div className='p-4 col-span-1 overflow-hidden h-[200px] flex justify-center items-center object-contain'>
                                    <Image loading="lazy" src={item?.productImages.length == 0 ? noImage : item?.productImages[0].url} alt={item.name} width={160} height={160} />
                                </div>
                                <div className='col-span-2 px-2'>
                                    <h6 className=' font-medium  line-clamp-2 text-center text-ellipsis text-sm text-[#2e2e2e]'>{item.name}</h6>
                                    <div className='w-[90%] mx-auto absolute bottom-9 border-b border-gray-200 mt-1'></div>
                                </div>
                                <div className='h-8'></div>
                                <div className=' bg-[#0068E1] px-1 py-2 absolute bottom-[10px] rounded-r-full'></div>
                                <div className='font-semibold absolute bottom-2 left-4 text-center text-sm text-[#1C68E1]'>
                                    {FormatValues(CalculateProductPrice(item.costPrice))}
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
}