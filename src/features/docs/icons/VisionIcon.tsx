import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";

export const VisionIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      className={`lucide lucide-crosshair-icon lucide-crosshair ${className || ""}`}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="22" x2="18" y1="12" y2="12" />
      <line x1="6" x2="2" y1="12" y2="12" />
      <line x1="12" x2="12" y1="6" y2="2" />
      <line x1="12" x2="12" y1="22" y2="18" />
    </svg>
  )
);

VisionIcon.displayName = "VisionIcon";
