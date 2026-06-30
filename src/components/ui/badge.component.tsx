import type { ReactNode } from "react";

/**
 * Small label badge ("Smart Business Rediseño").
 * success -> "Envío gratis" / "En stock" (green)
 * dark    -> "Top ventas" / "Nuevo" (ink)
 * accent  -> soft-blue informational
 */
type BadgeVariant = "success" | "dark" | "accent";

const VARIANTS: Record<BadgeVariant, string> = {
  success: "bg-success-soft text-success",
  dark: "bg-ink text-white",
  accent: "bg-accent-soft text-accent border border-accent-border",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({
  variant = "dark",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11.5px] font-semibold ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
