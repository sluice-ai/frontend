import { customerSegments } from "../data/siteContent";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function Customers() {
  return (
    <section id="customers" className="section-shell bg-sluice-paperWarm/80">
      <Container>
        <div className="rounded-[24px] bg-sluice-paper/80 p-6 md:rounded-frame md:p-12 lg:p-[72px]">
          <SectionHeader
            title="Who routes with Sluice."
            copy="The first users are teams who already feel the pain of switching models, providers, and privacy tiers by hand."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {customerSegments.map((segment) => (
              <Card key={segment.number}>
                <div className="section-label text-sluice-muted">
                  {segment.number}
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold leading-none tracking-normal text-sluice-navy">
                  {segment.title}
                </h3>
                <p className="caption mt-5">{segment.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
