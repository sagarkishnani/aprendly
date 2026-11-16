import { useTina, tinaField } from "tinacms/dist/react";
import { SectionEyebrow, SectionTitle } from "./SectionIntro";
import type { TinaPageProps } from "../ruta/types";

function PurposeCard({ item, icon, iconTone, delay }: { item: any; icon: string; iconTone: string; delay: number }) {
  if (!item?.title) return null;
  return (
    <div className="flex gap-5 rounded-[28px] bg-brand-primary-lightest p-6 md:p-8" suppressHydrationWarning data-reveal="up" data-delay={String(delay)}>
      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] ${iconTone}`}>
        <img src={icon} alt="" className="h-7 w-7 brightness-0 invert" />
      </span>
      <div>
        <h3 className="mb-2 text-[22px] font-bold" data-tina-field={tinaField(item, "title")}>{item.title}</h3>
        <p className="text-[15px] leading-[1.7] text-content-muted" data-tina-field={tinaField(item, "text")}>{item.text}</p>
      </div>
    </div>
  );
}

export default function NosotrosAboutReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const about = data?.nosotrosPage?.about;
  if (!about) return <div hidden />;

  return (
    <section className="py-20 md:py-[120px]">
      <div className="container-xl grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionEyebrow owner={about} />
          <SectionTitle owner={about} className="mb-5" />
          <p className="text-[17px] leading-[1.7] text-content-muted" suppressHydrationWarning data-reveal="up" data-delay="140" data-tina-field={tinaField(about, "text")}>
            {about.text}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <PurposeCard item={about.mission} icon="/images/icon-rocket.svg" iconTone="bg-brand-primary" delay={100} />
          <PurposeCard item={about.vision} icon="/images/icon-eye.svg" iconTone="bg-brand-pink" delay={200} />
        </div>
      </div>
    </section>
  );
}
