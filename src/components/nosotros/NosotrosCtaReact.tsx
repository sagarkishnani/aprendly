import { useTina } from "tinacms/dist/react";
import StartTodayBanner from "../ruta/StartTodayBanner";
import type { TinaPageProps } from "../ruta/types";

export default function NosotrosCtaReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const cta = data?.nosotrosPage?.cta;
  if (!cta?.title) return <div hidden />;
  return <StartTodayBanner cta={cta} />;
}
