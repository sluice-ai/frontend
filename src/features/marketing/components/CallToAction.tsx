import { ArrowRight, FileText } from "lucide-react";

import { ButtonLink } from "@/shared/ui/ButtonLink";

export function CallToAction() {
  return (
    <section
      id="cta"
      className="relative scroll-mt-24 overflow-hidden px-6 py-20 text-center md:px-16 md:py-28"
    >
      <CtaShape />

      <div className="relative z-[1] mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-white md:text-5xl lg:text-[3.5rem]">
          Stop guessing. Start routing intelligently.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-7 tracking-normal text-white/70 md:text-lg">
          Join the first measurable, policy-aware market that decides exactly
          where your AI work should go.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/dashboard" variant="inverse" icon={<ArrowRight size={18} />}>
            View Dashboard
          </ButtonLink>
          <ButtonLink
            href="#benchmark"
            variant="darkSecondary"
            icon={<FileText size={18} />}
          >
            View scoring
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function CtaShape() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-sluice-deepNavy"
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 8 C120 5 220 11 340 8 S580 5 700 8 S900 11 1000 8 V92 C880 95 780 89 660 92 S420 95 300 92 S100 89 0 92 Z"
        fill="currentColor"
      />
    </svg>
  );
}
