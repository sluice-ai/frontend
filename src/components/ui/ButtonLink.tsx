import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

type ButtonLinkVariant = "primary" | "secondary" | "inverse" | "darkSecondary";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "border-sluice-navy bg-sluice-navy text-sluice-paper hover:bg-sluice-deepNavy",
  secondary:
    "border-sluice-navy bg-transparent text-sluice-navy hover:bg-sluice-navy/5",
  inverse:
    "border-sluice-paper bg-sluice-paper text-sluice-deepNavy hover:bg-white",
  darkSecondary:
    "border-sluice-paper/35 bg-transparent text-sluice-paper hover:bg-sluice-paper/10",
};

export function ButtonLink({
  children,
  className,
  icon,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-pill border px-5 py-3 font-sans text-base font-medium tracking-normal transition-colors duration-200 ease-sluice",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </a>
  );
}
