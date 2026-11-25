const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** 450000 -> "₦450,000" */
export const formatNaira = (amount: number) => naira.format(amount);

/** Values still waiting on real business details are written as "[ADD …]" in /content. */
export const isPlaceholder = (value: string) => value.trim() === "" || value.trim().startsWith("[");

/**
 * Builds a wa.me link with a prefilled message.
 * `number` must be in international format without "+" or spaces, e.g. 2348012345678.
 */
export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
