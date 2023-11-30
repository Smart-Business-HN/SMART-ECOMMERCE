'use client'
import Link from "next/link"
import Image from "next/image";
import { Combobox, Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Searcher from "./searcher";
const Navbar = () => {
    const categories = [
        {

        }
    ];
    return (
        <nav className="border-b flex justify-between bg-red-400 sm:bg-green-300 md:bg-blue-500  lg:bg-amber-400 mx-auto xl:bg-red-300 2xl:bg-sky-500  z-50 sticky top-0 shadow-xs shadow-gray-300 bg-[#F6F6F8]">
            <Image src='/assets/images/corporate/smart.webp' height={50} width={50} alt="smart business logo" /> 
            <div className="border rounded grow mx-4 md:mx-12 my-1 sm:hidden lg:block border-gray-400">
                <Searcher/>
            </div>
            <div className="sm:flex  gap-4 hidden items-center justify-end">
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/">Inicio</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/shop">Tienda</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/services">Servicios</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/about-us">Quienes Somos</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/contact">Contacto</Link></div>
            </div>
            <div className="flex justify-end">
                <div className="my-auto">
                    <Menu as="div" className="relative text-left">
                        <div className="inline-flex items-center">
                            <Menu.Button className="inline-flex w-full justify-center items-center rounded-md mx-1 my-2">
                                <ShoppingCartIcon className="text-gray-400" height='24' />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 mt-0 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link as='buttom' className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                                <UserCircleIcon className="text-gray-300" height='24' />
                                                Iniciar Sesion
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                                <UserCircleIcon className="text-gray-300" height='24' />
                                                Iniciar Sesion
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className="my-auto mx-auto px-0 text-gray-400 text-xl">|</div>
                <div className="my-auto ">
                    <Menu as="div" className="relative text-left">
                        <div className="inline-flex items-center">
                            <Menu.Button className="inline-flex w-full justify-center items-center rounded-md ml-1 mr-4 my-2">
                                <UserCircleIcon className="text-gray-300" height='30' />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-4 mt-0 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link as='buttom' className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                                <UserCircleIcon className="text-gray-300" height='24' />
                                                Iniciar Sesion
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                                <UserCircleIcon className="text-gray-300" height='24' />
                                                Iniciar Sesion
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;