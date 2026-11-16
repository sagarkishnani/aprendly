import { useTina, tinaField } from "tinacms/dist/react";
import CourseHero, { type HeroStat } from "./CourseHero";
import CourseTabs, { type CourseTab } from "./CourseTabs";
import CourseMedia from "./CourseMedia";
import CourseAbout from "./CourseAbout";
import CourseModules from "./CourseModules";
import CourseTeachers from "./CourseTeachers";
import CourseCertificate from "./CourseCertificate";
import CoursePurchase from "./CoursePurchase";
import { formatCount } from "./courseUtils";

interface TinaProps {
  query: string;
  variables: object;
  data: any;
}

interface Props {
  page: TinaProps;
  course: TinaProps;
  slug: string;
}

const SECTION_IDS = { info: "info", content: "contenido", teachers: "profesores", certificate: "certificado" };

function heroStats(course: any, detail: any, studentsSuffix: string): HeroStat[] {
  const custom: any[] = (detail?.stats ?? []).filter((stat: any) => stat?.text);
  if (custom.length > 0) return custom.map((stat) => ({ text: stat.text, emphasis: stat.emphasis, source: stat }));
  const derived: HeroStat[] = [];
  if (course.levelsLabel) derived.push({ text: course.levelsLabel, emphasis: true });
  if (course.lessons) derived.push({ text: course.lessons, emphasis: true });
  if (course.duration) derived.push({ text: course.duration });
  if (course.students != null) derived.push({ text: `${formatCount(course.students)} ${studentsSuffix}` });
  return derived;
}

function resolveTeachers(detail: any): any[] {
  return (detail?.teachers ?? []).map((entry: any) => entry?.teacher).filter((teacher: any) => teacher?.name);
}

function Breadcrumb({ header, course }: { header: any; course: any }) {
  return (
    <nav aria-label="Miga de pan" className="border-b border-line">
      <ol className="container-xl flex h-14 items-center gap-3 overflow-hidden whitespace-nowrap text-body-sm text-content-subtle">
        <li>
          <a href="/" className="hover:text-accent">{header?.homeLabel}</a>
        </li>
        <li aria-hidden>›</li>
        <li>
          <a href="/cursos" className="text-content hover:text-accent">{header?.coursesLabel}</a>
        </li>
        <li aria-hidden>›</li>
        <li aria-current="page" className="truncate">{course.title}</li>
      </ol>
    </nav>
  );
}

export default function CourseDetailReact({ page, course: courseProps, slug }: Props) {
  const { data: pageData } = useTina(page);
  const { data: courseData } = useTina(courseProps);
  const content = pageData?.cursosPage;
  const course = courseData?.course;
  if (!content || !course) return <div hidden />;

  const labels = content.detail;
  const detail = course.detail;
  const typeOption = (content.filters?.typeOptions ?? []).find((option: any) => option?.value === course.type);
  const teachers = resolveTeachers(detail);
  const modules: any[] = (detail?.modules ?? []).filter((module: any) => module?.title);
  const hasCertificate = Boolean(detail?.certificate?.title);

  const tabs: CourseTab[] = [
    { id: SECTION_IDS.info, label: labels?.tabInfo, tinaField: tinaField(labels, "tabInfo") },
    modules.length > 0 && { id: SECTION_IDS.content, label: labels?.tabContent, tinaField: tinaField(labels, "tabContent") },
    teachers.length > 0 && { id: SECTION_IDS.teachers, label: labels?.tabTeachers, tinaField: tinaField(labels, "tabTeachers") },
    hasCertificate && { id: SECTION_IDS.certificate, label: labels?.tabCertificate, tinaField: tinaField(labels, "tabCertificate") },
  ].filter(Boolean) as CourseTab[];

  return (
    <>
      <Breadcrumb header={content.header} course={course} />
      <section className="pb-20 pt-10 lg:pb-[120px] lg:pt-14">
        <div className="container-xl grid items-start gap-x-16 gap-y-10 lg:gap-y-0 lg:grid-cols-[minmax(0,1fr)_400px] lg:grid-rows-[auto_1fr]">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <CourseHero
              course={course}
              detail={detail}
              badge={detail?.badge || typeOption?.cardLabel || ""}
              bestSellerLabel={content.card?.bestSellerLabel ?? ""}
              teachers={teachers}
              teachersCountLabel={labels?.teachersCountLabel ?? ""}
              stats={heroStats(course, detail, content.card?.studentsSuffix ?? "")}
              statsNote={detail?.statsNote || course.format || ""}
            />
          </div>

          <aside className="lg:sticky lg:top-[108px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <CoursePurchase course={course} slug={slug} purchase={detail?.purchase} labels={labels} />
          </aside>

          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <CourseTabs tabs={tabs} />
            <div id={SECTION_IDS.info} className="scroll-mt-40">
              <CourseMedia video={detail?.video} fallbackImage={course.image} fallbackAlt={course.imageAlt} playLabel={labels?.playLabel ?? ""} />
              <CourseAbout
                title={detail?.aboutTitle || labels?.aboutFallbackTitle || ""}
                titleField={detail?.aboutTitle ? tinaField(detail, "aboutTitle") : tinaField(labels, "aboutFallbackTitle")}
                text={detail?.aboutText || course.excerpt || ""}
                textField={detail?.aboutText ? tinaField(detail, "aboutText") : tinaField(course, "excerpt")}
                facts={(detail?.facts ?? []).filter((fact: any) => fact?.text)}
              />
            </div>
            <div id={SECTION_IDS.content} className="scroll-mt-40">
              <CourseModules modules={modules} />
            </div>
            <CourseTeachers
              id={SECTION_IDS.teachers}
              title={labels?.teachersTitle ?? ""}
              titleField={tinaField(labels, "teachersTitle")}
              teachers={teachers}
              reviewsLabel={labels?.reviewsLabel ?? ""}
            />
            <CourseCertificate
              id={SECTION_IDS.certificate}
              heading={labels?.certificateTitle ?? ""}
              headingField={tinaField(labels, "certificateTitle")}
              certificate={detail?.certificate}
            />
          </div>
        </div>
      </section>
    </>
  );
}
