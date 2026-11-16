import { useEffect, useState } from "react";

export interface CourseTab {
  id: string;
  label: string;
  tinaField?: string;
}

const ACTIVATION_OFFSET = 200;

function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const update = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= ACTIVATION_OFFSET) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [key]);

  return active;
}

export default function CourseTabs({ tabs }: { tabs: CourseTab[] }) {
  const active = useActiveSection(tabs.map((tab) => tab.id));
  if (tabs.length < 2) return null;

  return (
    <nav aria-label="Secciones del curso" className="sticky top-[72px] z-[5] -mx-4 mb-9 bg-surface px-4 sm:mx-0 sm:px-0 lg:top-[84px]">
      <ul className="no-scrollbar flex gap-6 overflow-x-auto border-b-[1.5px] border-line sm:gap-8">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <li key={tab.id} className="shrink-0">
              <a
                href={`#${tab.id}`}
                aria-current={isActive ? "true" : undefined}
                data-tina-field={tab.tinaField}
                className={`-mb-[1.5px] block border-b-[2.5px] py-4 text-body-md font-medium transition-colors hover:text-accent ${
                  isActive ? "border-brand-primary text-content" : "border-transparent text-content-subtle"
                }`}
              >
                {tab.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
