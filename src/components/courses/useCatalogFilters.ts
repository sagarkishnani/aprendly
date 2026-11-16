import { useEffect, useMemo, useRef, useState } from "react";
import { courseCoversLevel, type CourseSummary } from "./courseUtils";

export type SortKey = "pop" | "rate" | "low" | "high";

export interface CatalogFilters {
  type: string;
  goal: string;
  level: string | null;
  liveOnly: boolean;
  sort: SortKey;
}

const DEFAULT_FILTERS: CatalogFilters = { type: "all", goal: "all", level: null, liveOnly: false, sort: "pop" };

const SORTERS: Record<SortKey, (a: CourseSummary, b: CourseSummary) => number> = {
  pop: (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0),
  rate: (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  low: (a, b) => (a.price ?? 0) - (b.price ?? 0),
  high: (a, b) => (b.price ?? 0) - (a.price ?? 0),
};

const SORT_KEYS = Object.keys(SORTERS) as SortKey[];

function readFiltersFromUrl(): CatalogFilters {
  const params = new URLSearchParams(window.location.search);
  const sort = params.get("orden") as SortKey | null;
  return {
    type: params.get("tipo") || "all",
    goal: params.get("objetivo") || "all",
    level: params.get("nivel"),
    liveOnly: params.get("envivo") === "1",
    sort: sort && SORT_KEYS.includes(sort) ? sort : "pop",
  };
}

function writeFiltersToUrl(filters: CatalogFilters) {
  const params = new URLSearchParams(window.location.search);
  const entries: Record<string, string | null> = {
    tipo: filters.type !== "all" ? filters.type : null,
    objetivo: filters.goal !== "all" ? filters.goal : null,
    nivel: filters.level,
    envivo: filters.liveOnly ? "1" : null,
    orden: filters.sort !== "pop" ? filters.sort : null,
  };
  Object.entries(entries).forEach(([key, value]) => (value ? params.set(key, value) : params.delete(key)));
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  window.history.replaceState(window.history.state, "", url);
}

function matches(course: CourseSummary, filters: CatalogFilters): boolean {
  if (filters.type !== "all" && course.type !== filters.type) return false;
  if (filters.goal !== "all" && course.goal !== filters.goal) return false;
  if (filters.level && !courseCoversLevel(course, filters.level)) return false;
  if (filters.liveOnly && !course.live) return false;
  return true;
}

export function useCatalogFilters(courses: CourseSummary[]) {
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);
  const hasReadUrl = useRef(false);

  useEffect(() => {
    if (hasReadUrl.current) writeFiltersToUrl(filters);
  }, [filters]);

  useEffect(() => {
    setFilters(readFiltersFromUrl());
    hasReadUrl.current = true;
  }, []);

  const results = useMemo(
    () => courses.filter((course) => matches(course, filters)).sort(SORTERS[filters.sort]),
    [courses, filters],
  );

  const update = (patch: Partial<CatalogFilters>) => setFilters((current) => ({ ...current, ...patch }));
  const reset = () => setFilters((current) => ({ ...DEFAULT_FILTERS, sort: current.sort }));

  return { filters, results, update, reset };
}
