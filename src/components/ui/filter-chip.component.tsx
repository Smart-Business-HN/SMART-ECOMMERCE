"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import type { MouseEventHandler } from "react";

/**
 * Filter chip ("Smart Business Rediseño").
 * - Default: toggle pill, `active` = blue fill, otherwise white bordered.
 * - `removable`: soft-blue brand chip with an ✕ that calls `onRemove`.
 */
interface FilterChipProps {
  label: string;
  active?: boolean;
  removable?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onRemove?: () => void;
  className?: string;
}

export default function FilterChip({
  label,
  active = false,
  removable = false,
  onClick,
  onRemove,
  className = "",
}: FilterChipProps) {
  if (removable) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent ${className}`}
      >
        {label}
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Quitar filtro ${label}`}
          className="-mr-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-accent/15"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-[40px] items-center rounded-full px-[15px] py-2 text-[13.5px] font-semibold transition-colors ${
        active
          ? "bg-accent text-white"
          : "border border-line-input bg-white text-ink2-700 hover:border-ink2-300"
      } ${className}`}
    >
      {label}
    </button>
  );
}
