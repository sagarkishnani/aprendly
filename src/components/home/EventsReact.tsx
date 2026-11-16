import { tinaField } from "tinacms/dist/react";
import ArrowLink, { ArrowIcon } from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import { mediaUrl } from "../../utils/mediaUrl";
import { formatSoles, useHomeSection, type HomeEvent, type HomeQueryProps } from "./types";

function eventHref(event: HomeEvent) {
  return `/eventos/${event.slug}`;
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-caption-sm text-content-subtle">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function NextEventCard({ event, section }: { event: HomeEvent; section: any }) {
  const price = event.price ? `${formatSoles(event.price)} ${event.priceNote}`.trim() : "";
  return (
    <article data-reveal="up" suppressHydrationWarning className="relative mb-6 grid overflow-hidden rounded-[28px] bg-white text-content md:rounded-[36px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <div className="relative h-[260px] overflow-hidden sm:h-[340px] lg:h-full lg:min-h-[440px]">
        <div data-zoomin="" suppressHydrationWarning className="absolute inset-0">
          <img src={mediaUrl(event.image)} alt="" loading="lazy" className="block h-full w-full object-cover" />
        </div>
        <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-brand-pink px-3.5 py-2 text-caption-sm font-bold tracking-[1px] text-white" data-tina-field={tinaField(section, "nextBadge")}>
          <span className="h-2 w-2 animate-live-pulse rounded-full bg-white" aria-hidden />
          {section.nextBadge}
        </span>
      </div>
      <div className="flex flex-col p-6 sm:p-10 lg:px-11 lg:pb-10 lg:pt-11">
        <p className="mb-3 text-caption-md font-semibold uppercase tracking-[1.4px] text-accent">
          {[event.kicker, event.mode].filter(Boolean).join(" · ")}
        </p>
        <h3 className="mb-3.5 text-heading-sm lg:text-[36px] lg:leading-[1.1]">{event.title}</h3>
        <p className="mb-6 text-[15px] leading-[1.65] text-content-muted">{event.excerpt}</p>
        <dl className="mb-7 grid grid-cols-2 gap-x-5 gap-y-4 text-body-sm">
          <Fact label={section.datesLabel} value={event.dateLabel} />
          <Fact label={section.timeLabel} value={event.time} />
          <Fact label={section.levelsLabel} value={event.levels} />
          <Fact label={section.priceLabel} value={price} />
        </dl>
        <ArrowLink
          href={eventHref(event)}
          variant="pink"
          size="lg"
          className="mt-auto self-start after:absolute after:inset-0 after:content-['']"
          data-tina-field={tinaField(section, "nextCtaLabel")}
        >
          {section.nextCtaLabel}
        </ArrowLink>
      </div>
    </article>
  );
}

function StatTile({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="rounded-lg bg-white/10 px-3.5 py-3">
      <div className="text-2xl font-bold">{value ?? "—"}</div>
      <div className="text-caption-sm text-brand-primary-light">{label}</div>
    </div>
  );
}

function PastEventCard({ event, index, section }: { event: HomeEvent; index: number; section: any }) {
  return (
    <a
      href={eventHref(event)}
      data-reveal="up" suppressHydrationWarning
      data-delay={(index % 3) * 100}
      className="group relative block h-[320px] overflow-hidden rounded-[28px] bg-brand-night text-white sm:h-[360px]"
    >
      <img
        src={mediaUrl(event.image)}
        alt=""
        loading="lazy"
        className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[800ms] ease-out-expo group-hover:scale-[1.08] group-focus-visible:scale-[1.08]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-night/85 to-transparent to-55%" aria-hidden />
      <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-caption-sm font-semibold text-content">{event.kicker}</span>
      <div className="absolute inset-x-[22px] bottom-5">
        <p className="mb-1 text-caption-md">{[event.dateLabel, event.mode].filter(Boolean).join(" · ")}</p>
        <h3 className="text-[21px] font-semibold leading-tight">{event.title}</h3>
      </div>
      <div
        className="absolute inset-0 flex translate-y-6 flex-col bg-brand-night p-[26px] opacity-0 transition duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        aria-hidden
      >
        <p className="mb-1.5 text-caption-md text-brand-primary-light">{event.place}</p>
        <p className="mb-3 text-[21px] font-semibold leading-tight">{event.title}</p>
        <p className="mb-auto line-clamp-4 text-body-sm">{event.excerpt}</p>
        <div className="mb-4 grid grid-cols-2 gap-2.5">
          <StatTile value={event.nps} label={section.npsLabel} />
          <StatTile value={event.attendees} label={section.attendeesLabel} />
        </div>
        <span className="flex items-center gap-2 text-body-sm font-semibold">
          {section.pastLinkLabel}
          <ArrowIcon className="h-[18px] w-[18px] text-brand-pink" />
        </span>
      </div>
    </a>
  );
}

interface EventsProps extends HomeQueryProps {
  nextEvent: HomeEvent | null;
  pastEvents: HomeEvent[];
}

export default function EventsReact({ nextEvent, pastEvents, ...props }: EventsProps) {
  const section = useHomeSection(props, "events");
  if (!section) return <div hidden />;

  return (
    <section id="eventos" className="scroll-mt-[84px] pb-20 md:pb-[120px]">
      <div className="mx-auto max-w-[1408px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-brand-primary px-5 py-16 text-white sm:px-10 md:rounded-[56px] lg:px-16 lg:py-[104px]">
          <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              <Eyebrow variant="pink" tilted className="mb-6" data-reveal="up" suppressHydrationWarning data-tina-field={tinaField(section, "eyebrow")}>
                {section.eyebrow}
              </Eyebrow>
              <h2 data-reveal="up" suppressHydrationWarning data-delay="80" className="max-w-[620px] text-heading-lg" data-tina-field={tinaField(section, "title")}>
                {section.title}
              </h2>
            </div>
            <p data-reveal="up" suppressHydrationWarning data-delay="160" className="max-w-[420px] text-[17px] leading-[1.65]" data-tina-field={tinaField(section, "description")}>
              {section.description}
            </p>
          </div>

          {nextEvent && <NextEventCard event={nextEvent} section={section} />}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event, index) => (
              <PastEventCard key={event.slug} event={event} index={index} section={section} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
