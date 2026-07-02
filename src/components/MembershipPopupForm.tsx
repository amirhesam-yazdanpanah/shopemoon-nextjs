"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale } from "@/context/providers";
import { isValidDateString, isFutureDate, isValidWhatsAppNumber } from "@/lib/validation";

type SubmitStatus = "idle" | "success" | "error";

const SUCCESS_AUTO_CLOSE_MS = 2500;

const initialForm = {
  name: "",
  whatsapp: "",
  gender: "",
  birthDate: "",
  address: "",
};

export function MembershipPopupForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const { dict } = useLocale();
  const [form, setForm] = useState(initialForm);
  const [whatsappError, setWhatsappError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const closeTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current);
  }, []);

  const inputClass =
    "rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    if (!isValidWhatsAppNumber(form.whatsapp)) {
      setWhatsappError(dict.membership.fields.whatsappInvalidError);
      return;
    }
    setWhatsappError("");

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
        body: JSON.stringify({ ...form, brands: "", details: "" }),
      });
      if (!response.ok) throw new Error("Membership submission failed");
      setStatus("success");
      setForm(initialForm);
      closeTimerRef.current = window.setTimeout(() => onSubmitted?.(), SUCCESS_AUTO_CLOSE_MS);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "success") {
    return (
      <p className="whitespace-pre-line text-center text-sm font-semibold text-gold" role="status">
        {dict.membershipModal.successMessage}
      </p>
    );
  }

  return (
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

      <div className="grid gap-2">
        <label htmlFor="popup-whatsapp" className="text-sm font-semibold">
          {dict.membership.fields.whatsapp}
        </label>
        <input
          id="popup-whatsapp"
          type="tel"
          required
          value={form.whatsapp}
          onChange={(e) => {
            setWhatsappError("");
            setForm((f) => ({ ...f, whatsapp: e.target.value }));
          }}
          aria-invalid={Boolean(whatsappError)}
          aria-describedby={whatsappError ? "popup-whatsapp-error" : undefined}
          className={inputClass}
        />
        {whatsappError ? (
          <p id="popup-whatsapp-error" className="text-xs font-semibold text-red-600">
            {whatsappError}
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
  );
}
