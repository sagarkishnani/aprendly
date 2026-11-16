import { tinaField } from "tinacms/dist/react";

export function SectionEyebrow({ owner, className = "" }: { owner: any; className?: string }) {
  if (!owner?.eyebrow) return null;
  return (
    <p className={`mb-4 text-overline uppercase text-brand-pink-dark ${className}`} suppressHydrationWarning data-reveal="up" data-tina-field={tinaField(owner, "eyebrow")}>
      {owner.eyebrow}
    </p>
  );
}

export function SectionTitle({ owner, className = "" }: { owner: any; className?: string }) {
  return (
    <h2 className={`text-heading-lg tracking-[-0.034em] ${className}`} suppressHydrationWarning data-reveal="up" data-delay="80" data-tina-field={tinaField(owner, "title")}>
      {owner.title}
    </h2>
  );
}
