// @ts-nocheck
'use client';
import { Button, IconButton } from "@/utils/MTailwind";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getItemProps = (index: number) => ({
    variant: currentPage === index ? "filled" : "text",
    color: "blue",
    onClick: () => onPageChange(index),
  } as any);

  const next = () => {
    if (currentPage === totalPages) return;
    onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    onPageChange(currentPage - 1);
  };

  // Generar números de página a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
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
    <div className=" items-center justify-center gap-4 mt-8 hidden md:flex">
      <Button
        variant="text"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
      </Button>
      
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-blue-600">...</span>
          ) : (
            <IconButton className="" key={page} {...getItemProps(page as number)}>
              {page}
            </IconButton>
          )
        ))}
      </div>
      
      <Button
        variant="text"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        Siguiente <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
} 