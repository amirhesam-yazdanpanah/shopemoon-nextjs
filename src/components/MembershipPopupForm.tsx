"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/context/providers";
import { isValidDateString, isFutureDate, isEnglishDigitsOnlyPhone } from "@/lib/validation";

type SubmitStatus = "idle" | "error";

const TOAST_DURATION_MS = 2200;

const initialForm = {
  name: "",
  whatsapp: "",
  gender: "",
  birthDate: "",
  address: "",
};

interface MembershipApiResponse {
  success: boolean;
  code?: string;
  message?: string;
  discountCode?: string;
}

function ClipboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="8" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MembershipSuccessCard({
  discountCode,
  onCopy,
}: {
  discountCode: string;
  onCopy: () => void;
}) {
  const { dict } = useLocale();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      role="status"
      className={`rounded-2xl border border-emerald-300/70 bg-emerald-50 p-6 text-center shadow-card transition-all duration-500 ease-out dark:border-emerald-700/40 dark:bg-emerald-950/30 ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
        {dict.membershipModal.successTitle}
      </h3>
      <p className="mt-2 text-sm text-navy-soft dark:text-cream-dark">{dict.membershipModal.successCodeIntro}</p>

      <div className="mx-auto mt-4 w-fit rounded-xl border-2 border-gold bg-white px-8 py-4 shadow-soft dark:bg-navy-soft/50">
        <span dir="ltr" className="text-2xl font-black tracking-[0.2em] text-gold">
          {discountCode}
        </span>
      </div>

      <p className="mt-3 text-xs text-navy-soft dark:text-cream-dark">{dict.membershipModal.successCodeNote}</p>

      <button
        type="button"
        onClick={onCopy}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-5 py-2.5 text-sm font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft"
      >
        <ClipboardIcon />
        {dict.membershipModal.copyCode}
      </button>
    </div>
  );
}

export function MembershipPopupForm() {
  const { dict } = useLocale();
  const [form, setForm] = useState(initialForm);
  const [phoneError, setPhoneError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(toastTimerRef.current);
  }, []);

  function showToast(message: string) {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }

  const inputClass =
    "rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    if (!isEnglishDigitsOnlyPhone(form.whatsapp)) {
      setPhoneError(dict.membership.fields.phoneEnglishDigitsError);
      return;
    }
    setPhoneError("");

    if (form.birthDate) {
      if (!isValidDateString(form.birthDate)) {
        setBirthDateError(dict.membership.fields.birthDateInvalidError);
        return;
      }
      if (isFutureDate(form.birthDate)) {
        setBirthDateError(dict.membership.fields.birthDateFutureError);
        return;
      }
    }
    setBirthDateError("");

    setSubmitting(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, brands: "", details: "", source: "Membership Popup" }),
      });
      const result: MembershipApiResponse = await response.json();

      if (response.status === 409) {
        setPhoneError(dict.membership.fields.phoneDuplicateError);
        showToast(dict.membership.fields.phoneDuplicateError);
        return;
      }

      if (!response.ok || !result.success || !result.discountCode) {
        setStatus("error");
        return;
      }

      setDiscountCode(result.discountCode);
      setForm(initialForm);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopyCode() {
    if (!discountCode) return;
    try {
      await navigator.clipboard.writeText(discountCode);
      showToast(dict.membershipModal.copiedToast);
    } catch {
      // clipboard access denied — silently ignore, code is still visible on screen
    }
  }

  if (discountCode) {
    return (
      <div className="relative">
        <MembershipSuccessCard discountCode={discountCode} onCopy={handleCopyCode} />
        {toast ? (
          <div
            role="status"
            className="pointer-events-none absolute inset-x-0 -bottom-3 mx-auto w-fit translate-y-full rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-cream shadow-soft dark:bg-cream dark:text-navy"
          >
            {toast}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="popup-name" className="text-sm font-semibold">
            {dict.membership.fields.name}
          </label>
          <input
            id="popup-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="popup-phone" className="text-sm font-semibold">
            {dict.membership.fields.phone}
          </label>
          <p className="text-right text-xs text-gray-500 dark:text-gray-400">
            {dict.membership.fields.phoneHelperText}
          </p>
          <input
            id="popup-phone"
            type="tel"
            required
            value={form.whatsapp}
            onChange={(e) => {
              setPhoneError("");
              setForm((f) => ({ ...f, whatsapp: e.target.value }));
            }}
            aria-invalid={Boolean(phoneError)}
            aria-describedby={phoneError ? "popup-phone-error" : undefined}
            className={`${inputClass} mt-1`}
          />
          {phoneError ? (
            <p id="popup-phone-error" className="text-xs font-semibold text-red-600">
              {phoneError}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="popup-gender" className="text-sm font-semibold">
              {dict.membership.fields.gender}
            </label>
            <select
              id="popup-gender"
              value={form.gender}
              onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
              className={inputClass}
            >
              <option value="">{dict.membership.fields.genderPlaceholder}</option>
              <option value="female">{dict.membership.fields.genderOptions.female}</option>
              <option value="male">{dict.membership.fields.genderOptions.male}</option>
              <option value="preferNotToSay">{dict.membership.fields.genderOptions.preferNotToSay}</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="popup-birthDate" className="text-sm font-semibold">
              {dict.membership.fields.birthDate}
            </label>
            <input
              id="popup-birthDate"
              type="date"
              value={form.birthDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                setBirthDateError("");
                setForm((f) => ({ ...f, birthDate: e.target.value }));
              }}
              placeholder={dict.membership.fields.birthDatePlaceholder}
              aria-invalid={Boolean(birthDateError)}
              aria-describedby={birthDateError ? "popup-birthDate-error" : undefined}
              className={inputClass}
            />
            {birthDateError ? (
              <p id="popup-birthDate-error" className="text-xs font-semibold text-red-600">
                {birthDateError}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor="popup-address" className="text-sm font-semibold">
            {dict.membership.fields.address}
          </label>
          <input
            id="popup-address"
            value={form.address}
            onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            placeholder={dict.membership.fields.addressPlaceholder}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? dict.membership.submitting : dict.membershipModal.submit}
        </button>

        {status === "error" ? (
          <p className="text-center text-sm font-semibold text-red-600" role="alert">
            {dict.membership.errorMessage}
          </p>
        ) : null}
      </form>

      {toast ? (
        <div
          role="status"
          className="pointer-events-none absolute inset-x-0 -bottom-3 mx-auto w-fit translate-y-full rounded-full bg-navy px-4 py-1.5 text-xs font-semibold text-cream shadow-soft dark:bg-cream dark:text-navy"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}
