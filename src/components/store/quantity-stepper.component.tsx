"use client";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 999,
}: QuantityStepperProps) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center rounded-[11px] border border-line-input">
      <button
        type="button"
        onClick={dec}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
        className="flex h-12 w-11 items-center justify-center text-ink2-700 transition-colors hover:text-accent disabled:opacity-40"
      >
        <MinusIcon className="h-4 w-4" />
      </button>
      <span
        className="min-w-[44px] text-center text-[16px] font-semibold text-text"
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={inc}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
        className="flex h-12 w-11 items-center justify-center text-ink2-700 transition-colors hover:text-accent disabled:opacity-40"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
