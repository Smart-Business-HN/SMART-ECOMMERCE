// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import { Button, IconButton } from "@/utils/MTailwind";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}

interface ItemProps {
  variant: "filled" | "text";
  color: "blue";
  href?: string;
  onClick?: () => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange, baseUrl }: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getItemProps = (index: number): ItemProps => {
    const props: ItemProps = {
      variant: currentPage === index ? "filled" : "text",
      color: "blue",
    };

    if (baseUrl) {
      props.href = `${baseUrl}&page=${index}`;
    } else if (onPageChange) {
      props.onClick = () => onPageChange(index);
    }

    return props;
  };

  const next = () => {
    if (currentPage === totalPages) return;
    if (baseUrl) {
      window.location.href = `${baseUrl}&page=${currentPage + 1}`;
    } else if (onPageChange) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage === 1) return;
    if (baseUrl) {
      window.location.href = `${baseUrl}&page=${currentPage - 1}`;
    } else if (onPageChange) {
      onPageChange(currentPage - 1);
    }
  };

  // Generar números de página a mostrar
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisible) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (isMobile) {
      // Lógica simplificada para móvil: mostrar solo primera, actual y última
      if (currentPage === 1) {
        pages.push(1);
        if (totalPages > 2) {
          pages.push('...');
        }
        pages.push(totalPages);
      } else if (currentPage === totalPages) {
        pages.push(1);
        if (totalPages > 2) {
          pages.push('...');
        }
        pages.push(totalPages);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage);
        if (currentPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    } else {
      // Lógica original para desktop
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
      <Button
        variant="text"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> <span className="hidden md:block">Anterior</span>
      </Button>
      
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-blue-600">...</span>
          ) : baseUrl ? (
            <a key={page} href={`${baseUrl}&page=${page}`}>
              {/* @ts-expect-error Material Tailwind IconButton type definitions are overly strict; props are correct per docs */}
              <IconButton className="" {...getItemProps(page as number)}>
                {page}
              </IconButton>
            </a>
          ) : (
            /* @ts-expect-error Material Tailwind IconButton type definitions are overly strict; props are correct per docs */
            <IconButton className="" key={page} {...getItemProps(page as number)}>
              {page}
            </IconButton>
          )
        ))}
      </div>
      
      {/* @ts-expect-error Material Tailwind Button type definitions are overly strict; props are correct per docs */}
      <Button
        variant="text"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        <span className="hidden md:block">Siguiente</span> <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
} 