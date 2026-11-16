import { tinaField, useTina } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import { mediaUrl } from "../../utils/mediaUrl";
import {
  eventHref,
  formatSoles,
  registrationHref,
  usePageData,
  type EventSummary,
  type PageQueryProps,
} from "./eventData";

type Props = {
  eventQuery: PageQueryProps;
  pageQuery: PageQueryProps;
  nextEvent: EventSummary | null;
  whatsappHref: string;
};

const sectionTitle = "text-[clamp(1.625rem,1vw+1.1rem,2.125rem)] font-bold leading-[1.2] tracking-[-0.03em]";

function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

function Breadcrumb({ event, detail }: { event: any; detail: any }) {
  return (
    <nav aria-label="Migas de pan" className="border-b border-line">
      <ol className="container-xl flex h-14 items-center gap-3 overflow-hidden whitespace-nowrap text-body-sm text-content-subtle">
        <li><a href="/" className="hover:text-content">{detail?.breadcrumbHome}</a></li>
        <li aria-hidden>›</li>
        <li><a href="/eventos" className="text-content hover:text-accent">{detail?.breadcrumbEvents}</a></li>
        <li aria-hidden>›</li>
        <li aria-current="page" className="truncate">{event.title}</li>
      </ol>
    </nav>
  );
}

function Header({ event, detail }: { event: any; detail: any }) {
  const kicker = event.upcoming ? detail?.upcomingKicker : event.kicker;
  const chips = [
    event.dateLabel,
    [event.mode, event.place].filter(Boolean).join(" · "),
    event.upcoming && event.levels ? `${detail?.levelsPrefix || ""} ${event.levels}`.trim() : "",
  ].filter(Boolean);

  return (
    <header className="mx-auto flex max-w-[920px] flex-col items-center px-4 pb-10 pt-12 text-center sm:px-8 md:pb-12 md:pt-[72px]">
      {kicker && (
        <span
          suppressHydrationWarning data-reveal="up"
          className={`mb-6 inline-block -rotate-2 rounded-sm px-3 py-1.5 text-overline uppercase text-white ${event.upcoming ? "bg-brand-pink" : "bg-brand-primary"}`}
        >
          {kicker}
        </span>
      )}
      <h1 suppressHydrationWarning data-reveal="up" data-delay="80" className="mb-[22px] text-balance text-heading-xl" data-tina-field={tinaField(event, "title")}>
        {event.title}
      </h1>
      {event.excerpt && (
        <p suppressHydrationWarning data-reveal="up" data-delay="140" className="mb-7 max-w-[720px] text-pretty text-body-lg text-content-muted md:text-[19px]" data-tina-field={tinaField(event, "excerpt")}>
          {event.excerpt}
        </p>
      )}
      <ul suppressHydrationWarning data-reveal="up" data-delay="200" className="flex flex-wrap justify-center gap-2.5 text-body-sm">
        {chips.map((chip) => (
          <li key={chip} className="rounded-full bg-brand-primary-lightest px-3.5 py-2">{chip}</li>
        ))}
      </ul>
    </header>
  );
}

