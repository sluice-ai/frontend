import { CheckCircle2 } from "lucide-react";

import { roadmap } from "../data/siteContent";
import { Container } from "./ui/Container";

export function Roadmap() {
  return (
    <section id="roadmap" className="section-shell">
      <Container>
        <header>
          <h2 className="section-title">Roadmap</h2>
        </header>

        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-sluice-navy/15 lg:grid-cols-3">
          {roadmap.map((column, colIndex) => (
            <div
              key={column.title}
              className={`flex flex-col gap-6 bg-sluice-paper/40 p-6 backdrop-blur-[1px] md:p-8 ${
                colIndex < roadmap.length - 1 ? "lg:border-r lg:border-sluice-navy/10" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-normal leading-[1.1] tracking-[-0.01em] text-sluice-navy">
                  {column.title}
                </h3>
                <span className="shrink-0 rounded-pill border border-sluice-navy/20 px-3 py-1.5 font-sans text-xs font-medium tracking-normal text-sluice-muted">
                  {column.window}
                </span>
              </div>

              <ul className="flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 font-sans text-[15px] leading-6 tracking-normal text-sluice-ink"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-sluice-navy/40"
                      size={16}
                      strokeWidth={1.75}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
