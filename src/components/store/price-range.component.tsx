"use client";
import { useState, useEffect } from "react";

interface PriceRangeProps {
  min: number | null;
  max: number | null;
  onApply: (min: number | null, max: number | null) => void;
}

const toNum = (s: string): number | null => {
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

/** Min/Max price filter (Lempiras). Applies on blur or Enter. */
export default function PriceRange({ min, max, onApply }: PriceRangeProps) {
  const [lo, setLo] = useState(min?.toString() ?? "");
  const [hi, setHi] = useState(max?.toString() ?? "");

  // Keep inputs in sync when filters are cleared/changed elsewhere (e.g. chip removed).
  useEffect(() => setLo(min?.toString() ?? ""), [min]);
  useEffect(() => setHi(max?.toString() ?? ""), [max]);

  const apply = () => onApply(toNum(lo), toNum(hi));

  const inputCls =
    "sb-in w-full rounded-[10px] border border-line-input bg-white px-3 py-2 text-[14px] text-text outline-none placeholder:text-ink2-400";

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={lo}
        onChange={(e) => setLo(e.target.value)}
        onBlur={apply}
        onKeyDown={(e) => e.key === "Enter" && apply()}
        placeholder="Mín"
        aria-label="Precio mínimo"
        className={inputCls}
      />
      <span className="text-ink2-400">–</span>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        value={hi}
        onChange={(e) => setHi(e.target.value)}
        onBlur={apply}
        onKeyDown={(e) => e.key === "Enter" && apply()}
        placeholder="Máx"
        aria-label="Precio máximo"
        className={inputCls}
      />
    </div>
  );
}
