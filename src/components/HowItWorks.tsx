import { steps } from "../data/siteContent";
import { ProcessFlowChart } from "./charts/ProcessFlowChart";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section-shell">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            title="Four steps. One best route."
            copy="The network treats routing as a measurable competition rather than a static provider list."
          />
          <ProcessFlowChart />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.number} className="flex min-h-[260px] flex-col">
              <div className="font-display text-6xl font-bold leading-none tracking-normal text-sluice-navy/20">
                {step.number}
              </div>
              <h3 className="mt-7 font-display text-3xl font-bold leading-none tracking-normal text-sluice-navy">
                {step.title}
              </h3>
              <p className="caption mt-5">{step.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
