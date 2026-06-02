import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/shared/lib/cn";
import { isInternalRouteHref } from "@/shared/lib/links";

type ButtonLinkVariant = "primary" | "secondary" | "inverse" | "darkSecondary";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "border-sluice-navy bg-sluice-navy text-sluice-paper hover:bg-sluice-deepNavy dark:border-sluice-routeBlue dark:bg-sluice-routeBlue dark:text-sluice-deepNavy dark:hover:border-sluice-softBlue dark:hover:bg-sluice-softBlue",
  secondary:
    "border-sluice-navy bg-transparent text-sluice-navy hover:bg-sluice-navy/5 dark:border-white/20",
  inverse:
    "border-sluice-paper bg-sluice-paper text-sluice-deepNavy hover:bg-white dark:border-sluice-navy dark:bg-sluice-navy",
  darkSecondary:
    "border-white/35 bg-transparent text-white hover:bg-white/10",
};

export function ButtonLink({
  children,
  className,
  href,
  icon,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const linkClassName = cn(
    "inline-flex min-h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-pill border px-5 py-3 font-sans text-base font-medium tracking-normal transition-colors duration-200 ease-sluice",
    variantClasses[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (isInternalRouteHref(href) && !props.target && !props.download) {
    return (
      <Link to={href} className={linkClassName} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={linkClassName}
      {...props}
    >
      {content}
    </a>
  );
}
