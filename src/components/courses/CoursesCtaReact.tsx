import { useTina, tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";

interface Props {
  query: string;
  variables: object;
  data: any;
  tinted?: boolean;
}

export default function CoursesCtaReact({ tinted = false, ...tinaProps }: Props) {
  const { data } = useTina(tinaProps);
  const cta = data?.cursosPage?.cta;
  if (!cta?.title) return <div hidden />;

  return (
    <section className={`pb-20 pt-10 lg:pb-[120px] ${tinted ? "bg-surface-tint" : ""}`}>
      <div className="container-xl">
        <div
          suppressHydrationWarning
          data-reveal="scale"
          className="relative grid items-center gap-10 overflow-hidden rounded-3xl bg-brand-primary px-6 py-14 sm:px-12 lg:min-h-[520px] lg:grid-cols-[minmax(0,1fr)_440px] lg:rounded-[48px] lg:px-20 lg:py-24"
        >
          <img src="/images/bg-shapes.svg" alt="" aria-hidden className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto lg:block" />
          <div className="relative flex flex-col items-start">
            {cta.eyebrow && (
              <span className="mb-7 rounded-full bg-white/15 px-4 py-2 text-[13px] font-semibold tracking-[2px] text-white" data-tina-field={tinaField(cta, "eyebrow")}>
                {cta.eyebrow}
              </span>
            )}
            <h2 className="mb-[22px] max-w-[640px] text-balance text-heading-xl text-white lg:text-[52px] lg:tracking-[-1.8px]" data-tina-field={tinaField(cta, "title")}>
              {cta.title}
            </h2>
            {cta.text && (
              <p className="mb-10 max-w-[520px] text-body-lg text-white" data-tina-field={tinaField(cta, "text")}>
                {cta.text}
              </p>
            )}
            <div className="flex flex-wrap gap-3.5">
              {cta.primary?.label && (
                <ArrowLink href={cta.primary.url || "/contacto"} variant="pink" size="lg" data-tina-field={tinaField(cta.primary, "label")}>
                  {cta.primary.label}
                </ArrowLink>
              )}
              {cta.secondary?.label && (
                <ArrowLink href={cta.secondary.url || "/contacto"} variant="outline-light" size="lg" data-tina-field={tinaField(cta.secondary, "label")}>
                  {cta.secondary.label}
                </ArrowLink>
              )}
            </div>
          </div>
          {cta.image && (
            <div className="relative hidden h-[420px] items-center justify-center lg:flex">
              <div className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.28)_0%,rgba(255,255,255,0)_68%)]" />
              <div suppressHydrationWarning data-speed="-0.12" className="relative w-[400px]">
                <img
                  suppressHydrationWarning
                  data-float="14"
                  src={cta.image}
                  alt={cta.imageAlt || ""}
                  loading="lazy"
                  className="block w-full drop-shadow-[0_40px_50px_rgba(22,11,51,0.35)]"
                  data-tina-field={tinaField(cta, "image")}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
