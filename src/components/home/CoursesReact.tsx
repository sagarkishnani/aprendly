import type { ReactNode } from "react";
import { tinaField } from "tinacms/dist/react";
import ArrowLink, { ArrowIcon } from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import { mediaUrl } from "../../utils/mediaUrl";
import { formatSoles, useHomeSection, type HomeCourse, type HomeQueryProps } from "./types";

const ICON_PROPS = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const LevelsIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M4 20h16" />
    <path d="M7 16v-3" />
    <path d="M12 16V9" />
    <path d="M17 16V5" />
  </svg>
);

const FormatIcon = () => (
  <svg {...ICON_PROPS}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
    <path d="M16 5.2a3 3 0 0 1 0 5.6" />
    <path d="M18 14.8c1.7.6 2.8 2.2 3 4.7" />
  </svg>
);

const BadgeIcon = () => (
  <svg {...ICON_PROPS}>
    <path d="M12 3l2.2 1.6 2.7-.1.8 2.6 2.2 1.6-.9 2.6.9 2.6-2.2 1.6-.8 2.6-2.7-.1L12 20l-2.2-1.6-2.7.1-.8-2.6-2.2-1.6.9-2.6-.9-2.6 2.2-1.6.8-2.6 2.7.1z" />
    <path d="M9 11.8l2.1 2.1L15 10" />
  </svg>
);

const ClockIcon = () => (
  <svg {...ICON_PROPS}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

function durationLabel(course: HomeCourse) {
  const perLevel = course.priceUnit.includes("nivel") && !course.duration.includes("nivel");
  return perLevel ? `${course.duration} por nivel` : course.duration;
}

function InfoItem({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-3">
      <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[12px] bg-brand-primary-lightest text-accent">{icon}</span>
      <div>
        <dt className="text-caption-sm text-content-subtle">{label}</dt>
        <dd className="text-body-sm font-medium leading-snug">{value}</dd>
      </div>
    </div>
  );
}

function CourseInfoCard({ course, section }: { course: HomeCourse; section: any }) {
  return (
    <div className="relative m-3 rounded-[28px] bg-white p-6 text-content sm:p-7 lg:absolute lg:bottom-8 lg:right-8 lg:m-0 lg:w-[460px]">
      <p className="mb-[18px] text-[15px] font-semibold">{section.infoTitle}</p>
      <dl className="mb-6 grid gap-x-5 gap-y-[18px] sm:grid-cols-2">
        <InfoItem icon={<LevelsIcon />} label={section.levelsLabel} value={course.levelsLabel} />
        <InfoItem icon={<FormatIcon />} label={section.formatLabel} value={course.format} />
        <InfoItem icon={<BadgeIcon />} label={section.startLevelLabel} value={course.levelFrom} />
        <InfoItem icon={<ClockIcon />} label={section.durationLabel} value={durationLabel(course)} />
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-[1.5px] border-dashed border-line pt-5">
        {course.price !== null && (
          <p className="text-[22px] font-bold">
            {formatSoles(course.price)} <span className="text-body-sm font-medium text-content-subtle">{course.priceUnit}</span>
          </p>
        )}
        <ArrowLink href={`/cursos/${course.slug}`} variant="dark" aria-label={`${section.ctaLabel}: ${course.title}`}>
          {section.ctaLabel}
        </ArrowLink>
      </div>
    </div>
  );
}

function CourseStackCard({ course, section }: { course: HomeCourse; section: any }) {
  return (
    <div data-stack-card="" data-top="108" className="sticky top-[88px] lg:top-[108px] lg:h-[640px]">
      <article suppressHydrationWarning className="relative h-full origin-top overflow-hidden rounded-[32px] bg-brand-night lg:rounded-[40px]">
        {course.image && (
          <img src={mediaUrl(course.image)} alt={course.imageAlt || course.title} loading="lazy" className="absolute inset-0 block h-full w-full object-cover" />
        )}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,10,74,.92)_0%,rgba(28,10,74,.6)_45%,rgba(28,10,74,.2)_100%)] lg:bg-[linear-gradient(90deg,rgba(28,10,74,.92)_0%,rgba(28,10,74,.55)_38%,rgba(28,10,74,0)_65%)]"
          aria-hidden
        />
        <div className="relative max-w-[520px] px-6 pb-24 pt-8 text-white sm:px-10 sm:pt-10 lg:absolute lg:left-14 lg:top-14 lg:p-0">
          {course.tag && (
            <span className="mb-[22px] inline-block rounded-full bg-white px-3.5 py-2 text-caption-sm font-semibold tracking-[1.4px] text-content">{course.tag}</span>
          )}
          <h3 className="mb-[18px] text-heading-lg">{course.title}</h3>
          <p className="text-[17px] leading-relaxed">{course.excerpt}</p>
        </div>
        <CourseInfoCard course={course} section={section} />
      </article>
    </div>
  );
}

export default function CoursesReact({ courses, ...props }: HomeQueryProps & { courses: HomeCourse[] }) {
  const section = useHomeSection(props, "courses");
  if (!section) return <div hidden />;

  return (
    <section id="cursos" className="pb-24 md:pb-[140px]">
      <div className="container-xl">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Eyebrow tilted className="mb-6" data-reveal="up" suppressHydrationWarning data-tina-field={tinaField(section, "eyebrow")}>
              {section.eyebrow}
            </Eyebrow>
            <h2 data-reveal="up" suppressHydrationWarning data-delay="80" className="max-w-[640px] text-heading-lg" data-tina-field={tinaField(section, "title")}>
              {section.title}
            </h2>
          </div>
          <div data-reveal="up" suppressHydrationWarning data-delay="160" className="flex max-w-[420px] flex-col items-start gap-5">
            <p className="text-[17px] leading-[1.65] text-content-muted" data-tina-field={tinaField(section, "description")}>
              {section.description}
            </p>
            {section.allLink?.label && (
              <a
                href={section.allLink.url || "/cursos"}
                className="flex items-center gap-2 text-[15px] font-semibold text-accent hover:text-brand-primary-dark"
                data-tina-field={tinaField(section, "allLink")}
              >
                {section.allLink.label}
                <ArrowIcon className="h-[18px] w-[18px]" />
              </a>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {courses.map((course) => (
            <CourseStackCard key={course.slug} course={course} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
