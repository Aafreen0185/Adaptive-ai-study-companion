import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    /* ── Spacing: 8-px base grid ──────────────────────────────────── */
    /* Tailwind's default scale is already 4px-based, so we extend it */
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      /* ── Color tokens (map to CSS vars) ──────────────────────── */
      colors: {
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        border:      "hsl(var(--border))",
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        success:   "hsl(var(--success))",
        warning:   "hsl(var(--warning))",
        danger:    "hsl(var(--danger))",
        /* Pastel utility tokens */
        pastel: {
          yellow:   "hsl(var(--pastel-yellow))",
          pink:     "hsl(var(--pastel-pink))",
          lavender: "hsl(var(--pastel-lavender))",
          mint:     "hsl(var(--pastel-mint))",
          sky:      "hsl(var(--pastel-sky))",
        },
        /* Legacy — keep for compat with existing pages */
        "p-yellow":   "hsl(var(--pastel-yellow))",
        "p-pink":     "hsl(var(--pastel-pink))",
        "p-lavender": "hsl(var(--pastel-lavender))",
        "p-mint":     "hsl(var(--pastel-mint))",
        "p-sky":      "hsl(var(--pastel-sky))",
        "p-stone":    "hsl(var(--muted))",
      },
      /* ── Border radius ────────────────────────────────────────── */
      borderRadius: {
        sm:   "6px",
        DEFAULT: "8px",
        md:   "10px",
        lg:   "12px",   /* inputs */
        xl:   "16px",   /* cards  */
        "2xl": "20px",
        "3xl": "24px",
        full: "9999px",
      },
      /* ── Shadow (elevation layers) ───────────────────────────── */
      boxShadow: {
        "card-sm": "0 1px 4px -1px rgba(0,0,0,.06), 0 2px 8px -2px rgba(0,0,0,.05)",
        "card":    "0 2px 8px -2px rgba(0,0,0,.07), 0 4px 16px -4px rgba(0,0,0,.06)",
        "card-lg": "0 4px 12px -2px rgba(0,0,0,.10), 0 8px 24px -4px rgba(0,0,0,.08)",
        "nav":     "0 -4px 24px -4px rgba(0,0,0,.10)",
        "focus":   "0 0 0 3px hsl(var(--primary) / 0.20)",
      },
      /* ── Sidebar width ────────────────────────────────────────── */
      width: {
        sidebar: "240px",
      },
      minWidth: {
        sidebar: "240px",
      },
      /* ── Transitions ──────────────────────────────────────────── */
      transitionDuration: {
        DEFAULT: "200ms",
      },
      /* ── Max width for content ───────────────────────────────── */
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
