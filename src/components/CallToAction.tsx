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
          Build the routing layer for decentralized AI.
        </h2>
        <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-7 tracking-normal text-sluice-paper/70 md:text-lg">
          The Sluice testnet is coming soon. The goal is a measurable,
          policy-aware market for fragmented AI supply.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="#cta" variant="inverse" icon={<ArrowRight size={18} />}>
            Coming Soon
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
