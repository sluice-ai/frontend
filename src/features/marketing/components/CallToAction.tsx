import { ArrowRight, FileText } from "lucide-react";

import { ButtonLink } from "@/shared/ui/ButtonLink";
import { Container } from "@/shared/ui/Container";

export function CallToAction() {
  return (
    <section
      id="cta"
      className="scroll-mt-24 py-[clamp(72px,10vw,120px)]"
    >
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          {/* Left — Big headline */}
          <div>
            <h2 className="font-display text-[clamp(36px,5.5vw,64px)] font-normal leading-[1.02] tracking-[-0.02em] text-sluice-navy [text-wrap:balance] dark:text-white">
              Stop guessing.
              <br />
              <em className="italic text-sluice-routeBlue dark:text-[#8aabf4]">
                Route with precision.
              </em>
            </h2>
          </div>

          {/* Right — Copy + buttons */}
          <div>
            <p className="mb-7 max-w-[380px] font-sans text-[15px] leading-[1.7] tracking-normal text-sluice-muted">
              A measurable, policy-aware routing market that picks the best path
              for every AI task based on cost, latency, quality, and privacy.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                href="/dashboard"
                variant="primary"
                icon={<ArrowRight size={18} />}
              >
                View Dashboard
              </ButtonLink>
              <ButtonLink
                href="#benchmark"
                variant="secondary"
                icon={<FileText size={18} />}
              >
                View scoring
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
