import { tinaField } from "tinacms/dist/react";
import { usePageData, type PageQueryProps } from "../eventos/eventData";

export default function ProposalIntroReact(props: PageQueryProps) {
  const proposal = usePageData(props, "empresasPage")?.proposal;
  if (!proposal) return <div hidden />;
  const points: string[] = (proposal.points || []).filter(Boolean);

  return (
    <div>
      <h2 className="mb-3 text-heading-md" data-tina-field={tinaField(proposal, "title")}>
        {proposal.title}
      </h2>
      {proposal.text && (
        <p className="mb-8 max-w-[560px] text-[17px] leading-[1.6] text-content-muted" data-tina-field={tinaField(proposal, "text")}>
          {proposal.text}
        </p>
      )}
      {points.length > 0 && (
        <ul className="flex flex-col gap-3.5" data-tina-field={tinaField(proposal, "points")}>
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-[15px]">
              <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-primary text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden>
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              {point}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
