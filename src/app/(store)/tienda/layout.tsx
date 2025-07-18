import CategoryTree from "@/components/store/category-tree.component";
import Breadcrumb from "@/components/store/breadcrumb.component";
import ProductPageLayout from "@/components/store/product-page-layout.component";

interface StoreLayoutProps {
    children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
    return (
        <div className='w-full md:mx-auto max-w-screen-2xl py-5 container px-4'>
            <ProductPageLayout />
            <Breadcrumb />
            <div className='w-full grid gap-5 pt-5 grid-cols-4' id='left-sidebar'>
                    <div className='hidden md:block col-span-1 product-page-sidebar'>
                        <div className='p-4 bg-fixed' style={{ backgroundImage: `url('/images/backgrounds/categories-bg.jpg')`, }}>
                            <h2 className='font-semibold text-gray-900 text-xl mb-3'>Categorias</h2>
                            <hr className='w-[20%] -mb-1 border-[#1C68E1] border'></hr>
                            <hr className='mt-1 mb-5'></hr>
                                <CategoryTree/>
                        </div>
                    </div>
                    <div className='col-span-3 product-page-content'>
                        {children}
                    </div>
            </div>
        </div>
    );
}