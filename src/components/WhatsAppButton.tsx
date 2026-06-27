"use client";

import { useLocale } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";

export function WhatsAppButton() {
  const { dict } = useLocale();

  return (
    <a
      href={whatsappLink(dict.hero.whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.hero.ctaPrimary}
      className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-soft transition hover:scale-105 md:bottom-8 md:left-8"
    >
      <span aria-hidden="true">💬</span>
    </a>
  );
}
