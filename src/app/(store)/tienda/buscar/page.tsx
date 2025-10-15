import { Suspense } from 'react';
import { searchProducts } from '@/services/search.service';
import { ProductSearchParameter } from '@/interfaces/product/product-search.interface';
import ProductsGrid from '@/components/store/products-grid.component';
import Pagination from '@/components/store/pagination.component';
import { getServerSession } from 'next-auth/next';
import { config } from '@/app/api/auth/[...nextauth]/route';
import type { Metadata } from 'next';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q as string || '';
  
  return {
    title: query ? `Buscar "${query}" | SMART BUSINESS` : 'Buscar Productos | SMART BUSINESS',
    description: query 
      ? `Resultados de búsqueda para "${query}" en SMART BUSINESS. Encuentra cableado estructurado, CCTV, fibra óptica y más.`
      : 'Busca productos en nuestra tienda especializada en soluciones tecnológicas.',
    robots: { index: true, follow: true },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q as string || '';
  const page = parseInt(params.page as string) || 1;
  const pageSize = 20;
  
  // Obtener la sesión del servidor
  const session = await getServerSession(config);
  const isUserSignIn = session?.user?.id ? true : false;
  const customerTypeId = session?.customerType?.id ? session?.customerType?.id : undefined;

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Buscar Productos</h1>
        <p className="text-gray-600">Ingresa un término de búsqueda para encontrar productos.</p>
      </div>
    );
  }

  try {
    const searchParams: ProductSearchParameter = {
      searchTerm: query,
      pageNumber: page - 1, // API usa 0-based indexing
      pageSize,
      order: 'asc',
      column: 'name',
      all: false,
      isUserSignIn,
      customerTypeId,
      sortBy: 'relevance'
    };

    const response = await searchProducts(searchParams);

    return (
      <div className="space-y-6">
        {/* Header de resultados */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Resultados para "{query}"
          </h1>
          <p className="text-gray-600">
            {response.totalItems > 0 
              ? `Se encontraron ${response.totalItems} producto${response.totalItems !== 1 ? 's' : ''}`
              : 'No se encontraron productos'
            }
          </p>
        </div>

        {/* Resultados */}
        {response.data && response.data.length > 0 ? (
          <>
            <Suspense fallback={<div className="text-center py-8">Cargando productos...</div>}>
              <ProductsGrid products={response.data} />
            </Suspense>
            
            {/* Paginación */}
            {(response.totalItems / pageSize ) > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={page}
                  totalPages={response.totalItems / pageSize}
                  baseUrl={`/tienda/buscar?q=${encodeURIComponent(query)}`}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-4">
              No hay productos que coincidan con tu búsqueda "{query}".
            </p>
            <div className="text-sm text-gray-500">
              <p>Intenta con:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Palabras clave diferentes</li>
                <li>Términos más generales</li>
                <li>Verificar la ortografía</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Error en la búsqueda</h1>
        <p className="text-gray-600">Hubo un problema al buscar productos. Por favor, intenta de nuevo.</p>
      </div>
    );
  }
}
