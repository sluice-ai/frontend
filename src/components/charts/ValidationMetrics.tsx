import { Activity, CheckCircle2, Clock, Code2, MessageSquare, Shield } from "lucide-react";
import { Card } from "../ui/Card";

const validationSteps = [
  {
    label: "Conversation quality",
    detail: "MT-Bench style tasks",
    icon: MessageSquare,
  },
  {
    label: "Reasoning accuracy",
    detail: "GSM8K style tasks",
    icon: Activity,
  },
  {
    label: "Coding performance",
    detail: "HumanEval style tasks",
    icon: Code2,
  },
  {
    label: "Latency",
    detail: "Time to first token / full completion",
    icon: Clock,
  },
  {
    label: "Reliability",
    detail: "Success rate, timeout, fallback rate",
    icon: CheckCircle2,
  },
  {
    label: "Privacy fit",
    detail: "Route satisfy requested privacy tier?",
    icon: Shield,
  },
];

const validationLoopSteps = ["Execute", "Compare", "Score", "Reward"];

export function ValidationMetrics() {
  return (
    <div className="flex min-w-0 flex-col gap-3">
      <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-sluice-navy/60">
        Four-Step Validation Loop
      </div>
      <div className="-mx-2 mb-4 min-w-0 overflow-x-auto px-2 pb-2 hide-scrollbar">
        <ol className="inline-flex min-w-max items-center text-xs font-medium text-sluice-navy md:text-sm">
          {validationLoopSteps.map((step, index) => (
            <li key={step} className="flex items-center">
              <span className="flex items-center gap-2 rounded-full border border-sluice-navy/10 bg-sluice-navy/5 px-3 py-1.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sluice-navy text-[10px] text-white">
                  {index + 1}
                </span>
                {step}
              </span>
              {index < validationLoopSteps.length - 1 && (
                <span
                  className="mx-2 h-[1px] w-8 shrink-0 bg-sluice-navy/20"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {validationSteps.map((step) => {
          const Icon = step.icon;
          return (
            <Card key={step.label} className="flex flex-row items-center gap-4 !p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sluice-navy/5 text-sluice-navy">
                <Icon size={18} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-sans text-[14px] font-semibold text-sluice-navy">
                  {step.label}
                </div>
                <div className="truncate text-xs text-sluice-muted">
                  {step.detail}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
