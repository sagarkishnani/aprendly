import { useTina, tinaField } from "tinacms/dist/react";
import { SectionEyebrow, SectionTitle } from "./SectionIntro";
import { mediaUrl } from "../../utils/mediaUrl";
import type { TinaPageProps } from "../ruta/types";

export default function NosotrosTeamReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const team = data?.nosotrosPage?.team;
  if (!team) return <div hidden />;

  return (
    <section className="py-20 md:py-[120px]">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {(team.photos || []).slice(0, 2).map((photo: any, index: number) => (
            <div
              key={index}
              className={`h-[260px] overflow-hidden rounded-[28px] sm:h-[420px] ${index === 0 ? "mt-12" : ""}`}
              suppressHydrationWarning data-reveal="up"
              data-delay={String(index * 120)}
            >
              <img
                src={mediaUrl(photo.image)}
                alt={photo.alt || ""}
                loading="lazy"
                className="block h-full w-full object-cover object-[50%_25%]"
                data-tina-field={tinaField(photo)}
              />
            </div>
          ))}
        </div>
        <div>
          <SectionEyebrow owner={team} />
          <SectionTitle owner={team} className="mb-5" />
          <p className="mb-7 text-[17px] leading-[1.7] text-content-muted" suppressHydrationWarning data-reveal="up" data-delay="140" data-tina-field={tinaField(team, "text")}>
            {team.text}
          </p>
          <ul className="flex flex-wrap gap-2" suppressHydrationWarning data-reveal="up" data-delay="200">
            {(team.certifications || []).map((certification: string, index: number) => (
              <li key={index} className="rounded-full bg-brand-primary-lightest px-4 py-2.5 text-body-sm font-semibold" data-tina-field={tinaField(team, "certifications", index)}>
                {certification}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
