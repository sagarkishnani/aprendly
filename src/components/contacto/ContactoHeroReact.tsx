import { tinaField } from "tinacms/dist/react";
import { ArrowIcon } from "../ui/ArrowLink";
import { usePageData, type PageQueryProps } from "../eventos/eventData";

type Props = PageQueryProps & { whatsappHref: string };

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

const channelClass =
  "flex items-center gap-4 rounded-[22px] px-5 py-4 transition-transform duration-500 ease-out-expo hover:translate-x-1.5 focus-visible:ring-offset-brand-primary";

export default function ContactoHeroReact({ whatsappHref, ...queryProps }: Props) {
  const hero = usePageData(queryProps, "contactoPage")?.hero;
  if (!hero) return <div hidden />;

  return (
    <div className="relative flex flex-col gap-5">
      {hero.eyebrow && (
        <div suppressHydrationWarning data-reveal="up" className="text-overline uppercase tracking-[2px]" data-tina-field={tinaField(hero, "eyebrow")}>
          {hero.eyebrow}
        </div>
      )}
      <h1 suppressHydrationWarning data-reveal="up" data-delay="80" className="max-w-[520px] text-balance text-heading-xl" data-tina-field={tinaField(hero, "title")}>
        {hero.title}
      </h1>
      {hero.text && (
        <p suppressHydrationWarning data-reveal="up" data-delay="140" className="mb-5 max-w-[460px] text-body-lg" data-tina-field={tinaField(hero, "text")}>
          {hero.text}
        </p>
      )}
      <div suppressHydrationWarning data-reveal="up" data-delay="200" className="flex max-w-[420px] flex-col gap-3">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${channelClass} bg-white text-content`}>
          <img src="/images/whatsapp.svg" alt="" className="h-11 w-11 shrink-0" width="44" height="44" />
          <span className="flex-1">
            <span className="block text-[15px] font-semibold" data-tina-field={tinaField(hero, "whatsappTitle")}>{hero.whatsappTitle}</span>
            <span className="block text-[13px] text-content-subtle" data-tina-field={tinaField(hero, "whatsappText")}>{hero.whatsappText}</span>
          </span>
          <ArrowIcon className="h-5 w-5" />
        </a>
        {hero.email && (
          <a href={`mailto:${hero.email}`} className={`${channelClass} bg-white/15 text-white`}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-accent">
              <MailIcon />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[15px] font-semibold" data-tina-field={tinaField(hero, "emailTitle")}>{hero.emailTitle}</span>
              <span className="block truncate text-[13px]" data-tina-field={tinaField(hero, "email")}>{hero.email}</span>
            </span>
            <ArrowIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
