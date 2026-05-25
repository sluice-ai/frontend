import { ArrowRight, FileText } from "lucide-react";

import { ButtonLink } from "./ui/ButtonLink";

export function CallToAction() {
  return (
    <section
      id="cta"
      className="scroll-mt-24 bg-sluice-deepNavy px-6 py-20 text-center md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-sluice-paper md:text-5xl lg:text-[3.5rem]">
          Stop guessing. Start routing intelligently.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-7 tracking-normal text-sluice-paper/70 md:text-lg">
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
