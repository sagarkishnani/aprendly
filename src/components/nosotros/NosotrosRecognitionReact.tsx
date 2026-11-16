import { useTina, tinaField } from "tinacms/dist/react";
import Eyebrow from "../ui/Eyebrow";
import { mediaUrl } from "../../utils/mediaUrl";
import type { TinaPageProps } from "../ruta/types";

function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M17 5h3v2a3 3 0 0 1-3 3" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3" />
    </svg>
  );
}

export default function NosotrosRecognitionReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const recognition = data?.nosotrosPage?.recognition;
  if (!recognition) return <div hidden />;

  return (
    <section className="pb-20 md:pb-[120px]">
      <div className="mx-auto w-full max-w-[1408px] px-4 sm:px-6 lg:px-8">
        <div className="relative grid items-center gap-12 overflow-hidden rounded-[32px] bg-brand-night px-6 py-14 text-white sm:px-10 md:rounded-[56px] md:py-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:px-16">
          <div>
            <Eyebrow variant="pink" tilted className="mb-6" suppressHydrationWarning data-reveal="up" data-tina-field={tinaField(recognition, "eyebrow")}>
              {recognition.eyebrow}
            </Eyebrow>
            <h2 className="mb-5 text-heading-lg" suppressHydrationWarning data-reveal="up" data-delay="80" data-tina-field={tinaField(recognition, "title")}>
              {recognition.title}
            </h2>
            <p className="mb-9 max-w-[520px] text-[17px] leading-[1.7] text-brand-primary-light" suppressHydrationWarning data-reveal="up" data-delay="140" data-tina-field={tinaField(recognition, "text")}>
              {recognition.text}
            </p>
            <dl className="grid grid-cols-3 gap-2 sm:gap-3" suppressHydrationWarning data-reveal="up" data-delay="200">
              {(recognition.stats || []).map((stat: any, index: number) => (
                <div key={index} className="flex flex-col-reverse rounded-[20px] bg-white/10 p-3.5 sm:p-5" data-tina-field={tinaField(stat)}>
                  <dt className="text-caption-sm text-brand-primary-light sm:text-caption-md">{stat.label}</dt>
                  <dd className="text-[24px] font-bold sm:text-[30px]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative h-[360px] md:h-[460px]">
            <div className="absolute inset-0 bottom-10 right-10 overflow-hidden rounded-3xl md:bottom-[60px] md:right-[60px]" suppressHydrationWarning data-reveal="scale">
              <div className="h-full w-full" suppressHydrationWarning data-zoomin>
                <img
                  src={mediaUrl(recognition.image)}
                  alt={recognition.imageAlt || ""}
                  className="block h-full w-full object-cover"
                  data-tina-field={tinaField(recognition, "image")}
                />
              </div>
            </div>
            {recognition.badgeTitle && (
              <div className="absolute bottom-0 right-0">
                <div className="w-[230px] rounded-2xl bg-white px-6 py-[22px] text-content shadow-[0_24px_60px_rgba(0,0,0,0.3)] md:w-[260px]" suppressHydrationWarning data-speed="-0.1">
                  <span className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[14px] bg-brand-pink text-white">
                    <TrophyIcon />
                  </span>
                  <p className="mb-1 text-[17px] font-bold" data-tina-field={tinaField(recognition, "badgeTitle")}>{recognition.badgeTitle}</p>
                  <p className="text-caption-md text-content-subtle" data-tina-field={tinaField(recognition, "badgeText")}>{recognition.badgeText}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
