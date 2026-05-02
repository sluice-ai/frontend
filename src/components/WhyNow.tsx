import { FragmentationMap } from "./charts/FragmentationMap";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";
import { metrics } from "../data/siteContent";

export function WhyNow() {
  return (
    <section id="why-now" className="section-shell">
      <Container>
        <div className="rounded-[24px] bg-sluice-paper/80 p-6 md:rounded-frame md:p-12 lg:p-[72px]">
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
                    <p className="caption mt-2">{metric.note}</p>
                  </Card>
                ))}
              </div>
            </div>

            <FragmentationMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
