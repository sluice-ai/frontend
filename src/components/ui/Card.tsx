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
        isActive && "border-sluice-routeBlue/45 bg-sluice-routeBlue/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
