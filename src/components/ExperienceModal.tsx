"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useExperienceModal, useMembershipModal, useLocale } from "@/context/providers";
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
  const { isOpen, openModal, closeModal } = useExperienceModal();
  const { promptResolved: membershipPromptResolved } = useMembershipModal();
  const [visible, setVisible] = useState(false);
  const autoTriggeredRef = useRef(false);

  // Automatic trigger: 15s timer OR 50% scroll, whichever fires first —
  // gated by the 7-day localStorage suppression window. A manual open via
  // the navbar button (openModal from context) bypasses this entirely.
  const triggerAutoOpen = useCallback(() => {
    if (autoTriggeredRef.current || isSuppressed()) return;
    autoTriggeredRef.current = true;
    suppressForDays(SUPPRESS_DAYS);
    openModal();
  }, [openModal]);

  // This is the SECOND popup: it must never appear before or alongside the
  // membership popup, so the auto-trigger stays fully disarmed (no timer,
  // no scroll listener) until membershipPromptResolved flips true.
  useEffect(() => {
    if (isSuppressed() || !membershipPromptResolved) return;

    const timer = window.setTimeout(triggerAutoOpen, TIME_TRIGGER_MS);

    function handleScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER_RATIO) {
        triggerAutoOpen();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [triggerAutoOpen, membershipPromptResolved]);

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [isOpen]);

  function close() {
    setVisible(false);
    window.setTimeout(closeModal, 200);
  }

  if (!isOpen) return null;

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

        <div className="text-center">
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{dict.experience.teaserTitle}</h2>
          <p className="mx-auto mt-4 max-w-sm whitespace-pre-line leading-relaxed text-navy-soft dark:text-cream-dark">
            {dict.experience.teaserDesc}
          </p>
        </div>

        <div className="mt-8">
          <ExperienceForm />
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={close}
            className="text-sm font-semibold text-navy-soft underline-offset-2 transition hover:text-gold hover:underline dark:text-cream-dark"
          >
            {dict.experience.teaserLater}
          </button>
        </div>
      </div>
    </div>
  );
}
