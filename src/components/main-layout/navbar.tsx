'use client'
import React from "react";
import Image from "next/image";
import Searcher from "./searcher";
import BurguerMenu from "./burger-menu";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import {
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button
  } from "@nextui-org/react";

  export default function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        { url: "/", text: "Inicio" },
        { url: "/shop", text: "Tienda" },
        { url: "/services", text: "Servicios" },
        { url: "/about-us", text: "Quienes Somos" },
        { url: "/contact", text: "Contacto" },
        { url: "/login", text: "Login" },
        { url: "/logout", text: "Cerrar Sesion" },
    ];
    // bg-red-400 sm:bg-green-300 md:bg-blue-500  lg:bg-amber-400 mx-auto xl:bg-red-300 2xl:bg-sky-500  z-50 sticky top-0 shadow-xs shadow-gray-300
    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <Image src='/assets/images/corporate/smart.webp' height={50} width={50} alt="smart business logo" />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <Image src='/assets/images/corporate/smart.webp' height={50} width={50} alt="smart business logo" />
                </NavbarBrand>
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Inicio
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground"  href="/shop" >
                        Tienda
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/services">
                        Servicios
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/about-us">
                        Quienes Somos
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/contact">
                        Contacto
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/login">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="warning" href="/sign-up" variant="flat">
                        Registrarme
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item.text}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href={item.url}
                            size="lg"
                        >
                            {item.text}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}