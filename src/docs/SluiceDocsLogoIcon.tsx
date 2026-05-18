import { forwardRef } from "react";
import type { LucideProps } from "lucide-react";

export const SluiceDocsLogoIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ size = 15, className, ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="190 278 670 468"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth="52"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M238 512H704" />
        <path d="M238 512C360 512 408 348 548 348H704" />
        <path d="M238 512C360 512 408 676 548 676H704" />
      </g>
      <g fill="currentColor">
        <circle cx="790" cy="348" r="46" />
        <circle cx="790" cy="512" r="46" />
        <circle cx="790" cy="676" r="46" />
      </g>
    </svg>
  )
);

SluiceDocsLogoIcon.displayName = "SluiceDocsLogoIcon";
