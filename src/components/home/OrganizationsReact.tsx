import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { useHomeSection, type HomeQueryProps } from "./types";

function CheckBullet() {
  return (
    <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-primary text-white" aria-hidden>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}

function AudienceTabs({ tabs, activeIndex, onSelect }: { tabs: any[]; activeIndex: number; onSelect: (index: number) => void }) {
  return (
    <div role="tablist" aria-label="Tipo de organización" className="mb-8 inline-flex gap-1 rounded-full border-[1.5px] border-line p-[5px]">
      {tabs.map((tab, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            id={`b2b-tab-${index}`}
            aria-selected={active}
            aria-controls="b2b-panel"
            onClick={() => onSelect(index)}
            className={`rounded-full px-5 py-2.5 text-body-sm font-semibold transition-colors duration-300 ${active ? "bg-brand-ink text-white" : "text-content hover:bg-brand-primary-lightest"}`}
            data-tina-field={tinaField(tab, "label")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default function OrganizationsReact(props: HomeQueryProps) {
  const b2b = useHomeSection(props, "b2b");
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = (b2b?.tabs || []).filter(Boolean);
  if (!b2b || tabs.length === 0) return <div hidden />;
  const active = tabs[Math.min(activeIndex, tabs.length - 1)];

  return (
    <div>
      <p data-reveal="up" suppressHydrationWarning className="mb-5 text-overline uppercase text-brand-pink-dark" data-tina-field={tinaField(b2b, "eyebrow")}>
        {b2b.eyebrow}
      </p>
      <h2 data-reveal="up" suppressHydrationWarning data-delay="80" className="mb-5 max-w-[560px] text-heading-lg lg:text-[52px]" data-tina-field={tinaField(active, "title")}>
        {active.title}
      </h2>
      <p data-reveal="up" suppressHydrationWarning data-delay="140" className="mb-8 max-w-[500px] text-[17px] leading-[1.65] text-content-muted" data-tina-field={tinaField(active, "description")}>
        {active.description}
      </p>
      <div data-reveal="up" suppressHydrationWarning data-delay="200">
        <AudienceTabs tabs={tabs} activeIndex={activeIndex} onSelect={setActiveIndex} />
      </div>
      <div id="b2b-panel" role="tabpanel" aria-labelledby={`b2b-tab-${activeIndex}`}>
      <ul className="flex flex-col gap-3.5">
        {(active.points || []).filter(Boolean).map((point: string, index: number) => (
          <li key={index} className="flex items-center gap-3 text-[15px]" data-tina-field={tinaField(active, "points", index)}>
            <CheckBullet />
            {point}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
