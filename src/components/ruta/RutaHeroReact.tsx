import { useTina, tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import { mediaUrl } from "../../utils/mediaUrl";
import type { TinaPageProps } from "./types";

const SKILL_TONES: Record<string, string> = {
  pink: "bg-brand-pink",
  purple: "bg-brand-primary",
};

function DiagnosticCard({ result }: { result: any }) {
  return (
    <div className="w-[min(290px,calc(100vw-56px))] rounded-2xl bg-white p-[22px] shadow-float">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-body-sm font-semibold" data-tina-field={tinaField(result, "title")}>{result.title}</span>
        <span className="rounded-full bg-brand-primary px-2.5 py-1 text-caption-md font-bold text-white" data-tina-field={tinaField(result, "level")}>
          {result.level}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5 text-caption-sm">
        {(result.skills || []).map((skill: any, index: number) => (
          <li key={index} data-tina-field={tinaField(skill)}>
            <div className="mb-1 flex justify-between">
              <span>{skill.name}</span>
              <span className="text-content-subtle">{skill.percent}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-brand-primary-lightest">
              <div className={`h-full rounded-full ${SKILL_TONES[skill.tone] || SKILL_TONES.purple}`} style={{ width: `${skill.percent || 0}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function RutaHeroReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const hero = data?.rutaPage?.hero;
  if (!hero) return <div hidden />;

  return (
    <section className="pb-20 pt-10 md:pt-[72px] lg:pb-[120px]">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
        <div>
          <Eyebrow variant="pink" tilted className="mb-6" suppressHydrationWarning data-reveal="up" data-tina-field={tinaField(hero, "eyebrow")}>
            {hero.eyebrow}
          </Eyebrow>
          <h1 className="mb-6 text-heading-xl" suppressHydrationWarning data-reveal="up" data-delay="80">
            <span data-tina-field={tinaField(hero, "titleLead")}>{hero.titleLead}</span>{" "}
            <span className="text-accent" data-tina-field={tinaField(hero, "titleHighlight")}>{hero.titleHighlight}</span>
          </h1>
          <p className="mb-10 max-w-[520px] text-body-lg text-content-muted" suppressHydrationWarning data-reveal="up" data-delay="160" data-tina-field={tinaField(hero, "text")}>
            {hero.text}
          </p>
          <div className="flex flex-wrap gap-3" suppressHydrationWarning data-reveal="up" data-delay="240">
            {hero.primary?.label && (
              <ArrowLink href={hero.primary.url || "#simulador"} size="lg" data-tina-field={tinaField(hero, "primary")}>
                {hero.primary.label}
              </ArrowLink>
            )}
            {hero.secondary?.label && (
              <ArrowLink href={hero.secondary.url || "/contacto"} variant="outline" size="lg" data-tina-field={tinaField(hero, "secondary")}>
                {hero.secondary.label}
              </ArrowLink>
            )}
          </div>
        </div>

        <div className="relative h-[440px] sm:h-[540px] lg:h-[620px]">
          <div className="absolute inset-y-0 left-6 right-0 overflow-hidden rounded-4xl bg-brand-primary-lightest lg:left-10" suppressHydrationWarning data-reveal="scale">
            <div className="h-full w-full" suppressHydrationWarning data-zoomin>
              <img
                src={mediaUrl(hero.image)}
                alt={hero.imageAlt || ""}
                className="block h-full w-full object-cover"
                data-tina-field={tinaField(hero, "image")}
              />
            </div>
          </div>
          {hero.result && (
            <div className="absolute bottom-8 left-0 lg:bottom-14">
              <div suppressHydrationWarning data-speed="0.14">
                <DiagnosticCard result={hero.result} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
