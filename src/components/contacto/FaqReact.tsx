import { useId, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { usePageData, type PageQueryProps } from "../eventos/eventData";

function FaqItem({ item, open, onToggle, delay }: { item: any; open: boolean; onToggle: () => void; delay: number }) {
  const panelId = useId();
  return (
    <div
      suppressHydrationWarning data-reveal="up"
      data-delay={delay}
      className={`rounded-3xl border-[1.5px] bg-surface transition-colors duration-300 ${open ? "border-brand-primary" : "border-line"}`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-5 rounded-3xl px-5 py-[22px] text-left text-[17px] font-semibold text-content sm:px-[26px]"
        >
          <span data-tina-field={tinaField(item, "question")}>{item.question}</span>
          <span
            aria-hidden
            className={`flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[20px] leading-none transition-all duration-500 ease-out-expo ${
              open ? "rotate-45 bg-brand-primary text-white" : "bg-brand-primary-lightest text-accent"
            }`}
          >
            +
          </span>
        </button>
      </h3>
      <div id={panelId} hidden={!open} className="px-5 pb-6 text-[15px] leading-[1.7] text-content-muted sm:px-[26px]" data-tina-field={tinaField(item, "answer")}>
        {item.answer}
      </div>
    </div>
  );
}

export default function FaqReact(props: PageQueryProps) {
  const faq = usePageData(props, "contactoPage")?.faq;
  const [openIndex, setOpenIndex] = useState(0);
  const items = (faq?.items || []).filter(Boolean);
  if (items.length === 0) return <div hidden />;

  return (
    <section className="pb-20 md:pb-[120px]">
      <div className="mx-auto max-w-[960px] px-4 sm:px-8">
        <h2 suppressHydrationWarning data-reveal="up" className="mb-8 text-center text-heading-md" data-tina-field={tinaField(faq, "title")}>
          {faq.title}
        </h2>
        <div className="flex flex-col gap-3">
          {items.map((item: any, index: number) => (
            <FaqItem
              key={index}
              item={item}
              open={openIndex === index}
              delay={index * 80}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
