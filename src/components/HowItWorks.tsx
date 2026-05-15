import { steps } from "../data/siteContent";
import { ProcessFlowChart } from "./charts/ProcessFlowChart";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeader
            title="The routing process."
            copy="The network treats routing as a measurable competition rather than a static provider list."
          />
          <ProcessFlowChart />
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-sluice-navy/15 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`bg-sluice-paper/40 p-6 backdrop-blur-[1px] ${index < steps.length - 1 ? "md:border-r md:border-sluice-navy/10" : ""
                }`}
            >
              <div className="font-display text-4xl font-normal leading-none tracking-normal text-sluice-navy/40">
                {step.number}
              </div>
              <h3 className="mt-4 font-display text-xl font-normal leading-[1.1] tracking-[-0.01em] text-sluice-navy">
                {step.title}
              </h3>
              <p className="caption mt-3">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
