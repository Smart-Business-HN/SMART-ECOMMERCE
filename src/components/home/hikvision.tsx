import { BuildingLibraryIcon } from "@heroicons/react/20/solid";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Hikvision() {
    return (
        <div className="mx-4 mb-4 md:mt-4 relative h-80 md:h-96 rounded-lg  md:w-full md:mx-auto md:container" style={{ backgroundImage: `url('/assets/images/backgrounds/hikvision-background-hikpartner-pro.png')`, objectFit: 'cover' }}>
            <div className="rounded-md px-5 animate-fade-right  md:w-96 top-2 left-2 bottom-2 md:bottom-10 right-2 md:top-10 md:left-10 py-5 bg-white absolute bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-50 ">
                <h3 className="font-bold text-gray-700 text-2xl text-center">¿Necesitas seguridad?</h3>
                <p className="text-gray-500 leading-tight my-2">En Smart Business encontraras todo lo necesario para proteger tu casa y negocio ante todos los visitantes indeseables.</p>
                <h4 className="text-gray-700 text-base font-semibold">Partners autorizados de:</h4>
                <div className="flex justify-center my-2">
                    <Image src='/assets/images/corporate/Hikvision_logo_smart_business.png' height={120} width={150} alt="Logo de hikvision" />
                </div>
                <div className="flex justify-center mt-4">
                    <Link href='/shop/' className="px-3 py-2 rounded-md hover:shadow-sm bg-[#3B82F6] text-white items-center flex gap-2">
                        <BuildingStorefrontIcon height={20} width={20} />
                        <p>Ir a Tienda</p>
                    </Link>
                </div>
            </div>
        </div>)
}