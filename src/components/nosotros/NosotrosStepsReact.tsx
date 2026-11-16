import { useTina, tinaField } from "tinacms/dist/react";
import { SectionEyebrow, SectionTitle } from "./SectionIntro";
import type { TinaPageProps } from "../ruta/types";

export default function NosotrosStepsReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const steps = data?.nosotrosPage?.steps;
  if (!steps?.items?.length) return <div hidden />;
  const lastIndex = steps.items.length - 1;

  return (
    <section className="pb-12 md:pb-20">
      <div className="container-xl">
        <div className="mb-12 text-center">
          <SectionEyebrow owner={steps} />
          <SectionTitle owner={steps} />
        </div>
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.items.map((item: any, index: number) => (
            <li
              key={index}
              className="flex flex-col gap-3.5 rounded-[28px] border-[1.5px] border-line p-7 md:p-8"
              suppressHydrationWarning data-reveal="up"
              data-delay={String(index * 100)}
              data-tina-field={tinaField(item)}
            >
              <span
                className={`flex h-[52px] w-[52px] items-center justify-center rounded-full text-[18px] font-bold text-white ${index === lastIndex ? "bg-brand-pink" : "bg-brand-primary"}`}
                aria-hidden
              >
                {index + 1}
              </span>
              <h3 className="text-[20px] font-semibold">{item.title}</h3>
              <p className="text-[15px] leading-[1.6] text-content-muted">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
