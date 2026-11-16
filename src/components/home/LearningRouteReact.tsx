import { tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import { useHomeSection, type HomeQueryProps } from "./types";

interface LevelTone {
  background: string;
  code: string;
  text: string;
}

const LEVEL_TONES: LevelTone[] = [
  { background: "bg-[#4B3F78]", code: "text-[#D9C8FF]", text: "text-[#E4DCF7]" },
  { background: "bg-[#54398C]", code: "text-[#D9C8FF]", text: "text-[#E4DCF7]" },
  { background: "bg-[#5A33A6]", code: "text-[#D9C8FF]", text: "text-[#E4DCF7]" },
  { background: "bg-[#6430C4]", code: "text-[#D9C8FF]", text: "text-[#E4DCF7]" },
  { background: "bg-brand-primary", code: "text-[#D9C8FF]", text: "text-[#E4DCF7]" },
  { background: "bg-brand-pink", code: "text-white", text: "text-white" },
];

const BAR_BASE_HEIGHT = 300;
const BAR_STEP = 52;

function toneFor(index: number, total: number): LevelTone {
  if (index === total - 1) return LEVEL_TONES[LEVEL_TONES.length - 1];
  return LEVEL_TONES[Math.min(index, LEVEL_TONES.length - 2)];
}

function StepCard({ step, index, isLast }: { step: any; index: number; isLast: boolean }) {
  return (
    <div data-reveal="up" suppressHydrationWarning data-delay={index * 100} className="flex items-start gap-4 rounded-2xl border border-white/15 p-6">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold ${isLast ? "bg-brand-pink" : "bg-brand-primary"}`}>
        {index + 1}
      </span>
      <div>
        <h3 className="mb-1 text-[17px] font-semibold" data-tina-field={tinaField(step, "title")}>{step.title}</h3>
        <p className="text-body-sm text-brand-lilac" data-tina-field={tinaField(step, "text")}>{step.text}</p>
      </div>
    </div>
  );
}

function LevelBars({ levels }: { levels: any[] }) {
  return (
    <div data-liquid="" className="hidden h-[660px] grid-cols-6 items-end gap-3.5 pb-16 lg:grid">
      {levels.map((level, index) => {
        const tone = toneFor(index, levels.length);
        const height = BAR_BASE_HEIGHT + BAR_STEP * index;
        return (
          <div
            key={index}
            data-bar="" suppressHydrationWarning
            data-h={height}
            className={`relative overflow-hidden rounded-[28px] will-change-[height] ${tone.background}`}
            style={{ height: `${height}px` }}
          >
            <div className={`absolute right-5 top-[22px] text-[52px] font-bold leading-none tracking-[-2px] ${tone.code}`} data-tina-field={tinaField(level, "code")}>{level.code}</div>
            <div data-bar-body="" suppressHydrationWarning className="absolute inset-x-3 bottom-9 px-2.5">
              <div className="mb-1.5 text-[19px] font-bold" data-tina-field={tinaField(level, "name")}>{level.name}</div>
              <div className={`text-caption-md ${tone.text}`} data-tina-field={tinaField(level, "description")}>{level.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function LevelList({ levels }: { levels: any[] }) {
  return (
    <ol className="grid gap-3 pb-10 sm:grid-cols-2 lg:hidden">
      {levels.map((level, index) => {
        const tone = toneFor(index, levels.length);
        return (
          <li key={index} data-reveal="up" suppressHydrationWarning data-delay={(index % 2) * 80} className={`relative overflow-hidden rounded-2xl p-5 pr-24 ${tone.background}`}>
            <span className={`absolute right-5 top-4 text-[40px] font-bold leading-none tracking-[-2px] ${tone.code}`} data-tina-field={tinaField(level, "code")}>
              {level.code}
            </span>
            <div className="mb-1 text-subtitle-md font-bold" data-tina-field={tinaField(level, "name")}>{level.name}</div>
            <p className={`text-caption-md ${tone.text}`} data-tina-field={tinaField(level, "description")}>{level.description}</p>
          </li>
        );
      })}
    </ol>
  );
}

export default function LearningRouteReact(props: HomeQueryProps) {
  const route = useHomeSection(props, "route");
  if (!route) return <div hidden />;
  const steps = (route.steps || []).filter(Boolean);
  const levels = (route.levels || []).filter(Boolean);

  return (
    <section id="rutas" className="pt-12 md:pt-20">
      <div className="mx-auto max-w-[1408px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] bg-brand-night px-5 pt-16 text-white sm:px-10 md:rounded-[56px] lg:px-16 lg:pt-28">
          <div className="mb-12 flex flex-col gap-8 lg:mb-[72px] lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div>
              {route.eyebrow && (
                <Eyebrow variant="pink" tilted className="mb-6" data-reveal="up" suppressHydrationWarning data-tina-field={tinaField(route, "eyebrow")}>
                  {route.eyebrow}
                </Eyebrow>
              )}
              <h2 data-reveal="up" suppressHydrationWarning data-delay="80" className="max-w-[640px] text-heading-lg" data-tina-field={tinaField(route, "title")}>
                {route.title}
              </h2>
            </div>
            <p data-reveal="up" suppressHydrationWarning data-delay="160" className="max-w-[430px] text-[17px] leading-[1.65] text-brand-primary-light" data-tina-field={tinaField(route, "description")}>
              {route.description}
            </p>
          </div>

          <div className="mb-12 grid gap-4 md:grid-cols-3 lg:mb-[72px]">
            {steps.map((step: any, index: number) => (
              <StepCard key={index} step={step} index={index} isLast={index === steps.length - 1} />
            ))}
          </div>

          <LevelBars levels={levels} />
          <LevelList levels={levels} />
        </div>

        <div className="flex flex-col gap-6 px-2 pt-10 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="text-[20px] font-semibold tracking-[-0.4px] md:text-[22px]">
            <span data-tina-field={tinaField(route, "promptTitle")}>{route.promptTitle}</span>{" "}
            <span className="font-medium text-content-subtle" data-tina-field={tinaField(route, "promptSubtitle")}>{route.promptSubtitle}</span>
          </p>
          {route.cta?.label && (
            <ArrowLink href={route.cta.url || "#"} size="lg" className="shrink-0 self-start md:self-auto" data-tina-field={tinaField(route, "cta")}>
              {route.cta.label}
            </ArrowLink>
          )}
        </div>
      </div>
    </section>
  );
}
