"use client";

import { useLocale } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";
import { BrandMarquee } from "./BrandMarquee";

export function Hero() {
  const { dict } = useLocale();

  return (
    <section id="hero" className="px-5 pb-16 pt-14 text-center md:pt-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          {dict.hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-navy-soft dark:text-cream-dark md:text-lg">
          {dict.hero.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappLink(dict.hero.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-3 font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
          >
            {dict.hero.ctaPrimary}
          </a>
        </div>
      </div>

      <div className="mt-12">
        <BrandMarquee />
      </div>
    </section>
  );
}
