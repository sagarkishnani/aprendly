export function formatPostDate(date: string | null | undefined, locale: string) {
  if (!date) return "";
  return new Date(date).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
}
