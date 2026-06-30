import { searchProducts } from '@/services/search.service';
import { ProductSearchParameter } from '@/interfaces/product/product-search.interface';
import ProductCard from '@/components/store/product-card.component';
import Pagination from '@/components/store/pagination.component';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/auth.config';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = (params.q as string) || '';

  return {
    title: query ? `Buscar "${query}" | SMART BUSINESS` : 'Buscar Productos | SMART BUSINESS',
    description: query
      ? `Resultados de búsqueda para "${query}" en SMART BUSINESS. Encuentra cableado estructurado, CCTV, fibra óptica y más.`
      : 'Busca productos en nuestra tienda especializada en soluciones tecnológicas.',
    robots: { index: true, follow: true },
  };
}

const PAGE_WRAP = 'mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params.q as string) || '';
  const page = parseInt(params.page as string) || 1;
  const pageSize = 20;

  const session = await getServerSession(authOptions);
  const isUserSignIn = session?.user?.id ? true : false;
  const customerTypeId = session?.customerType?.id ? session?.customerType?.id : undefined;

  // Sin término de búsqueda
  if (!query.trim()) {
    return (
      <div className={PAGE_WRAP}>
        <div className="rounded-container border border-line bg-white py-20 text-center">
          <MagnifyingGlassIcon className="mx-auto mb-4 h-10 w-10 text-ink2-400" />
          <h1 className="text-[24px] font-bold tracking-[-0.02em] text-text">Buscar productos</h1>
          <p className="mt-2 text-[15px] text-ink2-500">
            Ingresa un término de búsqueda para encontrar productos.
          </p>
        </div>
      </div>
    );
  }

  try {
    const searchParameters: ProductSearchParameter = {
      searchTerm: query,
      pageNumber: page - 1, // API usa 0-based indexing
      pageSize,
      all: false,
      isUserSignIn,
      customerTypeId,
      sortBy: 'relevance',
    };

    const response = await searchProducts(searchParameters);
    const totalPages = Math.ceil(response.totalItems / pageSize);
    const hasResults = response.data && response.data.length > 0;

    return (
      <div className={PAGE_WRAP}>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[28px] font-bold tracking-[-0.02em] text-text md:text-[34px]">
            Resultados para “{query}”
          </h1>
          <p className="mt-1 text-[14px] text-ink2-500">
            {response.totalItems > 0
              ? `${response.totalItems} producto${response.totalItems !== 1 ? 's' : ''} encontrado${response.totalItems !== 1 ? 's' : ''}`
              : 'No se encontraron productos'}
          </p>
        </header>

        {hasResults ? (
          <>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {response.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                baseUrl={`/tienda/buscar?q=${encodeURIComponent(query)}`}
              />
            )}
          </>
        ) : (
          <div className="rounded-container border border-line bg-white px-6 py-16 text-center">
            <MagnifyingGlassIcon className="mx-auto mb-4 h-10 w-10 text-ink2-400" />
            <h3 className="text-[18px] font-semibold text-text">No se encontraron productos</h3>
            <p className="mx-auto mt-2 max-w-[420px] text-[15px] text-ink2-500">
              No hay productos que coincidan con tu búsqueda “{query}”. Intenta con palabras clave
              diferentes, términos más generales o verifica la ortografía.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error searching products:', error);
    return (
      <div className={PAGE_WRAP}>
        <div className="rounded-container border border-line bg-white py-20 text-center">
          <h1 className="text-[22px] font-bold text-text">Error en la búsqueda</h1>
          <p className="mt-2 text-[15px] text-ink2-500">
            Hubo un problema al buscar productos. Por favor, intenta de nuevo.
          </p>
        </div>
      </div>
    );
  }
}
