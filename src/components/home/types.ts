import { useTina } from "tinacms/dist/react";

export interface HomeQueryProps {
  query: string;
  variables: object;
  data: any;
}

export interface HomeCourse {
  slug: string;
  title: string;
  tag: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  price: number | null;
  priceUnit: string;
  levelsLabel: string;
  format: string;
  levelFrom: string;
  duration: string;
}

export interface HomeTeacher {
  name: string;
  tag: string;
  bio: string;
  skills: string[];
  image: string;
}

export interface HomeEvent {
  slug: string;
  title: string;
  kicker: string;
  dateLabel: string;
  time: string;
  mode: string;
  place: string;
  levels: string;
  price: number | null;
  priceNote: string;
  image: string;
  excerpt: string;
  nps: number | null;
  attendees: number | null;
}

export interface HomeTestimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

export function useHomeSection<T = any>({ query, variables, data }: HomeQueryProps, section: string): T | undefined {
  const { data: liveData } = useTina({ query, variables, data });
  return liveData?.home?.[section] ?? undefined;
}

export function formatSoles(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "";
  return `S/ ${Math.round(amount).toLocaleString("es-PE")}`;
}
