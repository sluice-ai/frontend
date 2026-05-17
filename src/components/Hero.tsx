import { ArrowRight, BookOpen } from "lucide-react";

import { ButtonLink } from "./ui/ButtonLink";
import { Container } from "./ui/Container";
import { RoutingFlowDiagram } from "./charts/RoutingFlowDiagram";

export function Hero() {
  return (
    <section id="hero" className="pt-24 md:pt-32 overflow-x-clip">
      <Container>
        <div className="py-10 lg:py-14">
          <div className="flex flex-col lg:grid lg:grid-cols-[0.45fr_0.55fr] gap-10 lg:gap-x-12 lg:gap-y-6 lg:items-center">
            
            <div className="order-1 lg:col-start-1 lg:row-start-1 lg:self-end reveal-soft min-w-0">
              <h1 className="hero-title pb-2 md:pb-0">
                <span>A decentralized</span> market for routing policies.
              </h1>
            </div>

            <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center reveal-soft [animation-delay:140ms] w-full min-w-0">
              <div className="w-full sm:w-[105%] sm:-ml-[2.5%] md:w-[110%] md:-ml-[5%] lg:w-[120%] lg:-ml-[8%]">
                <RoutingFlowDiagram />
              </div>
            </div>

            <div className="order-3 lg:col-start-1 lg:row-start-2 lg:self-start reveal-soft [animation-delay:280ms] flex flex-col sm:flex-row gap-3 mt-2 lg:mt-0">
              <ButtonLink href="/dashboard" icon={<ArrowRight size={18} />} className="w-full sm:w-auto justify-center whitespace-nowrap">
                Dashboard
              </ButtonLink>
              <ButtonLink
                href="#benchmark"
                variant="secondary"
                icon={<BookOpen size={18} />}
                className="w-full sm:w-auto justify-center whitespace-nowrap"
              >
                See benchmark
              </ButtonLink>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
