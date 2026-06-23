"use client";

import { useRef, type MouseEvent, type TouchEvent } from "react";
import { allBrands } from "@/lib/dictionary";

const BASE_DURATION = 38; // seconds, matches CSS default in globals.css

export function BrandMarquee() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const rect = container.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width; // 0..1
    const speedFactor = 0.5 + Math.abs(ratio - 0.5) * 1.5;
    track.style.animationDuration = `${BASE_DURATION / speedFactor}s`;
    track.style.animationDirection = ratio < 0.5 ? "reverse" : "normal";
  }

  function handleMouseLeave() {
    const track = trackRef.current;
    if (!track) return;
    track.style.animationDuration = `${BASE_DURATION}s`;
    track.style.animationDirection = "normal";
  }

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    touchStartX.current = e.touches[0].clientX;
    const track = trackRef.current;
    if (track) track.style.animationPlayState = "paused";
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track || touchStartX.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    track.style.animationDirection = dx < 0 ? "normal" : "reverse";
  }

  function handleTouchEnd() {
    touchStartX.current = null;
    const track = trackRef.current;
    if (track) track.style.animationPlayState = "running";
  }

  const loopedBrands = [...allBrands, ...allBrands];

  return (
    <div
      ref={containerRef}
      className="brand-marquee"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div ref={trackRef} className="brand-marquee-track">
        {loopedBrands.map((brand, index) => (
          <a
            key={`${brand.name}-${index}`}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            title="مشاهده وب‌سایت رسمی برند"
            aria-label={`مشاهده وب‌سایت رسمی ${brand.name} (در تب جدید باز می‌شود)`}
            className="group relative inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gold-soft/40 bg-white/60 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-navy/70 transition duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-gold hover:bg-white hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 dark:bg-navy-soft/40 dark:text-cream/70 dark:hover:bg-navy-soft sm:text-base"
          >
            <span
              role="tooltip"
              className="pointer-events-none absolute -top-9 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-navy px-3 py-1.5 text-xs font-medium text-cream opacity-0 shadow-soft transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-cream dark:text-navy"
            >
              مشاهده وب‌سایت رسمی برند
            </span>

            {brand.name}

            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="shrink-0 scale-75 opacity-0 transition duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
            >
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
