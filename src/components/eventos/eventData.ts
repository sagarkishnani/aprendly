import { useTina } from "tinacms/dist/react";
import { mediaUrl } from "../../utils/mediaUrl";

export interface PageQueryProps {
  query: string;
  variables: object;
  data: any;
}

export interface EventSummary {
  slug: string;
  title: string;
  kicker: string;
  category: string;
  upcoming: boolean;
  startDate: string;
  dateLabel: string;
  time: string;
  mode: string;
  place: string;
  levels: string;
  price: number | null;
  priceNote: string;
  seats: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  teaser: string;
  attendees: number | null;
  registered: number | null;
  nps: number | null;
}

export interface EventLabels {
  dates?: string | null;
  time?: string | null;
  levels?: string | null;
  investment?: string | null;
  nps?: string | null;
  attendees?: string | null;
  participants?: string | null;
  viewEvent?: string | null;
  upcomingCta?: string | null;
}

export function usePageData<T = any>({ query, variables, data }: PageQueryProps, collection: string): T | undefined {
  const { data: liveData } = useTina({ query, variables, data });
  return liveData?.[collection] ?? undefined;
}

export function toEventSummary(node: any): EventSummary {
  return {
    slug: node?._sys?.filename ?? "",
    title: node?.title ?? "",
    kicker: node?.kicker ?? "",
    category: node?.category ?? "",
    upcoming: !!node?.upcoming,
    startDate: node?.startDate ?? "",
    dateLabel: node?.dateLabel ?? "",
    time: node?.time ?? "",
    mode: node?.mode ?? "",
    place: node?.place ?? "",
    levels: node?.levels ?? "",
    price: typeof node?.price === "number" ? node.price : null,
    priceNote: node?.priceNote ?? "",
    seats: node?.seats ?? "",
    image: mediaUrl(node?.image),
    imageAlt: node?.imageAlt || node?.title || "",
    excerpt: node?.excerpt ?? "",
    teaser: node?.teaser ?? "",
    attendees: typeof node?.attendees === "number" ? node.attendees : null,
    registered: typeof node?.registered === "number" ? node.registered : null,
    nps: typeof node?.nps === "number" ? node.nps : null,
  };
}

function byStartDateDesc(a: EventSummary, b: EventSummary): number {
  return (b.startDate || "").localeCompare(a.startDate || "");
}

export function sortEvents(events: EventSummary[]): EventSummary[] {
  const upcoming = events.filter((event) => event.upcoming).sort((a, b) => -byStartDateDesc(a, b));
  const past = events.filter((event) => !event.upcoming).sort(byStartDateDesc);
  return [...upcoming, ...past];
}

export function eventHref(slug: string): string {
  return `/eventos/${slug}`;
}

export function registrationHref(slug: string): string {
  return `/contacto?evento=${encodeURIComponent(slug)}`;
}

export function formatSoles(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "";
  return `S/ ${Math.round(amount).toLocaleString("es-PE")}`;
}

export function isOnlineMode(mode: string): boolean {
  return mode.toLowerCase().startsWith("online");
}

export function modeTag(mode: string): string {
  return isOnlineMode(mode) ? "Online" : mode;
}

export function attendeesLabel(event: EventSummary, labels: EventLabels | null | undefined): string {
  return (event.registered ? labels?.participants : labels?.attendees) || "";
}
