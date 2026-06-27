"use client";

import { useTheme } from "@/context/providers";

export function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M19.5 14.5c-.9.3-1.9.4-2.9.2-3.6-.6-6.3-3.8-6.3-7.6 0-1.4.3-2.6.9-3.7C7.4 4.2 4.8 7.6 4.8 11.7c0 4.6 3.6 8.3 8.1 8.3 3.5 0 6.5-2.2 7.6-5.3-.3 0-.7-.1-1-.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="hidden h-8 w-8 items-center justify-center rounded-full text-navy/60 transition hover:bg-cream-dark hover:text-gold dark:text-cream/60 dark:hover:bg-navy-soft md:inline-flex"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
