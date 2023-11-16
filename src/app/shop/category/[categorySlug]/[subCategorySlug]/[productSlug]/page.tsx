'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
import { getProductBySlug } from '@/services/product/product.service';
import ImageGallery from "react-image-gallery";
import Link from 'next/link';
import { Product } from '@/interfaces/product/product.interface';
import { CalculateProductPrice } from '@/utils/product-price';
import { FormatValues } from '@/utils/number-format';
import ProductsWithSameCategory from '@/components/shop/products-page/products-with-same-category';
import RelatedProducts from '@/components/shop/products-page/related-products';
import InformationProductTabs from '@/components/shop/products-page/information-product-tabs';
import Image from 'next/image';
export interface ImageGalleryItem {
  original: string,
  thumbnail?: string
};

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity]= useState<number>(1);
  const [productImages, setProductImages] = useState<any[]>([]);
  const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-icon-vector.jpg";
  const params = useParams();
  const itIsLogged: boolean = true;
  const whatsappContact: string = 'https://api.whatsapp.com/send?phone=50488187765&text=Hola%20me%20interesa%20saber%20mas%20sobre%20este%20producto...';
  const loadProduct = async (slug: string) => {
    const productFromApi: any = await getProductBySlug(slug);
    if (productFromApi.succeeded) {
      setProduct(productFromApi.data)
      addImagesToGallery(productFromApi.data)
    }
    else {
      toast.error(productFromApi.Message, {
        position: 'top-right',
        className: 'text-xs mt-10'
      })
    }
  }

  function addImagesToGallery(product: Product) {
    let images: ImageGalleryItem[] = [];
    if (product.productImages.length > 0) {
      product.productImages.forEach(element => {
        images.push({ original: element.url, thumbnail: element.url });
      });
    }
    else {
      images.push({ original: noImage, thumbnail: noImage })
    }

    setProductImages(images);
  }

  useEffect(() => {
    loadProduct(params.productSlug.toString())
  }, [])
  return (
    <>
      <Toaster />
      <div className='w-full'>
        <div className='mx-auto container max-w-7xl  items-center  py-5'>
          <div className='container justify-between'>
            <div className='flex gap-1 items-center text-sm text-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <Link href='/'><h6>Home</h6></Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              <Link href='/shop'><h6>Tienda</h6></Link>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              {
                product != null ? <>
                  <Link href={`/shop/category/${product.subCategory.category.slug}`}><h6>{product.subCategory.category.name}</h6></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  <Link href={`/shop/category/${product.subCategory.category.slug}/${product.subCategory.slug}`}><h6>{product.subCategory.name}</h6></Link>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  <h6 className='text-gray-300'>{product.name}</h6>
                </> : null
              }
            </div>
            <div className='grid mt-2 grid-cols-7 gap-4'>
              <div className='col-span-6'>
                <div className='w-full gap-4 grid grid-cols-2'>
                  <div className='col-span-1 '>
                    <ImageGallery
                      items={productImages}
                      infinite={true}
                      showNav={false}
                      thumbnailPosition='left'
                      showFullscreenButton={true}
                      showPlayButton={false}
                    />
                  </div>
                  <div className='col-span-1 p-5'>
                    {
                      product != null ? <>
                        <h1 className='text-2xl text-black font-semibold'>{product.name}</h1>
                        <span className='bg-green-400 text-xs text-white px-2 py-1 rounded-md'>{product.status.name}</span>
                        <p className='text-md text-gray-600 mt-4'>{product.description}</p>
                        <div className='border-t mt-2 mb-2 w-full'></div>
                        <div className='flex justify-between items-center'>
                          <p className='text-xl font-semibold my-2 text-[#1C68E1]'>{FormatValues(CalculateProductPrice(product.costPrice))}</p>
                          {itIsLogged ?
                            <div className='flex gap-2 justify-items-center'>
                              <div className="h-8 w-24">
                                <div className="flex flex-row h-9 w-full rounded-lg relative bg-transparent">
                                  <button data-action="decrement" className="bg-[#F6F6F8] text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                    <span className="m-auto text-2xl font-thin">−</span>
                                  </button>
                                  <input className="focus:outline-none text-center w-full bg-[#F6F6F8] font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={quantity}></input>
                                  <button data-action="increment" className=" bg-[#F6F6F8] hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                    <span className="m-auto text-2xl font-thin">+</span>
                                  </button>
                                </div>
                              </div>
                              <button className='hover:bg-[#338CFF] bg-[#006fff] p-2 text-white rounded-md text-sm'>Añadir al carrito</button>
                            </div>
                            : null
                          }
                        </div>
                        <div className='border-t my-2 w-full'></div>
                        <div className='flex text-sm gap-2'>
                          <p className='font-semibold'>SKU:</p>
                          <p>{product.code}</p>
                        </div>
                        <div className='flex text-sm gap-2'>
                          <p className='font-semibold'>Categoria:</p>
                          <p className='text-[#1D62E7]'>{product.subCategory.category.name}</p>
                        </div>
                        <div className='flex text-sm gap-2'>
                          <p className='font-semibold'>Marca:</p>
                          <p className='text-[#1D62E7]'>{product.brand.name}</p>
                        </div>
                        <div className='flex text-sm gap-2'>
                          <p className='font-semibold'>Compartir:</p>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                      </> : null
                    }
                  </div>
                </div>
              </div>
              <div className='bg-gradient-to-b from-blue-100 via-sky-100 to-blue-300 col-span-1 p-4 '>
                <div className='relative h-full'>
                  <h4 className='font-semibold text-gray-700 text-xl text-center'>¿Eres tecnico instalador?</h4>
                  <p className='text-sm text-center mt-2'>Opta por descuentos exclusivos</p>
                  <div className='flex justify-center mt-2'>
                    <Image height={150} width={150} src='/assets/images/products/u6-pro-smartbusiness-box.png' alt='u6 pro en caja' />
                  </div>
                  <div className='w-full mx-auto text-center absolute bottom-4'>
                    <Link href='/be-a-partner' className='bg-blue-600 text-white text-sm p-2 rounded-br-xl hover:shadow-md rounded-tl-xl'>
                      Hazte Smart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-8 mt-10 gap-10 '>
              <div className='col-span-2'>
                <ProductsWithSameCategory categorySlug={params.categorySlug.toString()} productSlug={params.productSlug} />
              </div>
              <div className='col-span-6 bg-white'>
                {product != null ? <InformationProductTabs productDataSheets={product.productDataSheets} productFeatures={product.productFeatures} /> : null}
                <RelatedProducts subCategorySlug={params.subCategorySlug} productSlug={params.productSlug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
