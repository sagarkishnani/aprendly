import { useState } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import ArrowLink from "../ui/ArrowLink";
import Eyebrow from "../ui/Eyebrow";
import type { TinaPageProps } from "./types";

const CEFR_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const DEFAULT_START_INDEX = 1;

function levelIndex(code?: string | null) {
  const index = CEFR_LEVELS.indexOf(code || "");
  return index < 0 ? 0 : index;
}

function computeRoute(goal: any, startCode: string, monthsPerLevel: number) {
  const start = levelIndex(startCode);
  const target = Math.min(CEFR_LEVELS.length - 1, Math.max(levelIndex(goal?.targetLevel), start + 1));
  const steps = target - start;
  return {
    start,
    target,
    levelsText: `${steps} ${steps === 1 ? "nivel" : "niveles"}`,
    timeText: `${steps * monthsPerLevel} meses`,
  };
}

function fillTemplate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, value), template);
}

function barTone(index: number, start: number, target: number) {
  if (index === start) return "bg-brand-ink";
  if (index === target) return "bg-brand-pink";
  if (index > start && index < target) return "bg-brand-primary";
  return "bg-line";
}

function optionClasses(active: boolean) {
  return active
    ? "border-brand-primary bg-brand-primary text-white"
    : "border-white bg-white text-content hover:border-brand-primary-light";
}

const TOOLTIP_ALIGN = [
  { box: "left-0", arrow: "left-8" },
  { box: "left-1/2 -translate-x-1/2", arrow: "left-1/2 -ml-1.5" },
  { box: "right-0", arrow: "right-8" },
];

function LevelOption({ level, index, active, onPick }: { level: any; index: number; active: boolean; onPick: () => void }) {
  const [tipVisible, setTipVisible] = useState(false);
  const align = TOOLTIP_ALIGN[index % 3];
  const tipId = `nivel-tip-${index}`;
  return (
    <div className="relative" onMouseEnter={() => setTipVisible(true)} onMouseLeave={() => setTipVisible(false)}>
      <button
        type="button"
        aria-pressed={active}
        aria-describedby={tipId}
        onClick={onPick}
        onFocus={() => setTipVisible(true)}
        onBlur={() => setTipVisible(false)}
        className={`w-full rounded-[14px] border-[1.5px] py-3 text-body-sm font-semibold transition-colors duration-300 ${optionClasses(active)}`}
        data-tina-field={tinaField(level, "code")}
      >
        {level.code}
      </button>
      <div
        id={tipId}
        role="tooltip"
        className={`pointer-events-none absolute bottom-[calc(100%+12px)] z-10 w-[240px] rounded-lg bg-brand-ink px-4 py-3.5 text-caption-md leading-[1.55] text-white shadow-card transition-[opacity,transform] duration-300 ease-out-expo sm:w-[260px] ${align.box} ${tipVisible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`}
        data-tina-field={tinaField(level, "tip")}
      >
        <span className="mb-1 block font-semibold">
          {level.code} · {level.name}
        </span>
        {level.tip}
        <span className={`absolute -bottom-1.5 h-3 w-3 rotate-45 bg-brand-ink ${align.arrow}`} aria-hidden />
      </div>
    </div>
  );
}

function Stat({ label, value, small = false, field }: { label: string; value: string; small?: boolean; field?: string }) {
  return (
    <div className="rounded-[20px] border-[1.5px] border-line p-[18px]">
      <div className="mb-1 text-caption-sm text-content-subtle" data-tina-field={field}>{label}</div>
      <div className={small ? "text-body-md font-bold leading-[1.35]" : "text-[22px] font-bold"}>{value}</div>
    </div>
  );
}

