// @ts-nocheck
"use client";
import { Navbar,Button,Avatar, Menu, MenuItem, MenuList, MenuHandler } from "@/utils/MTailwind";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
interface MainNavbarProps {
    cartItemsCount?: number;
    onCartClick?: () => void;
  }

export default function NavBarComponent({ cartItemsCount = 0, onCartClick }: MainNavbarProps) {
    const { data: session, status } = useSession();
    const isLogued = status === 'authenticated';
    const handleSignOut = async () => {
        try {
            await signOut({ 
                redirect: false,
                callbackUrl: '/' 
            });
            // Limpiar localStorage si es necesario
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            // Recargar la página para actualizar el estado
            window.location.href = '/';
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <div className="w-full flex justify-center px-2 md:px-0 max-w-screen-7xl shadow-md sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur-sm">
        <Navbar className="flex items-center justify-between px-4 py-2 w-full bg-white bg-opacity-50  rounded-none " placeholder="">
          <div className="md:flex items-center gap-6 hidden">
            <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">
              <Image src="/images/corporate/smart.webp" alt="Smart Business logo" width={32} height={32} priority className="object-contain" />
            </div>
            <div className="flex gap-2">
              {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
              <Link href='/'><Button variant="text" size="sm" className="font-semibold" ripple={false} onClick={() => {}}>Inicio</Button></Link>
              {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
              <Link href='/tienda'><Button variant="text" size="sm" className="font-semibold" ripple={false} onClick={() => {}}>Tienda</Button></Link>
              {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
              <Link href='/servicios'><Button variant="text" size="sm" className="font-semibold" ripple={false} onClick={() => {}}>Servicios</Button></Link>
              {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
              <Link href='/quienes-somos'><Button variant="text" size="sm" className="font-semibold" ripple={false} onClick={() => {}}>Quienes Somos</Button></Link>
              {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
              <Link href='/contacto'><Button variant="text" size="sm" className="font-semibold" ripple={false} onClick={() => {}}>Contacto</Button></Link>
            </div>
          </div>
          <div className="w-full flex md:hidden">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image src="/images/corporate/smart.webp" alt="Smart Business logo" width={32} height={32} priority className="object-contain" />
            </div>
          </div>
          {/* Right: Auth Buttons or Avatar */}
          <div className="flex justify-end md:items-center gap-2 w-full md:w-auto">
            {isLogued ? (
              <>
                {/* Cart Icon with Badge */}
                <div className="relative mr-2 flex items-center justify-center">
                  <button
                    type="button"
                    className="focus:outline-none flex items-center justify-center"
                    onClick={onCartClick}
                  >
                    <ShoppingCartIcon className="w-6 h-6 text-blue-gray-700" />
                    <span className="absolute -top-1 md:-top-2 -right-4 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-[2px] text-center" style={{lineHeight: '1.1'}}>{cartItemsCount}</span>
                  </button>
                </div>
                {/* @ts-expect-error Material Tailwind Avatar type definitions are overly strict; props are correct per docs */}
                
                <Menu>
                  <MenuHandler>
                    <Avatar src={session?.user?.image || "/images/generic_avatar.jpg"} alt="avatar" size="sm" className="cursor-pointer object-cover border-2 border-blue-500" onClick={() => {}} />
                  </MenuHandler>
                  <MenuList>
                    <MenuItem onClick={() => {window.location.href = '/profile'}}>Perfil</MenuItem>
                    <MenuItem>Mis Compras</MenuItem>
                    <MenuItem className="text-danger hover:bg-red-500 hover:text-white" onClick={handleSignOut}>Cerrar Sesión</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                <Link href='/login'><Button variant="outlined" size="sm" color="blue-gray" ripple={false}>Login</Button></Link>
                {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
                <Link href='/sign-up'><Button variant="filled" size="sm" color="blue" ripple={false}>Registrarme</Button></Link>
              </>
            )}
          </div>
          <div className="ml-2 flex md:hidden">
            {/* Aqui va el burger menu */}
           <Menu>
            <MenuHandler>
              <Bars3Icon className="w-7 h-7 text-blue-gray-700" />
            </MenuHandler>
            <MenuList>
              <MenuItem>
                <Link href='/'>Inicio</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/tienda'>Tienda</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/servicios'>Servicios</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/quienes-somos'>Quienes Somos</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/contacto'>Contacto</Link>
              </MenuItem>
            </MenuList>
           </Menu>
          </div>
        </Navbar>
      </div>
    );
}
