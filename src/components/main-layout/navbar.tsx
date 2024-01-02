'use client'
import Link from "next/link"
import Image from "next/image";
import { Combobox, Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Searcher from "./searcher";
import LoginToggle from "./login-toggle";
const Navbar = () => {
    const categories = [
        {

        }
    ];
    // bg-red-400 sm:bg-green-300 md:bg-blue-500  lg:bg-amber-400 mx-auto xl:bg-red-300 2xl:bg-sky-500  z-50 sticky top-0 shadow-xs shadow-gray-300
    return (
        <nav className="border-b flex justify-between  bg-[#F6F6F8]">
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
            <LoginToggle/>
        </nav>
    )
}
export default Navbar;