import { benchmarkSeries, scoringWeights } from "../data/siteContent";
import { BenchmarkLineChart } from "./charts/BenchmarkLineChart";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function Benchmark() {
  return (
    <section id="benchmark" className="section-shell">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-[72px] lg:items-start">
          <div>
            <SectionHeader
              title="Benchmark"
              copy="Validators benchmark each routing decision across quality, cost, latency, reliability, and privacy fit."
            />

            <div className="mt-8 rounded-card border border-sluice-navy/15 bg-sluice-paper/55 p-5 font-mono text-sm leading-7 text-sluice-ink shadow-soft md:p-6">
              <div className="text-sluice-navy/70">score = gate x</div>
              <div className="mt-1">
                0.42 quality + 0.22 cost + 0.16 latency + 0.12 reliability
                + 0.08 privacy
              </div>

              <div
                className="mt-5 border-t border-sluice-navy/10 pt-4"
                aria-label="Scoring weight mix"
              >
                <div className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.08em] text-sluice-navy/70">
                  Weight mix
                </div>
                <div className="grid grid-cols-2 gap-2 font-sans text-xs leading-none sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-5">
                  {scoringWeights.map((weight) => (
                    <div key={weight.label} className="min-w-0">
                      <div className="mb-1 flex items-baseline justify-between gap-2 text-sluice-ink">
                        <span className="truncate">{weight.label}</span>
                        <span className="font-semibold text-sluice-navy">
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

          <BenchmarkLineChart series={benchmarkSeries} />
        </div>
      </Container>
    </section>
  );
}
