import { useState } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { FaSliders } from "react-icons/fa6";
import CourseCard from "./CourseCard";
import CatalogFilters from "./CatalogFilters";
import CatalogToolbar from "./CatalogToolbar";
import Eyebrow from "../ui/Eyebrow";
import { ArrowButton } from "../ui/ArrowLink";
import { slugFromPath, type CourseSummary } from "./courseUtils";
import { useCatalogFilters, type CatalogFilters as Filters } from "./useCatalogFilters";

interface TinaProps {
  query: string;
  variables: object;
  data: any;
}

interface Props {
  page: TinaProps;
  courses: TinaProps;
}

function toCourseNodes(data: any): any[] {
  return (data?.courseConnection?.edges ?? []).map((edge: any) => edge?.node).filter(Boolean);
}

function toSummary(node: any): CourseSummary {
  return { ...node, slug: slugFromPath(node._sys?.relativePath ?? node._sys?.filename ?? "") };
}

function currentCrumb(filters: Filters, labels: any): string {
  const typeOptions: any[] = labels?.typeOptions ?? [];
  const goalOptions: any[] = labels?.goalOptions ?? [];
  const byValue = (options: any[], value: string) => options.find((option) => option?.value === value)?.label;
  if (filters.type !== "all") return byValue(typeOptions, filters.type) ?? "";
  if (filters.goal !== "all") return byValue(goalOptions, filters.goal) ?? "";
  return byValue(typeOptions, "all") ?? "";
}

function Breadcrumb({ header, crumb }: { header: any; crumb: string }) {
  return (
    <nav aria-label="Miga de pan" className="border-b border-line bg-surface">
      <ol className="container-xl flex h-14 items-center gap-3 overflow-hidden whitespace-nowrap text-body-sm text-content-subtle">
        <li>
          <a href="/" className="hover:text-accent" data-tina-field={tinaField(header, "homeLabel")}>
            {header?.homeLabel}
          </a>
        </li>
        <li aria-hidden>›</li>
        <li className="text-content" data-tina-field={tinaField(header, "coursesLabel")}>
          {header?.coursesLabel}
        </li>
        {crumb && (
          <>
            <li aria-hidden>›</li>
            <li aria-current="page" className="truncate">{crumb}</li>
          </>
        )}
      </ol>
    </nav>
  );
}

function CatalogHeader({ header }: { header: any }) {
  return (
    <section className="bg-surface pb-12 pt-12 lg:pb-16 lg:pt-[72px]">
      <div className="container-xl flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          {header?.eyebrow && (
            <div suppressHydrationWarning data-reveal="up" className="mb-[22px]">
              <Eyebrow tilted data-tina-field={tinaField(header, "eyebrow")}>{header.eyebrow}</Eyebrow>
            </div>
          )}
          <h1 suppressHydrationWarning data-reveal="up" data-delay="80" className="max-w-[640px] text-heading-xl" data-tina-field={tinaField(header, "title")}>
            {header?.title}
          </h1>
        </div>
        <p suppressHydrationWarning data-reveal="up" data-delay="160" className="max-w-[420px] text-[17px] leading-[1.65] text-content-muted">
          <span data-tina-field={tinaField(header, "intro")}>{header?.intro}</span>{" "}
          {header?.introLinkLabel && (
            <a href={header.introLinkUrl || "/ruta-de-aprendizaje"} className="font-semibold text-accent hover:underline" data-tina-field={tinaField(header, "introLinkLabel")}>
              {header.introLinkLabel}
            </a>
          )}
        </p>
      </div>
    </section>
  );
}

function EmptyState({ labels, onReset }: { labels: any; onReset: () => void }) {
  return (
    <div className="rounded-3xl bg-surface px-6 py-16 text-center">
      <p className="mb-5 text-subtitle-lg" data-tina-field={tinaField(labels, "emptyTitle")}>
        {labels?.emptyTitle}
      </p>
      <ArrowButton onClick={onReset} className="mx-auto">
        {labels?.resetLabel}
      </ArrowButton>
    </div>
  );
}

export default function CourseCatalogReact({ page, courses }: Props) {
  const { data: pageData } = useTina(page);
  const { data: courseData } = useTina(courses);
  const content = pageData?.cursosPage;
  const labels = content?.filters;
  const card = content?.card;
  const nodes = toCourseNodes(courseData);
  const summaries = nodes.map(toSummary);
  const { filters, results, update, reset } = useCatalogFilters(summaries);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const crumb = currentCrumb(filters, labels);
  const countWord = results.length === 1 ? labels?.countSingular : labels?.countPlural;
  const nodeBySlug = new Map(summaries.map((summary, index) => [summary.slug, nodes[index]]));
  const cardLabelFor = (type: string) =>
    (labels?.typeOptions ?? []).find((option: any) => option?.value === type)?.cardLabel ?? "";

  if (!content) return <div hidden />;

  return (
    <>
      <Breadcrumb header={content.header} crumb={crumb} />
      <CatalogHeader header={content.header} />
      <section className="bg-surface-tint pb-20 pt-10 lg:pb-[120px] lg:pt-14">
        <div className="container-xl grid items-start gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:sticky lg:top-[116px]">
            <button
              type="button"
              aria-expanded={filtersOpen}
              aria-controls="catalog-filters"
              onClick={() => setFiltersOpen((open) => !open)}
              className="flex w-full items-center justify-between rounded-full border-[1.5px] border-line bg-surface px-5 py-3 text-body-sm font-semibold lg:hidden"
            >
              <span className="flex items-center gap-2">
                <FaSliders aria-hidden className="h-4 w-4 text-accent" />
                {labels?.filtersButton}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={`h-4 w-4 transition-transform ${filtersOpen ? "rotate-180" : ""}`} aria-hidden>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div id="catalog-filters" className={`${filtersOpen ? "mt-6 block" : "hidden"} lg:mt-0 lg:block`}>
              <CatalogFilters labels={labels} filters={filters} onChange={update} />
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
              <h2 className="text-[24px] font-semibold tracking-[-0.6px] sm:text-[28px]" aria-live="polite">
                {crumb}{" "}
                <span className="text-body-md font-medium text-content-subtle">
                  · {results.length} {countWord}
                </span>
              </h2>
              <CatalogToolbar labels={labels} filters={filters} onChange={update} />
            </div>

            {results.length === 0 ? (
              <EmptyState labels={labels} onReset={reset} />
            ) : (
              <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((course, index) => {
                  const node = nodeBySlug.get(course.slug);
                  return (
                    <CourseCard
                      key={course.slug}
                      course={course}
                      delay={(index % 3) * 90}
                      tinaFieldFor={(field) => tinaField(node, field)}
                      labels={{
                        typeLabel: cardLabelFor(course.type),
                        bestSellerLabel: card?.bestSellerLabel ?? "",
                        newLabel: card?.newLabel ?? "",
                        studentsSuffix: card?.studentsSuffix ?? "",
                        ctaLabel: card?.ctaLabel ?? "",
                      }}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
