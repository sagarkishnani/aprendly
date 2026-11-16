import type { IconType } from "react-icons";
import { FaAward, FaChalkboardUser, FaLayerGroup, FaRegClock, FaRegComments } from "react-icons/fa6";
import { tinaField } from "tinacms/dist/react";

const FACT_ICONS: Record<string, IconType> = {
  modules: FaLayerGroup,
  clock: FaRegClock,
  teacher: FaChalkboardUser,
  certificate: FaAward,
  chat: FaRegComments,
};

interface Props {
  title: string;
  titleField?: string;
  text: string;
  textField?: string;
  facts: any[];
}

function Fact({ fact }: { fact: any }) {
  const Icon = FACT_ICONS[fact?.icon ?? ""];
  return (
    <li className="flex items-center gap-2" data-tina-field={tinaField(fact, "text")}>
      {Icon && <Icon aria-hidden className="h-4 w-4 text-accent" />}
      {fact?.text}
    </li>
  );
}

export default function CourseAbout({ title, titleField, text, textField, facts }: Props) {
  if (!text && facts.length === 0) return null;
  return (
    <div className="mb-9">
      <h2 suppressHydrationWarning data-reveal="up" className="mb-[18px] text-[28px] font-bold leading-tight tracking-[-1px] sm:text-[34px]" data-tina-field={titleField}>
        {title}
      </h2>
      {text && (
        <p suppressHydrationWarning data-reveal="up" className="mb-5 max-w-[760px] text-body-md leading-[1.7] text-content-muted" data-tina-field={textField}>
          {text}
        </p>
      )}
      {facts.length > 0 && (
        <ul suppressHydrationWarning data-reveal="up" className="flex flex-wrap gap-x-7 gap-y-3 text-[15px]">
          {facts.map((fact, index) => (
            <Fact key={`${fact?.text}-${index}`} fact={fact} />
          ))}
        </ul>
      )}
    </div>
  );
}
