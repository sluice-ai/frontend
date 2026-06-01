import type { ScoreWeight } from "../../types";

type ScoreWeightChartProps = {
  weights: ScoreWeight[];
};

export function ScoreWeightChart({ weights }: ScoreWeightChartProps) {
  return (
    <div className="flex flex-col gap-4" aria-label="Validator scoring weights">
      {weights.map((weight) => (
        <div
          key={weight.label}
          className="rounded-card border border-sluice-navy/15 bg-transparent p-5"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-sans text-base font-semibold tracking-normal text-sluice-ink">
                {weight.label}
              </h3>
              <p className="mt-1 font-sans text-sm leading-6 tracking-normal text-sluice-muted">
                {weight.detail}
              </p>
            </div>
            <span className="font-display text-3xl font-normal leading-none tracking-normal text-sluice-navy">
              {weight.value.toFixed(2)}
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full border border-sluice-navy/10 bg-sluice-paper/35">
            <div
              className="h-full rounded-full bg-sluice-navy"
              style={{ width: `${weight.value * 100}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
