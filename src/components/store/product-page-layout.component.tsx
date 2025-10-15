'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ProductPageLayout() {
    const pathname = usePathname();
    
    useEffect(() => {
        // Detectar si estamos en una página de producto (tiene 4 segmentos: /tienda/category/subcategory/product)
        const isProductPage = pathname.split('/').filter(segment => segment).length === 4;
        
        if (isProductPage) {
            // Ocultar el sidebar y ajustar el contenido
            const sidebar = document.querySelector('.product-page-sidebar');
            const content = document.querySelector('.product-page-content');
            const container = document.getElementById('left-sidebar');
            
            if (sidebar && content && container) {
                // Usar clases más específicas para sobrescribir md:block
                sidebar.classList.add('!hidden', 'md:!hidden');
                content.classList.remove('col-span-3');
                content.classList.add('col-span-4');
                container.classList.remove('grid-cols-4');
                container.classList.add('grid-cols-1');
            }
        } else {
            // Mostrar el sidebar y restaurar el layout normal
            const sidebar = document.querySelector('.product-page-sidebar');
            const content = document.querySelector('.product-page-content');
            const container = document.getElementById('left-sidebar');
            
            if (sidebar && content && container) {
                // Remover las clases de ocultación
                sidebar.classList.remove('!hidden', 'md:!hidden');
                content.classList.remove('col-span-4');
                content.classList.add('col-span-3');
                container.classList.remove('grid-cols-1');
                container.classList.add('md:grid-cols-4');
                container.classList.add('grid-cols-1');
            }
        }
    }, [pathname]);
    
    return null; // Este componente no renderiza nada visual
} 