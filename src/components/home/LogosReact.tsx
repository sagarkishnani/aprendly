import { tinaField } from "tinacms/dist/react";
import { mediaUrl } from "../../utils/mediaUrl";
import { useHomeSection, type HomeQueryProps } from "./types";

const EDGE_FADE = "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)";

function LogoImage({ logo, duplicate }: { logo: any; duplicate: boolean }) {
  return (
    <img
      src={mediaUrl(logo.image)}
      alt={duplicate ? "" : logo.alt || ""}
      aria-hidden={duplicate || undefined}
      loading="lazy"
      style={{ height: `${logo.height || 40}px` }}
      className="block w-auto max-w-none opacity-60 mix-blend-multiply grayscale transition duration-[400ms] hover:opacity-100 hover:grayscale-0"
      data-tina-field={duplicate ? undefined : tinaField(logo, "image")}
    />
  );
}

export default function LogosReact(props: HomeQueryProps) {
  const logos = useHomeSection(props, "logos");
  const items = (logos?.items || []).filter((item: any) => item?.image);
  if (!logos || items.length === 0) return <div hidden />;

  return (
    <section className="pb-10 pt-14 md:pt-20" aria-label={(logos.label || "").replace(/\n/g, " ")}>
      <div className="container-xl flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
        <p className="whitespace-pre-line text-body-sm font-medium text-content-subtle md:whitespace-pre" data-tina-field={tinaField(logos, "label")}>
          {logos.label}
        </p>
        <div className="min-w-0 flex-1 overflow-hidden" style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}>
          <div data-marquee="0.5" suppressHydrationWarning data-pause="" className="flex w-max items-center gap-12 md:gap-[72px]">
            {[false, true].map((duplicate) =>
              items.map((logo: any, index: number) => <LogoImage key={`${duplicate}-${index}`} logo={logo} duplicate={duplicate} />),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
