import { tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import { mediaUrl } from "../../utils/mediaUrl";
import { useHomeSection, type HomeQueryProps } from "./types";

export default function OneToOneReact(props: HomeQueryProps) {
  const block = useHomeSection(props, "oneToOne");
  if (!block) return <div hidden />;

  return (
    <section data-zoom="" className="relative mt-20 h-[260vh] bg-surface motion-reduce:h-auto">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:flex-col motion-reduce:gap-10">
        <div data-zoom-pre="" suppressHydrationWarning className="absolute inset-x-0 top-[13vh] z-[1] px-4 text-center motion-reduce:static">
          <p className="mb-3 text-overline uppercase text-brand-pink-dark" data-tina-field={tinaField(block, "eyebrow")}>
            {block.eyebrow}
          </p>
          <h2 className="text-heading-lg" data-tina-field={tinaField(block, "title")}>
            {block.title}
          </h2>
        </div>

        <div
          data-zoom-target="" suppressHydrationWarning
          className="relative h-full w-full overflow-hidden will-change-transform motion-reduce:h-[70vh] motion-reduce:rounded-[32px]"
        >
          {block.image && (
            <img
              src={mediaUrl(block.image)}
              alt={block.imageAlt || ""}
              loading="lazy"
              className="block h-full w-full object-cover object-[50%_35%]"
              data-tina-field={tinaField(block, "image")}
            />
          )}
          <div
            data-zoom-fade="" suppressHydrationWarning
            className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-brand-ink/85 via-brand-ink/20 to-transparent"
          >
            <div className="container-xl flex flex-col gap-8 pb-[10vh] md:flex-row md:items-end md:justify-between md:gap-10">
              <p className="max-w-[680px] text-heading-lg text-white lg:text-[52px]" data-tina-field={tinaField(block, "overlayTitle")}>
                {block.overlayTitle}
              </p>
              {block.cta?.label && (
                <ArrowLink
                  href={block.cta.url || "#"}
                  variant="white"
                  size="lg"
                  className="pointer-events-auto shrink-0 self-start md:self-auto"
                  data-tina-field={tinaField(block, "cta")}
                >
                  {block.cta.label}
                </ArrowLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
