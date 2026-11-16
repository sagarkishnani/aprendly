import { tinaField } from "tinacms/dist/react";
import Eyebrow from "../ui/Eyebrow";
import { PastEventPhotoCard, UpcomingEventFeature } from "../eventos/EventCards";
import { modeTag, usePageData, type EventSummary, type PageQueryProps } from "../eventos/eventData";

type Props = PageQueryProps & { nextEvent: EventSummary | null; pastEvents: EventSummary[] };

export default function EmpresasEventsReact({ nextEvent, pastEvents, ...queryProps }: Props) {
  const page = usePageData(queryProps, "empresasPage");
  const events = page?.events;
  if (!events) return <div hidden />;
  const labels = page.eventLabels;
  const visiblePast = pastEvents.slice(0, events.pastLimit || 6);

  return (
    <section id="eventos" className="scroll-mt-[84px] pb-20 md:pb-[120px]">
      <div className="mx-auto max-w-[1408px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-brand-primary px-5 py-16 text-white sm:px-10 md:rounded-[56px] lg:px-16 lg:py-[104px]">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end md:gap-16">
            <div>
              {events.eyebrow && (
                <Eyebrow variant="pink" tilted suppressHydrationWarning data-reveal="up" className="mb-6" data-tina-field={tinaField(events, "eyebrow")}>
                  {events.eyebrow}
                </Eyebrow>
              )}
              <h2 suppressHydrationWarning data-reveal="up" data-delay="80" className="max-w-[620px] text-heading-lg" data-tina-field={tinaField(events, "title")}>
                {events.title}
              </h2>
            </div>
            {events.text && (
              <p suppressHydrationWarning data-reveal="up" data-delay="160" className="max-w-[420px] text-[17px] leading-[1.65]" data-tina-field={tinaField(events, "text")}>
                {events.text}
              </p>
            )}
          </div>

          {nextEvent && (
            <div suppressHydrationWarning data-reveal="up" className="mb-6">
              <UpcomingEventFeature
                event={nextEvent}
                labels={labels}
                tone="light"
                kicker={[nextEvent.category || nextEvent.kicker, modeTag(nextEvent.mode)].filter(Boolean).join(" · ")}
                badge={events.upcomingBadge}
              />
            </div>
          )}

          {visiblePast.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePast.map((event, index) => (
                <PastEventPhotoCard key={event.slug} event={event} labels={labels} delay={(index % 3) * 100} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
