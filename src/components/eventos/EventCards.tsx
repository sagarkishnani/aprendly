import ArrowLink, { ArrowIcon } from "../ui/ArrowLink";
import {
  attendeesLabel,
  eventHref,
  formatSoles,
  modeTag,
  registrationHref,
  type EventLabels,
  type EventSummary,
} from "./eventData";

type FeatureTone = "light" | "brand";

const FEATURE_TONES: Record<FeatureTone, { card: string; kicker: string; title: string; text: string; meta: string }> = {
  light: {
    card: "bg-white text-content",
    kicker: "text-accent",
    title: "text-[clamp(1.75rem,1.2vw+1rem,2.25rem)]",
    text: "text-content-muted",
    meta: "text-content-subtle",
  },
  brand: {
    card: "bg-brand-primary text-white",
    kicker: "text-white",
    title: "text-[clamp(1.75rem,1.6vw+1rem,2.5rem)]",
    text: "text-white",
    meta: "text-[#E4DCF7]",
  },
};

export function LiveBadge({ children }: { children: string }) {
  return (
    <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-brand-pink px-3.5 py-2 text-[11px] font-bold uppercase tracking-[1px] text-white sm:left-5 sm:top-5 sm:text-caption-sm">
      <span className="h-2 w-2 shrink-0 animate-live-pulse rounded-full bg-white" aria-hidden />
      {children}
    </span>
  );
}

