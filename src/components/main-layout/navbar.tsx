
'use client'
import Link from "next/link"
import Image from "next/image";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { ChevronDownIcon,  } from "@heroicons/react/20/solid";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { SmartLogoNavbar } from "../../../public/assets/images";


const Navbar = () => {
    const categories = [
        {

        }
    ];
    return (
        <nav className="border-b w-full z-50 sticky top-0 shadow-xs shadow-gray-300 flex gap-4 justify-between bg-[#F6F6F8]">
            <div className="">
                <Image src={SmartLogoNavbar} height="50" alt="smart business logo"/>
            </div>
            <div className="grow flex gap-4  items-center justify-end">
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
                                <ShoppingCartIcon className="text-gray-400" height='24'/>
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
                                <Link as='buttom' className={`${
                                    active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                        <UserCircleIcon className="text-gray-300" height='24'/>
                                    Iniciar Sesion
                                </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link className={`${
                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                            <UserCircleIcon className="text-gray-300" height='24'/>
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
                                <UserCircleIcon  className="text-gray-300" height='30'/>
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
                                    <Link as='buttom' className={`${
                                        active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                            <UserCircleIcon className="text-gray-300" height='24'/>
                                        Iniciar Sesion
                                    </Link>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <Link className={`${
                                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/login'>
                                                <UserCircleIcon className="text-gray-300" height='24'/>
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