import { tinaField } from "tinacms/dist/react";

export interface HeroStat {
  text: string;
  emphasis?: boolean | null;
  source?: any;
}

interface Props {
  course: any;
  detail: any;
  badge: string;
  bestSellerLabel: string;
  teachers: any[];
  teachersCountLabel: string;
  stats: HeroStat[];
  statsNote: string;
}

function TeacherAvatars({ teachers, label }: { teachers: any[]; label: string }) {
  if (teachers.length === 0) return null;
  return (
    <div suppressHydrationWarning data-reveal="up" data-delay="120" className="mb-8 flex items-center gap-3.5">
      <div className="flex">
        {teachers.slice(0, 4).map((teacher, index) => (
          <img
            key={teacher?.name ?? index}
            src={teacher?.image}
            alt=""
            className={`h-10 w-10 rounded-full border-2 border-white object-cover object-[50%_20%] ${index > 0 ? "-ml-2.5" : ""}`}
          />
        ))}
      </div>
      <span className="text-body-md font-medium">
        {teachers.length} {label}
      </span>
    </div>
  );
}

function StatsPanel({ stats, note, detail }: { stats: HeroStat[]; note: string; detail: any }) {
  if (stats.length === 0 && !note) return null;
  return (
    <div suppressHydrationWarning data-reveal="up" data-delay="180" className="mb-10 flex flex-col gap-3 rounded-2xl bg-brand-primary-lightest/60 px-5 py-5 sm:px-[26px] sm:py-[22px]">
      {stats.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-[22px] gap-y-2.5 text-[15px]">
          {stats.map((stat, index) => (
            <li
              key={`${stat.text}-${index}`}
              className={stat.emphasis ? "font-bold uppercase tracking-[0.4px]" : ""}
              data-tina-field={stat.source ? tinaField(stat.source, "text") : undefined}
            >
              {stat.text}
            </li>
          ))}
        </ul>
      )}
      {note && (
        <p className="text-body-sm text-content-muted" data-tina-field={detail ? tinaField(detail, "statsNote") : undefined}>
          {note}
        </p>
      )}
    </div>
  );
}

export default function CourseHero({ course, detail, badge, bestSellerLabel, teachers, teachersCountLabel, stats, statsNote }: Props) {
  return (
    <div>
      <div suppressHydrationWarning data-reveal="up" className="mb-5 flex flex-wrap gap-2">
        {badge && (
          <span className="rounded-full bg-brand-pink px-3 py-1.5 text-caption-sm font-bold tracking-[0.8px] text-white" data-tina-field={detail ? tinaField(detail, "badge") : undefined}>
            {badge}
          </span>
        )}
        {course.bestSeller && bestSellerLabel && (
          <span className="rounded-full bg-brand-primary-lightest px-3 py-1.5 text-caption-sm font-bold tracking-[0.8px] text-accent">
            {bestSellerLabel}
          </span>
        )}
      </div>
      <h1
        suppressHydrationWarning
        data-reveal="up"
        data-delay="60"
        className="mb-[22px] text-heading-xl"
        data-tina-field={detail?.headline ? tinaField(detail, "headline") : tinaField(course, "title")}
      >
        {detail?.headline || course.title}
      </h1>
      <TeacherAvatars teachers={teachers} label={teachersCountLabel} />
      <StatsPanel stats={stats} note={statsNote} detail={detail} />
    </div>
  );
}
