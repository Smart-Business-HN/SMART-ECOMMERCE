import React from 'react'
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function CategoryTree(props: any) {
    return (
        <>
            <h2 className='font-semibold text-gray-900 text-xl mb-3'>Categorias</h2>
            <hr className='w-[20%] -mb-1 border-[#1C68E1] border'></hr>
            <hr className='mt-1 mb-5'></hr>
            <Disclosure>
                {({ open }) => (
                    <>
                        <div className='flex gap-2'>
                            <Disclosure.Button>
                                <ChevronRightIcon height={20} width={20} className={open ? 'rotate-90 text-[#0068E1] transform transition-transform' : 'text-gray-400 '} />
                            </Disclosure.Button>
                            <Link href='/' className={open ? 'text-[#0068E1] transition-colors' : 'text-gray-400 transition-colors hover:text-[#0068E1]'}>Swiches</Link>
                        </div>
                        <Disclosure.Panel>
                            <div className='pl-10'>
                                <Link href='/' className='text-gray-400 transition-colors hover:text-[#0068E1]'>APs</Link>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    );
}
