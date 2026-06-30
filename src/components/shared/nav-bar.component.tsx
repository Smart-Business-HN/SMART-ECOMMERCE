// @ts-nocheck
"use client";
import { Avatar, Menu, MenuItem, MenuList, MenuHandler } from "@/utils/MTailwind";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useCartCount } from "@/components/providers/cart-count-provider";
import NavSearch from "@/components/shared/nav-search.component";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/ventix", label: "Ventix" },
  { href: "/servicios", label: "Servicios" },
  { href: "/quienes-somos", label: "Quiénes Somos" },
  { href: "/contacto", label: "Contacto" },
];

const isActiveLink = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function NavBarComponent() {
  const { cartItemsCount } = useCartCount();
  const { data: session, status } = useSession();
  const pathname = usePathname() || "/";
  const isLogued = status === "authenticated";

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false, callbackUrl: "/" });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/[.82] backdrop-blur-[18px] border-b border-line">
      <nav className="max-w-[1280px] mx-auto px-5 md:px-8 h-[68px] flex items-center gap-6 lg:gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-none" aria-label="Smart Business - Inicio">
          <Image
            src="/images/corporate/logo-smart-business.png"
            alt="Smart Business"
            width={429}
            height={113}
            priority
            style={{ width: "auto" }}
            className="h-[34px] object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-[30px] text-[14.5px] font-medium text-ink2-700 flex-1">
          {NAV_LINKS.map((link) => {
            const active = isActiveLink(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`sb-link transition-colors hover:text-accent ${
                  active ? "text-ink font-semibold" : "text-inherit"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 md:gap-[18px] flex-none ml-auto lg:ml-0">
          {/* Search */}
          <NavSearch />

          {/* Account: avatar menu when logged in, "Ingresar" otherwise */}
          {isLogued ? (
            <Menu>
              <MenuHandler>
                {/* @ts-expect-error Material Tailwind Avatar type definitions are overly strict; props are correct per docs */}
                <Avatar
                  src={session?.user?.image || "/images/generic_avatar.jpg"}
                  alt="Abrir menú de usuario"
                  size="sm"
                  className="cursor-pointer object-cover border-2 border-accent !w-9 !h-9"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => { window.location.href = "/profile"; }}>Perfil</MenuItem>
                <MenuItem onClick={() => { window.location.href = "/profile?tab=carts"; }}>Mis Compras</MenuItem>
                <MenuItem className="text-danger hover:bg-red-500 hover:text-white" onClick={handleSignOut}>
                  Cerrar Sesión
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center text-ink2-700 text-[14.5px] font-medium transition-colors hover:text-accent"
            >
              Ingresar
            </Link>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Ver carrito de compras"
            className="relative bg-ink text-white w-11 h-11 rounded-[10px] flex items-center justify-center transition-transform hover:-translate-y-px"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[11px] font-bold min-w-[18px] h-[18px] rounded-[9px] flex items-center justify-center px-1 border-2 border-white">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Mobile burger */}
          <div className="flex lg:hidden">
            <Menu>
              <MenuHandler>
                <button
                  type="button"
                  aria-label="Abrir menú de navegación"
                  className="flex items-center justify-center w-11 h-11 rounded-[10px] text-ink2-700 hover:bg-surface-muted"
                >
                  <Bars3Icon className="w-6 h-6" />
                </button>
              </MenuHandler>
              <MenuList>
                {NAV_LINKS.map((link) => (
                  <MenuItem key={link.href}>
                    <Link href={link.href} className="block w-full">{link.label}</Link>
                  </MenuItem>
                ))}
                {isLogued ? (
                  <MenuItem className="text-danger" onClick={handleSignOut}>Cerrar Sesión</MenuItem>
                ) : (
                  <>
                    <MenuItem><Link href="/login" className="block w-full">Ingresar</Link></MenuItem>
                    <MenuItem><Link href="/sign-up" className="block w-full">Registrarme</Link></MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
      </nav>
    </header>
  );
}
