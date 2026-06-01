import { customerSegments } from "../data/siteContent";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function Customers() {
  return (
    <section id="customers" className="scroll-mt-[4.5rem] py-12 md:py-16">
      <Container>
        <SectionHeader
          title="Who routes with Sluice."
          copy="The first users are teams who already feel the pain of switching models, providers, and privacy tiers by hand."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {customerSegments.map((segment) => (
            <Card key={segment.number}>
              <div className="font-sans text-sm font-medium leading-none tracking-normal text-sluice-muted">
                {segment.number}
              </div>
              <h3 className="mt-5 font-display text-3xl font-bold leading-none tracking-normal text-sluice-navy">
                {segment.title}
              </h3>
              <p className="mt-5 font-sans text-sm leading-6 tracking-normal text-sluice-muted">
                {segment.description}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
