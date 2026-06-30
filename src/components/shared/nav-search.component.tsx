"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { trackFbEvent } from "@/lib/meta/fbpixel";
import { buildSearchCustomData } from "@/lib/meta/meta-custom-data";
import { formatNumber } from "@/utils/number-format";
import type {
  ProductSuggestionDto,
  ProductSuggestionResponse,
} from "@/interfaces/product/product-suggestion.interface";

const NO_IMAGE = "/images/products/no-image-available-icon-vector.webp";
const MIN_CHARS = 2;
const DEBOUNCE_MS = 275;
const LIMIT = 8;

/**
 * Búsqueda del nav ("Smart Business Rediseño"). El ícono de la lupa abre un panel anclado
 * (dropdown en escritorio, full-width en móvil) con un input enfocado y sugerencias de
 * productos en vivo. Clic/Enter en una sugerencia abre la PDP del producto; submit del
 * término abre la página de resultados /tienda/buscar?q=.
 */
export default function NavSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestionDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Autofocus al abrir.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setActiveIndex(-1);
    }
  }, [open]);

  // Limpiar al cerrar.
  useEffect(() => {
    if (!open) {
      setTerm("");
      setSuggestions([]);
      setActiveIndex(-1);
      abortRef.current?.abort();
    }
  }, [open]);

  // Debounce + fetch de sugerencias con AbortController (cancela requests obsoletos).
  useEffect(() => {
    if (!open) return;
    const q = term.trim();

    if (q.length < MIN_CHARS) {
      abortRef.current?.abort();
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const handle = setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `/api/products/suggestions?searchTerm=${encodeURIComponent(q)}&limit=${LIMIT}`,
          { signal: controller.signal, headers: { Accept: "application/json" } }
        );
        const json: ProductSuggestionResponse = await res.json();
        setSuggestions(json.succeeded ? json.data : []);
        setActiveIndex(-1);
        setLoading(false);
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return; // respuesta obsoleta
        setSuggestions([]);
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(handle);
  }, [term, open]);

  // Abortar request en curso al desmontar.
  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  // Cerrar al cambiar de ruta.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Click fuera para cerrar (escritorio).
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Mantener la sugerencia activa visible.
  useEffect(() => {
    if (activeIndex < 0) return;
    document.getElementById(`nav-sug-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const goToSearch = (query: string) => {
    const q = query.trim();
    if (!q) return;
    trackFbEvent("Search", buildSearchCustomData(q));
    startTransition(() => {
      router.push(`/tienda/buscar?q=${encodeURIComponent(q)}`);
    });
    setOpen(false);
  };

  const selectSuggestion = (s: ProductSuggestionDto) => {
    if (s.categorySlug && s.subCategorySlug && s.slug) {
      trackFbEvent("Search", buildSearchCustomData(s.name));
      startTransition(() => {
        router.push(`/tienda/${s.categorySlug}/${s.subCategorySlug}/${s.slug}`);
      });
      setOpen(false);
    } else {
      // Sin slugs suficientes: caer a la página de resultados por el nombre.
      goToSearch(s.name);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToSearch(term);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        e.preventDefault();
        selectSuggestion(suggestions[activeIndex]);
      }
      // sin sugerencia activa: el submit del form maneja el término
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const showEmpty = term.trim().length >= MIN_CHARS && !loading && suggestions.length === 0;

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger: mismo ícono y clases que el Link original */}
      <button
        ref={triggerRef}
        type="button"
        aria-label="Buscar productos"
        aria-expanded={open}
        aria-controls="nav-search-panel"
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-11 -mx-1 items-center justify-center text-ink2-700 transition-colors hover:text-accent"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>

      {open && (
        <>
          {/* Scrim sólo en móvil para cerrar al tocar fuera */}
          <div
            className="fixed inset-0 z-[55] bg-black/20 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            id="nav-search-panel"
            role="dialog"
            aria-label="Búsqueda de productos"
            className="fixed inset-x-3 top-[72px] z-[60] overflow-hidden rounded-container border border-line bg-white shadow-card-hover md:absolute md:inset-x-auto md:right-0 md:top-auto md:mt-3 md:w-[380px]"
          >
            <form onSubmit={onSubmit} className="p-3">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink2-400"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Buscar productos..."
                  role="combobox"
                  aria-expanded={open}
                  aria-controls="nav-search-listbox"
                  aria-autocomplete="list"
                  aria-activedescendant={activeIndex >= 0 ? `nav-sug-${activeIndex}` : undefined}
                  aria-label="Buscar productos"
                  className="sb-in w-full rounded-btn border border-line-input bg-white py-2.5 pl-10 pr-9 text-[14.5px] text-text outline-none placeholder:text-ink2-400"
                />
                {loading ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    <span className="block h-4 w-4 animate-spin rounded-full border-2 border-ink2-300 border-t-accent" />
                  </span>
                ) : term ? (
                  <button
                    type="button"
                    aria-label="Limpiar búsqueda"
                    onClick={() => {
                      setTerm("");
                      inputRef.current?.focus();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink2-400 transition-colors hover:text-ink2-600"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                ) : null}
              </div>
            </form>

            {/* Resultados */}
            {term.trim().length >= MIN_CHARS && (
              <div className="max-h-[60vh] overflow-auto border-t border-line-soft">
                {suggestions.length > 0 && (
                  <ul id="nav-search-listbox" role="listbox" aria-label="Sugerencias de productos">
                    {suggestions.map((s, i) => (
                      <li key={s.id} id={`nav-sug-${i}`} role="option" aria-selected={i === activeIndex}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveIndex(i)}
                          onClick={() => selectSuggestion(s)}
                          className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                            i === activeIndex ? "bg-accent-soft" : "hover:bg-surface-muted"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={s.thumbnail || NO_IMAGE}
                            alt=""
                            loading="lazy"
                            width={40}
                            height={40}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = NO_IMAGE;
                            }}
                            className="h-10 w-10 flex-none rounded-[8px] border border-line-soft bg-white object-contain p-1"
                          />
                          <span className="min-w-0 flex-1">
                            {s.brandName && (
                              <span className="block truncate text-[11.5px] font-semibold text-ink2-400">
                                {s.brandName}
                              </span>
                            )}
                            <span className="block truncate text-[13.5px] font-medium text-text">
                              {s.name}
                            </span>
                          </span>
                          <span className="flex-none text-[13.5px] font-semibold text-text">
                            L. {formatNumber(s.price)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {showEmpty && (
                  <p className="px-4 py-6 text-center text-[13.5px] text-ink2-500">
                    Sin sugerencias para “{term.trim()}”. Presiona Enter para buscar.
                  </p>
                )}

                {suggestions.length > 0 && (
                  <button
                    type="button"
                    onClick={() => goToSearch(term)}
                    className="block w-full border-t border-line-soft px-4 py-2.5 text-center text-[13px] font-medium text-accent transition-colors hover:bg-accent-soft"
                  >
                    Ver todos los resultados para “{term.trim()}”
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
