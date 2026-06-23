import { fashionBrands, sportsBrands, beautyBrands, type BrandLink } from "@/lib/dictionary";

const CARD_CLASS =
  "relative inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-gold-soft/40 bg-white/60 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-navy/70 transition duration-200 hover:scale-105 hover:border-gold hover:bg-white hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 dark:bg-navy-soft/40 dark:text-cream/70 dark:hover:bg-navy-soft sm:text-base";

function BrandMarqueeRow({
  brands,
  direction,
  duration,
}: {
  brands: BrandLink[];
  direction: "left" | "right";
  duration: number;
}) {
  const brandsX4 = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="marquee-row">
      <div
        className={`marquee-track ${direction === "left" ? "marquee-track-left" : "marquee-track-right"}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {brandsX4.map((brand, index) => (
          <a
            key={`${brand.name}-${index}`}
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
    </div>
  );
}

export function BrandMarquee() {
  return (
    <div className="flex flex-col gap-4">
      <BrandMarqueeRow brands={fashionBrands} direction="left" duration={35} />
      <BrandMarqueeRow brands={sportsBrands} direction="right" duration={38} />
      <BrandMarqueeRow brands={beautyBrands} direction="left" duration={42} />
    </div>
  );
}
