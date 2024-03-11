import Footer from "@/components/main-layout/foother";
import Navbar from "@/components/main-layout/navbar";
import CategoryTree from "@/components/shop/layout/category-tree-menu";
import { GetAllNavCategory } from "@/services/category/category.service";
import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const nav: any = await GetAllNavCategory();
    return (
        <>
            <Navbar />
            <div className='w-full px-5 md:px-0 md:mx-auto max-w-screen-2xl py-5 container'>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <Link href='/'><h6>Home</h6></Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                    <Link href='/shop'><h6 className='text-gray-300'>Tienda</h6></Link>
                </div>
                <div className='w-full grid gap-5 pt-5 grid-cols-4'>
                    <div className='hidden md:block col-span-1'>
                        <div className='p-4 bg-fixed' style={{ backgroundImage: `url('/assets/images/backgrounds/categories-bg.jpg')`, }}>
                            <h2 className='font-semibold text-gray-900 text-xl mb-3'>Categorias</h2>
                            <hr className='w-[20%] -mb-1 border-[#1C68E1] border'></hr>
                            <hr className='mt-1 mb-5'></hr>
                            <CategoryTree categories={nav} />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <Footer />
        </>

    )
}