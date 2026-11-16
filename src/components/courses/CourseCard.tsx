import { FaStar } from "react-icons/fa6";
import ArrowLink from "../ui/ArrowLink";
import { courseHref, formatCount, formatPrice, type CourseSummary } from "./courseUtils";

export interface CourseCardLabels {
  typeLabel: string;
  bestSellerLabel: string;
  newLabel: string;
  studentsSuffix: string;
  ctaLabel: string;
}

interface Props {
  course: CourseSummary;
  labels: CourseCardLabels;
  tinaFieldFor: (field: string) => string | undefined;
  delay: number;
}

function CourseBadges({ course, labels }: { course: CourseSummary; labels: CourseCardLabels }) {
  if (!course.bestSeller && !course.isNew) return null;
  return (
    <div className="absolute left-3.5 top-3.5 flex gap-1.5">
      {course.bestSeller && (
        <span className="rounded-full bg-brand-pink px-2.5 py-[5px] text-[11px] font-bold tracking-[0.6px] text-white">
          {labels.bestSellerLabel}
        </span>
      )}
      {course.isNew && (
        <span className="rounded-full bg-white px-2.5 py-[5px] text-[11px] font-bold tracking-[0.6px] text-accent">
          {labels.newLabel}
        </span>
      )}
    </div>
  );
}

export default function CourseCard({ course, labels, tinaFieldFor, delay }: Props) {
  const href = courseHref(course.slug);
  return (
    <article suppressHydrationWarning data-reveal="up" data-delay={delay} className="flex flex-col gap-2.5">
      <a
        href={href}
        tabIndex={-1}
        aria-hidden
        className="relative block h-[220px] overflow-hidden rounded-2xl bg-brand-primary-lightest transition-transform duration-500 ease-out-expo hover:-translate-y-1 sm:h-[250px]"
      >
        {course.image && (
          <div suppressHydrationWarning data-zoomin className="h-full w-full">
            <img
              src={course.image}
              alt=""
              loading="lazy"
              className="block h-full w-full object-cover"
              data-tina-field={tinaFieldFor("image")}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 to-brand-ink/0 to-45%" />
        <CourseBadges course={course} labels={labels} />
        {course.duration && (
          <span className="absolute bottom-3.5 right-4 text-caption-md font-medium text-white">{course.duration}</span>
        )}
      </a>
      <div className="flex flex-1 flex-col rounded-2xl bg-surface px-[22px] pb-[18px] pt-[22px]">
        {labels.typeLabel && (
          <p className="mb-1.5 text-caption-sm font-semibold tracking-[0.8px] text-accent">{labels.typeLabel}</p>
        )}
        <h3 className="mb-3.5 flex-1 text-[19px] font-semibold leading-[1.3]">
          <a href={href} className="text-content transition-colors hover:text-accent" data-tina-field={tinaFieldFor("title")}>
            {course.title}
          </a>
        </h3>
        <div className="mb-4 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-caption-md text-content-muted">
          {course.lessons && <span>{course.lessons}</span>}
          {course.students != null && (
            <span>
              {formatCount(course.students)} {labels.studentsSuffix}
            </span>
          )}
          {course.rating != null && (
            <span className="ml-auto flex items-center gap-1 font-semibold text-content">
              <FaStar className="h-3.5 w-3.5 text-brand-pink" aria-hidden />
              {course.rating.toFixed(1)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2.5 border-t-[1.5px] border-dashed border-line pt-4">
          {course.price != null && (
            <p className="min-w-0 text-[21px] font-bold leading-tight" data-tina-field={tinaFieldFor("price")}>
              {formatPrice(course.price)}{" "}
              {course.priceUnit && <span className="whitespace-nowrap text-caption-md font-medium text-content-subtle">{course.priceUnit}</span>}
            </p>
          )}
          <ArrowLink href={href} className="shrink-0" aria-label={`${labels.ctaLabel}: ${course.title}`}>
            {labels.ctaLabel}
          </ArrowLink>
        </div>
      </div>
    </article>
  );
}
