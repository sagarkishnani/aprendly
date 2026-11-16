import { tinaField } from "tinacms/dist/react";
import { usePageData, type PageQueryProps } from "../eventos/eventData";

const ICON_PATHS: Record<string, string> = {
  building: "M3 21h18M5 21V7l7-4 7 4v14M9 10h1M14 10h1M9 14h1M14 14h1M10 21v-3h4v3",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  screen: "M4 5h16v12H4zM8 21h8M12 17v4",
  bulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
  star: "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6 7.1 18.2l.9-5.5-4-3.9 5.5-.8z",
};

function FormatIcon({ name }: { name?: string | null }) {
  const path = name ? ICON_PATHS[name] : undefined;
  if (!path) return null;
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={path} />
    </svg>
  );
}

function FormatCard({ item, delay }: { item: any; delay: number }) {
  const featured = !!item.featured;
  const tags: string[] = (item.tags || []).filter(Boolean);
  return (
    <article
      suppressHydrationWarning data-reveal="up"
      data-delay={delay}
      className={`relative flex min-h-[260px] flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 md:min-h-[300px] md:p-9 ${
        featured ? "bg-brand-primary text-white md:col-span-2" : "bg-brand-primary-lightest text-content"
      }`}
    >
      <span className={`mb-7 flex h-14 w-14 items-center justify-center rounded-[18px] ${featured ? "bg-white text-accent" : "bg-brand-primary text-white"}`} data-tina-field={tinaField(item, "icon")}>
        <FormatIcon name={item.icon} />
      </span>
      <h3 className="mb-2.5 text-[clamp(1.375rem,0.6vw+1.1rem,1.625rem)] font-bold tracking-[-0.02em]" data-tina-field={tinaField(item, "title")}>
        {item.title}
      </h3>
      <p className={`mb-6 max-w-[460px] text-[15px] leading-[1.65] ${featured ? "text-white" : "text-content-muted"}`} data-tina-field={tinaField(item, "text")}>
        {item.text}
      </p>
      {tags.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-2" data-tina-field={tinaField(item, "tags")}>
          {tags.map((tag) => (
            <li key={tag} className={`rounded-full px-3 py-[7px] text-caption-sm font-semibold ${featured ? "bg-white/15" : "bg-white"}`}>
              {tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function FormatsReact(props: PageQueryProps) {
  const formats = usePageData(props, "empresasPage")?.formats;
  if (!formats) return <div hidden />;
  const items = (formats.items || []).filter(Boolean);

  return (
    <section id="formatos" className="scroll-mt-[84px] pb-20 md:pb-[120px]">
      <div className="container-xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end md:gap-16">
          <div>
            {formats.eyebrow && (
              <div suppressHydrationWarning data-reveal="up" className="mb-4 text-[13px] font-semibold uppercase tracking-[2px] text-brand-pink-dark" data-tina-field={tinaField(formats, "eyebrow")}>
                {formats.eyebrow}
              </div>
            )}
            <h2 suppressHydrationWarning data-reveal="up" data-delay="80" className="max-w-[620px] text-heading-lg" data-tina-field={tinaField(formats, "title")}>
              {formats.title}
            </h2>
          </div>
          {formats.text && (
            <p suppressHydrationWarning data-reveal="up" data-delay="140" className="max-w-[420px] text-[17px] leading-[1.65] text-content-muted" data-tina-field={tinaField(formats, "text")}>
              {formats.text}
            </p>
          )}
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item: any, index: number) => (
            <FormatCard key={index} item={item} delay={(index % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  );
}
