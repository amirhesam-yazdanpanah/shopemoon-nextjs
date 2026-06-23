import { fashionBrands, sportsBrands, beautyBrands, type BrandLink } from "@/lib/dictionary";

function BrandMarqueeRow({ brands, reverse }: { brands: BrandLink[]; reverse?: boolean }) {
  // Tripled so the loop never shows empty space, per spec.
  const tripled = [...brands, ...brands, ...brands];

  return (
    <div className="brand-marquee-row">
      <div
        className={`brand-marquee-track${reverse ? " brand-marquee-reverse" : ""}`}
      >
        {tripled.map((brand, index) => (
          <a
            key={`${brand.name}-${index}`}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`مشاهده وب‌سایت رسمی ${brand.name} (در تب جدید باز می‌شود)`}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-gold-soft/40 bg-white/60 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-navy/70 transition duration-200 hover:scale-105 hover:border-gold hover:bg-white hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 dark:bg-navy-soft/40 dark:text-cream/70 dark:hover:bg-navy-soft sm:text-base"
          >
            {brand.name}
          </a>
        ))}
      </div>
    </div>
  );
}

export function BrandMarquee() {
  return (
    <div className="flex flex-col gap-4">
      <BrandMarqueeRow brands={fashionBrands} />
      <BrandMarqueeRow brands={sportsBrands} reverse />
      <BrandMarqueeRow brands={beautyBrands} />
    </div>
  );
}
