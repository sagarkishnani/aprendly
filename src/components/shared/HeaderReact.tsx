import { useEffect, useState } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import { FaBars, FaXmark, FaChevronDown } from "react-icons/fa6";
import { tField, localizeHref } from "../../utils/i18n";
import { mediaUrl } from "../../utils/mediaUrl";
import type { Locale } from "../../i18n/config";
import SearchOverlay from "./SearchOverlay";
import CartReact from "../shop/CartReact";
import ArrowLink from "../ui/ArrowLink";

interface NavChild {
  label?: string | null;
  description?: string | null;
  url?: string | null;
}

interface NavLink {
  label?: string | null;
  url?: string | null;
  external?: boolean | null;
  children?: (NavChild | null)[] | null;
}

interface Props {
  query: string;
  variables: object;
  data: any;
  locale: Locale;
  currentPath: string;
  shopEnabled: boolean;
}

function normalizePath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

function isActive(url: string | null | undefined, currentPath: string) {
  if (!url || url.startsWith("http")) return false;
  const target = normalizePath(url.split(/[?#]/)[0]);
  const current = normalizePath(currentPath);
  return target === "/" ? current === "/" : current === target || current.startsWith(`${target}/`);
}

function DesktopDropdown({ link, locale, active }: { link: NavLink; locale: Locale; active: boolean }) {
  const [open, setOpen] = useState(false);
  const children = (link.children || []).filter(Boolean) as NavChild[];

  return (
    <div
      className="relative py-7"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(event) => !event.currentTarget.contains(event.relatedTarget as Node) && setOpen(false)}
    >
      <a
        href={localizeHref(link.url || "/", locale)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 transition-colors hover:text-accent ${active ? "text-accent" : "text-content"}`}
        data-tina-field={tinaField(link as any, "label")}
      >
        {tField(link, "label", locale)}
        <FaChevronDown className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </a>
      <div
        className={`absolute -left-6 top-[76px] flex w-[300px] flex-col rounded-2xl bg-surface p-2.5 shadow-float transition-all duration-300 ease-out-expo ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2.5 opacity-0"
        }`}
      >
        {children.map((child, index) => (
          <a
            key={index}
            href={localizeHref(child.url || "/", locale)}
            className="flex flex-col gap-0.5 rounded-xl px-4 py-3 text-content transition-colors hover:bg-brand-primary-lightest"
          >
            <span className="text-body-sm font-semibold" data-tina-field={tinaField(child as any, "label")}>
              {tField(child, "label", locale)}
            </span>
            {child.description && (
              <span className="text-caption-sm text-content-subtle" data-tina-field={tinaField(child as any, "description")}>
                {tField(child, "description", locale)}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

function DesktopLink({ link, locale, active }: { link: NavLink; locale: Locale; active: boolean }) {
  return (
    <a
      href={localizeHref(link.url || "/", locale, Boolean(link.external))}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className={`py-7 transition-colors hover:text-accent ${active ? "text-accent" : "text-content"}`}
      data-tina-field={tinaField(link as any, "label")}
    >
      {tField(link, "label", locale)}
    </a>
  );
}

function MobileMenu({ links, locale, cta, onNavigate }: { links: NavLink[]; locale: Locale; cta: any; onNavigate: () => void }) {
  return (
    <div className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-surface lg:hidden">
      <nav className="container-xl flex flex-col gap-1 py-4" aria-label="Menú móvil">
        {links.map((link, index) => (
          <div key={index}>
            <a
              href={localizeHref(link.url || "/", locale, Boolean(link.external))}
              onClick={onNavigate}
              className="block rounded-lg px-2 py-3 text-body-lg font-medium text-content hover:bg-surface-raised"
            >
              {tField(link, "label", locale)}
            </a>
            {(link.children || []).filter(Boolean).map((child, childIndex) => (
              <a
                key={childIndex}
                href={localizeHref(child!.url || "/", locale)}
                onClick={onNavigate}
                className="block rounded-lg py-2 pl-6 pr-2 text-body-sm text-content-muted hover:bg-surface-raised"
              >
                {tField(child, "label", locale)}
              </a>
            ))}
          </div>
        ))}
        {cta?.label && (
          <ArrowLink href={localizeHref(cta.url || "/contacto", locale)} className="mt-4 self-start">
            {tField(cta, "label", locale)}
          </ArrowLink>
        )}
      </nav>
    </div>
  );
}

export default function HeaderReact({ query, variables, data: initialData, locale, currentPath, shopEnabled }: Props) {
  const { data } = useTina({ query, variables, data: initialData });
  const nav = data?.global?.nav;
  const links = ((nav?.links || []).filter(Boolean) as NavLink[]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <div className="h-[72px] lg:h-[84px]" aria-hidden />
      <header className="fixed inset-x-0 top-0 z-[60] border-b border-brand-ink/5 bg-white/85 backdrop-blur-xl">
        <div className="container-xl flex h-[72px] items-center gap-8 lg:h-[84px]">
          <a href={localizeHref("/", locale)} className="flex shrink-0 items-center" aria-label="Aprendly, ir al inicio">
            <img
              src={mediaUrl(nav?.logo) || "/images/logo.svg"}
              alt={nav?.logoAlt || "Aprendly"}
              className="h-7 w-auto lg:h-[34px]"
              width={140}
              height={34}
              data-tina-field={tinaField(nav, "logo")}
            />
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-8 text-[15px] font-medium lg:flex" aria-label="Principal">
            {links.map((link, index) => {
              const active = isActive(link.url, currentPath);
              const hasChildren = (link.children || []).some(Boolean);
              return hasChildren ? (
                <DesktopDropdown key={index} link={link} locale={locale} active={active} />
              ) : (
                <DesktopLink key={index} link={link} locale={locale} active={active} />
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
            <SearchOverlay locale={locale} />
            {shopEnabled && <CartReact />}
            {nav?.cta?.label && (
              <ArrowLink href={localizeHref(nav.cta.url || "/contacto", locale)} className="hidden lg:inline-flex" data-tina-field={tinaField(nav.cta, "label")}>
                {tField(nav.cta, "label", locale)}
              </ArrowLink>
            )}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-line text-content lg:hidden"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
        {mobileOpen && <MobileMenu links={links} locale={locale} cta={nav?.cta} onNavigate={() => setMobileOpen(false)} />}
      </header>
    </>
  );
}
