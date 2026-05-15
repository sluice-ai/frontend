import { layers } from "../data/siteContent";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function Solution() {
  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {layers.map((layer) => (
            <Card key={layer.name} isActive={layer.isSluice}>
              <div className="section-label text-sluice-routeBlue">
                {layer.name}
              </div>
              <h3 className="mt-4 font-display text-2xl font-normal leading-[1.1] tracking-[-0.01em] text-sluice-navy">
                {layer.title}
              </h3>
              <p className="caption mt-3">{layer.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
