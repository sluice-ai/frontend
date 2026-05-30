import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";

export const OverviewIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 15, strokeWidth = 2, className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`lucide lucide-book-open-icon lucide-book-open ${className || ""}`}
      {...props}
    >
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  )
);

OverviewIcon.displayName = "OverviewIcon";
