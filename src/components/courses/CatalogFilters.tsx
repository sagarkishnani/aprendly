import { tinaField } from "tinacms/dist/react";
import { CEFR_LEVELS } from "./courseUtils";
import type { CatalogFilters as Filters } from "./useCatalogFilters";

interface Props {
  labels: any;
  filters: Filters;
  onChange: (patch: Partial<Filters>) => void;
}

function TypeFilter({ labels, filters, onChange }: Props) {
  const options: any[] = labels?.typeOptions ?? [];
  return (
    <fieldset>
      <legend className="mb-3 text-subtitle-sm" data-tina-field={tinaField(labels, "typeTitle")}>
        {labels?.typeTitle}
      </legend>
      <div className="flex flex-col">
        {options.map((option) => {
          const active = option?.value === filters.type;
          return (
            <button
              key={option?.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange({ type: option?.value || "all" })}
              data-tina-field={tinaField(option, "label")}
              className={`flex items-center gap-2 border-l-[3px] py-[9px] pl-3.5 text-left text-[15px] transition-colors hover:text-accent ${
                active ? "border-brand-pink font-semibold text-content" : "border-transparent text-content-subtle"
              }`}
            >
              {option?.label}
              {option?.isNew && labels?.newLabel && (
                <span className="rounded-full bg-brand-pink px-2 py-0.5 text-[11px] font-semibold text-white">{labels.newLabel}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function GoalFilter({ labels, filters, onChange }: Props) {
  const options: any[] = labels?.goalOptions ?? [];
  return (
    <fieldset>
      <legend className="mb-3 text-subtitle-sm" data-tina-field={tinaField(labels, "goalTitle")}>
        {labels?.goalTitle}
      </legend>
      <div className="flex flex-col">
        {options.map((option) => {
          const active = option?.value === filters.goal;
          return (
            <button
              key={option?.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange({ goal: option?.value || "all" })}
              data-tina-field={tinaField(option, "label")}
              className={`py-2 text-left text-[15px] transition-colors hover:text-accent ${
                active ? "font-semibold text-accent" : "text-content-subtle"
              }`}
            >
              {option?.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function LevelFilter({ labels, filters, onChange }: Props) {
  return (
    <fieldset>
      <legend className="mb-3.5 text-subtitle-sm" data-tina-field={tinaField(labels, "levelTitle")}>
        {labels?.levelTitle}
      </legend>
      <div className="grid grid-cols-6 gap-2 lg:grid-cols-3">
        {CEFR_LEVELS.map((level) => {
          const active = filters.level === level;
          return (
            <button
              key={level}
              type="button"
              aria-pressed={active}
              onClick={() => onChange({ level: active ? null : level })}
              className={`rounded-xl border-[1.5px] py-[9px] text-body-sm font-semibold transition-colors ${
                active
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-line bg-surface text-content hover:border-brand-primary"
              }`}
            >
              {level}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const Divider = () => <div className="h-px bg-line" />;

export default function CatalogFilters(props: Props) {
  return (
    <div className="flex flex-col gap-7">
      <TypeFilter {...props} />
      <Divider />
      <GoalFilter {...props} />
      <Divider />
      <LevelFilter {...props} />
    </div>
  );
}
