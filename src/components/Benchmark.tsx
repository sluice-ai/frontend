import { benchmarkSeries, scoringWeights } from "../data/siteContent";
import { BenchmarkLineChart } from "./charts/BenchmarkLineChart";
import { ScoreWeightChart } from "./charts/ScoreWeightChart";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function Benchmark() {
  return (
    <section id="benchmark" className="section-shell">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[72px] lg:items-start">
          <div>
            <SectionHeader
              title="The best route should win."
              copy="Validators benchmark each routing decision across quality, cost, latency, reliability, and privacy fit."
            />

            <div className="mt-8 rounded-card border border-sluice-paper/15 bg-sluice-deepNavy/92 p-5 font-mono text-sm leading-7 text-sluice-paper shadow-soft md:p-6">
              <div className="text-sluice-paper/70">score = gate x</div>
              <div className="mt-1">
                0.42 quality + 0.22 cost + 0.16 latency + 0.12 reliability
                + 0.08 privacy
              </div>
            </div>
          </div>

          <ScoreWeightChart weights={scoringWeights} />
        </div>

        <div className="mt-10">
          <BenchmarkLineChart series={benchmarkSeries} />
        </div>
      </Container>
    </section>
  );
}
