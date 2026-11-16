import { useTina, tinaField } from "tinacms/dist/react";
import { ArrowIcon } from "../ui/ArrowLink";
import { SectionEyebrow, SectionTitle } from "./SectionIntro";
import { mediaUrl } from "../../utils/mediaUrl";
import type { TinaPageProps } from "../ruta/types";

export interface GalleryEvent {
  slug: string;
  title: string;
  dateLabel: string;
  mode: string;
  image: string;
}

const WIDE_TILES = new Set([0, 5]);

function EventTile({ event, index }: { event: GalleryEvent; index: number }) {
  const meta = [event.dateLabel, event.mode].filter(Boolean).join(" · ");
  return (
    <a
      href={`/eventos/${event.slug}`}
      className={`group relative block overflow-hidden rounded-2xl text-white ${WIDE_TILES.has(index) ? "col-span-2" : ""}`}
      suppressHydrationWarning data-reveal="up"
      data-delay={String((index % 4) * 80)}
    >
      <div className="h-full w-full" suppressHydrationWarning data-zoomin>
        <img src={mediaUrl(event.image)} alt="" loading="lazy" className="block h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-night/80 to-brand-night/0 to-50%" />
      <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-4">
        {meta && <p className="text-caption-sm">{meta}</p>}
        <h3 className="text-[15px] font-semibold leading-snug sm:text-[17px]">{event.title}</h3>
      </div>
    </a>
  );
}

export default function NosotrosEventsReact({ events, ...props }: TinaPageProps & { events: GalleryEvent[] }) {
  const { data } = useTina(props);
  const section = data?.nosotrosPage?.events;
  if (!section || !events.length) return <div hidden />;

  return (
    <section className="rounded-[32px] bg-brand-primary-lightest py-20 md:rounded-[56px] md:py-[112px]">
      <div className="container-xl">
        <div className="mb-11 flex flex-col justify-between gap-6 sm:flex-row sm:items-end sm:gap-12">
          <div>
            <SectionEyebrow owner={section} />
            <SectionTitle owner={section} className="max-w-[620px]" />
          </div>
          {section.link?.label && (
            <a
              href={section.link.url || "/eventos"}
              className="flex shrink-0 items-center gap-2 text-[15px] font-semibold text-accent transition-colors hover:text-brand-primary-dark"
              suppressHydrationWarning data-reveal="up"
              data-tina-field={tinaField(section, "link")}
            >
              {section.link.label}
              <ArrowIcon className="h-[18px] w-[18px]" />
            </a>
          )}
        </div>
        <div className="grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:auto-rows-[240px] lg:grid-cols-4">
          {events.map((event, index) => (
            <EventTile key={event.slug} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
