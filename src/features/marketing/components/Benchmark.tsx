import { scoringWeights } from "@/features/marketing/content";
import { ValidationMetrics } from "./charts/ValidationMetrics";
import { Container } from "@/shared/ui/Container";
import { SectionHeader } from "@/shared/ui/SectionHeader";

export function Benchmark() {
  return (
    <section id="benchmark" className="scroll-mt-[4.5rem] py-12 md:py-16">
      <Container>
        <SectionHeader
          title="Benchmark"
          copy="Validators execute proposed routes, compare them against reference alternatives, and reward the cheapest route that still meets task requirements."
        />

        <div className="mt-12 grid gap-10 min-w-0 lg:grid-cols-[0.78fr_1.22fr] lg:gap-[72px] lg:items-end">
          <div className="min-w-0">
            <div className="rounded-card border border-sluice-navy/15 bg-sluice-paper/55 p-6">
              <div className="font-mono text-[15px] leading-relaxed">
                <span className="text-sluice-navy/60">score =</span>{" "}
                <span className="font-semibold text-sluice-routeBlue">gate</span>{" "}
                <span className="text-sluice-navy/60">× (</span>
              </div>
              <div className="mt-2 grid gap-1.5 pl-4 font-mono text-[15px] sm:pl-8">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sluice-navy">0.50</span>
                  <span className="text-sluice-navy/70">quality</span>
                  <span className="text-sluice-navy/40">+</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sluice-navy">0.25</span>
                  <span className="text-sluice-navy/70">cost</span>
                  <span className="text-sluice-navy/40">+</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sluice-navy">0.15</span>
                  <span className="text-sluice-navy/70">latency</span>
                  <span className="text-sluice-navy/40">+</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sluice-navy">0.10</span>
                  <span className="text-sluice-navy/70">reliability</span>
                </div>
              </div>
              <div className="mt-2 font-mono text-[15px] text-sluice-navy/60">)</div>

              <div
                className="mt-6 border-t border-sluice-navy/10 pt-5"
                aria-label="Scoring weight mix"
              >

                <div className="grid gap-4 sm:grid-cols-2">
                  {scoringWeights.map((weight) => (
                    <div key={weight.label}>
                      <div className="mb-2 flex items-baseline justify-between gap-2 text-sluice-ink">
                        <span className="text-sm font-medium">{weight.label}</span>
                        <span className="font-mono text-[13px] font-semibold text-sluice-navy">
                          {weight.value.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-sluice-navy/10">
                        <div
                          className="h-full rounded-full bg-sluice-navy"
                          style={{ width: `${weight.value * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ValidationMetrics />
        </div>
      </Container>
    </section>
  );
}
