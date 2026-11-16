import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { PastEventCard } from "./EventCards";
import { isOnlineMode, usePageData, type EventSummary, type PageQueryProps } from "./eventData";

type ModeFilter = "all" | "inPerson" | "online";

type Props = PageQueryProps & { events: EventSummary[] };

function matchesFilter(event: EventSummary, filter: ModeFilter): boolean {
  if (filter === "all") return true;
  return filter === "online" ? isOnlineMode(event.mode) : !isOnlineMode(event.mode);
}

export default function PastEventsReact({ events, ...queryProps }: Props) {
  const page = usePageData(queryProps, "eventosPage");
  const [filter, setFilter] = useState<ModeFilter>("all");
  if (!page) return <div hidden />;
  const { past, eventLabels } = page;

  const visible = events.filter((event) => matchesFilter(event, filter));
  const countWord = visible.length === 1 ? past?.countSingular : past?.countPlural;
  const filters: { value: ModeFilter; label?: string | null; field: string }[] = [
    { value: "all", label: past?.filterAll, field: "filterAll" },
    { value: "inPerson", label: past?.filterInPerson, field: "filterInPerson" },
    { value: "online", label: past?.filterOnline, field: "filterOnline" },
  ];

  return (
    <section className="pb-20 md:pb-[120px]">
      <div className="container-xl">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-6">
          <h2 className="text-[clamp(1.5rem,1vw+1rem,1.75rem)] font-semibold tracking-[-0.02em]">
            <span data-tina-field={tinaField(past, "title")}>{past?.title}</span>{" "}
            <span className="text-body-md font-medium text-content-subtle" aria-live="polite">
              · {visible.length} {countWord}
            </span>
          </h2>
          <div className="flex flex-wrap gap-2" role="group" aria-label={past?.title || undefined}>
            {filters.map((option) => {
              const active = option.value === filter;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(option.value)}
                  data-tina-field={tinaField(past, option.field)}
                  className={`h-[42px] rounded-full border-[1.5px] px-[18px] text-body-sm font-semibold transition-colors duration-300 hover:border-brand-primary ${
                    active ? "border-brand-primary bg-brand-primary text-white" : "border-line bg-surface text-content"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
        {visible.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event, index) => (
              <PastEventCard key={event.slug} event={event} labels={eventLabels} delay={(index % 3) * 90} />
            ))}
          </div>
        ) : (
          <p className="text-body-md text-content-muted" data-tina-field={tinaField(past, "emptyText")}>
            {past?.emptyText}
          </p>
        )}
      </div>
    </section>
  );
}
