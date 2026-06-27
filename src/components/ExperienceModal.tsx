"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/context/providers";
import { ExperienceForm } from "./ExperienceForm";

const STORAGE_KEY = "sm-experience-modal-until";
const SUPPRESS_DAYS = 7;
const SCROLL_TRIGGER_RATIO = 0.5;
const TIME_TRIGGER_MS = 15000;

function isSuppressed() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;
  const until = Number(stored);
  return Number.isFinite(until) && Date.now() < until;
}

function suppressForDays(days: number) {
  const until = Date.now() + days * 24 * 60 * 60 * 1000;
  window.localStorage.setItem(STORAGE_KEY, String(until));
}

export function ExperienceModal() {
  const { dict, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const triggeredRef = useRef(false);

  const triggerOpen = useCallback(() => {
    if (triggeredRef.current || isSuppressed()) return;
    triggeredRef.current = true;
    suppressForDays(SUPPRESS_DAYS);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (isSuppressed()) return;

    const timer = window.setTimeout(triggerOpen, TIME_TRIGGER_MS);

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER_RATIO) {
        triggerOpen();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [triggerOpen]);

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [open]);

  function close() {
    setVisible(false);
    window.setTimeout(() => {
      setOpen(false);
      setShowForm(false);
    }, 200);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      dir={dict.dir}
      lang={locale}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 px-4 backdrop-blur-sm transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl2 bg-cream p-6 shadow-soft transition duration-200 dark:bg-navy-dark sm:p-8 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="close"
          className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream-dark text-navy/70 transition hover:bg-gold-soft dark:bg-navy-soft/60 dark:text-cream/70"
        >
          ✕
        </button>

        {showForm ? (
          <ExperienceForm onSubmitted={close} />
        ) : (
          <div className="text-center">
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{dict.experience.teaserTitle}</h2>
            <p className="mx-auto mt-4 max-w-sm leading-relaxed text-navy-soft dark:text-cream-dark">
              {dict.experience.teaserDesc}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-3 font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                {dict.experience.teaserCta}
              </button>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-gold-soft bg-white/70 px-8 py-3 font-bold text-navy transition hover:bg-cream-dark dark:bg-navy-soft/60 dark:text-cream"
              >
                {dict.experience.teaserLater}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
