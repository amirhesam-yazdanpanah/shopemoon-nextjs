"use client";

import { useTheme } from "@/context/providers";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-soft bg-cream-dark text-navy transition hover:bg-gold-soft dark:border-navy-soft dark:bg-navy-soft dark:text-cream dark:hover:bg-navy"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
