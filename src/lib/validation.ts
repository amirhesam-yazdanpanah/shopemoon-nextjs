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

export function isValidWhatsAppNumber(value: string) {
  if (!/^[\d\s+()-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}
