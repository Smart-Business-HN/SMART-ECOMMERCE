import Footer from "@/components/main-layout/foother";
import Navbar from "@/components/main-layout/navbar";
import CategoryTree from "@/components/shop/layout/category-tree-menu";
import { GetAllNavCategory } from "@/services/category/category.service";
import ShopBreadcrumbs from "@/components/shop/ShopBreadcrumbs";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const nav: any = await GetAllNavCategory();
    return (
        <>
            <Navbar />
            <div className='w-full px-5 md:px-0 md:mx-auto max-w-screen-2xl py-5 container'>
                <div className='flex items-center gap-1 text-sm text-gray-500'>
                    <ShopBreadcrumbs />
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