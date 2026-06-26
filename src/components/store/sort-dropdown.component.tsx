"use client";

/**
 * Sort selector. Maps to the backend `sortBy` values the search endpoint supports
 * (relevance | price | name | newest). No asc/desc split — the param doesn't model it.
 */
export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "Relevancia" },
  { value: "price", label: "Precio" },
  { value: "name", label: "Nombre" },
  { value: "newest", label: "Más nuevos" },
];

export const sortLabel = (value: string | null): string =>
  SORT_OPTIONS.find((o) => o.value === (value ?? ""))?.label ?? "Relevancia";

interface SortDropdownProps {
  value: string | null;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <label className="inline-flex items-center gap-2 text-[13px] text-ink2-500">
      <span className="hidden sm:inline">Ordenar</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Ordenar productos"
        className="sb-in min-h-[44px] rounded-[10px] border border-line-input bg-white px-3 py-2 text-[14px] font-medium text-text outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
