import Link from "next/link";
import { Fragment } from "react";

/**
 * Presentational breadcrumb ("Smart Business Rediseño").
 * Server-rendered from items the page already knows (no client fetch, no CLS).
 * The last item is rendered as plain (current page) when it has no href.
 * `tone="dark"` for use over the dark category hero.
 */
export interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  tone?: "light" | "dark";
  className?: string;
}

export default function Breadcrumb({
  items,
  tone = "light",
  className = "",
}: BreadcrumbProps) {
  const linkCls =
    tone === "dark"
      ? "text-ink2-300 hover:text-white"
      : "text-ink2-400 hover:text-accent";
  const currentCls = tone === "dark" ? "text-white" : "text-text";
  const sepCls = tone === "dark" ? "text-ink2-300/50" : "text-ink2-400";

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] ${className}`}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <Fragment key={`${item.label}-${i}`}>
            {i > 0 && <span className={`${sepCls} whitespace-nowrap`}>/</span>}
            {item.href && !isLast ? (
              <Link href={item.href} className={`sb-link whitespace-nowrap ${linkCls}`}>
                {item.label}
              </Link>
            ) : (
              <span className={currentCls} aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
