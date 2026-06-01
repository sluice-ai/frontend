import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  isActive?: boolean;
};

export function Card({ children, className, isActive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-sluice-navy/15 bg-sluice-paper/40 p-6 backdrop-blur-[1px] transition-colors duration-200 ease-sluice hover:border-sluice-navy/30 hover:bg-sluice-paper/50",
        isActive && "border-sluice-routeBlue/45 bg-sluice-routeBlue/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
