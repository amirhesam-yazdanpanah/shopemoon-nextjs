"use client";

import { useLocale } from "@/context/providers";
import type { Locale } from "@/lib/dictionary";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "fa", label: "FA" },
  { value: "en", label: "EN" },
  { value: "tr", label: "TR" },
];

export function LanguageToggle() {
  const { locale, selectLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex h-10 items-center gap-0.5 rounded-full border border-gold-soft bg-cream-dark p-1 dark:border-navy-soft dark:bg-navy-soft"
    >
      {OPTIONS.map((option) => {
        const isActive = locale === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => selectLocale(option.value)}
            aria-pressed={isActive}
            aria-label={`Switch language to ${option.label}`}
            className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition ${
              isActive
                ? "bg-gold text-white shadow-card"
                : "text-navy/70 hover:bg-gold-soft dark:text-cream/70 dark:hover:bg-navy"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
