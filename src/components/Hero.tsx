import { ArrowRight, BookOpen } from "lucide-react";

import { ButtonLink } from "./ui/ButtonLink";
import { Container } from "./ui/Container";
import { RoutingFlowDiagram } from "./charts/RoutingFlowDiagram";

export function Hero() {
  return (
    <section id="hero" className="pt-28 md:pt-36">
      <Container>
        <div className="grid items-center gap-12 pb-14 pt-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pb-20 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="reveal-soft">
            <h1 className="hero-title">Where AI work should flow.</h1>
            <p className="body-copy mt-7">
              Routes every AI request to the best-fit provider across cost,
              latency, quality, reliability, and privacy.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#cta" icon={<ArrowRight size={18} />}>
                Coming Soon
              </ButtonLink>
              <ButtonLink
                href="#benchmark"
                variant="secondary"
                icon={<BookOpen size={18} />}
              >
                See benchmark
              </ButtonLink>
            </div>
          </div>

          <div className="reveal-soft [animation-delay:120ms]">
            <RoutingFlowDiagram />
          </div>
        </div>
      </Container>
    </section>
  );
}
