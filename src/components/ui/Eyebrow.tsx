import type { HTMLAttributes, ReactNode } from "react";

export type EyebrowVariant = "pink" | "lavender" | "glass" | "outline";

const VARIANT_CLASSES: Record<EyebrowVariant, string> = {
  pink: "bg-brand-pink text-white",
  lavender: "bg-brand-primary-lightest text-accent",
  glass: "bg-white/15 text-white",
  outline: "border border-line bg-surface text-content",
};

interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "className" | "children"> {
  variant?: EyebrowVariant;
  tilted?: boolean;
  pill?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Eyebrow({ variant = "lavender", tilted = false, pill = false, className = "", children, ...spanProps }: Props) {
  return (
    <span
      {...spanProps}
      className={`inline-block px-3 py-1.5 text-overline uppercase ${pill ? "rounded-full" : "rounded-sm"} ${tilted ? "-rotate-2" : ""} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
