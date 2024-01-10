'use client'
import React from 'react'
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { NavCategory } from '@/interfaces/category/nav-category.interface';
import { ResumeSubcategory } from '@/interfaces/sub-category/resume-subcategory.interface';
import { useParams } from 'next/navigation';

export default function CategoryTree(props:any) {
    const params = useParams();
    // const hasCategory:boolean = params.categorySlug!.toString() != '';
    // const hasSubcategory:boolean = params.subCategorySlug!.toString() != '';
    return (
        <>
            {
                props.categories.map((category: NavCategory, key: number) => {
                    return (
                        <Disclosure key={key}>
                            {({ open }) => (
                                <>
                                    <div     className='flex gap-2' key={key}>
                                        <Disclosure.Button >
                                            <ChevronRightIcon height={20} width={20} className={open ? 'rotate-90 text-[#0068E1] transform transition-transform' : 'text-gray-400 '} />
                                        </Disclosure.Button>
                                        <Link href={`/shop/category/${category.slug}`} className={open ? 'text-[#0068E1] transition-colors' : 'text-gray-400 transition-colors hover:text-[#0068E1]'}>{category.category}</Link>
                                    </div>
                                    <Disclosure.Panel>
                                        {
                                            category.subCategories.map((subCategory: ResumeSubcategory, key: number) => {
                                                return (
                                                    <div className='pl-10' key={key}>
                                                        <Link href={`/shop/category/${category.slug}/${subCategory.slug}`} className='text-gray-400 transition-colors hover:text-[#0068E1]'>{subCategory.name}</Link>
                                                    </div>
                                                );
                                            })
                                        }
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    )
                })
            }
        </>
    );
}
