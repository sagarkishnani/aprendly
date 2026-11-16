import { tinaField } from "tinacms/dist/react";
import { mediaUrl } from "../../utils/mediaUrl";
import { useHomeSection, type HomeQueryProps, type HomeTeacher } from "./types";

function TeacherCard({ teacher, index }: { teacher: HomeTeacher; index: number }) {
  return (
    <article
      data-reveal="up" suppressHydrationWarning
      data-delay={index * 90}
      className="flex flex-col rounded-3xl bg-white p-3 transition duration-500 ease-out-expo hover:-translate-y-2 hover:shadow-[0_28px_60px_rgba(116,22,237,0.14)]"
    >
      <div className="h-[300px] overflow-hidden rounded-2xl bg-brand-primary-lightest">
        <div data-zoomin="" suppressHydrationWarning className="h-full w-full">
          {teacher.image && (
            <img src={mediaUrl(teacher.image)} alt={teacher.name} loading="lazy" className="block h-full w-full object-cover object-[50%_25%]" />
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 px-2.5 pb-2.5 pt-5">
        <h3 className="text-[19px] font-semibold">{teacher.name}</h3>
        <p className="text-caption-md font-semibold text-accent">{teacher.tag}</p>
        <p className="mb-3.5 mt-1.5 text-body-sm text-content-muted">{teacher.bio}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5">
          {teacher.skills.map((skill) => (
            <li key={skill} className="rounded-full bg-brand-primary-lightest px-[11px] py-1.5 text-caption-sm font-medium">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function TeachersReact({ teachers, ...props }: HomeQueryProps & { teachers: HomeTeacher[] }) {
  const section = useHomeSection(props, "teachers");
  if (!section) return <div hidden />;

  return (
    <section id="profesores" className="mb-20 scroll-mt-24 rounded-[32px] bg-brand-primary-lightest pb-20 pt-16 md:mb-[120px] md:rounded-[56px] md:pb-[120px] md:pt-28">
      <div className="container-xl">
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <p data-reveal="up" suppressHydrationWarning className="mb-4 text-overline uppercase text-brand-pink-dark" data-tina-field={tinaField(section, "eyebrow")}>
              {section.eyebrow}
            </p>
            <h2 data-reveal="up" suppressHydrationWarning data-delay="80" className="text-heading-lg" data-tina-field={tinaField(section, "title")}>
              {section.title}
            </h2>
          </div>
          <p data-reveal="up" suppressHydrationWarning data-delay="140" className="max-w-[460px] text-[17px] leading-relaxed text-content-muted" data-tina-field={tinaField(section, "description")}>
            {section.description}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.name} teacher={teacher} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
