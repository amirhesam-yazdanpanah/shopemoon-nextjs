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

  const brandNames = allBrands.map((brand) => brand.name);
  const loopedBrands = [...brandNames, ...brandNames];

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
        {loopedBrands.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="text-sm font-semibold uppercase tracking-widest text-navy/50 dark:text-cream/50 sm:text-base"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
