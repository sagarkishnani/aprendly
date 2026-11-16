import { tinaField } from "tinacms/dist/react";
import type { CatalogFilters, SortKey } from "./useCatalogFilters";

interface Props {
  labels: any;
  filters: CatalogFilters;
  onChange: (patch: Partial<CatalogFilters>) => void;
}

function LiveToggle({ labels, filters, onChange }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={filters.liveOnly}
      onClick={() => onChange({ liveOnly: !filters.liveOnly })}
      className="flex items-center gap-2.5 text-body-sm font-medium text-content"
    >
      <span data-tina-field={tinaField(labels, "liveLabel")}>{labels?.liveLabel}</span>
      <span
        className={`relative h-[26px] w-11 rounded-full transition-colors duration-300 ${
          filters.liveOnly ? "bg-brand-primary" : "bg-line-strong"
        }`}
      >
        <span
          className={`absolute top-[3px] h-5 w-5 rounded-full bg-white shadow-soft transition-[left] duration-300 ease-out-expo ${
            filters.liveOnly ? "left-[21px]" : "left-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

function SortSelect({ labels, filters, onChange }: Props) {
  const options: [SortKey, string][] = [
    ["pop", labels?.sortPopular],
    ["rate", labels?.sortRating],
    ["low", labels?.sortPriceLow],
    ["high", labels?.sortPriceHigh],
  ];
  return (
    <label className="flex items-center gap-2 text-body-sm text-content-subtle">
      <span className="hidden sm:inline" data-tina-field={tinaField(labels, "sortLabel")}>
        {labels?.sortLabel}
      </span>
      <span className="relative block">
        <select
          value={filters.sort}
          aria-label={labels?.sortLabel}
          onChange={(event) => onChange({ sort: event.target.value as SortKey })}
          className="cursor-pointer appearance-none rounded-full border-[1.5px] border-line bg-surface py-2.5 pl-[18px] pr-11 text-[15px] font-semibold text-content outline-none focus-visible:border-brand-primary"
        >
          {options.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-[18px] top-1/2 h-4 w-4 -translate-y-1/2 text-content" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}

export default function CatalogToolbar(props: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <LiveToggle {...props} />
      <SortSelect {...props} />
    </div>
  );
}
