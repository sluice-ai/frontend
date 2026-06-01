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
            
            <div className="order-1 min-w-0 animate-rise-in motion-reduce:animate-none lg:col-start-1 lg:row-start-1 lg:self-end">
              <h1 className="w-full max-w-[690px] pb-2 font-display text-[2.5rem] font-normal leading-[1.05] tracking-normal text-sluice-navy min-[420px]:text-5xl sm:text-[3.5rem] md:pb-0 md:text-[3.8rem] lg:max-w-[min(700px,62vw)] lg:text-[3.5rem] min-[1360px]:text-6xl">
                <span>A decentralized</span> market for routing policies.
              </h1>
            </div>

            <div className="order-2 w-full min-w-0 animate-rise-in [animation-delay:140ms] motion-reduce:animate-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
              <div className="w-[120%] -ml-[10%] sm:w-[105%] sm:-ml-[2.5%] md:w-[110%] md:-ml-[5%] lg:w-[120%] lg:-ml-[8%]">
                <RoutingFlowDiagram />
              </div>
            </div>

            <div className="order-3 mt-2 flex animate-rise-in flex-col gap-3 [animation-delay:280ms] motion-reduce:animate-none sm:flex-row lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-start">
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
