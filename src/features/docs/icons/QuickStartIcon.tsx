import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";

export const QuickStartIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      className={`lucide lucide-zap-icon lucide-zap ${className || ""}`}
      {...props}
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
);

QuickStartIcon.displayName = "QuickStartIcon";
