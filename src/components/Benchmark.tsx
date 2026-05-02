import { benchmarkSeries, scoringWeights } from "../data/siteContent";
import { BenchmarkLineChart } from "./charts/BenchmarkLineChart";
import { ScoreWeightChart } from "./charts/ScoreWeightChart";
import { Container } from "./ui/Container";
import { SectionHeader } from "./ui/SectionHeader";

export function Benchmark() {
  return (
    <section id="benchmark" className="section-shell bg-sluice-paperWarm/80">
      <Container>
        <div className="rounded-[24px] bg-sluice-paper/80 p-6 md:rounded-frame md:p-12 lg:p-[72px]">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[72px]">
            <div>
              <SectionHeader
                title="The best route should win."
                copy="Validators benchmark each routing decision across quality, cost, latency, reliability, and privacy fit."
              />

              <div className="mt-10 rounded-card bg-sluice-deepNavy p-6 font-mono text-sm leading-7 text-sluice-paper md:p-8">
                <div className="text-sluice-paper/70">score = gate x</div>
                <div className="mt-2">
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
        </div>
      </Container>
    </section>
  );
}
