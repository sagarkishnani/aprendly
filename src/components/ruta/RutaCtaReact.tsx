import { useTina } from "tinacms/dist/react";
import StartTodayBanner from "./StartTodayBanner";
import type { TinaPageProps } from "./types";

export default function RutaCtaReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const cta = data?.rutaPage?.cta;
  if (!cta?.title) return <div hidden />;
  return <StartTodayBanner cta={cta} />;
}
