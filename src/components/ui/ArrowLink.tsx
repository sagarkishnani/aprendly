import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ArrowVariant = "primary" | "pink" | "dark" | "outline" | "outline-light" | "white";
export type ArrowSize = "md" | "lg";

const VARIANT_CLASSES: Record<ArrowVariant, { body: string; circle: string }> = {
  primary: {
    body: "bg-brand-primary text-white hover:bg-brand-primary-dark",
    circle: "bg-white text-brand-ink",
  },
  pink: {
    body: "bg-brand-pink text-white hover:bg-brand-pink-dark",
    circle: "bg-white text-brand-ink",
  },
  dark: {
    body: "bg-brand-ink text-white hover:bg-brand-night",
    circle: "bg-white text-brand-ink",
  },
  outline: {
    body: "border-[1.5px] border-brand-ink text-brand-ink hover:bg-brand-primary-lightest",
    circle: "bg-brand-ink text-white",
  },
  "outline-light": {
    body: "border-[1.5px] border-white/70 text-white hover:border-white hover:bg-white/10",
    circle: "bg-white text-brand-ink",
  },
  white: {
    body: "bg-white text-brand-ink hover:bg-brand-primary-lightest",
    circle: "bg-brand-primary text-white",
  },
};

const SIZE_CLASSES: Record<ArrowSize, { body: string; circle: string }> = {
  md: { body: "h-[46px] pl-5 pr-1.5 text-body-sm", circle: "h-[34px] w-[34px]" },
  lg: { body: "h-[56px] pl-6 pr-2 text-[15px]", circle: "h-10 w-10" },
};

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="block h-5 overflow-hidden leading-5">
      <span className="flex flex-col transition-transform duration-500 ease-in-out-sharp group-hover:-translate-y-1/2">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </span>
  );
}

function ArrowCircle({ variant, size }: { variant: ArrowVariant; size: ArrowSize }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full transition-transform duration-500 ease-in-out-sharp -rotate-45 group-hover:rotate-0 group-hover:scale-105 ${VARIANT_CLASSES[variant].circle} ${SIZE_CLASSES[size].circle}`}
    >
      <ArrowIcon />
    </span>
  );
}

function bodyClasses(variant: ArrowVariant, size: ArrowSize, className: string) {
  return `group inline-flex items-center gap-3 rounded-full font-semibold transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant].body} ${SIZE_CLASSES[size].body} ${className}`;
}

interface CommonProps {
  variant?: ArrowVariant;
  size?: ArrowSize;
  className?: string;
  children: ReactNode;
}

type ArrowLinkProps = CommonProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
  external?: boolean;
};

export default function ArrowLink({ variant = "primary", size = "md", className = "", external, children, ...anchorProps }: ArrowLinkProps) {
  return (
    <a
      {...anchorProps}
      target={external ? "_blank" : anchorProps.target}
      rel={external ? "noopener noreferrer" : anchorProps.rel}
      className={bodyClasses(variant, size, className)}
    >
      <RollingLabel>{children}</RollingLabel>
      <ArrowCircle variant={variant} size={size} />
    </a>
  );
}

type ArrowButtonProps = CommonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function ArrowButton({ variant = "primary", size = "md", className = "", children, type = "button", ...buttonProps }: ArrowButtonProps) {
  return (
    <button {...buttonProps} type={type} className={bodyClasses(variant, size, className)}>
      <RollingLabel>{children}</RollingLabel>
      <ArrowCircle variant={variant} size={size} />
    </button>
  );
}
