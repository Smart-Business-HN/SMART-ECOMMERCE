'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Tab } from '@headlessui/react'
import { getHeroSlider } from '@/services/hero-slider/hero-slider.service';
import { HeroSlider } from '@/interfaces/hero-slider/hero-slider.interface';
import { HeroSliderResponse } from '@/interfaces/hero-slider/hero-slider-response.interface';
import { BasicProduct } from '@/interfaces/hero-slider/basic-product.interface';

export default function ProductsByCategory() {
    const [heroSliders, setHeroSliders] = useState<any[]>([]);
    const noImage: string = "https://smarterpstorage.blob.core.windows.net/produccion/no-image-available-smart-business.jpg";
    const loadHeroSlider = async () => {
        const heroSlider: any = await getHeroSlider();
        setHeroSliders(heroSlider.data)
    }
    useEffect(() => {
        loadHeroSlider()
    }, [])
    function validateImages(product: BasicProduct): string {
        if (product.productImages.length > 0) {
            return product.productImages[0].url;
        }
        else {
            return noImage;
        }
    }
    return (
        <div className='my-5 w-full mx-auto'>
            {
                heroSliders.length > 0 ?
                    <Tab.Group>
                        <Tab.List className="flex items-center justify-center gap-4">
                            {
                                heroSliders.map(function (item: HeroSliderResponse, value: number) {
                                    return (
                                        <Tab as={Fragment} key={value}>
                                            {({ selected }) => (
                                                <button className={!selected ? 'p-2 rounded-sm border-gray-400 bg-white border hover:bg-[#F3F4F6] shadow-sm text-mx font-bold' : 'p-2 rounded-sm border border-blue-500 bg-[#F3F4F6] shadow-sm text-mx font-bold'}>
                                                    <Image src={item.image} alt="SWITCH" width={50} height={15} />
                                                    <p> {item.name}</p>
                                                </button>
                                            )}
                                        </Tab>
                                    );
                                })
                            }
                        </Tab.List>
                        <Tab.Panels className="flex mt-4 items-center justify-center gap-4">
                            {
                                heroSliders!.map(function (item: HeroSliderResponse, index: number) {
                                    return (
                                        <Tab.Panel key={index} className="w-full mx-auto">
                                            <div className='flex gap-10 justify-center'>
                                                {
                                                    item.heroSliders.map(function (product: HeroSlider, index: number) {
                                                        return (
                                                            <div className='flex relative' key={index}>
                                                                <div className='border group w-[250px] h-[290px] inline-block border-gray-300 p-4 shadow-md hover:shadow-2xl justify-center  text-center'>
                                                                    <div className='flex justify-center'>
                                                                        <Image alt="u6-pro" src={validateImages(product.product)} width={200} height={200} />
                                                                    </div>
                                                                    <p className='text-center line-clamp-1 font-semibold text-gray-600 text-md'>{product.product.name}</p>
                                                                    <hr />
                                                                    <div className='invisible group-hover:visible'>
                                                                        <button className='bg-gray-100 text-gray-600 text-md border-none hover:border-2 hover:border-black w-7 h-7 rounded-sm p-1 absolute top-2 right-2'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                    <div className='invisible group-hover:visible flex justify-center'>
                                                                        <Link href={`shop/category/${product.product.subcategory.category.slug}/${product.product.subcategory.slug}/${product.product.slug}`} className='bg-gray-100  hover:bg-gray-100 text-sm font-semibold rounded-sm py-1 px-2 text-gray-700 hover:shadow-sm absolute bottom-2 flex gap-1'>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                                                            </svg>
                                                                            Ver detalle
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </Tab.Panel>
                                    );
                                })
                            }
                        </Tab.Panels>
                    </Tab.Group>
                    : null
            }
        </div>
    );
}
