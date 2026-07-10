"use client";

import {
  fashionBrands,
  sportsBrands,
  beautyBrands,
  getBrandDisplayName,
  type BrandLink,
  type Locale,
} from "@/lib/dictionary";
import { useLocale } from "@/context/providers";

const CARD_CLASS =
  "relative inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-navy/70 shadow-card transition duration-200 hover:scale-105 hover:bg-white hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 dark:bg-navy-soft/50 dark:text-cream/70 dark:hover:bg-navy-soft sm:text-base";

function BrandGridRow({ brands, locale }: { brands: BrandLink[]; locale: Locale }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {brands.map((brand) => (
        <a
          key={brand.name}
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          title="برو به فروشگاه رسمی"
          aria-label={`برو به فروشگاه رسمی ${getBrandDisplayName(brand, locale)}`}
          className={CARD_CLASS}
        >
          {getBrandDisplayName(brand, locale)}
          <span className="tooltip">برو به فروشگاه رسمی</span>
        </a>
      ))}
    </div>
  );
}

export function BrandGrid() {
  const { locale } = useLocale();

  return (
    <div className="flex flex-col gap-4">
      <BrandGridRow brands={fashionBrands} locale={locale} />
      <BrandGridRow brands={sportsBrands} locale={locale} />
      <BrandGridRow brands={beautyBrands} locale={locale} />
    </div>
  );
}
