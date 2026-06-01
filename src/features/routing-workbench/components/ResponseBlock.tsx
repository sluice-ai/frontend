import AlertTriangle from "lucide-react/dist/esm/icons/alert-triangle";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";

import { MinerDecisionCard } from "@/features/routing-workbench/components/MinerDecisionCard";
import type {
  RunFailure,
  RunResult,
  RunState,
} from "@/features/routing-workbench/types";

type ResponseBlockProps = {
  prompt: string;
  imagePreview?: string;
  runState: RunState;
  result: RunResult | null;
  failure: RunFailure | null;
  onOpenSettings: () => void;
};

export function ResponseBlock({
  prompt,
  imagePreview,
  runState,
  result,
  failure,
  onOpenSettings,
}: ResponseBlockProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-card rounded-tr-md bg-sluice-navy px-4 py-3">
          {imagePreview && (
            <div className="mb-2">
              <img
                src={imagePreview}
                alt="Attached"
                className="max-h-48 max-w-full rounded-md border border-white/20 object-contain"
              />
            </div>
          )}
          <p className="font-sans text-[15px] leading-7 text-sluice-paper">
            {prompt}
          </p>
        </div>
      </div>

      {failure ? (
        <FailurePanel failure={failure} onOpenSettings={onOpenSettings} />
      ) : (
        <section className="space-y-4">
          {runState === "routing" && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-sluice-navy/10 px-3 py-1.5 font-sans text-xs font-semibold text-sluice-navy">
                <Loader2 size={13} strokeWidth={2.5} className="animate-spin" />
                Miner 1 analyzing query & routing...
              </span>
            </div>
          )}

          {result?.minerDecision && (
            <MinerDecisionCard decision={result.minerDecision} />
          )}
        </section>
      )}
    </div>
  );
}

function FailurePanel({
  failure,
  onOpenSettings,
}: {
  failure: RunFailure;
  onOpenSettings: () => void;
}) {
  return (
    <section className="rounded-card border border-amber-300 bg-amber-50/70 p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle
          size={18}
          className="mt-0.5 text-amber-700"
          strokeWidth={1.8}
        />
        <div className="min-w-0">
          <p className="font-sans text-sm font-semibold text-amber-900">
            {failure.kind === "no_providers"
              ? "No providers available"
              : failure.kind === "gemini_error"
                ? "Miner routing failed"
                : "No route satisfies your constraints"}
          </p>
          <p className="mt-1 font-sans text-sm leading-6 text-amber-900/85">
            <FailureMessage failure={failure} onOpenSettings={onOpenSettings} />
          </p>
        </div>
      </div>
    </section>
  );
}

function FailureMessage({
  failure,
  onOpenSettings,
}: {
  failure: RunFailure;
  onOpenSettings: () => void;
}) {
  if (failure.kind === "no_providers") {
    return (
      <>
        None of your allowed providers have a connected key and an enabled toggle.{" "}
        <button
          type="button"
          onClick={onOpenSettings}
          className="font-semibold underline underline-offset-2"
        >
          Configure providers
        </button>
        .
      </>
    );
  }

  if (failure.kind === "no_route") {
    return <>{failure.reason}</>;
  }

  if (failure.error.kind === "no_key") {
    return (
      <>
        No Gemini API key configured. Please set the{" "}
        <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-[13px] font-semibold text-amber-900">
          VITE_GEMINI_API_KEY
        </code>{" "}
        environment variable and redeploy.
      </>
    );
  }

  if (failure.error.kind === "invalid_key") {
    return (
      <>
        Your Gemini API key is invalid. Please check your{" "}
        <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-[13px] font-semibold text-amber-900">
          VITE_GEMINI_API_KEY
        </code>{" "}
        environment variable and trigger a new deployment.
      </>
    );
  }

  if (failure.error.kind === "rate_limited") {
    return <>Rate limited by Google AI Studio. Wait a moment and try again.</>;
  }

  if (failure.error.kind === "parse_error") {
    return <>The miner returned an unexpected response format. Try again.</>;
  }

  if (failure.error.kind === "network") {
    return <>Network error: {failure.error.message}</>;
  }

  return <>An unexpected error occurred. Try again.</>;
}
