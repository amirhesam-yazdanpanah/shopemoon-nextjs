"use client";

import { useLocale } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";

export function Hero() {
  const { dict } = useLocale();

  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-20 pt-16 text-center md:pb-28 md:pt-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(184,146,74,0.16),transparent_60%)]"
      />

      <div className="mx-auto max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold dark:bg-navy-soft/60">
          ShopeMoon
        </span>

        <h1 className="mx-auto mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base text-navy-soft dark:text-cream-dark md:text-lg">
          {dict.hero.subtitle}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappLink(dict.hero.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-br from-gold to-gold-light px-10 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {dict.hero.ctaPrimary}
          </a>
        </div>
      </div>
    </section>
  );
}
