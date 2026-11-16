import { tinaField } from "tinacms/dist/react";
import { mediaUrl } from "../../utils/mediaUrl";
import { usePageData, type PageQueryProps } from "../eventos/eventData";

function LogoRow({ items, hidden }: { items: any[]; hidden?: boolean }) {
  return (
    <>
      {items.map((logo, index) => (
        <img
          key={`${hidden ? "copy" : "main"}-${index}`}
          src={mediaUrl(logo.image)}
          alt={hidden ? "" : logo.name || ""}
          aria-hidden={hidden || undefined}
          loading="lazy"
          style={{ height: `${logo.height || 40}px` }}
          className="block w-auto max-w-none opacity-60 mix-blend-multiply grayscale transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0"
          data-tina-field={hidden ? undefined : tinaField(logo)}
        />
      ))}
    </>
  );
}

export default function PartnerLogosReact(props: PageQueryProps) {
  const logos = usePageData(props, "empresasPage")?.logos;
  const items = (logos?.items || []).filter((item: any) => item?.image);
  if (items.length === 0) return <div hidden />;

  return (
    <section className="pb-20 md:pb-24">
      <div className="container-xl flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        {logos.title && (
          <h2 className="whitespace-pre-line text-body-sm font-medium leading-[1.4] text-content-subtle" data-tina-field={tinaField(logos, "title")}>
            {logos.title}
          </h2>
        )}
        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div suppressHydrationWarning data-marquee="0.5" data-pause="" className="flex w-max items-center gap-12 md:gap-[72px]">
            <LogoRow items={items} />
            <LogoRow items={items} hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
