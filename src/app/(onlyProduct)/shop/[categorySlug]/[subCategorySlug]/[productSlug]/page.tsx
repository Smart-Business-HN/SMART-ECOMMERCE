import Link from 'next/link';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { Product } from '@/interfaces/product/product.interface';
import { CalculateProductPrice } from '@/utils/product-price';
import { FormatValues } from '@/utils/number-format';
import ProductsWithSameCategory from '@/components/shop/products-page/products-with-same-category';
import RelatedProducts from '@/components/shop/products-page/related-products';
import InformationProductTabs from '@/components/shop/products-page/information-product-tabs';
import { ProductDetailResponse } from '@/interfaces/http-responses/http-responses.interface';
import ImageGalleryForProductDetailPage from '@/components/shop/products-page/image-gallery';
import { getProductBySlug } from '@/services/product/product.service';
import { ChatBubbleBottomCenterIcon, TagIcon } from '@heroicons/react/24/outline';
import ShareButton from '@/components/shop/products-page/share-button';
import Navbar from '@/components/main-layout/navbar';
import Footer from '@/components/main-layout/foother';
import { notFound } from 'next/navigation';
import { Providers } from '@/app/providers';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import ProductBreadcrumbs from '@/components/shop/products-page/product-breadcrumbs';
export interface ImageGalleryItem {
  original: string,
  thumbnail?: string
};
export async function generateMetadata({ params }: { params: { productSlug: string, categorySlug: string, subCategorySlug: string } }) {
  const responseFromApi: any = await getProductBySlug(params.productSlug);
  if(responseFromApi == null)
  {
    return notFound();
  }
  const responseSerialize: ProductDetailResponse = responseFromApi;
  const product = responseSerialize.data;
  return {
    title: `SB | ${product.name}`,
    description: product.description,
    openGraph: {
      title: `SB | ${product.name}`,
      description: product.description,
      url: `https://www.smartbusiness.site/shop/category/${params.categorySlug}/${params.subCategorySlug}/${params.productSlug}`,
      siteName: 'Smart Business',
      images: [
        {
          url: product.productImages.length != 0 ? product.productImages[0].url : '/assets/images/corporate/smart-business-og-image.png',
          width: 800,
          height: 600,
        }
      ],
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `SB | ${product.name}`,
      description: product.description,
      creator: 'Smart Business',
      images: [{
        url: product.productImages.length != 0 ? product.productImages[0].url : 'https://www.smartbusiness.site/assets/images/corporate/smart-business-og-image.png',
        width: 800,
        height: 600,
      }],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function ProductDetailPage({ params }: { params: { productSlug: string, categorySlug: string, subCategorySlug: string } }) {
  let quantity = 1;
  let productImages: ImageGalleryItem[] = [];
  const currentUrl: string = `https://www.smartbusiness.site/shop/${params.categorySlug}/${params.subCategorySlug}/${params.productSlug}`;
  const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-icon-vector.jpg";
  const itIsLogged: boolean = false;
  const whatsappContact: string = `https://api.whatsapp.com/send?phone=50488187765&text=Hola%20me%20interesa%20saber%20mas%20sobre%20este%20producto%20${currentUrl}`;
  const responseFromApi: any = await getProductBySlug(params.productSlug);
  const responseSerialize: ProductDetailResponse = responseFromApi;
  const product = responseSerialize.data;
  if (responseSerialize.succeeded) {
    addImagesToGallery(product);
  }
  else {
    toast.error(responseSerialize.message, {
      position: 'top-right',
      className: 'text-xs mt-10'
    })
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
    productImages = images;
  }
  return (
    <Providers>
      <Navbar/>
      <Toaster />
      <div className='w-full'>
        <div className='mx-auto container max-w-screen-2xl  items-center  py-5'>
          <div className='container px-4 md:px-0 justify-between'>
            <div className='flex flex-wrap gap-1 items-center text-sm text-gray-500'>
              <ProductBreadcrumbs product={product} />
        </div>
            <div className='grid mt-2 grid-cols-1 md:grid-cols-6 gap-4'>
              <div className='col-span-1 md:col-span-5'>
                <div className='w-full gap-4 grid grid-cols-1 md:grid-cols-2'>
                  <div className='col-span-1 '>
                    <ImageGalleryForProductDetailPage images={productImages} />
                  </div>
                  <div className='col-span-1 py-5 md:px-5'>
                    {
                      product != null ? <>
                        <h1 className='text-2xl text-black font-semibold'>{product.name}</h1>
                        <span className='bg-green-400 text-xs text-white px-2 py-1 rounded-md'>{product.status.name}</span>
                        <p className='text-md text-gray-600 mt-4'>{product.description}</p>
                        <div className='border-t mt-2 mb-2 w-full'></div>
                        <div className='flex justify-between items-center'>
                          {/* <p className='text-xl font-semibold my-2 text-[#1C68E1]'>{FormatValues(CalculateProductPrice(product.costPrice))}</p> */}
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
                        <div className='flex bg-gray-100 mt-2 rounded-md px-2'>
                          <Link href={whatsappContact} target='_blank' className='grow flex gap-2 rounded-l-md justify-center items-center cursor-pointer border-gray-500 hover:bg-gray-200'>
                            <ChatBubbleBottomCenterIcon className='text-gray-600' height={20} width={20} />
                            <p className='text-gray-600'>Consultar</p>
                          </Link>
                          <div className='w-[1px] bg-gray-500 my-2'></div>
                          <div className='grow flex gap-2 justify-center items-center cursor-pointer border-gray-500 hover:bg-gray-200'>
                            <TagIcon height={20} width={20} />
                            <p>WishList</p>
                          </div>
                          <div className='w-[1px] bg-gray-500 my-2'></div>
                          <ShareButton url={currentUrl} />
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
                      </> : null
                    }
                  </div>
                </div>
              </div>
              <div className='col-span-1 rounded-md py-10 md:py-0 bg-cover' style={{ backgroundImage: `url('/assets/images/backgrounds/banner-background.jpg')`, }}>
                <div>
                  <h4 className=' text-gray-100 mt-14 text-xl text-center'>¿Eres tecnico instalador?</h4>
                  <p className='text-sm text-gray-200 text-center mt-2'>Opta por descuentos exclusivos</p>
                  <div className='flex justify-center mt-5'>
                    <Image height={150} width={150} src='/assets/images/products/u6-pro-smartbusiness-box.png' alt='u6 pro en caja' />
                  </div>
                  <div className='w-full mx-auto text-center mt-5'>
                    <Link href='/be-a-partner' className='bg-blue-600 text-white text-sm p-2 rounded-br-xl hover:shadow-md rounded-tl-xl'>
                      Hazte Smart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-8 mt-10 gap-10 '>
              <div className='col-span-1 md:col-span-2'>
                <ProductsWithSameCategory categorySlug={params.categorySlug.toString()} productSlug={params.productSlug} />
              </div>
              <div className='col-span-1 md:col-span-6 bg-white'>
                {product != null ? <InformationProductTabs productDataSheets={product.productDataSheets} productFeatures={product.productFeatures} /> : null}
                <RelatedProducts subCategorySlug={params.subCategorySlug} productSlug={params.productSlug} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </Providers>
  )
}