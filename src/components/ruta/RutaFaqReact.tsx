import { useState } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import type { TinaPageProps } from "./types";

function FaqItem({ item, index, open, onToggle }: { item: any; index: number; open: boolean; onToggle: () => void }) {
  const answerId = `faq-respuesta-${index}`;
  return (
    <div
      className={`rounded-2xl border-[1.5px] bg-white transition-colors duration-300 ${open ? "border-brand-primary" : "border-line"}`}
      suppressHydrationWarning data-reveal="up"
      data-delay={String(index * 80)}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-5 rounded-2xl px-5 py-6 text-left text-[17px] font-semibold text-content md:px-7 md:text-subtitle-md"
          data-tina-field={tinaField(item, "question")}
        >
          {item.question}
          <span
            aria-hidden
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[20px] transition-all duration-[400ms] ease-out-expo ${open ? "rotate-45 bg-brand-primary text-white" : "bg-brand-primary-lightest text-accent"}`}
          >
            +
          </span>
        </button>
      </h3>
      <div id={answerId} hidden={!open} className="max-w-[760px] px-5 pb-[26px] text-[15px] leading-[1.7] text-content-muted md:px-7" data-tina-field={tinaField(item, "answer")}>
        {item.answer}
      </div>
    </div>
  );
}

export default function RutaFaqReact(props: TinaPageProps) {
  const { data } = useTina(props);
  const faq = data?.rutaPage?.faq;
  const [openIndex, setOpenIndex] = useState(0);
  if (!faq?.items?.length) return <div hidden />;

  return (
    <section className="pb-20 md:pb-[120px]">
      <div className="mx-auto w-full max-w-[960px] px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-heading-lg" suppressHydrationWarning data-reveal="up" data-tina-field={tinaField(faq, "title")}>
          {faq.title}
        </h2>
        <div className="flex flex-col gap-3">
          {faq.items.map((item: any, index: number) => (
            <FaqItem
              key={index}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
