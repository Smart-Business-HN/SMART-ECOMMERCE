import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";

/**
 * Design-system button ("Smart Business Rediseño").
 * Variants map 1:1 to the design system: Primario / Oscuro / Secundario / Suave (+ Ventix accent).
 * Renders a <button>, a Next <Link> (internal href) or an <a> (external href).
 * Hit target >= 44px on md/lg per the accessibility requirement.
 */

type Variant = "primary" | "dark" | "secondary" | "soft" | "ventix";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-white shadow-btn hover:shadow-btn-hero",
  dark: "bg-ink text-white hover:bg-[#161b26]",
  secondary: "bg-white text-text border border-line-input hover:border-ink2-300",
  soft: "bg-surface-muted text-accent hover:bg-accent-soft",
  ventix:
    "bg-ventix text-white shadow-[0_8px_24px_-8px_rgba(30,155,232,.5)] hover:brightness-105",
};

const SIZES: Record<Size, string> = {
  sm: "text-[14px] px-4 py-2 min-h-[40px]",
  md: "text-[15px] px-6 py-3 min-h-[44px]",
  lg: "text-[16px] px-7 py-3.5 min-h-[50px]",
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton extends BaseProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  "aria-label"?: string;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  external?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes(
  variant: Variant,
  size: Size,
  fullWidth: boolean,
  className: string,
): string {
  return [
    "sb-btn inline-flex items-center justify-center gap-2 font-semibold rounded-btn select-none",
    "disabled:opacity-50 disabled:pointer-events-none",
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
  } = props;
  const cls = classes(variant, size, fullWidth, className);

  if (props.href !== undefined) {
    const { href, external, target, rel } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          aria-label={props["aria-label"]}
          className={cls}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={props["aria-label"]} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      aria-label={props["aria-label"]}
      className={cls}
    >
      {children}
    </button>
  );
}
