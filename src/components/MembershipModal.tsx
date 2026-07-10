"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMembershipModal, useLocale } from "@/context/providers";
import { MembershipPopupForm } from "./MembershipPopupForm";

const STORAGE_KEY = "sm-membership-modal-until";
const SUPPRESS_DAYS = 30;
const TIME_TRIGGER_MS = 2000;

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

export function MembershipModal() {
  const { dict, locale } = useLocale();
  const { isOpen, openModal, closeModal, resolvePrompt } = useMembershipModal();
  const [visible, setVisible] = useState(false);
  const autoTriggeredRef = useRef(false);

  // This is the FIRST popup a visitor sees. It fires shortly after page
  // load (no scroll gating, unlike the experience popup) and, once it
  // resolves (dismissed or submitted), signals resolvePrompt() so the
  // experience popup's own auto-trigger is allowed to start. If it's
  // suppressed (already shown recently), resolve immediately so the
  // experience popup isn't stuck waiting on a popup that will never show.
  useEffect(() => {
    if (isSuppressed()) {
      resolvePrompt();
      return;
    }

    const timer = window.setTimeout(() => {
      if (autoTriggeredRef.current) return;
      autoTriggeredRef.current = true;
      suppressForDays(SUPPRESS_DAYS);
      openModal();
    }, TIME_TRIGGER_MS);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [isOpen]);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      closeModal();
      resolvePrompt();
    }, 200);
  }, [closeModal, resolvePrompt]);

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
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{dict.membershipModal.teaserTitle}</h2>
          <p className="mx-auto mt-4 max-w-sm whitespace-pre-line leading-relaxed text-navy-soft dark:text-cream-dark">
            {dict.membershipModal.teaserDesc}
          </p>
        </div>

        <div className="mt-8">
          <MembershipPopupForm />
        </div>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={close}
            className="text-sm font-semibold text-navy-soft underline-offset-2 transition hover:text-gold hover:underline dark:text-cream-dark"
          >
            {dict.membershipModal.teaserLater}
          </button>
        </div>
      </div>
    </div>
  );
}
