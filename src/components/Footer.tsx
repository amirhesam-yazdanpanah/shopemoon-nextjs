"use client";

import { useLocale } from "@/context/providers";

export function Footer() {
  const { dict } = useLocale();

  return (
    <footer className="bg-navy px-5 py-10 text-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
        <div>
          <p className="text-xl font-extrabold text-gold-soft">ShopeMoon</p>
          <p className="mt-1 text-sm opacity-80">{dict.footer.tagline}</p>
        </div>

        <div className="flex gap-5 text-sm font-semibold">
          <a
            href="https://wa.me/989109798803"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 hover:opacity-100 hover:text-gold-soft"
          >
            WhatsApp
          </a>
          <a
            href="https://www.instagram.com/shopemoon.tr/"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 hover:opacity-100 hover:text-gold-soft"
          >
            Instagram
          </a>
          <a
            href="https://t.me/shopeemonn"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-90 hover:opacity-100 hover:text-gold-soft"
          >
            Telegram
          </a>
        </div>

        <p className="text-xs opacity-70">{dict.footer.rights}</p>
      </div>
    </footer>
  );
}
