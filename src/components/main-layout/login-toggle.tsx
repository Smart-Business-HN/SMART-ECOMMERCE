'use client'

import { Menu, Transition } from "@headlessui/react";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment } from "react";

export default function LoginToggle() {
    let isLoggued: boolean = false;
    return (
        <div className="flex justify-end">
            {
                isLoggued ?
                    <>
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
                    </> :
                    <div className="flex items-center">
                        <Link className=" rounded-md ml-5 mx-5 px-2 py-1 bg-gray-300 my-auto text-white" href="/login"> Login</Link>
                    </div>
            }
        </div>
    );
}