import type { Step, StageData } from "@/features/marketing/types";
import { cn } from "@/shared/lib/cn";

/* ------------------------------------------------------------------ */
/*  Stage-card data renderers                                         */
/* ------------------------------------------------------------------ */

function PolicyStage({ params }: Extract<StageData, { kind: "policy" }>["params"] extends infer P ? { params: P } : never) {
  return (
    <div className="grid gap-2.5">
      {(params as Extract<StageData, { kind: "policy" }>["params"]).map((p) => (
        <div
          key={p.key}
          className="grid grid-cols-[88px_1fr] items-center gap-3 font-mono text-xs text-sluice-muted"
        >
          <span>{p.key}</span>
          <strong className="font-bold text-sluice-routeBlue">{p.value}</strong>
        </div>
      ))}
    </div>
  );
}

function ProposalStage({ proposals }: { proposals: Extract<StageData, { kind: "proposals" }>["proposals"] }) {
  return (
    <div className="grid gap-2">
      {proposals.map((p) => (
        <div
          key={p.routeId}
          className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border border-sluice-navy/10 bg-white/60 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]"
        >
          <span>
            <strong className="block text-[13px] font-semibold text-sluice-navy">
              {p.name}
            </strong>
            <small className="text-[11px] text-sluice-muted">{p.detail}</small>
          </span>
          <span className="rounded-full border border-sluice-routeBlue/20 bg-sluice-routeBlue/8 px-2 py-0.5 font-mono text-[11px] text-sluice-routeBlue">
            {p.routeId}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScoreStage({ rows }: { rows: Extract<StageData, { kind: "scores" }>["rows"] }) {
  return (
    <div className="grid gap-2.5">
      {rows.map((r) => (
        <div
          key={r.name}
          className={cn(
            "grid grid-cols-[88px_1fr_32px] items-center gap-2.5 font-mono text-xs",
            r.isWinner
              ? "font-bold text-sluice-routeBlue"
              : "text-sluice-muted",
          )}
        >
          <strong>{r.name}</strong>
          <span className="h-2 overflow-hidden rounded-full bg-sluice-navy/8 dark:bg-white/10">
            <span
              className={cn(
                "block h-full rounded-full",
                r.isWinner
                  ? "bg-sluice-routeBlue"
                  : "bg-sluice-navy/30 dark:bg-white/25",
              )}
              style={{ width: `${r.score}%` }}
            />
          </span>
          <span>{r.score}</span>
        </div>
      ))}
    </div>
  );
}

function WinnerStage({ winner }: { winner: Extract<StageData, { kind: "winner" }>["winner"] }) {
  return (
    <div className="grid gap-3">
      <div className="rounded-lg border border-sluice-routeBlue/20 bg-sluice-routeBlue/8 p-4 dark:border-sluice-routeBlue/25 dark:bg-sluice-routeBlue/10">
        <strong className="block text-base font-semibold text-sluice-navy">
          {winner.name}
        </strong>
        <span className="mt-1 block font-mono text-xs text-sluice-muted">
          {winner.detail}
        </span>
      </div>
      {winner.runners.map((r) => (
        <div key={r} className="font-mono text-[11px] text-sluice-muted/70">
          {r}
        </div>
      ))}
    </div>
  );
}

function StageCard({ stageLabel, stageData }: { stageLabel: string; stageData: StageData }) {
  return (
    <div
      className={cn(
        "routing-stage-card relative z-[5] overflow-hidden rounded-lg border border-sluice-navy/12 p-4 shadow-lg dark:border-white/10",
        `routing-stage-card--${stageData.kind}`,
      )}
      style={{
        /* Fully opaque so the thread line never shows through */
        background: "var(--color-sluice-paper, #f2f3f5)",
      }}
    >
      {/* Dot-grid overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-sluice-navy, #1d3487) 0.8px, transparent 0.8px)",
          backgroundSize: "12px 12px",
          opacity: 0.06,
        }}
        aria-hidden="true"
      />
      <span className="relative z-[1] mb-3 inline-flex font-mono text-[11px] text-sluice-muted">
        {stageLabel}
      </span>
      <div className="relative z-[1]">
        {stageData.kind === "policy" && <PolicyStage params={stageData.params} />}
        {stageData.kind === "proposals" && <ProposalStage proposals={stageData.proposals} />}
        {stageData.kind === "scores" && <ScoreStage rows={stageData.rows} />}
        {stageData.kind === "winner" && <WinnerStage winner={stageData.winner} />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  StepPanel                                                         */
/* ------------------------------------------------------------------ */

type StepPanelProps = {
  step: Step;
  index: number;
  isActive: boolean;
};

export function StepPanel({ step, index, isActive }: StepPanelProps) {
  return (
    <article
      className={cn(
        "routing-step-panel relative z-[3] grid min-h-[74vh] content-center border-t border-sluice-navy/10 py-9 transition-opacity duration-[360ms] dark:border-white/10",
        index % 2 === 0
          ? "routing-step-panel-copy-right"
          : "routing-step-panel-copy-left",
        isActive
          ? "border-sluice-routeBlue/40 opacity-100 dark:border-sluice-routeBlue/30"
          : "opacity-30",
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="routing-step-panel-inner relative z-[4]">
        <h3 className="font-display text-[2rem] font-normal leading-[1.05] tracking-normal text-sluice-navy">
          {step.title}
        </h3>
        <p className="mt-3.5 max-w-[42ch] text-[15px] leading-[1.68] text-sluice-muted">
          {step.description}
        </p>
        <div className="mt-6">
          <StageCard stageLabel={step.stageLabel} stageData={step.stageData} />
        </div>
      </div>
    </article>
  );
}
