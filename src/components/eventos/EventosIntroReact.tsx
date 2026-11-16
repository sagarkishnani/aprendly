import { tinaField } from "tinacms/dist/react";
import Eyebrow from "../ui/Eyebrow";
import { UpcomingEventFeature } from "./EventCards";
import { modeTag, usePageData, type EventSummary, type PageQueryProps } from "./eventData";

type Props = PageQueryProps & { nextEvent: EventSummary | null };

export default function EventosIntroReact({ nextEvent, ...queryProps }: Props) {
  const page = usePageData(queryProps, "eventosPage");
  if (!page) return <div hidden />;
  const { hero, upcoming, eventLabels } = page;

  return (
    <>
      <section className="pb-12 pt-12 md:pb-14 md:pt-[72px]">
        <div className="container-xl flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-16">
          <div>
            {hero?.eyebrow && (
              <Eyebrow variant="pink" tilted suppressHydrationWarning data-reveal="up" className="mb-[22px] text-[13px] tracking-[1.5px]" data-tina-field={tinaField(hero, "eyebrow")}>
                {hero.eyebrow}
              </Eyebrow>
            )}
            <h1 suppressHydrationWarning data-reveal="up" data-delay="80" className="max-w-[680px] text-heading-xl" data-tina-field={tinaField(hero, "title")}>
              {hero?.title}
            </h1>
          </div>
          {hero?.text && (
            <p suppressHydrationWarning data-reveal="up" data-delay="160" className="max-w-[420px] text-[17px] leading-[1.65] text-content-muted" data-tina-field={tinaField(hero, "text")}>
              {hero.text}
            </p>
          )}
        </div>
      </section>

      {nextEvent && (
        <section className="pb-14 md:pb-16">
          <div className="container-xl" suppressHydrationWarning data-reveal="scale">
            <UpcomingEventFeature
              event={nextEvent}
              labels={eventLabels}
              tone="brand"
              headingLevel="h2"
              kicker={[upcoming?.label, modeTag(nextEvent.mode)].filter(Boolean).join(" · ")}
              badge={upcoming?.badge}
              className="md:rounded-[40px]"
            />
          </div>
        </section>
      )}
    </>
  );
}
