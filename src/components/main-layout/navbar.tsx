import Link from "next/link"
import Image from "next/image";
import Searcher from "./searcher";
import BurguerMenu from "./burger-menu";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
const Navbar = () => {
    // bg-red-400 sm:bg-green-300 md:bg-blue-500  lg:bg-amber-400 mx-auto xl:bg-red-300 2xl:bg-sky-500  z-50 sticky top-0 shadow-xs shadow-gray-300
    return (
        <nav className="border-b flex justify-between  bg-[#F6F6F8]">
            <Image src='/assets/images/corporate/smart.webp' height={50} width={50} alt="smart business logo" /> 
            <div className="border rounded grow mx-4 md:mx-12 my-1 hidden lg:block border-gray-400">
                <Searcher/>
            </div>
            <div className="grow flex justify-end my-1 p-1 sm:hidden  items-center rounded-md">
                
                <Link className="border-green-500 border-2 px-2 py-1 flex items-center gap-2 rounded-md text-gray-700 font-medium" href='https://api.whatsapp.com/send?phone=+50488187765&text=Deseo%20contactarme%20con%20un%20asesor%20de%20ventas'>
                    <ChatBubbleLeftRightIcon className="text-green-600" width={25} height={25} />
                    Contactar
                </Link>
            </div>
            <div className="sm:flex gap-4 hidden items-center justify-end px-10">
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/">Inicio</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/shop">Tienda</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/services">Servicios</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/about-us">Quienes Somos</Link></div>
                <div className="text-gray-500 hover:text-blue-500 font-medium"><Link href="/contact">Contacto</Link></div>
            </div>
            <div className=" flex justify-end my-1 p-1 sm:hidden  items-center rounded-md">
                <BurguerMenu/>
            </div>
            {/* <LoginToggle/> */}
        </nav>
    )
}
export default Navbar;