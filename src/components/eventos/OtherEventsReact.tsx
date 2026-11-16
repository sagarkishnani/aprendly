import { tinaField } from "tinacms/dist/react";
import { eventHref, usePageData, type EventSummary, type PageQueryProps } from "./eventData";

type Props = PageQueryProps & { events: EventSummary[] };

export default function OtherEventsReact({ events, ...queryProps }: Props) {
  const detail = usePageData(queryProps, "eventosPage")?.detail;
  if (!detail || events.length === 0) return <div hidden />;

  return (
    <section className="rounded-[32px] bg-brand-primary-lightest py-16 md:rounded-[56px] md:py-24">
      <div className="container-xl">
        <h2 suppressHydrationWarning data-reveal="up" className="mb-9 text-heading-md" data-tina-field={tinaField(detail, "othersTitle")}>
          {detail.othersTitle}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <a key={event.slug} href={eventHref(event.slug)} suppressHydrationWarning data-reveal="up" data-delay={index * 100} className="group flex flex-col gap-3.5 rounded-xl text-content">
              <div className="h-[220px] overflow-hidden rounded-xl bg-brand-primary-light sm:h-[240px]">
                <div suppressHydrationWarning data-zoomin="" className="h-full w-full">
                  {event.image && (
                    <img src={event.image} alt="" loading="lazy" className="block h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.06]" />
                  )}
                </div>
              </div>
              <div className="text-[13px] font-semibold text-accent">{[event.kicker, event.dateLabel].filter(Boolean).join(" · ")}</div>
              <h3 className="text-[20px] font-semibold leading-[1.3]">{event.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
