export const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

export interface CourseSummary {
  slug: string;
  title: string;
  type: string;
  goal: string;
  levelFrom?: string | null;
  levelTo?: string | null;
  image?: string | null;
  imageAlt?: string | null;
  price?: number | null;
  priceUnit?: string | null;
  lessons?: string | null;
  duration?: string | null;
  students?: number | null;
  rating?: number | null;
  popularity?: number | null;
  bestSeller?: boolean | null;
  isNew?: boolean | null;
  live?: boolean | null;
}

export function formatPrice(amount: number): string {
  return `S/ ${Math.round(amount).toLocaleString("en-US")}`;
}

export function formatCount(amount: number): string {
  return amount.toLocaleString("en-US");
}

export function levelIndex(level?: string | null): number {
  return level ? CEFR_LEVELS.indexOf(level as (typeof CEFR_LEVELS)[number]) : -1;
}

export function courseCoversLevel(course: CourseSummary, level: string): boolean {
  const target = levelIndex(level);
  const from = levelIndex(course.levelFrom);
  const to = levelIndex(course.levelTo);
  if (from < 0 && to < 0) return true;
  return target >= Math.max(from, 0) && target <= (to < 0 ? CEFR_LEVELS.length - 1 : to);
}

export function courseHref(slug: string): string {
  return `/cursos/${slug}`;
}

export function withQuery(url: string, params: Record<string, string | undefined>): string {
  const [path, existing = ""] = url.split("?");
  const search = new URLSearchParams(existing);
  Object.entries(params).forEach(([key, value]) => {
    if (value) search.set(key, value);
  });
  const query = search.toString();
  return query ? `${path}?${query}` : path;
}

export function slugFromPath(relativePath: string): string {
  return relativePath.replace(/\.json$/, "");
}
