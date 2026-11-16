import { tinaField } from "tinacms/dist/react";

interface Props {
  id: string;
  heading: string;
  headingField?: string;
  certificate: any;
}

export default function CourseCertificate({ id, heading, headingField, certificate }: Props) {
  if (!certificate?.title) return null;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-40">
      <h2 id={`${id}-title`} suppressHydrationWarning data-reveal="up" className="mb-5 text-[28px] font-bold leading-tight tracking-[-1px] sm:text-[34px]" data-tina-field={headingField}>
        {heading}
      </h2>
      <div suppressHydrationWarning data-reveal="up" className="flex items-center justify-between gap-6 rounded-[28px] bg-brand-primary p-6 text-white sm:p-8">
        <div>
          <p className="mb-1.5 text-[20px] font-semibold" data-tina-field={tinaField(certificate, "title")}>
            {certificate.title}
          </p>
          {certificate.text && (
            <p className="max-w-[520px] text-[15px] leading-[1.6]" data-tina-field={tinaField(certificate, "text")}>
              {certificate.text}
            </p>
          )}
        </div>
        {certificate.level && (
          <span className="text-[44px] font-bold tracking-[-2px] sm:text-[56px]" data-tina-field={tinaField(certificate, "level")}>
            {certificate.level}
          </span>
        )}
      </div>
    </section>
  );
}
