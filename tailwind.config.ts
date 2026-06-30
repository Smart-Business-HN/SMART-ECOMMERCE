import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // --- "Smart Business Rediseño" design tokens ---
        ink: "#0A0D14", // near-black dark surfaces (announcement, dark hero, cart btn)
        text: "#14171C", // primary body text
        accent: {
          DEFAULT: "#006FFF", // single brand accent (CTAs, links, active states)
          soft: "#EAF1FF", // soft-blue fill
          border: "#D4E3FF", // soft-blue border
          light: "#5AA0FF", // light blue on dark surfaces
        },
        surface: {
          DEFAULT: "#F6F7F8", // gray page background
          muted: "#F1F3F5", // "Suave" button / chip-off / spec box
          alt: "#E8EBF0", // light text-on-dark / dividers
        },
        line: {
          DEFAULT: "#ECEEF1", // hairline border
          input: "#E4E6EA", // input border
          soft: "#F2F3F5", // card inner divider
        },
        // Muted gray text scale (named "ink2" to avoid clashing with MT's "gray")
        ink2: {
          700: "#3A4049",
          600: "#4A515B",
          500: "#79808B",
          400: "#9AA1AC",
          300: "#A7B0BE",
        },
        success: {
          DEFAULT: "#188F5B", // "Envío gratis" green text
          soft: "#E9F8F0", // green badge fill
          light: "#39E0A0", // online/teal accent
        },
        ventix: {
          DEFAULT: "#1E9BE8", // Ventix product accent (cyan) — only on /ventix
        },
      },
      fontFamily: {
        sans: [
          "var(--font-hanken)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        // NOTE: intentionally NOT overriding "lg" (Tailwind default 0.5rem, used by Material Tailwind).
        btn: "11px",
        card: "16px",
        container: "20px",
      },
      boxShadow: {
        btn: "0 8px 24px -8px rgba(0,111,255,.5)",
        "btn-hero": "0 10px 30px -8px rgba(0,111,255,.6)",
        card: "0 1px 2px rgba(10,14,30,.03)",
        "card-hover": "0 12px 40px -12px rgba(10,14,30,.16)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
}) as Config;
export default config;
