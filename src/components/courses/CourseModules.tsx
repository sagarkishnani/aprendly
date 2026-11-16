import { useState } from "react";
import { tinaField } from "tinacms/dist/react";

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-content transition-transform duration-500 ease-out-expo ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </span>
  );
}

function ModuleLessons({ module, id }: { module: any; id: string }) {
  const lessons: any[] = module?.lessons ?? [];
  return (
    <ul id={id} className="grid gap-2.5 px-0 pb-0 pt-4 sm:grid-cols-2 sm:px-2 sm:pb-2 sm:pt-5">
      {lessons.map((lesson, index) => (
        <li key={`${lesson?.title}-${index}`} className="flex justify-between gap-3 rounded-[14px] bg-white px-4 py-3.5 text-body-sm">
          <span data-tina-field={tinaField(lesson, "title")}>{lesson?.title}</span>
          <span className="whitespace-nowrap text-content-subtle" data-tina-field={tinaField(lesson, "duration")}>
            {lesson?.duration}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ModuleItem({ module, index, open, onToggle }: { module: any; index: number; open: boolean; onToggle: () => void }) {
  const panelId = `modulo-${index}`;
  const hasLessons = (module?.lessons ?? []).length > 0;
  return (
    <div suppressHydrationWarning data-reveal="up" data-delay={index * 80} className="rounded-[28px] bg-brand-primary-lightest/60 p-3 sm:p-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={hasLessons ? open : undefined}
        aria-controls={hasLessons ? panelId : undefined}
        disabled={!hasLessons}
        className="relative flex w-full flex-col items-stretch gap-4 text-left text-content disabled:cursor-default sm:flex-row sm:items-center sm:gap-6"
      >
        {module?.image && (
          <span className="relative block h-[160px] shrink-0 overflow-hidden rounded-[20px] bg-brand-primary-lightest sm:w-[220px] lg:w-[260px]">
            <img src={module.image} alt={module.imageAlt || ""} loading="lazy" className="block h-full w-full object-cover" data-tina-field={tinaField(module, "image")} />
            {module?.badge && (
              <span className="absolute left-2.5 top-2.5 rounded-[10px] bg-brand-ink px-2.5 py-1.5 text-caption-sm font-bold tracking-[0.6px] text-white" data-tina-field={tinaField(module, "badge")}>
                {module.badge}
              </span>
            )}
          </span>
        )}
        <span className="flex flex-1 flex-col gap-2 px-1 sm:px-0">
          <span className="text-[20px] font-semibold leading-snug" data-tina-field={tinaField(module, "title")}>
            {module?.title}
          </span>
          {module?.description && (
            <span className="text-[15px] leading-[1.6] text-content-muted" data-tina-field={tinaField(module, "description")}>
              {module.description}
            </span>
          )}
          {module?.meta && (
            <span className="text-caption-md font-semibold tracking-[0.6px] text-content-subtle" data-tina-field={tinaField(module, "meta")}>
              {module.meta}
            </span>
          )}
        </span>
        {hasLessons && (
          <span className="absolute right-3 top-3 sm:static sm:mr-2">
            <Chevron open={open} />
          </span>
        )}
      </button>
      {open && hasLessons && <ModuleLessons module={module} id={panelId} />}
    </div>
  );
}

export default function CourseModules({ modules }: { modules: any[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  if (modules.length === 0) return null;

  return (
    <div className="mb-[72px] flex flex-col gap-4">
      {modules.map((module, index) => (
        <ModuleItem
          key={`${module?.title}-${index}`}
          module={module}
          index={index}
          open={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
        />
      ))}
    </div>
  );
}
