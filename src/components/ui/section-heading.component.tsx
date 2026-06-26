import type { ReactNode } from "react";

/**
 * Section heading ("Smart Business Rediseño"): optional overline + title + subtitle.
 * `tone="dark"` for use on dark (ink) bands; `align` controls text alignment.
 */
interface SectionHeadingProps {
  overline?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div
      className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}
    >
      {overline && (
        <p
          className={`mb-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] ${
            isDark ? "text-accent-light" : "text-accent"
          }`}
        >
          {overline}
        </p>
      )}
      <h2
        className={`text-[28px] md:text-[34px] font-bold tracking-[-0.025em] leading-[1.1] ${
          isDark ? "text-white" : "text-text"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[16px] md:text-[17px] leading-[1.6] ${
            isDark ? "text-ink2-300" : "text-ink2-500"
          } ${align === "center" ? "max-w-[640px] mx-auto" : "max-w-[640px]"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
