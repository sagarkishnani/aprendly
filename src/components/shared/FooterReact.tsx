import { useTina, tinaField } from "tinacms/dist/react";
import {
  FaLinkedinIn, FaInstagram, FaFacebookF, FaXTwitter, FaYoutube, FaTiktok, FaWhatsapp,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import { tField, localizeHref } from "../../utils/i18n";
import type { Locale } from "../../i18n/config";

const SOCIAL_ICONS: Record<string, IconType> = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  x: FaXTwitter,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
};

interface Props {
  query: string;
  variables: object;
  data: any;
  locale: Locale;
}

function SocialLinks({ social }: { social: any[] }) {
  if (!social.length) return null;
  return (
    <div className="flex gap-2.5">
      {social.map((item, index) => {
        const Icon = SOCIAL_ICONS[item.network];
        return (
          <a
            key={index}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.network}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full border-[1.5px] border-white/20 text-white transition-colors hover:border-brand-pink hover:bg-brand-pink"
          >
            <Icon size={15} />
          </a>
        );
      })}
    </div>
  );
}

function FooterColumn({ column, locale }: { column: any; locale: Locale }) {
  return (
    <div className="flex flex-col gap-3 text-body-sm">
      <p className="mb-1.5 font-semibold" data-tina-field={tinaField(column, "title")}>
        {tField(column, "title", locale)}
      </p>
      {(column.links || []).filter(Boolean).map((link: any, index: number) => (
        <a
          key={index}
          href={localizeHref(link.url, locale)}
          className="text-brand-lilac transition-colors hover:text-white"
          data-tina-field={tinaField(link, "label")}
        >
          {tField(link, "label", locale)}
        </a>
      ))}
    </div>
  );
}

export default function FooterReact({ query, variables, data: initialData, locale }: Props) {
  const { data } = useTina({ query, variables, data: initialData });
  const footer = data?.global?.footer;
  const columns = (footer?.columns || []).filter(Boolean);
  const social = (footer?.social || []).filter((item: any) => item?.url && SOCIAL_ICONS[item.network]);

  return (
    <footer className="bg-brand-ink pb-9 pt-16 text-white md:pt-20">
      <div className="container-xl">
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
          <div className="flex flex-col items-start gap-5 sm:col-span-2 lg:col-span-1">
            <img src="/images/logo-white.svg" alt="Aprendly" className="h-[38px] w-auto" width={156} height={38} loading="lazy" />
            {footer?.tagline && (
              <p className="max-w-[340px] text-body-sm leading-[1.7] text-brand-lilac" data-tina-field={tinaField(footer, "tagline")}>
                {tField(footer, "tagline", locale)}
              </p>
            )}
            <SocialLinks social={social} />
          </div>
          {columns.map((column: any, index: number) => (
            <FooterColumn key={index} column={column} locale={locale} />
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-7 text-caption-md text-brand-lilac sm:flex-row sm:items-center sm:justify-between">
          {footer?.legal && <span data-tina-field={tinaField(footer, "legal")}>{tField(footer, "legal", locale)}</span>}
          {footer?.creditUrl && (
            <a href={footer.creditUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-lilac hover:text-white">
              {footer.creditLabel || "Desarrollado por"}
              <img src="/images/twnstudios.svg" alt="Twin Studios" className="h-3.5 w-auto" width={80} height={14} loading="lazy" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
