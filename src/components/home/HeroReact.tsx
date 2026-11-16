import { tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import { mediaUrl } from "../../utils/mediaUrl";
import { useHomeSection, type HomeQueryProps } from "./types";

const WORD_DELAY_MS = 60;

function splitWords(text?: string | null): string[] {
  return (text || "").split(/\s+/).filter(Boolean);
}

function HeroTitle({ hero }: { hero: any }) {
  const lead = splitWords(hero.titleLead);
  const highlight = splitWords(hero.titleHighlight);
  return (
    <h1 className="mx-auto mb-[22px] mt-7 flex max-w-[760px] flex-wrap justify-center gap-x-[0.25em] gap-y-0.5 text-heading-xl">
      <span className="contents" data-tina-field={tinaField(hero, "titleLead")}>
        {lead.map((word, index) => (
          <span key={`lead-${index}`} data-reveal="up" suppressHydrationWarning data-delay={(index + 1) * WORD_DELAY_MS}>
            {word}
          </span>
        ))}
      </span>
      <span className="contents text-accent" data-tina-field={tinaField(hero, "titleHighlight")}>
        {highlight.map((word, index) => (
          <span key={`highlight-${index}`} className="text-accent" data-reveal="up" suppressHydrationWarning data-delay={(lead.length + index + 1) * WORD_DELAY_MS}>
            {word}
          </span>
        ))}
      </span>
    </h1>
  );
}

function LiveCard({ card }: { card: any }) {
  if (!card?.title) return null;
  return (
    <div className="absolute bottom-4 left-4 sm:bottom-14 sm:left-14">
      <div data-speed="0.12" suppressHydrationWarning className="flex items-center gap-3 rounded-xl bg-white px-[18px] py-3.5 text-left shadow-float">
        <span className="h-2.5 w-2.5 shrink-0 animate-live-pulse rounded-full bg-brand-pink" aria-hidden />
        <div>
          <div className="text-body-sm font-semibold text-content" data-tina-field={tinaField(card, "title")}>{card.title}</div>
          <div className="text-caption-sm text-content-subtle" data-tina-field={tinaField(card, "subtitle")}>{card.subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function ProgressCard({ card }: { card: any }) {
  if (!card?.title) return null;
  const percent = Math.max(0, Math.min(100, card.percent ?? 0));
  return (
    <div className="absolute right-4 top-4 sm:right-14 sm:top-14">
      <div data-speed="-0.12" suppressHydrationWarning className="w-[210px] rounded-xl bg-white px-[18px] py-4 text-left shadow-float sm:w-[250px]">
        <div className="mb-2.5 flex justify-between text-caption-md font-semibold text-content">
          <span data-tina-field={tinaField(card, "title")}>{card.title}</span>
          <span className="text-accent" data-tina-field={tinaField(card, "percent")}>{percent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-brand-primary-lightest" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label={card.title}>
          <div className="h-full rounded-full bg-brand-primary" style={{ width: `${percent}%` }} />
        </div>
        <div className="mt-2 text-caption-sm text-content-subtle" data-tina-field={tinaField(card, "caption")}>{card.caption}</div>
      </div>
    </div>
  );
}

export default function HeroReact(props: HomeQueryProps) {
  const hero = useHomeSection(props, "hero");
  if (!hero) return <div hidden />;

  return (
    <section className="pt-12 text-center md:pt-[72px]">
      <div className="container-xl flex flex-col items-center">
        {hero.badgeText && (
          <div data-reveal="up" suppressHydrationWarning className="inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-brand-primary-lightest py-[7px] pl-2 pr-4 text-caption-md font-medium">
            {hero.badge && (
              <span className="rounded-full bg-brand-pink px-2.5 py-1 text-[11px] font-semibold text-white" data-tina-field={tinaField(hero, "badge")}>
                {hero.badge}
              </span>
            )}
            <span data-tina-field={tinaField(hero, "badgeText")}>{hero.badgeText}</span>
          </div>
        )}

        <HeroTitle hero={hero} />

        {hero.subtitle && (
          <p
            data-reveal="up" suppressHydrationWarning
            data-delay="520"
            className="mb-10 max-w-[620px] text-body-lg text-content-muted [text-wrap:pretty] md:text-[19px]"
            data-tina-field={tinaField(hero, "subtitle")}
          >
            {hero.subtitle}
          </p>
        )}

        <div data-reveal="up" suppressHydrationWarning data-delay="600" className="flex flex-wrap justify-center gap-3">
          {hero.primaryCta?.label && (
            <ArrowLink href={hero.primaryCta.url || "#"} size="lg" data-tina-field={tinaField(hero, "primaryCta")}>
              {hero.primaryCta.label}
            </ArrowLink>
          )}
          {hero.secondaryCta?.label && (
            <ArrowLink href={hero.secondaryCta.url || "#"} size="lg" variant="outline" data-tina-field={tinaField(hero, "secondaryCta")}>
              {hero.secondaryCta.label}
            </ArrowLink>
          )}
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1408px] px-4 sm:px-6 md:mt-16 lg:px-8">
        <div className="relative">
          <div data-grow="" suppressHydrationWarning className="relative h-[440px] origin-top overflow-hidden rounded-[32px] bg-brand-night will-change-transform sm:h-[560px] lg:h-[680px]">
            {hero.image && (
              <img
                src={mediaUrl(hero.image)}
                alt={hero.imageAlt || ""}
                className="block h-full w-full object-cover object-[50%_40%]"
                fetchPriority="high"
                data-tina-field={tinaField(hero, "image")}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/35 to-transparent to-40%" aria-hidden />
          </div>
          <LiveCard card={hero.liveCard} />
          <ProgressCard card={hero.progressCard} />
        </div>
      </div>
    </section>
  );
}
