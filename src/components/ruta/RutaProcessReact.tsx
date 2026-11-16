import { useTina, tinaField } from "tinacms/dist/react";
import type { TinaPageProps } from "./types";

function stepNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function TimelineStep({ step, index }: { step: any; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <li
      suppressHydrationWarning data-tl-step
      className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-5 py-8 transition-[opacity,transform] duration-[600ms] ease-out-expo md:min-h-[300px] md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] md:items-center md:gap-x-0 md:py-0"
    >
      <div className="col-start-1 row-start-1 flex justify-center pt-1 md:col-start-2 md:pt-0">
        <span
          suppressHydrationWarning data-tl-dot
          className="relative z-10 box-content h-[22px] w-[22px] rounded-full border-[5px] border-brand-night bg-brand-pink transition-all duration-500 ease-out-expo"
        />
      </div>
      <div className={`col-start-2 row-start-1 ${isLeft ? "md:col-start-1 md:text-right" : "md:col-start-3"}`} data-tina-field={tinaField(step)}>
        <p className="mb-2.5 text-body-sm font-semibold tracking-[2px] text-brand-pink">
          {stepNumber(index)} · {step.time}
        </p>
        <h3 className="mb-3 text-[28px] font-bold leading-[1.1] tracking-[-1px] md:text-[36px]">{step.title}</h3>
        <p className={`max-w-[400px] text-[17px] leading-[1.6] text-brand-primary-light ${isLeft ? "md:ml-auto" : ""}`}>{step.text}</p>
      </div>
    </li>
  );
}

export default function RutaProcessReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const process = data?.rutaPage?.process;
  if (!process) return <div hidden />;

  return (
    <section className="rounded-[32px] bg-brand-night py-20 text-white md:rounded-[56px] md:py-[120px]">
      <div className="container-xl">
        <div className="mb-12 text-center md:mb-[72px]">
          <h2 className="mb-3.5 text-heading-lg" suppressHydrationWarning data-reveal="up" data-tina-field={tinaField(process, "title")}>
            {process.title}
          </h2>
          <p className="mx-auto max-w-[480px] text-[17px] leading-[1.65] text-brand-primary-light" suppressHydrationWarning data-reveal="up" data-delay="100" data-tina-field={tinaField(process, "text")}>
            {process.text}
          </p>
          {process.scrollHint && (
            <p className="mt-9 text-caption-sm font-semibold tracking-[3px] text-[#9C8FC8]" aria-hidden data-tina-field={tinaField(process, "scrollHint")}>
              {process.scrollHint}
            </p>
          )}
        </div>
        <div data-timeline className="relative mx-auto max-w-[1080px]">
          <div className="absolute bottom-0 left-4 top-0 -ml-px w-0.5 rounded-sm bg-brand-dusk md:left-1/2" />
          <div suppressHydrationWarning data-tl-fill className="absolute left-4 top-0 -ml-px h-full w-0.5 rounded-sm bg-brand-pink md:left-1/2" />
          <ol className="relative">
            {(process.steps || []).map((step: any, index: number) => (
              <TimelineStep key={index} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
