import type { CSSProperties } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { SectionEyebrow, SectionTitle } from "./SectionIntro";
import { mediaUrl } from "../../utils/mediaUrl";
import type { TinaPageProps } from "../ruta/types";

const DEFAULT_LOGO_HEIGHT = 64;

export default function NosotrosPartnersReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const partners = data?.nosotrosPage?.partners;
  if (!partners?.logos?.length) return <div hidden />;

  return (
    <section className="pb-20 md:pb-[120px]">
      <div className="container-xl">
        <div className="mb-11 flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
          <div>
            <SectionEyebrow owner={partners} />
            <SectionTitle owner={partners} className="max-w-[620px]" />
          </div>
          <p className="max-w-[400px] text-body-md leading-[1.65] text-content-muted" suppressHydrationWarning data-reveal="up" data-delay="140" data-tina-field={tinaField(partners, "text")}>
            {partners.text}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
          {partners.logos.map((partner: any, index: number) => (
            <li
              key={index}
              className="flex h-[120px] items-center justify-center rounded-[28px] border-[1.5px] border-line p-5 transition-transform duration-500 ease-out-expo hover:-translate-y-1 md:h-[180px] md:p-8"
              suppressHydrationWarning data-reveal="up"
              data-delay={String((index % 3) * 90)}
              data-tina-field={tinaField(partner)}
            >
              <img
                src={mediaUrl(partner.logo)}
                alt={partner.name || ""}
                loading="lazy"
                className="block max-h-[calc(var(--logo-h)*0.7)] max-w-[80%] mix-blend-multiply md:max-h-[var(--logo-h)]"
                style={{ "--logo-h": `${partner.maxHeight || DEFAULT_LOGO_HEIGHT}px` } as CSSProperties}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