function InfoItem({ label, value, metaClass }: { label?: string | null; value: string; metaClass: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className={`text-caption-sm ${metaClass}`}>{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

interface UpcomingEventFeatureProps {
  event: EventSummary;
  labels?: EventLabels | null;
  kicker: string;
  badge?: string | null;
  tone: FeatureTone;
  headingLevel?: "h2" | "h3";
  className?: string;
}

export function UpcomingEventFeature({ event, labels, kicker, badge, tone, headingLevel = "h3", className = "" }: UpcomingEventFeatureProps) {
  const toneClasses = FEATURE_TONES[tone];
  const Heading = headingLevel;
  const price = formatSoles(event.price);
  const investment = price ? `${price} ${event.priceNote}`.trim() : "";

  return (
    <div className={`grid overflow-hidden rounded-[28px] md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:rounded-[36px] ${toneClasses.card} ${className}`}>
      <a href={eventHref(event.slug)} tabIndex={-1} aria-hidden className="relative block min-h-[260px] overflow-hidden bg-brand-night md:min-h-[440px]">
        <div suppressHydrationWarning data-zoomin="" className="absolute inset-0">
          {event.image && <img src={event.image} alt="" loading="lazy" className="block h-full w-full object-cover" />}
        </div>
        {badge && <LiveBadge>{badge}</LiveBadge>}
      </a>
      <div className="flex flex-col p-6 sm:p-10 lg:p-12">
        <div className={`mb-3 text-[13px] font-semibold uppercase tracking-[1.4px] ${toneClasses.kicker}`}>{kicker}</div>
        <Heading className={`mb-3.5 font-bold ${toneClasses.title} leading-[1.1] tracking-[-0.03em]`}>
          <a href={eventHref(event.slug)} className="hover:underline hover:decoration-2 hover:underline-offset-4">
            {event.title}
          </a>
        </Heading>
        {event.excerpt && <p className={`mb-7 text-[15px] leading-[1.65] md:text-body-md ${toneClasses.text}`}>{event.excerpt}</p>}
        <dl className="mb-8 grid grid-cols-2 gap-x-5 gap-y-4 text-body-sm">
          <InfoItem label={labels?.dates} value={event.dateLabel} metaClass={toneClasses.meta} />
          <InfoItem label={labels?.time} value={event.time} metaClass={toneClasses.meta} />
          <InfoItem label={labels?.levels} value={event.levels} metaClass={toneClasses.meta} />
          <InfoItem label={labels?.investment} value={investment} metaClass={toneClasses.meta} />
        </dl>
        {labels?.upcomingCta && (
          <ArrowLink href={registrationHref(event.slug)} variant="pink" size="lg" className="mt-auto self-start">
            {labels.upcomingCta}
          </ArrowLink>
        )}
      </div>
    </div>
  );
}

function StatTile({ value, label }: { value: number | null; label: string }) {
  if (value === null) return null;
  return (
    <div className="rounded-lg bg-white/10 px-3.5 py-3">
      <div className="text-[24px] font-bold leading-tight">{value}</div>
      <div className="text-caption-sm text-brand-primary-light">{label}</div>
    </div>
  );
}

function HoverDetails({ event, labels, showHeading }: { event: EventSummary; labels?: EventLabels | null; showHeading: boolean }) {
  return (
    <div className="absolute inset-0 flex translate-y-6 flex-col bg-brand-night p-6 text-white opacity-0 transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
      {showHeading && (
        <>
          <div className="mb-1.5 text-[13px] text-brand-primary-light">{event.place}</div>
          <div className="mb-3 text-[21px] font-semibold leading-tight">{event.title}</div>
        </>
      )}
      <p className="mb-auto line-clamp-5 text-body-sm">{event.excerpt}</p>
      <div className="mb-4 mt-4 grid grid-cols-2 gap-2.5">
        <StatTile value={event.nps} label={labels?.nps || ""} />
        <StatTile value={event.attendees} label={attendeesLabel(event, labels)} />
      </div>
      <div className="flex items-center gap-2 text-body-sm font-semibold">
        {labels?.viewEvent}
        <ArrowIcon className="h-[18px] w-[18px] text-brand-pink" />
      </div>
    </div>
  );
}

function KickerPill({ children }: { children: string }) {
  if (!children) return null;
  return <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-caption-sm font-semibold text-content">{children}</span>;
}

export function PastEventPhotoCard({ event, labels, delay }: { event: EventSummary; labels?: EventLabels | null; delay: number }) {
  return (
    <a
      href={eventHref(event.slug)}
      suppressHydrationWarning data-reveal="up"
      data-delay={delay}
      className="group relative block h-[320px] overflow-hidden rounded-[28px] bg-brand-night text-white focus-visible:ring-offset-brand-primary sm:h-[360px]"
    >
      {event.image && (
        <img src={event.image} alt="" loading="lazy" className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[800ms] ease-out-expo group-hover:scale-[1.08]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(28,10,74,.85)_0%,rgba(28,10,74,0)_55%)]" />
      <KickerPill>{event.kicker}</KickerPill>
      <div className="absolute bottom-5 left-[22px] right-[22px]">
        <div className="mb-1 text-[13px]">{[event.dateLabel, event.mode].filter(Boolean).join(" · ")}</div>
        <h3 className="text-[21px] font-semibold leading-tight">{event.title}</h3>
      </div>
      <HoverDetails event={event} labels={labels} showHeading />
    </a>
  );
}

export function PastEventCard({ event, labels, delay, caption }: { event: EventSummary; labels?: EventLabels | null; delay: number; caption?: string }) {
  return (
    <a href={eventHref(event.slug)} suppressHydrationWarning data-reveal="up" data-delay={delay} className="group flex flex-col gap-3.5 rounded-[28px] text-content">
      <div className="relative h-[240px] overflow-hidden rounded-[28px] bg-brand-night sm:h-[300px]">
        {event.image && (
          <img src={event.image} alt="" loading="lazy" className="absolute inset-0 block h-full w-full object-cover transition-transform duration-[800ms] ease-out-expo group-hover:scale-[1.08]" />
        )}
        <KickerPill>{event.kicker}</KickerPill>
        <HoverDetails event={event} labels={labels} showHeading={false} />
      </div>
      <div className="text-[13px] font-semibold text-accent">{caption ?? [event.dateLabel, modeTag(event.mode)].filter(Boolean).join(" · ")}</div>
      <h3 className="text-[20px] font-semibold leading-[1.3]">{event.title}</h3>
    </a>
  );
}
