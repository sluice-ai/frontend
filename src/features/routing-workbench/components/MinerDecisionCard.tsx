import Sparkles from "lucide-react/dist/esm/icons/sparkles";

import type { MinerRouteDecision } from "@/entities/routing/routing.types";

type MinerDecisionCardProps = {
  decision: MinerRouteDecision;
};

export function MinerDecisionCard({ decision }: MinerDecisionCardProps) {
  return (
    <section className="rounded-card border border-sluice-navy/15 bg-sluice-paper/58 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sluice-deepNavy text-sluice-paper">
            <Sparkles size={17} strokeWidth={2} />
          </span>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
              {decision.minerTag}
            </p>
            <h3 className="mt-0.5 font-sans text-lg font-semibold leading-tight text-sluice-navy">
              Route / {decision.selectedModel}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-sluice-navy/10 px-3 py-1 font-sans text-[12px] font-semibold text-sluice-navy">
            {decision.taskType}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-pill bg-emerald-50 px-3 py-1 font-sans text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
            {Math.round(decision.confidence * 100)}% confidence
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-pill border border-sluice-navy/15 bg-white/60 px-3 py-1.5 font-sans text-sm font-semibold text-sluice-navy">
          {decision.selectedProvider}
        </span>
        <span className="font-sans text-sm text-sluice-muted">/</span>
        <span className="font-sans text-sm font-semibold text-sluice-ink">
          {decision.selectedModel}
        </span>
      </div>

      <div className="mt-4">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          Routing rationale
        </p>
        <p className="mt-1.5 font-sans text-sm leading-6 text-sluice-ink">
          {decision.reasoning}
        </p>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <DecisionFactor label="Quality" value={decision.factors.quality.toFixed(2)} />
        <DecisionFactor label="Cost" value={decision.factors.cost} />
        <DecisionFactor label="Latency" value={decision.factors.latency} />
        <DecisionFactor label="Privacy" value={decision.factors.privacy} />
      </dl>
    </section>
  );
}

function DecisionFactor({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-card border border-sluice-navy/10 bg-white/60 p-3">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
        {label}
      </p>
      <p className="mt-1 font-sans text-[15px] font-semibold leading-none text-sluice-navy tabular-nums">
        {value}
      </p>
    </div>
  );
}
