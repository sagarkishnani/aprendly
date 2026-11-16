import { useTina, tinaField } from "tinacms/dist/react";
import { mediaUrl } from "../../utils/mediaUrl";
import type { TinaPageProps } from "../ruta/types";

export default function NosotrosHeroReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const hero = data?.nosotrosPage?.hero;
  if (!hero) return <div hidden />;

  return (
    <section className="pt-4 md:pt-6">
      <div className="mx-auto w-full max-w-[1408px] px-4 sm:px-6 lg:px-8">
        <div
          className="relative grid origin-top items-center overflow-hidden rounded-[32px] bg-brand-primary md:rounded-[48px] lg:min-h-[540px] lg:grid-cols-[420px_minmax(0,1fr)]"
          suppressHydrationWarning data-grow
        >
          <img src="/images/bg-shapes.svg" alt="" className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none" />
          <div className="relative order-2 h-[340px] overflow-hidden sm:h-[420px] lg:order-1 lg:h-[540px]">
            <div className="absolute inset-0 flex items-end justify-center lg:justify-start">
              <img
                src={mediaUrl(hero.image)}
                alt={hero.imageAlt || ""}
                className="block h-[104%] w-auto max-w-none"
                suppressHydrationWarning data-speed="0.08"
                data-tina-field={tinaField(hero, "image")}
              />
            </div>
          </div>
          <div className="relative order-1 px-6 pb-4 pt-12 text-white sm:px-12 lg:order-2 lg:py-16 lg:pl-10 lg:pr-20">
            <p className="mb-5 text-overline uppercase" suppressHydrationWarning data-reveal="up" data-tina-field={tinaField(hero, "eyebrow")}>
              {hero.eyebrow}
            </p>
            <h1 className="mb-5 max-w-[680px] text-balance text-heading-xl" suppressHydrationWarning data-reveal="up" data-delay="80" data-tina-field={tinaField(hero, "title")}>
              {hero.title}
            </h1>
            <p className="max-w-[540px] text-body-lg" suppressHydrationWarning data-reveal="up" data-delay="160" data-tina-field={tinaField(hero, "text")}>
              {hero.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
