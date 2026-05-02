import { CheckCircle2 } from "lucide-react";

import { roadmap } from "../data/siteContent";
import { Card } from "./ui/Card";
import { Container } from "./ui/Container";

export function Roadmap() {
  return (
    <section id="roadmap" className="section-shell">
      <Container>
        <header className="max-w-5xl">
          <h2 className="section-title">
            Roadmap
          </h2>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {roadmap.map((column) => (
            <Card key={column.title} className="flex flex-col gap-7">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-3xl font-bold leading-none tracking-normal text-sluice-navy">
                  {column.title}
                </h3>
                <span className="w-fit rounded-pill border border-sluice-navy/20 px-3 py-1.5 font-sans text-sm font-medium tracking-normal text-sluice-muted">
                  {column.window}
                </span>
              </div>

              <ul className="flex flex-col gap-3">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-[14px] bg-sluice-paperWarm/55 px-3 py-2.5"
                  >
                    <CheckCircle2
                      className="mt-1 shrink-0 text-sluice-navy"
                      size={17}
                      strokeWidth={1.75}
                    />
                    <span className="font-sans text-[15px] leading-6 tracking-normal text-sluice-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
