"use client";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  baseUrl?: string;
}

// "Smart Business Rediseño" numbered-pill pagination. Page-number logic preserved
// from the original component; only the markup/styling is redesigned (native, tokenized).

const PILL_BASE =
  "inline-flex h-11 min-w-[44px] items-center justify-center rounded-[10px] px-2 text-[14px] font-semibold transition-colors";
const PILL_ACTIVE = "bg-accent text-white";
const PILL_IDLE =
  "border border-line-input bg-white text-ink2-700 hover:border-ink2-300";
const ARROW =
  "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-line-input bg-white text-ink2-700 transition-colors hover:border-ink2-300 disabled:opacity-40 disabled:pointer-events-none";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  baseUrl,
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const goTo = (page: number) => {
    if (baseUrl) {
      window.location.href = `${baseUrl}&page=${page}`;
    } else if (onPageChange) {
      onPageChange(page);
    }
  };

  const next = () => {
    if (currentPage === totalPages) return;
    goTo(currentPage + 1);
  };
  const prev = () => {
    if (currentPage === 1) return;
    goTo(currentPage - 1);
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 3 : 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (isMobile) {
      if (currentPage === 1 || currentPage === totalPages) {
        pages.push(1);
        if (totalPages > 2) pages.push("...");
        pages.push(totalPages);
      } else {
        pages.push(1, "...", currentPage);
        if (currentPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...", totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  const renderPage = (page: number) => {
    const cls = `${PILL_BASE} ${page === currentPage ? PILL_ACTIVE : PILL_IDLE}`;
    if (baseUrl) {
      return (
        <a key={page} href={`${baseUrl}&page=${page}`} className={cls} aria-current={page === currentPage ? "page" : undefined}>
          {page}
        </a>
      );
    }
    return (
      <button key={page} type="button" onClick={() => goTo(page)} className={cls} aria-current={page === currentPage ? "page" : undefined}>
        {page}
      </button>
    );
  };

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Paginación"
    >
      <button
        type="button"
        onClick={prev}
        disabled={currentPage === 1}
        className={ARROW}
        aria-label="Página anterior"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-1.5 text-ink2-400">
            …
          </span>
        ) : (
          renderPage(page as number)
        ),
      )}

      <button
        type="button"
        onClick={next}
        disabled={currentPage === totalPages}
        className={ARROW}
        aria-label="Página siguiente"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
