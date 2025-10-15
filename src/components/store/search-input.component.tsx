//@ts-nocheck
'use client';
import { Input, Button } from '@/utils/MTailwind';
import { useState, useTransition, Suspense } from 'react';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
// Removed Material Tailwind imports to avoid type conflicts
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function SearchInputContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Detectar si estamos en una página de producto individual
  // Las páginas de producto tienen 4 segmentos: /tienda/category/subcategory/product
  const pathSegments = pathname.split('/').filter(segment => segment);
  const isProductPage = pathSegments.length === 4 && pathSegments[0] === 'tienda';

  // Ocultar el componente en páginas de producto individual
  if (isProductPage) {
    return <></>;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('q', searchTerm.trim());
      params.delete('page'); // Reset page when searching
      router.push(`/tienda/buscar?${params.toString()}`);
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="w-full md:w-1/2 md:mt-0 mt-2 flex justify-end">
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          label="Buscar productos..."
          value={searchTerm}
          color='blue'
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full pr-10 pl-4 py-2 rounded-lg"
          disabled={isPending}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform bg-blue-400 -translate-y-1/2 p-1 hover:bg-gray-400 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending || !searchTerm.trim()}
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        </Button>
        </div>
      </form>
    </div>
  );
}

export default function SearchInput() {
  return (
    <Suspense fallback={<div className="w-full md:w-1/2 md:mt-0 mt-2 flex justify-end">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>}>
      <SearchInputContent />
    </Suspense>
  );
}
