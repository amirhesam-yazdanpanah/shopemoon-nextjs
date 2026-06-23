"use client";

import { useLocale } from "@/context/providers";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label="Toggle language"
      className="inline-flex h-10 items-center justify-center rounded-full border border-gold-soft bg-cream-dark px-4 text-sm font-semibold text-navy transition hover:bg-gold-soft dark:border-navy-soft dark:bg-navy-soft dark:text-cream dark:hover:bg-navy"
    >
      {locale === "fa" ? "EN" : "فا"}
    </button>
  );
}
