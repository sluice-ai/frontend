import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";

export const SluiceDocsLogoIcon = forwardRef<SVGSVGElement, LucideProps>(
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
      className={className}
      {...props}
    >
      <path d="M1.72 12H18.41" />
      <path d="M1.72 12C6.09 12 7.81 3.59 12.82 3.59H18.41" />
      <path d="M1.72 12C6.09 12 7.81 20.41 12.82 20.41H18.41" />
      <circle cx="21.49" cy="3.59" r="1.65" fill="currentColor" stroke="none" />
      <circle cx="21.49" cy="12" r="1.65" fill="currentColor" stroke="none" />
      <circle cx="21.49" cy="20.41" r="1.65" fill="currentColor" stroke="none" />
    </svg>
  )
);

SluiceDocsLogoIcon.displayName = "SluiceDocsLogoIcon";
