import { tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import { mediaUrl } from "../../utils/mediaUrl";
import { useHomeSection, type HomeQueryProps } from "./types";

export default function FinalCtaReact(props: HomeQueryProps) {
  const cta = useHomeSection(props, "finalCta");
  if (!cta) return <div hidden />;

  return (
    <div className="bg-brand-primary">
      <div className="rounded-t-[32px] bg-surface pt-12 md:rounded-t-[56px] md:pt-20">
        <section className="pb-20 pt-10 md:pb-[120px]">
          <div className="container-xl">
            <div
              data-reveal="scale" suppressHydrationWarning
              className="relative grid items-center gap-10 overflow-hidden rounded-[32px] bg-brand-primary px-6 py-14 sm:px-12 md:rounded-[48px] lg:min-h-[520px] lg:grid-cols-[minmax(0,1fr)_440px] lg:px-20 lg:py-24"
            >
              <img src="/images/bg-shapes.svg" alt="" aria-hidden className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto max-w-none sm:block" />
              <div className="relative flex flex-col items-start text-white">
                <p className="mb-7 rounded-full bg-white/15 px-4 py-2 text-overline uppercase" data-tina-field={tinaField(cta, "eyebrow")}>
                  {cta.eyebrow}
                </p>
                <h2 className="mb-[22px] max-w-[640px] text-heading-lg [text-wrap:balance] lg:text-[52px]" data-tina-field={tinaField(cta, "title")}>
                  {cta.title}
                </h2>
                <p className="mb-10 max-w-[520px] text-body-lg" data-tina-field={tinaField(cta, "description")}>
                  {cta.description}
                </p>
                <div className="flex flex-wrap gap-3.5">
                  {cta.primaryCta?.label && (
                    <ArrowLink href={cta.primaryCta.url || "#"} variant="pink" size="lg" data-tina-field={tinaField(cta, "primaryCta")}>
                      {cta.primaryCta.label}
                    </ArrowLink>
                  )}
                  {cta.secondaryCta?.label && (
                    <ArrowLink href={cta.secondaryCta.url || "#"} variant="outline-light" size="lg" data-tina-field={tinaField(cta, "secondaryCta")}>
                      {cta.secondaryCta.label}
                    </ArrowLink>
                  )}
                </div>
              </div>
              {cta.image && (
                <div className="relative flex h-[220px] items-center justify-center sm:h-[420px]">
                  <div className="absolute h-[240px] w-[240px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.28)_0%,rgba(255,255,255,0)_68%)] sm:h-[320px] sm:w-[320px]" aria-hidden />
                  <div data-speed="-0.12" suppressHydrationWarning className="relative w-[200px] sm:w-[400px]">
                    <img
                      data-float="14" suppressHydrationWarning
                      src={mediaUrl(cta.image)}
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
      </div>
    </div>
  );
}
