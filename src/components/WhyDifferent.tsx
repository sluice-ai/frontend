import { advantages } from "../data/siteContent";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function WhyDifferent() {
  return (
    <section id="why-different" className="section-shell">
      <Container>
        <SectionHeader
          title="Why Sluice wins."
          copy="A routing market gets stronger as provider diversity, miner strategy, validator benchmarks, and user demand all increase."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {advantages.map((advantage) => {
            const Icon = advantage.icon;

            return (
              <Card key={advantage.title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-sluice-navy/20 text-sluice-navy">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold leading-none tracking-normal text-sluice-navy">
                  {advantage.title}
                </h3>
                <p className="caption mt-5">{advantage.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
