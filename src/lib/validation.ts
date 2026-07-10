export function isValidDateString(value: string) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

export function isFutureDate(value: string) {
  const date = new Date(value);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date.getTime() > today.getTime();
}

export function isValidPhoneNumber(value: string) {
  if (!/^[\d\s+()-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

/** Strips spaces and common formatting characters, leaving digits (and any non-English digits, so callers can still detect them). */
export function normalizePhoneDigits(value: string) {
  return value.replace(/[\s\-()+]/g, "");
}

/**
 * Stricter than isValidPhoneNumber: rejects Persian/Arabic digits, letters, and any
 * character outside 0-9 after normalization. Mirrors the server-side check in the
 * membership n8n workflow so client and backend agree on what counts as valid.
 */
export function isEnglishDigitsOnlyPhone(value: string) {
  const normalized = normalizePhoneDigits(value);
  return /^[0-9]+$/.test(normalized) && normalized.length >= 8 && normalized.length <= 15;
}
