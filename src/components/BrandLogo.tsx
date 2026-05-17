import { cn } from "../lib/cn";

type BrandLogoProps = {
  markClassName?: string;
  textClassName?: string;
};

export function BrandLogo({ markClassName, textClassName }: BrandLogoProps) {
  return (
    <>
      <svg
        viewBox="190 278 670 468"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className={cn("h-6 w-auto shrink-0 text-sluice-navy", markClassName)}
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
      <span className={textClassName}>Sluice</span>
    </>
  );
}
