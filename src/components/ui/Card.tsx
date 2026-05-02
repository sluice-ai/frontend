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
        "quiet-card",
        isActive && "border-sluice-navy/20 bg-sluice-navy/5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
