"use client";

import { useState, type FormEvent } from "react";
import { useLocale } from "@/context/providers";
import { isValidDateString, isFutureDate, isValidWhatsAppNumber } from "@/lib/validation";

type SubmitStatus = "idle" | "success" | "error";

const initialForm = {
  name: "",
  whatsapp: "",
  brands: "",
  details: "",
  address: "",
  gender: "",
  birthDate: "",
};

export function Membership() {
  const { dict } = useLocale();
  const [form, setForm] = useState(initialForm);
  const [whatsappError, setWhatsappError] = useState("");
  const [birthDateError, setBirthDateError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

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
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Membership submission failed");
      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "rounded-lg border border-gold-soft/60 bg-white px-4 py-3 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold-soft dark:bg-navy-soft/40";

  return (
    <section id="membership" className="bg-cream-dark px-5 py-20 dark:bg-navy-soft/20">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">{dict.membership.title}</h2>
        <p className="mx-auto mt-4 max-w-md text-center leading-relaxed text-navy-soft dark:text-cream-dark">
          {dict.membership.desc}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-5 rounded-xl2 bg-cream p-6 shadow-soft dark:bg-navy-dark sm:p-10"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              {dict.membership.fields.name}
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="whatsapp" className="text-sm font-semibold">
              {dict.membership.fields.whatsapp}
            </label>
            <input
              id="whatsapp"
              type="tel"
              required
              value={form.whatsapp}
              onChange={(e) => {
                setWhatsappError("");
                setForm((f) => ({ ...f, whatsapp: e.target.value }));
              }}
              aria-invalid={Boolean(whatsappError)}
              aria-describedby={whatsappError ? "whatsapp-error" : undefined}
              className={inputClass}
            />
            {whatsappError ? (
              <p id="whatsapp-error" className="text-xs font-semibold text-red-600">
                {whatsappError}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="brands" className="text-sm font-semibold">
                {dict.membership.fields.brands}
              </label>
              <input
                id="brands"
                value={form.brands}
                onChange={(e) => setForm((f) => ({ ...f, brands: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="address" className="text-sm font-semibold">
                {dict.membership.fields.address}
              </label>
              <input
                id="address"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder={dict.membership.fields.addressPlaceholder}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="gender" className="text-sm font-semibold">
                {dict.membership.fields.gender}
              </label>
              <select
                id="gender"
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
              <label htmlFor="birthDate" className="text-sm font-semibold">
                {dict.membership.fields.birthDate}
              </label>
              <input
                id="birthDate"
                type="date"
                value={form.birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setBirthDateError("");
                  setForm((f) => ({ ...f, birthDate: e.target.value }));
                }}
                placeholder={dict.membership.fields.birthDatePlaceholder}
                aria-invalid={Boolean(birthDateError)}
                aria-describedby={birthDateError ? "birthDate-error" : undefined}
                className={inputClass}
              />
              {birthDateError ? (
                <p id="birthDate-error" className="text-xs font-semibold text-red-600">
                  {birthDateError}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="details" className="text-sm font-semibold">
              {dict.membership.fields.details}
            </label>
            <textarea
              id="details"
              rows={4}
              value={form.details}
              onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-gradient-to-br from-gold to-gold-light px-8 py-4 text-base font-bold text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? dict.membership.submitting : dict.membership.submit}
          </button>

          {status === "success" ? (
            <p className="whitespace-pre-line text-center text-sm font-semibold text-gold" role="status">
              {dict.membership.successMessage}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-center text-sm font-semibold text-red-600" role="alert">
              {dict.membership.errorMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
