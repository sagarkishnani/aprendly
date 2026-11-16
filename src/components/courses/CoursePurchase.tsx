import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import { useCountdown } from "./useCountdown";
import { formatPrice, withQuery } from "./courseUtils";

interface Props {
  course: any;
  slug: string;
  purchase: any;
  labels: any;
}

function PriceLine({ course, purchase, showDiscount }: { course: any; purchase: any; showDiscount: boolean }) {
  const price: number | null = course.price ?? null;
  const original: number | null = purchase?.originalPrice ?? null;
  const discounted = showDiscount && price != null && original != null && original > price;
  if (price == null) return null;
  return (
    <div className="mb-1 flex flex-wrap items-baseline gap-x-2.5">
      <span className="text-[40px] font-bold tracking-[-1.5px] sm:text-[44px]" data-tina-field={tinaField(course, "price")}>
        {formatPrice(price)}
      </span>
      {!discounted && course.priceUnit && <span className="text-body-md text-content-subtle">{course.priceUnit}</span>}
      {discounted && (
        <>
          <span className="text-body-md font-semibold text-brand-pink-dark">-{Math.round((1 - price / original) * 100)}%</span>
          <span className="text-[15px] text-content-subtle line-through" data-tina-field={tinaField(purchase, "originalPrice")}>
            {formatPrice(original)}
          </span>
        </>
      )}
    </div>
  );
}

function OptionLabel({ children }: { children: string }) {
  return <p className="mb-2 text-caption-md font-semibold">{children}</p>;
}

