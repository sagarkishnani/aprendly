import { tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import { mediaUrl } from "../../utils/mediaUrl";
import { usePageData, type PageQueryProps } from "../eventos/eventData";

function StatsCard({ stats }: { stats: any[] }) {
  if (stats.length === 0) return null;
  return (
    <div className="absolute bottom-0 left-0 sm:bottom-12">
      <div suppressHydrationWarning data-speed="0.12" className="flex gap-7 rounded-2xl bg-white px-[22px] py-5 shadow-float">
        {stats.map((stat, index) => (
          <div key={index} data-tina-field={tinaField(stat)}>
            <div className="text-[30px] font-bold leading-tight text-accent">{stat.value}</div>
            <div className="text-caption-sm text-content-subtle">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EmpresasHeroReact(props: PageQueryProps) {
  const hero = usePageData(props, "empresasPage")?.hero;
  if (!hero) return <div hidden />;
  const stats = (hero.stats || []).filter(Boolean);

  return (
    <section className="pb-16 pt-12 md:pb-24 md:pt-[72px]">
      <div className="container-xl grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
        <div>
          {hero.eyebrow && (
            <Eyebrow variant="pink" tilted suppressHydrationWarning data-reveal="up" className="mb-6" data-tina-field={tinaField(hero, "eyebrow")}>
              {hero.eyebrow}
            </Eyebrow>
          )}
          <h1 suppressHydrationWarning data-reveal="up" data-delay="80" className="mb-6 text-balance text-heading-xl" data-tina-field={tinaField(hero, "title")}>
            {hero.title}
          </h1>
          {hero.text && (
            <p suppressHydrationWarning data-reveal="up" data-delay="160" className="mb-10 max-w-[520px] text-body-lg text-content-muted" data-tina-field={tinaField(hero, "text")}>
              {hero.text}
            </p>
          )}
          <div suppressHydrationWarning data-reveal="up" data-delay="240" className="flex flex-wrap gap-3">
            {hero.primary?.label && (
              <ArrowLink href={hero.primary.url || "#propuesta"} size="lg" data-tina-field={tinaField(hero.primary, "label")}>
                {hero.primary.label}
              </ArrowLink>
            )}
            {hero.secondary?.label && (
              <ArrowLink href={hero.secondary.url || "#formatos"} variant="outline" size="lg" data-tina-field={tinaField(hero.secondary, "label")}>
                {hero.secondary.label}
              </ArrowLink>
            )}
          </div>
        </div>
        <div className="relative pb-24 sm:pb-16 sm:pl-10">
          <div suppressHydrationWarning data-reveal="up" className="aspect-[1014/645] overflow-hidden rounded-[28px] bg-brand-primary-lightest md:rounded-4xl">
            {hero.image && (
              <img src={mediaUrl(hero.image)} alt={hero.imageAlt || ""} className="block h-full w-full object-cover" data-tina-field={tinaField(hero, "image")} />
            )}
          </div>
          <StatsCard stats={stats} />
        </div>
      </div>
    </section>
  );
}
