import { FragmentationMap } from "./charts/FragmentationMap";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";
import { metrics } from "../data/siteContent";

export function WhyNow() {
  return (
    <section id="why-now" className="scroll-mt-[4.5rem] py-12 md:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12 xl:grid-cols-[0.72fr_1.28fr]">
          <div>
            <SectionHeader
              title="AI supply is fragmented."
              copy="Multi-model and agent workflows need live routing. No single model, provider, subnet, or privacy tier wins every request."
            />
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {metrics.map((metric) => (
                <Card key={metric.label} className="text-center">
                  <div className="font-display text-5xl font-bold leading-none tracking-normal text-sluice-navy">
                    {metric.value}
                  </div>
                  <div className="mt-3 font-sans text-base font-semibold tracking-normal text-sluice-ink">
                    {metric.label}
                  </div>
                  <p className="mt-2 font-sans text-sm leading-6 tracking-normal text-sluice-muted">
                    {metric.note}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <FragmentationMap />
        </div>
      </Container>
    </section>
  );
}