function Legend({ simulator }: { simulator: any }) {
  const items = [
    { label: simulator.legendCurrent, dot: "bg-brand-ink", field: "legendCurrent" },
    { label: simulator.legendRoute, dot: "bg-brand-primary", field: "legendRoute" },
    { label: simulator.legendGoal, dot: "bg-brand-pink", field: "legendGoal" },
  ];
  return (
    <div className="mb-8 flex flex-wrap gap-4 text-caption-sm text-content-subtle">
      {items.map((item) => (
        <span key={item.field} className="flex items-center gap-1.5" data-tina-field={tinaField(simulator, item.field)}>
          <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} aria-hidden />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function LevelBar({ start, target }: { start: number; target: number }) {
  return (
    <div className="mb-2.5 grid grid-cols-6 gap-1.5" aria-hidden>
      {CEFR_LEVELS.map((code, index) => {
        const inRoute = index >= start && index <= target;
        return (
          <div key={code} className="flex flex-col items-center gap-2">
            <div className={`h-3.5 w-full rounded-full transition-colors duration-500 ease-out-expo ${barTone(index, start, target)}`} />
            <span className={`text-caption-md font-semibold ${inRoute ? "text-content" : "text-content-subtle/60"}`}>{code}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function RutaSimulatorReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const simulator = data?.rutaPage?.simulator;
  const [goalIndex, setGoalIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(DEFAULT_START_INDEX);
  if (!simulator) return <div hidden />;

  const goals: any[] = simulator.goals || [];
  const startLevels: any[] = simulator.startLevels || [];
  const goal = goals[goalIndex] || goals[0];
  const startLevel = startLevels[startIndex] || startLevels[0];
  const route = computeRoute(goal, startLevel?.code || "A1", simulator.monthsPerLevel || 3);
  const title = fillTemplate(simulator.resultTitleTemplate || "{programa}: de {desde} a {hasta}", {
    programa: goal?.program || "",
    desde: CEFR_LEVELS[route.start],
    hasta: CEFR_LEVELS[route.target],
  });

  return (
    <section id="simulador" className="scroll-mt-[84px] pb-20 pt-24 md:pb-[120px] md:pt-[140px]">
      <div className="container-xl">
        <div className="mb-12 text-center md:mb-14">
          <Eyebrow variant="lavender" tilted className="mb-5" suppressHydrationWarning data-reveal="up" data-tina-field={tinaField(simulator, "eyebrow")}>
            {simulator.eyebrow}
          </Eyebrow>
          <h2 className="mx-auto mb-4 max-w-[760px] text-heading-xl" suppressHydrationWarning data-reveal="up" data-delay="80" data-tina-field={tinaField(simulator, "title")}>
            {simulator.title}
          </h2>
          <p className="mx-auto max-w-[560px] text-[17px] leading-[1.6] text-content-muted" suppressHydrationWarning data-reveal="up" data-delay="140" data-tina-field={tinaField(simulator, "text")}>
            {simulator.text}
          </p>
        </div>

        <div className="grid gap-8 rounded-[32px] bg-surface-raised p-2 sm:p-6 md:rounded-4xl lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12 lg:p-12" suppressHydrationWarning data-reveal="up" data-delay="200">
          <div className="flex flex-col gap-7 px-3 pt-4 sm:px-0 sm:pt-0">
            <fieldset>
              <legend className="mb-3 text-[15px] font-semibold" data-tina-field={tinaField(simulator, "goalsLabel")}>{simulator.goalsLabel}</legend>
              <div className="flex flex-col gap-2">
                {goals.map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-pressed={index === goalIndex}
                    onClick={() => setGoalIndex(index)}
                    className={`rounded-lg border-[1.5px] px-[18px] py-3.5 text-left text-[15px] font-medium transition-colors duration-300 ease-out-expo ${optionClasses(index === goalIndex)}`}
                    data-tina-field={tinaField(item, "label")}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-3 text-[15px] font-semibold" data-tina-field={tinaField(simulator, "levelsLabel")}>{simulator.levelsLabel}</legend>
              <div className="grid grid-cols-3 gap-2">
                {startLevels.map((level, index) => (
                  <LevelOption key={index} level={level} index={index} active={index === startIndex} onPick={() => setStartIndex(index)} />
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col rounded-3xl bg-white p-4 sm:p-6 md:p-10">
            <p className="mb-2.5 text-overline text-brand-pink-dark" data-tina-field={tinaField(simulator, "resultEyebrow")}>{simulator.resultEyebrow}</p>
            <h3 aria-live="polite" className="mb-7 text-[26px] font-bold leading-[1.15] tracking-[-1px] md:text-[36px]" data-tina-field={goal ? tinaField(goal, "program") : undefined}>
              {title}
            </h3>
            <LevelBar start={route.start} target={route.target} />
            <Legend simulator={simulator} />
            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              <Stat label={simulator.levelsStatLabel} value={route.levelsText} field={tinaField(simulator, "levelsStatLabel")} />
              <Stat label={simulator.timeStatLabel} value={route.timeText} field={tinaField(simulator, "monthsPerLevel")} />
              <Stat label={simulator.formatStatLabel} value={goal?.format || ""} small field={goal ? tinaField(goal, "format") : undefined} />
            </div>
            <p className="mb-3 text-body-sm font-semibold" data-tina-field={tinaField(simulator, "focusLabel")}>{simulator.focusLabel}</p>
            <ul className="mb-9 flex flex-wrap gap-2">
              {(goal?.focus || []).map((topic: string, index: number) => (
                <li key={index} className="rounded-full bg-brand-primary-lightest px-3.5 py-2 text-caption-md font-medium" data-tina-field={tinaField(goal, "focus", index)}>
                  {topic}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-[300px] text-caption-md text-content-subtle" data-tina-field={tinaField(simulator, "disclaimer")}>{simulator.disclaimer}</p>
              {simulator.cta?.label && (
                <ArrowLink href={simulator.cta.url || "/contacto"} size="lg" className="w-full shrink-0 justify-between !pl-5 !text-body-sm sm:w-auto sm:!pl-6 sm:!text-[15px] !font-semibold [&_span]:whitespace-nowrap" data-tina-field={tinaField(simulator, "cta")}>
                  {simulator.cta.label}
                </ArrowLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
