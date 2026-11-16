import { tinaField } from "tinacms/dist/react";
import { mediaUrl } from "../../utils/mediaUrl";
import { useHomeSection, type HomeQueryProps, type HomeTestimonial } from "./types";

const EDGE_FADE = "linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)";

function StarIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" className="fill-semantics-star" aria-hidden>
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
    </svg>
  );
}

function TestimonialCard({ testimonial, duplicate }: { testimonial: HomeTestimonial; duplicate: boolean }) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="flex w-[300px] shrink-0 flex-col gap-[22px] rounded-3xl bg-white p-7 text-content transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 sm:w-[420px] sm:rounded-[32px] sm:p-[34px]"
    >
      <span className="h-[26px] text-[64px] font-bold leading-[0.5] text-accent" aria-hidden>
        “
      </span>
      <blockquote className="flex-1 text-body-md leading-[1.65] [text-wrap:pretty]">{testimonial.quote}</blockquote>
      <figcaption className="flex items-center gap-3.5">
        {testimonial.image && (
          <img src={mediaUrl(testimonial.image)} alt="" loading="lazy" className="h-[52px] w-[52px] rounded-full object-cover object-[50%_25%]" />
        )}
        <div>
          <div className="text-body-md font-semibold">{testimonial.name}</div>
          <div className="text-caption-md text-content-subtle">{testimonial.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function TestimonialsReact({ testimonials, ...props }: HomeQueryProps & { testimonials: HomeTestimonial[] }) {
  const section = useHomeSection(props, "testimonials");
  if (!section || testimonials.length === 0) return <div hidden />;

  return (
    <section className="overflow-hidden rounded-t-[32px] bg-brand-primary py-20 text-white md:rounded-t-[56px] md:py-[120px]">
      <div className="container-xl mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
        <div>
          <p data-reveal="up" suppressHydrationWarning className="mb-4 text-overline uppercase" data-tina-field={tinaField(section, "eyebrow")}>
            {section.eyebrow}
          </p>
          <h2 data-reveal="up" suppressHydrationWarning data-delay="80" className="text-heading-lg" data-tina-field={tinaField(section, "title")}>
            {section.title}
          </h2>
        </div>
        {section.rating && (
          <p data-reveal="up" suppressHydrationWarning data-delay="140" className="flex items-center gap-3 text-[15px] text-brand-primary-lightest">
            <span className="flex items-center gap-2 text-[32px] font-bold text-white" data-tina-field={tinaField(section, "rating")}>
              <StarIcon />
              {section.rating}
            </span>
            <span data-tina-field={tinaField(section, "ratingLabel")}>{section.ratingLabel}</span>
          </p>
        )}
      </div>
      <div data-reveal="up" suppressHydrationWarning data-delay="160" style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}>
        <div data-marquee="0.6" suppressHydrationWarning data-pause="" className="flex w-max items-stretch gap-6">
          {[false, true].map((duplicate) =>
            testimonials.map((testimonial) => (
              <TestimonialCard key={`${duplicate}-${testimonial.name}`} testimonial={testimonial} duplicate={duplicate} />
            )),
          )}
        </div>
      </div>
    </section>
  );
}
