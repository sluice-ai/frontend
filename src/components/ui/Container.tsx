import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-16",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
