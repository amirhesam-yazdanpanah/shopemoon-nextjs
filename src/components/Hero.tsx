"use client";

import Image from "next/image";
import { useLocale } from "@/context/providers";
import { whatsappLink } from "@/lib/dictionary";

export function Hero() {
  const { dict } = useLocale();

  return (
    <section id="hero" className="relative overflow-x-clip px-5 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,93,0.16),transparent_60%)]"
      />

      {/* Decorative background portrait — not page content, purely atmospheric */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -end-10 top-1/2 -z-10 w-[260px] -translate-y-1/2 opacity-[0.07] sm:w-[320px] sm:opacity-[0.1] md:-end-16 md:w-[380px] md:opacity-[0.14] lg:-end-20 lg:w-[460px] lg:opacity-[0.18]"
        style={{
          maskImage: "radial-gradient(ellipse 65% 75% at center, black 45%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 65% 75% at center, black 45%, transparent 85%)",
        }}
      >
        <Image
          src="/hero-background.png"
          alt=""
          width={1065}
          height={1477}
          className="h-auto w-full"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-xl text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft/60 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold dark:bg-navy-soft/60">
            ShopeMoon
          </span>

          <h1 className="text-balance mt-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-6 text-base text-navy-soft dark:text-cream-dark md:text-lg">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <a
              href={whatsappLink(dict.hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-br from-gold to-gold-light px-10 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {dict.hero.ctaPrimary}
            </a>
            <a
              href="#products"
              className="rounded-full border border-gold-soft bg-white/70 px-10 py-4 text-base font-bold text-navy transition hover:-translate-y-0.5 hover:bg-cream-dark dark:bg-navy-soft/60 dark:text-cream"
            >
              {dict.hero.ctaSecondary}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-navy-soft dark:text-cream-dark lg:justify-start">
            {dict.hero.trustIndicators.map((indicator) => (
              <span key={indicator} className="inline-flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gold">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {indicator}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
