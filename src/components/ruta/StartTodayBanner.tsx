import { tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import { mediaUrl } from "../../utils/mediaUrl";

export default function StartTodayBanner({ cta }: { cta: any }) {
  return (
    <section className="pb-20 pt-10 md:pb-[120px]">
      <div className="container-xl">
        <div
          className="relative grid items-center gap-10 overflow-hidden rounded-[32px] bg-brand-primary px-6 py-14 sm:px-12 md:rounded-[48px] md:py-24 lg:min-h-[520px] lg:grid-cols-[minmax(0,1fr)_440px] lg:px-20"
          suppressHydrationWarning data-reveal="scale"
        >
          <img src="/images/bg-shapes.svg" alt="" className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none opacity-60 lg:opacity-100" />
          <div className="relative flex flex-col items-start">
            <Eyebrow variant="glass" pill className="mb-7 px-4 py-2" data-tina-field={tinaField(cta, "eyebrow")}>
              {cta.eyebrow}
            </Eyebrow>
            <h2
              className="mb-5 max-w-[640px] text-balance text-[clamp(2rem,3vw+0.9rem,3.25rem)] font-bold leading-[1.06] tracking-[-0.035em] text-white"
              data-tina-field={tinaField(cta, "title")}
            >
              {cta.title}
            </h2>
            <p className="mb-10 max-w-[520px] text-body-lg text-white" data-tina-field={tinaField(cta, "text")}>
              {cta.text}
            </p>
            <div className="flex flex-wrap gap-3.5">
              {cta.primary?.label && (
                <ArrowLink href={cta.primary.url || "/contacto"} variant="pink" size="lg" data-tina-field={tinaField(cta, "primary")}>
                  {cta.primary.label}
                </ArrowLink>
              )}
              {cta.secondary?.label && (
                <ArrowLink href={cta.secondary.url || "/contacto"} variant="outline-light" size="lg" data-tina-field={tinaField(cta, "secondary")}>
                  {cta.secondary.label}
                </ArrowLink>
              )}
            </div>
          </div>
          {cta.image && (
            <div className="relative hidden h-[420px] items-center justify-center lg:flex">
              <div className="absolute h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.28)_0%,rgba(255,255,255,0)_68%)]" aria-hidden />
              <div className="relative w-[400px]" suppressHydrationWarning data-speed="-0.12">
                <img
                  src={mediaUrl(cta.image)}
                  alt={cta.imageAlt || ""}
                  className="block w-full drop-shadow-[0_40px_50px_rgba(22,11,51,0.35)]"
                  suppressHydrationWarning data-float="14"
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
