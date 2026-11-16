import { tinaField } from "tinacms/dist/react";
import { FaStar } from "react-icons/fa6";

interface Props {
  id: string;
  title: string;
  titleField?: string;
  teachers: any[];
  reviewsLabel: string;
}

function TeacherCard({ teacher, delay, reviewsLabel }: { teacher: any; delay: number; reviewsLabel: string }) {
  return (
    <li suppressHydrationWarning data-reveal="up" data-delay={delay} className="flex items-center gap-[18px] rounded-2xl border-[1.5px] border-line p-5">
      {teacher?.image && (
        <img
          src={teacher.image}
          alt={teacher?.name || ""}
          loading="lazy"
          className="h-[72px] w-[72px] shrink-0 rounded-full object-cover object-[50%_20%] sm:h-[88px] sm:w-[88px]"
          data-tina-field={tinaField(teacher, "image")}
        />
      )}
      <div className="min-w-0">
        <p className="text-[17px] font-semibold" data-tina-field={tinaField(teacher, "name")}>
          {teacher?.name}
        </p>
        {teacher?.tag && (
          <p className="mb-1.5 mt-0.5 text-body-sm text-content-subtle" data-tina-field={tinaField(teacher, "tag")}>
            {teacher.tag}
          </p>
        )}
        {teacher?.rating != null && (
          <p className="flex items-center gap-1 text-caption-md">
            <FaStar aria-hidden className="h-3 w-3" />
            {Number(teacher.rating).toFixed(1)}
            {teacher?.reviews != null && ` · ${teacher.reviews} ${reviewsLabel}`}
          </p>
        )}
      </div>
    </li>
  );
}

export default function CourseTeachers({ id, title, titleField, teachers, reviewsLabel }: Props) {
  if (teachers.length === 0) return null;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mb-[72px] scroll-mt-40">
      <h2 id={`${id}-title`} suppressHydrationWarning data-reveal="up" className="mb-6 text-[28px] font-bold leading-tight tracking-[-1px] sm:text-[34px]" data-tina-field={titleField}>
        {title}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2">
        {teachers.map((teacher, index) => (
          <TeacherCard key={teacher?.name ?? index} teacher={teacher} delay={(index % 2) * 100} reviewsLabel={reviewsLabel} />
        ))}
      </ul>
    </section>
  );
}
