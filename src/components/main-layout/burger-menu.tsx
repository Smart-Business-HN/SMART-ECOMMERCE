'use client'
import { Menu, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Fragment } from "react";

function BurguerMenu() {
    const links = [
        { href: '/account-settings', label: 'Account settings' },
        { href: '/support', label: 'Support' },
        { href: '/license', label: 'License' },
        { href: '/sign-out', label: 'Sign out' },
      ]
    return(
        <div className="my-auto">
                            <Menu as="div" className="relative text-left">
                                <div className="inline-flex items-center">
                                    <Menu.Button className="inline-flex w-full justify-center items-center rounded-md mx-1 my-2">
                                        <Bars3Icon className="text-gray-400" height='24' />
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
                                    <Menu.Items className="absolute z-50 right-0 mt-0 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/'>
                                                        
                                                        Inicio
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/shop'>
                                                        
                                                        Tienda
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/services'>
                                                        
                                                        Servicios
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/about-us'>
                                                        
                                                        Quienes Somos
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'
                                                        } group flex w-full items-center rounded-md px-2 gap-4 py-2 text-sm`} href='/contact'>
                                                        
                                                        Contacto
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
    );
}
export default BurguerMenu;