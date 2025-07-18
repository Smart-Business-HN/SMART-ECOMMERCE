'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getAllNavCategory } from '@/services/categories.service';
import { getProductBySlug } from '@/services/products.service';

export default function Breadcrumb() {
    const [categoryName, setCategoryName] = useState("");
    const [subcategoryName, setSubcategoryName] = useState("");
    const [productName, setProductName] = useState("");
    const pathname = usePathname();

    // Extraer los parámetros de la URL
    const pathSegments = pathname.split('/').filter(segment => segment);
    const categorySlug = pathSegments.includes('tienda') && pathSegments.length > 1 ? pathSegments[1] : undefined;
    const subcategorySlug = pathSegments.includes('tienda') && pathSegments.length > 2 ? pathSegments[2] : undefined;
    const productSlug = pathSegments.includes('tienda') && pathSegments.length > 3 ? pathSegments[3] : undefined;
    console.log(categorySlug, subcategorySlug, productSlug);
    
    useEffect(() => {
        const fetchCategoryNames = async () => {
            // Limpiar estados cuando no hay categoría
            if (!categorySlug) {
                setCategoryName("");
                setSubcategoryName("");
                setProductName("");
                return;
            }

            try {
                const categoriesResponse = await getAllNavCategory();
                console.log(categoriesResponse.data);
                const category = categoriesResponse.data.find(cat => cat.slug === categorySlug);
                if (category) {
                    setCategoryName(category.category);
                    
                    // Si hay subcategoría, buscar su nombre
                    if (subcategorySlug) {
                        const subcategory = category.subCategories.find(sub => sub.slug === subcategorySlug);
                        if (subcategory) {
                            setSubcategoryName(subcategory.name);
                        } else {
                            setSubcategoryName("");
                        }
                    } else {
                        // Limpiar subcategoría si no hay
                        setSubcategoryName("");
                    }
                } else {
                    // Limpiar si no se encuentra la categoría
                    setCategoryName("");
                    setSubcategoryName("");
                    setProductName("");
                }
            } catch (error) {
                console.error('Error fetching category/subcategory names:', error);
                // Limpiar estados en caso de error
                setCategoryName("");
                setSubcategoryName("");
                setProductName("");
            }
        };

        const fetchProductName = async () => {
            // Solo buscar el nombre del producto si hay productSlug
            if (!productSlug) {
                setProductName("");
                return;
            }

            try {
                const productResponse = await getProductBySlug(productSlug, false, 0);
                console.log('Product response for breadcrumb:', productResponse);
                if (productResponse.succeeded && productResponse.data) {
                    setProductName(productResponse.data.name);
                } else {
                    setProductName("");
                }
            } catch (error) {
                console.error('Error fetching product name:', error);
                setProductName("");
            }
        };

        // Ejecutar ambas funciones
        fetchCategoryNames();
        fetchProductName();
    }, [categorySlug, subcategorySlug, productSlug, pathname]); // Agregar pathname como dependencia

    return (
        <div className='flex items-center gap-1 text-sm text-gray-500'>
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            Inicio
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                            <a href="/tienda" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                                Tienda
                            </a>
                        </div>
                    </li>
                    {categoryName && (
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <a href={`/tienda/${categorySlug}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                                    {categoryName}
                                </a>
                            </div>
                        </li>
                    )}
                    {subcategoryName && (
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <a href={`/tienda/${categorySlug}/${subcategorySlug}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2">
                                    {subcategoryName}
                                </a>
                            </div>
                        </li>
                    )}
                    {productName && (
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                                    {productName}
                                </span>
                            </div>
                        </li>
                    )}
                </ol>
            </nav>
        </div>
    );
} 