function UpcomingContent({ event, detail }: { event: any; detail: any }) {
  const flow = (event.flow || []).filter(Boolean);
  const sessions = (event.sessions || []).filter(Boolean);
  const includes = (event.includes || []).filter(Boolean);

  return (
    <>
      {event.intro && (
        <>
          {event.introTitle && (
            <h2 suppressHydrationWarning data-reveal="up" className={`${sectionTitle} mb-[18px]`} data-tina-field={tinaField(event, "introTitle")}>{event.introTitle}</h2>
          )}
          <p suppressHydrationWarning data-reveal="up" className="mb-12 text-body-lg leading-[1.75] text-content-muted" data-tina-field={tinaField(event, "intro")}>{event.intro}</p>
        </>
      )}

      {flow.length > 0 && (
        <>
          <h2 suppressHydrationWarning data-reveal="up" className={`${sectionTitle} mb-6`}>{detail?.flowTitle}</h2>
          <ol className="mb-14 grid gap-3.5 sm:grid-cols-3">
            {flow.map((step: any, index: number) => (
              <li key={index} suppressHydrationWarning data-reveal="up" data-delay={index * 100} className="rounded-xl bg-surface-tint p-6" data-tina-field={tinaField(step)}>
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary font-bold text-white">{index + 1}</span>
                <h3 className="mb-2 text-[17px] font-semibold">{step.title}</h3>
                <p className="text-body-sm text-content-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </>
      )}

      {sessions.length > 0 && (
        <>
          {event.sessionsTitle && (
            <h2 suppressHydrationWarning data-reveal="up" className={`${sectionTitle} mb-6`} data-tina-field={tinaField(event, "sessionsTitle")}>{event.sessionsTitle}</h2>
          )}
          <ol className="mb-14 flex flex-col border-t border-line">
            {sessions.map((session: any, index: number) => (
              <li
                key={index}
                suppressHydrationWarning data-reveal="up"
                data-delay={index * 80}
                data-tina-field={tinaField(session)}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 border-b border-line py-[22px] sm:grid-cols-[120px_56px_minmax(0,1fr)]"
              >
                <span className="text-body-sm font-semibold text-accent">{session.date}</span>
                <span className="text-[28px] font-bold text-brand-primary-light sm:order-none" aria-hidden>{String(index + 1).padStart(2, "0")}</span>
                <div className="col-span-2 sm:col-span-1">
                  <h3 className="mb-0.5 text-[19px] font-semibold">{session.title}</h3>
                  <p className="text-[15px] text-content-muted">{session.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </>
      )}

      {includes.length > 0 && (
        <>
          <h2 suppressHydrationWarning data-reveal="up" className={`${sectionTitle} mb-5`}>{detail?.includesTitle}</h2>
          <ul className="mb-6 flex flex-col gap-3.5">
            {includes.map((item: string, index: number) => (
              <li key={index} suppressHydrationWarning data-reveal="up" className="flex items-start gap-3.5 text-body-md" data-tina-field={tinaField(event, `includes.${index}`)}>
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white"><CheckIcon /></span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {event.note && <p className="text-body-sm text-content-subtle" data-tina-field={tinaField(event, "note")}>{event.note}</p>}
    </>
  );
}

function PastContent({ event, detail }: { event: any; detail: any }) {
  const gallery: string[] = (event.gallery || []).filter(Boolean);
  const about = event.about || event.excerpt;
  const hasStats = typeof event.nps === "number" || typeof event.attendees === "number" || event.mode;

  return (
    <>
      {about && (
        <>
          <h2 suppressHydrationWarning data-reveal="up" className={`${sectionTitle} mb-[18px]`}>{detail?.aboutTitle}</h2>
          <p suppressHydrationWarning data-reveal="up" className="mb-10 text-body-lg leading-[1.75] text-content-muted" data-tina-field={tinaField(event, event.about ? "about" : "excerpt")}>{about}</p>
        </>
      )}
      {hasStats && (
        <div suppressHydrationWarning data-reveal="up" className="mb-12 grid gap-3.5 sm:grid-cols-3">
          {typeof event.nps === "number" && (
            <div className="rounded-xl bg-brand-primary p-6 text-white" data-tina-field={tinaField(event, "nps")}>
              <div className="text-[40px] font-bold tracking-[-1px]">{event.nps}</div>
              <div className="text-body-sm">{detail?.npsLabel}</div>
            </div>
          )}
          {typeof event.attendees === "number" && (
            <div className="rounded-xl bg-brand-primary-lightest p-6" data-tina-field={tinaField(event, "attendees")}>
              <div className="text-[40px] font-bold tracking-[-1px]">{event.attendees}</div>
              <div className="text-body-sm text-content-muted">{detail?.attendeesLabel}</div>
            </div>
          )}
          {event.mode && (
            <div className="rounded-xl bg-brand-primary-lightest p-6" data-tina-field={tinaField(event, "place")}>
              <div className="mb-1 text-[20px] font-bold leading-[1.3]">{event.mode}</div>
              <div className="text-body-sm text-content-muted">{event.place}</div>
            </div>
          )}
        </div>
      )}
      {gallery.length > 0 && (
        <>
          <h2 suppressHydrationWarning data-reveal="up" className={`${sectionTitle} mb-6`}>{detail?.galleryTitle}</h2>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {gallery.map((photo, index) => (
              <div key={index} suppressHydrationWarning data-reveal="up" className="h-[240px] overflow-hidden rounded-xl bg-brand-primary-lightest sm:h-[280px]" data-tina-field={tinaField(event, `gallery.${index}`)}>
                <div suppressHydrationWarning data-zoomin="" className="h-full w-full">
                  <img src={mediaUrl(photo)} alt={`${event.title} · foto ${index + 1}`} loading="lazy" className="block h-full w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function PriceRow({ label, value }: { label?: string | null; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-content-subtle">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}

function PriceCard({ event, detail, slug }: { event: any; detail: any; slug: string }) {
  if (typeof event.price !== "number") return null;
  return (
    <div className="rounded-[28px] border-2 border-brand-primary bg-surface-tint p-7">
      <div className="mb-1.5 text-[13px] text-content-subtle">{detail?.priceLabel}</div>
      <div className="mb-[18px] flex flex-wrap items-baseline gap-2">
        <span className="text-[44px] font-bold leading-none tracking-[-1.5px]" data-tina-field={tinaField(event, "price")}>{formatSoles(event.price)}</span>
        <span className="text-[15px] text-content-muted" data-tina-field={tinaField(event, "priceNote")}>{event.priceNote}</span>
      </div>
      <dl className="mb-[22px] flex flex-col gap-3 text-body-sm">
        <PriceRow label={detail?.startLabel} value={event.startLabel} />
        <PriceRow label={detail?.timeLabel} value={event.time} />
        <PriceRow label={detail?.formatLabel} value={event.formatLabel} />
        <PriceRow label={detail?.levelsLabel} value={event.levels} />
      </dl>
      <ArrowLink href={registrationHref(slug)} size="lg" className="w-full justify-between">
        {detail?.ctaLabel}
      </ArrowLink>
      {event.seats && (
        <p className="mt-3.5 text-center text-[13px] font-semibold text-brand-pink-dark" data-tina-field={tinaField(event, "seats")}>
          {[event.seats, detail?.seatsSuffix].filter(Boolean).join(" · ")}
        </p>
      )}
    </div>
  );
}

function NextEventCard({ nextEvent, detail }: { nextEvent: EventSummary; detail: any }) {
  return (
    <div className="rounded-[28px] bg-brand-primary p-7 text-white">
      <div className="mb-2.5 text-[13px] font-semibold uppercase tracking-[1.4px]">{detail?.nextEventLabel}</div>
      <div className="mb-2 text-[22px] font-bold leading-tight">{nextEvent.title}</div>
      {(nextEvent.teaser || nextEvent.excerpt) && <p className="mb-5 text-body-sm">{nextEvent.teaser || nextEvent.excerpt}</p>}
      <a
        href={eventHref(nextEvent.slug)}
        className="inline-flex h-12 items-center rounded-full bg-brand-pink px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-brand-pink-dark focus-visible:ring-offset-brand-primary"
      >
        {detail?.nextEventCta}
      </a>
    </div>
  );
}

function HelpCard({ detail, whatsappHref }: { detail: any; whatsappHref: string }) {
  return (
    <div className="flex items-center gap-4 rounded-[28px] border-[1.5px] border-line px-6 py-[22px]">
      <img src="/images/whatsapp.svg" alt="" className="h-11 w-11 shrink-0" width="44" height="44" />
      <div className="min-w-0 flex-1">
        <div className="text-[15px] font-semibold">{detail?.helpTitle}</div>
        <div className="text-[13px] text-content-subtle">{detail?.helpText}</div>
      </div>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-[42px] shrink-0 items-center rounded-full border-[1.5px] border-brand-ink px-4 text-body-sm font-semibold text-content transition-colors hover:bg-brand-ink hover:text-white"
      >
        {detail?.helpCta}
      </a>
    </div>
  );
}

export default function EventDetailReact({ eventQuery, pageQuery, nextEvent, whatsappHref }: Props) {
  const { data } = useTina(eventQuery);
  const page = usePageData(pageQuery, "eventosPage");
  const event = data?.event;
  if (!event || !page) return <div hidden />;

  const detail = page.detail;
  const slug: string = event._sys?.filename || "";
  const showNextEvent = !event.upcoming && nextEvent && nextEvent.slug !== slug;

  return (
    <>
      <Breadcrumb event={event} detail={detail} />
      <Header event={event} detail={detail} />

      {event.image && (
        <div className="mx-auto max-w-[1408px] px-4 sm:px-6 lg:px-8">
          <div suppressHydrationWarning data-grow="" className="h-[280px] origin-top overflow-hidden rounded-[28px] bg-brand-night sm:h-[420px] md:rounded-[48px] lg:h-[620px]">
            <img src={mediaUrl(event.image)} alt={event.imageAlt || event.title} className="block h-full w-full object-cover" data-tina-field={tinaField(event, "image")} />
          </div>
        </div>
      )}

      <div className="container-xl grid items-start gap-12 pb-20 pt-14 md:pb-[120px] md:pt-[88px] lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
        <div className="max-w-[760px]">
          {event.upcoming ? <UpcomingContent event={event} detail={detail} /> : <PastContent event={event} detail={detail} />}
        </div>
        <aside className="flex flex-col gap-4 lg:sticky lg:top-[116px]">
          {event.upcoming && <PriceCard event={event} detail={detail} slug={slug} />}
          {showNextEvent && <NextEventCard nextEvent={nextEvent} detail={detail} />}
          <HelpCard detail={detail} whatsappHref={whatsappHref} />
        </aside>
      </div>
    </>
  );
}