function LevelPicker({ levels, value, onChange, label }: { levels: string[]; value: string; onChange: (level: string) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="mb-4 grid grid-cols-4 gap-1.5">
      {levels.map((level) => {
        const active = level === value;
        return (
          <button
            key={level}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(level)}
            className={`rounded-xl border-[1.5px] py-2.5 text-body-sm font-semibold transition-colors ${
              active ? "border-brand-primary bg-brand-primary text-white" : "border-line bg-surface text-content hover:border-brand-primary"
            }`}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}

function ScheduleSelect({ schedules, value, onChange, label }: { schedules: string[]; value: string; onChange: (schedule: string) => void; label: string }) {
  return (
    <div className="relative mb-5">
      <select
        value={value}
        aria-label={label}
        onChange={(event) => onChange(event.target.value)}
        className="w-full cursor-pointer appearance-none rounded-[14px] border-[1.5px] border-line bg-surface py-3.5 pl-4 pr-12 text-body-sm text-content outline-none focus-visible:border-brand-primary"
      >
        {schedules.map((schedule) => (
          <option key={schedule} value={schedule}>
            {schedule}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2" aria-hidden>
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

function Benefits({ purchase }: { purchase: any }) {
  const benefits: string[] = (purchase?.benefits ?? []).filter(Boolean);
  if (benefits.length === 0) return null;
  return (
    <ul className="flex flex-col gap-2.5 text-body-sm leading-normal" data-tina-field={tinaField(purchase, "benefits")}>
      {benefits.map((benefit) => (
        <li key={benefit} className="flex gap-2.5">
          <span className="font-bold text-accent" aria-hidden>
            ✓
          </span>
          {benefit}
        </li>
      ))}
    </ul>
  );
}

function RouteCard({ course, slug, purchase, labels }: Props) {
  const routePrice: number | null = purchase?.routePrice ?? null;
  if (routePrice == null) return null;
  const levelCount = (purchase?.levels ?? []).length;
  const savings = course.price != null && levelCount > 0 ? course.price * levelCount - routePrice : 0;
  const href = withQuery(labels?.enrollUrl || "/contacto", { curso: slug, nivel: "ruta-completa" });
  return (
    <div suppressHydrationWarning data-reveal="up" data-delay="100" className="flex items-center justify-between gap-4 rounded-[28px] border-[1.5px] border-line px-6 py-6 sm:px-7">
      <div>
        <p className="mb-1 text-body-sm text-content-subtle" data-tina-field={tinaField(purchase, "routeLabel")}>
          {purchase?.routeLabel}
        </p>
        <p className="text-[28px] font-bold tracking-[-0.8px]" data-tina-field={tinaField(purchase, "routePrice")}>
          {formatPrice(routePrice)}
        </p>
        {savings > 0 && (
          <p className="text-caption-sm font-semibold text-brand-pink-dark">
            {labels?.savingsLabel} {formatPrice(savings)}
          </p>
        )}
      </div>
      <ArrowLink href={href} variant="outline" data-tina-field={tinaField(labels, "routeCtaLabel")}>
        {labels?.routeCtaLabel}
      </ArrowLink>
    </div>
  );
}

function AdvisorCard({ labels }: { labels: any }) {
  if (!labels?.advisorTitle) return null;
  return (
    <div suppressHydrationWarning data-reveal="up" data-delay="160" className="flex items-center justify-between gap-4 rounded-[28px] border-[1.5px] border-line px-6 py-6 sm:px-7">
      <div className="flex min-w-0 items-center gap-3.5">
        <img src="/images/whatsapp.svg" alt="" className="h-11 w-11 shrink-0" />
        <div>
          <p className="text-[15px] font-semibold" data-tina-field={tinaField(labels, "advisorTitle")}>
            {labels.advisorTitle}
          </p>
          <p className="text-caption-md text-content-subtle" data-tina-field={tinaField(labels, "advisorText")}>
            {labels.advisorText}
          </p>
        </div>
      </div>
      <a
        href={labels.advisorUrl || "/contacto"}
        className="flex h-[46px] shrink-0 items-center rounded-full border-[1.5px] border-brand-ink px-[18px] text-body-sm font-semibold text-brand-ink transition-colors hover:bg-brand-ink hover:text-white"
        data-tina-field={tinaField(labels, "advisorButton")}
      >
        {labels.advisorButton}
      </a>
    </div>
  );
}

export default function CoursePurchase({ course, slug, purchase, labels }: Props) {
  const levels: string[] = (purchase?.levels ?? []).filter(Boolean);
  const schedules: string[] = (purchase?.schedules ?? []).filter(Boolean);
  const [level, setLevel] = useState<string>(purchase?.defaultLevel && levels.includes(purchase.defaultLevel) ? purchase.defaultLevel : levels[0] ?? "");
  const [schedule, setSchedule] = useState<string>(schedules[0] ?? "");
  const countdown = useCountdown(purchase?.offerEndsAt);
  const enrollHref = withQuery(labels?.enrollUrl || "/contacto", { curso: slug, nivel: level || undefined, horario: schedule || undefined });
  const courseLine = level ? `${course.title} · ${labels?.levelWord ?? ""} ${level}` : course.title;

  return (
    <div className="flex flex-col gap-4">
      {purchase?.heading && (
        <p className="text-[22px] font-medium tracking-[-0.4px] sm:text-[24px]" data-tina-field={tinaField(purchase, "heading")}>
          {purchase.heading}
        </p>
      )}
      <div suppressHydrationWarning data-reveal="up" className="rounded-[28px] border-2 border-brand-primary bg-surface-tint p-6 sm:p-7">
        <p className="mb-1.5 text-caption-md text-content-subtle" data-tina-field={tinaField(labels, "yourCourseLabel")}>
          {labels?.yourCourseLabel}
        </p>
        <p className="mb-[18px] text-[17px] font-semibold leading-[1.35]">{courseLine}</p>
        <PriceLine course={course} purchase={purchase} showDiscount={!countdown.expired} />
        {purchase?.note && (
          <p className="mb-5 text-body-sm text-content-muted" data-tina-field={tinaField(purchase, "note")}>
            {purchase.note}
          </p>
        )}
        {levels.length > 0 && (
          <>
            <OptionLabel>{labels?.startLevelLabel}</OptionLabel>
            <LevelPicker levels={levels} value={level} onChange={setLevel} label={labels?.startLevelLabel} />
          </>
        )}
        {schedules.length > 0 && (
          <>
            <OptionLabel>{labels?.scheduleLabel}</OptionLabel>
            <ScheduleSelect schedules={schedules} value={schedule} onChange={setSchedule} label={labels?.scheduleLabel} />
          </>
        )}
        <ArrowLink href={enrollHref} size="lg" className="mt-1 w-full justify-between" data-tina-field={purchase?.ctaLabel ? tinaField(purchase, "ctaLabel") : tinaField(labels, "enrollLabel")}>
          {purchase?.ctaLabel || labels?.enrollLabel}
        </ArrowLink>
        {countdown.hasDeadline && !countdown.expired && (
          <p className="mb-[18px] mt-3.5 text-center text-body-sm text-brand-pink-dark" data-tina-field={tinaField(purchase, "offerEndsAt")}>
            {labels?.offerEndsLabel} <span className="font-bold tabular-nums">{countdown.label}</span>
          </p>
        )}
        <div className={countdown.hasDeadline && !countdown.expired ? "" : "mt-5"}>
          <Benefits purchase={purchase} />
        </div>
      </div>
      <RouteCard course={course} slug={slug} purchase={purchase} labels={labels} />
      <AdvisorCard labels={labels} />
    </div>
  );
}
