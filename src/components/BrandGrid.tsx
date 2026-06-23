import { fashionBrands, sportsBrands, beautyBrands, type BrandLink } from "@/lib/dictionary";

const CARD_CLASS =
  "relative inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-gold-soft/40 bg-white/60 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-navy/70 transition duration-200 hover:scale-105 hover:border-gold hover:bg-white hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 dark:bg-navy-soft/40 dark:text-cream/70 dark:hover:bg-navy-soft sm:text-base";

function BrandGridRow({ brands }: { brands: BrandLink[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {brands.map((brand) => (
        <a
          key={brand.name}
          href={brand.url}
          target="_blank"
          rel="noopener noreferrer"
          title="برو به فروشگاه رسمی"
          aria-label={`برو به فروشگاه رسمی ${brand.name}`}
          className={CARD_CLASS}
        >
          {brand.name}
          <span className="tooltip">برو به فروشگاه رسمی</span>
        </a>
      ))}
    </div>
  );
}

export function BrandGrid() {
  return (
    <div className="flex flex-col gap-4">
      <BrandGridRow brands={fashionBrands} />
      <BrandGridRow brands={sportsBrands} />
      <BrandGridRow brands={beautyBrands} />
    </div>
  );
}
