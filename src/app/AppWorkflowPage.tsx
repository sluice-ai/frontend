import {
  AlertTriangle,
  ArrowUp,
  ChevronDown,
  LockKeyhole,
  RotateCcw,
  Settings,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { appNavItems } from "../data/siteContent";
import { CustomSelect } from "../components/CustomSelect";
import { SegmentedSelect } from "../components/SegmentedSelect";
import {
  defaultPrompt,
  demoReceipt,
  demoResponseText,
  privacyTierOptions,
  routingModeOptions,
  type PrivacyTier,
  type Provider,
  type ProviderId,
  type RoutingMode,
  type RoutingReceipt,
} from "./appData";
import { useProviders, useRoutingPreferences } from "./useAppStore";

type RunState = "idle" | "routing" | "selected" | "streaming" | "complete";

type RunFailure =
  | { kind: "no_providers" }
  | { kind: "no_route"; reason: string };

type RunResult = {
  responseText: string;
  receipt: RoutingReceipt;
};

const STREAM_DELAY_MS = 18;

function formatCost(value: number) {
  return `$${value.toFixed(4)}`;
}

function formatLatency(ms: number) {
  return `${ms.toLocaleString()} ms`;
}

function ControlSection({
  title,
  children,
  hint,
}: {
  title: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
        {title}
      </p>
      <div className="mt-1.5">{children}</div>
      {hint && (
        <p className="mt-1 font-sans text-[11px] leading-5 text-sluice-muted">{hint}</p>
      )}
    </div>
  );
}

function ColumnDivider() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-0 top-1/2 hidden h-[78%] w-px -translate-y-1/2 md:block"
    >
      <span className="absolute inset-0 bg-gradient-to-b from-transparent via-sluice-navy/25 to-transparent" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-sluice-paper ring-1 ring-sluice-navy/25" />
    </span>
  );
}

function pickRoute(
  mode: RoutingMode,
  prefs: {
    maxCostPerRequest: number;
    maxLatencyMs: number;
    qualityFloor: number;
    privacyTier: PrivacyTier;
    disallowedProviders: ProviderId[];
  },
  providers: Provider[],
): { ok: true; result: RunResult } | { ok: false; failure: RunFailure } {
  const usable = providers.filter(
    (p) =>
      !prefs.disallowedProviders.includes(p.id) &&
      p.enabled &&
      p.status === "connected",
  );

  if (usable.length === 0) return { ok: false, failure: { kind: "no_providers" } };

  const privacyRank: Record<PrivacyTier, number> = {
    public: 0,
    sensitive: 1,
    confidential: 2,
  };

  const candidatesByProvider: Record<string, { model: string; cost: number; latencyMs: number; quality: number }> = {
    anthropic: { model: "Claude Haiku 4.5", cost: 0.0061, latencyMs: 920, quality: 0.91 },
    openai: { model: "GPT-5 mini", cost: 0.0048, latencyMs: 1100, quality: 0.88 },
    chutes: { model: "Llama-3.3 70B", cost: 0.0034, latencyMs: 1247, quality: 0.87 },
    targon: { model: "Targon Confidential 70B", cost: 0.0052, latencyMs: 1450, quality: 0.86 },
    together: { model: "Qwen 2.5 72B", cost: 0.0029, latencyMs: 1680, quality: 0.82 },
    fireworks: { model: "Mixtral 8x22B", cost: 0.0041, latencyMs: 1320, quality: 0.84 },
    groq: { model: "Llama-3.1 70B (Groq)", cost: 0.0058, latencyMs: 320, quality: 0.85 },
    deepinfra: { model: "Llama-3 70B", cost: 0.0033, latencyMs: 1510, quality: 0.83 },
    openrouter: { model: "Auto (OpenRouter)", cost: 0.0046, latencyMs: 1380, quality: 0.86 },
  };

  const candidates = usable
    .map((p) => {
      const c = candidatesByProvider[p.id];
      if (!c) return null;
      return {
        provider: p,
        model: c.model,
        cost: c.cost,
        latencyMs: c.latencyMs,
        quality: c.quality,
        privacyMax: p.privacyMax,
      };
    })
    .filter(<T,>(x: T | null): x is T => x !== null);

  const valid = candidates.filter(
    (c) =>
      c.cost <= prefs.maxCostPerRequest &&
      c.latencyMs <= prefs.maxLatencyMs &&
      c.quality >= prefs.qualityFloor &&
      privacyRank[c.privacyMax] >= privacyRank[prefs.privacyTier],
  );

  if (valid.length === 0) {
    const reasons: string[] = [];
    if (!candidates.some((c) => c.cost <= prefs.maxCostPerRequest))
      reasons.push("max cost too low");
    if (!candidates.some((c) => c.latencyMs <= prefs.maxLatencyMs))
      reasons.push("max latency too low");
    if (!candidates.some((c) => c.quality >= prefs.qualityFloor))
      reasons.push("quality floor too high");
    if (
      !candidates.some(
        (c) => privacyRank[c.privacyMax] >= privacyRank[prefs.privacyTier],
      )
    )
      reasons.push("no provider meets privacy tier");
    return {
      ok: false,
      failure: {
        kind: "no_route",
        reason:
          reasons.length > 0
            ? `Constraints too strict: ${reasons.join(", ")}.`
            : "No candidate route satisfied all constraints.",
      },
    };
  }

  const sorted = [...valid].sort((a, b) => {
    if (mode === "best_quality") return b.quality - a.quality || a.cost - b.cost;
    if (mode === "lowest_latency") return a.latencyMs - b.latencyMs || a.cost - b.cost;
    if (mode === "privacy_first")
      return (
        privacyRank[b.privacyMax] - privacyRank[a.privacyMax] || a.cost - b.cost
      );
    return a.cost - b.cost;
  });
  const chosen = sorted[0];
  const alts = sorted.slice(1, 4).map((c) => ({
    model: c.model,
    provider: c.provider.name,
    cost: c.cost,
    latencyMs: c.latencyMs,
    quality: c.quality,
    reason:
      c.cost > chosen.cost
        ? "Higher cost than chosen route"
        : c.latencyMs > chosen.latencyMs
          ? "Higher latency than chosen route"
          : "Edge-case tradeoff",
  }));

  const baseline = Math.max(...candidates.map((c) => c.cost));
  const savedPercent = baseline > 0
    ? Math.round(((baseline - chosen.cost) / baseline) * 100)
    : 0;

  const receipt: RoutingReceipt = {
    requestId: `req_${Math.random().toString(36).slice(2, 10)}`,
    timestamp: new Date().toISOString(),
    mode,
    route: {
      model: chosen.model,
      provider: chosen.provider.name,
      providerType:
        chosen.provider.type === "bittensor"
          ? "Bittensor subnet"
          : chosen.provider.type === "aggregator"
            ? "Aggregator"
            : "API provider",
    },
    cost: {
      actual: chosen.cost,
      baseline,
      baselineLabel: "Highest-cost candidate baseline",
      savedPercent,
    },
    latency: { totalMs: chosen.latencyMs, ttftMs: Math.max(120, Math.round(chosen.latencyMs * 0.15)), tokensOut: 384 },
    quality: { estimatedScore: chosen.quality, floor: prefs.qualityFloor, passedFloor: true },
    privacy: { requestedTier: prefs.privacyTier, routeTier: chosen.privacyMax, passed: true },
    rationale: `Your request required quality ≥ ${prefs.qualityFloor.toFixed(2)}, cost ≤ $${prefs.maxCostPerRequest.toFixed(2)}, and latency ≤ ${prefs.maxLatencyMs.toLocaleString()} ms. ${chosen.provider.name} / ${chosen.model} satisfied those constraints under "${routingModeOptions.find((m) => m.value === mode)?.label}" routing.`,
    alternatives: alts.length > 0 ? alts : demoReceipt.alternatives,
  };

  return { ok: true, result: { responseText: demoResponseText, receipt } };
}

function ResponseBlock({
  prompt,
  runState,
  result,
  failure,
  streamedText,
}: {
  prompt: string;
  runState: RunState;
  result: RunResult | null;
  failure: RunFailure | null;
  streamedText: string;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-card rounded-tr-md bg-sluice-navy px-4 py-3 font-sans text-[15px] leading-7 text-sluice-paper">
          {prompt}
        </div>
      </div>

      {failure ? (
        <section className="rounded-card border border-amber-300 bg-amber-50/70 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="mt-0.5 text-amber-700" strokeWidth={1.8} />
            <div className="min-w-0">
              <p className="font-sans text-sm font-semibold text-amber-900">
                {failure.kind === "no_providers"
                  ? "No providers available"
                  : "No route satisfies your constraints"}
              </p>
              <p className="mt-1 font-sans text-sm leading-6 text-amber-900/85">
                {failure.kind === "no_providers" ? (
                  <>
                    None of your allowed providers have a connected key and an
                    enabled toggle.{" "}
                    <Link
                      to="/app/settings"
                      className="font-semibold underline underline-offset-2"
                    >
                      Configure providers
                    </Link>
                    .
                  </>
                ) : (
                  failure.reason
                )}
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="flex flex-wrap items-center gap-2">
            {runState === "routing" && (
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-sluice-navy/10 px-2.5 py-1 font-sans text-[11px] font-semibold text-sluice-navy">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sluice-routeBlue" />
                Routing…
              </span>
            )}
            {(runState === "selected" || runState === "streaming" || runState === "complete") && result && (
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-sluice-navy/10 px-2.5 py-1 font-sans text-[11px] font-semibold text-sluice-navy">
                <Sparkles size={11} strokeWidth={2} />
                {result.receipt.route.model} · {result.receipt.route.provider}
              </span>
            )}
            {runState === "complete" && result && (
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-emerald-50 px-2.5 py-1 font-sans text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {formatLatency(result.receipt.latency.totalMs)} · {result.receipt.latency.tokensOut} tok
              </span>
            )}
          </div>
          <div className="mt-3 whitespace-pre-wrap font-sans text-[15px] leading-7 text-sluice-ink">
            {streamedText}
            {(runState === "routing" || runState === "selected" || runState === "streaming") && (
              <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] animate-pulse bg-sluice-navy/60" />
            )}
          </div>
        </section>
      )}

      {runState === "complete" && result && <ReceiptCard receipt={result.receipt} />}
    </div>
  );
}

function ReceiptCard({ receipt }: { receipt: RoutingReceipt }) {
  const modeLabel = routingModeOptions.find((m) => m.value === receipt.mode)?.label ?? receipt.mode;
  return (
    <section className="rounded-card border border-sluice-navy/15 bg-sluice-paper/58 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Routing receipt
          </p>
          <h3 className="mt-1 font-sans text-lg font-semibold leading-tight text-sluice-navy">
            {receipt.route.model} via {receipt.route.provider}
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-emerald-50 px-3 py-1 font-sans text-[12px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
          Saved {receipt.cost.savedPercent}%
        </span>
      </div>

      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ReceiptStat label="Cost" value={formatCost(receipt.cost.actual)} sub={`vs ${formatCost(receipt.cost.baseline)} baseline`} />
        <ReceiptStat label="Latency" value={formatLatency(receipt.latency.totalMs)} sub={`TTFT ${receipt.latency.ttftMs} ms`} />
        <ReceiptStat label="Quality" value={receipt.quality.estimatedScore.toFixed(2)} sub={`floor ${receipt.quality.floor.toFixed(2)} · ${receipt.quality.passedFloor ? "pass" : "fail"}`} />
        <ReceiptStat label="Privacy" value={receipt.privacy.routeTier} sub={`requested ${receipt.privacy.requestedTier} · ${receipt.privacy.passed ? "pass" : "fail"}`} />
      </dl>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <InfoLine label="Provider type" value={receipt.route.providerType} />
        <InfoLine label="Policy" value={modeLabel} />
        <InfoLine label="Request" value={receipt.requestId} mono />
        <InfoLine label="Timestamp" value={new Date(receipt.timestamp).toLocaleString()} />
      </div>

      <div className="mt-5">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          Why this route?
        </p>
        <p className="mt-1.5 font-sans text-sm leading-6 text-sluice-ink">
          {receipt.rationale}
        </p>
      </div>

      <div className="mt-5">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          Alternatives considered
        </p>
        <ol className="mt-2 space-y-2">
          {receipt.alternatives.map((alt, i) => (
            <li
              key={`${alt.model}-${i}`}
              className="rounded-card border border-sluice-navy/10 bg-white/60 p-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-sans text-sm font-semibold text-sluice-navy">
                  {i + 1}. {alt.model}{" "}
                  <span className="font-normal text-sluice-muted">via {alt.provider}</span>
                </p>
                <div className="flex flex-wrap gap-3 font-mono text-[12px] text-sluice-muted">
                  <span>{formatCost(alt.cost)}</span>
                  <span>{formatLatency(alt.latencyMs)}</span>
                  <span>q {alt.quality.toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-1 font-sans text-[13px] leading-5 text-sluice-muted">
                {alt.reason}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ReceiptStat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-card border border-sluice-navy/10 bg-white/60 p-3">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
        {label}
      </p>
      <p className="mt-1 font-sans text-xl font-semibold leading-none text-sluice-navy tabular-nums">
        {value}
      </p>
      <p className="mt-1 font-sans text-[11px] leading-4 text-sluice-muted">{sub}</p>
    </div>
  );
}

function InfoLine({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-card border border-sluice-navy/10 bg-white/40 px-3 py-2">
      <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
        {label}
      </span>
      <span className={`text-sluice-ink ${mono ? "font-mono text-[12px]" : "font-sans text-[13px]"}`}>
        {value}
      </span>
    </div>
  );
}

function DisallowedProviderSelect({
  allProviders,
  disallowedProviders,
  onDisallow,
}: {
  allProviders: Provider[];
  disallowedProviders: ProviderId[];
  onDisallow: (id: ProviderId) => void;
}) {
  const candidates = allProviders.filter((p) => !disallowedProviders.includes(p.id));
  const options = candidates.map((p) => {
    const usable = p.enabled && p.status === "connected";
    return {
      value: p.id,
      label: p.name,
      rightLabel: !usable ? "key missing or disabled" : undefined,
    };
  });

  return (
    <CustomSelect<ProviderId>
      value=""
      onChange={onDisallow}
      options={options}
      placeholder="+ Add provider to disallow..."
    />
  );
}

function RoutingDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { prefs, setPrefs } = useRoutingPreferences();
  const { providers: providerList } = useProviders();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop scrim */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={[
          "fixed inset-0 z-30 bg-sluice-deepNavy/35 backdrop-blur-[3px] transition-opacity duration-300 ease-sluice",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />
      {/* Bottom sheet */}
      <aside
        aria-hidden={!open}
        aria-label="Routing controls"
        className={[
          "fixed inset-x-0 bottom-0 z-40 flex max-h-[calc(100dvh-12rem)] min-h-0 flex-col rounded-t-[24px] border-t border-sluice-navy/15 bg-white shadow-[0_-12px_48px_-15px_rgba(29,52,135,0.25)] transition-transform duration-300 ease-sluice md:mx-auto md:max-h-[90vh] md:max-w-6xl md:border-x",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <header className="relative flex shrink-0 items-center justify-between border-b border-sluice-navy/10 px-6 py-5 md:px-8">
          <div>
            <h2 className="font-sans text-xl font-medium leading-tight text-sluice-navy">
              Routing Control
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sluice-navy/10 text-sluice-navy transition-colors hover:bg-sluice-navy/5"
            aria-label="Close routing controls"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-8">
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            {/* Column 1 — Selectors (dropdowns) */}
            <div className="space-y-6 md:pr-8">
              <ControlSection title="Active Routing Preset">
                <CustomSelect<RoutingMode>
                  value={prefs.mode}
                  onChange={(mode) => setPrefs({ mode })}
                  options={routingModeOptions.map((o) => ({
                    value: o.value,
                    label: o.label,
                  }))}
                />
              </ControlSection>

              <ControlSection title="Disallow Specific Providers">
                <DisallowedProviderSelect
                  allProviders={providerList}
                  disallowedProviders={prefs.disallowedProviders}
                  onDisallow={(id) => {
                    setPrefs({ disallowedProviders: [...prefs.disallowedProviders, id] });
                  }}
                />
              </ControlSection>

              {prefs.disallowedProviders.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {prefs.disallowedProviders.map((id) => {
                    const p = providerList.find((prov) => prov.id === id);
                    if (!p) return null;
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1.5 rounded-pill border border-rose-200 bg-rose-50/70 px-3 py-1.5 font-sans text-xs font-semibold text-rose-700"
                      >
                        {p.privacyMax === "confidential" && (
                          <LockKeyhole size={11} strokeWidth={2} />
                        )}
                        {p.name}
                        <button
                          type="button"
                          onClick={() => {
                            const next = prefs.disallowedProviders.filter((x) => x !== id);
                            setPrefs({ disallowedProviders: next });
                          }}
                          className="transition-colors hover:text-rose-950 focus:outline-none"
                          aria-label={`Allow ${p.name}`}
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Column 2 — Numeric values (cost + quality) */}
            <div className="relative space-y-6 md:px-8">
              <ColumnDivider />
              <ControlSection title="Max cost / request">
                <SegmentedSelect<number>
                  value={prefs.maxCostPerRequest}
                  onChange={(v) => setPrefs({ maxCostPerRequest: v })}
                  options={[
                    { value: 0.01, label: "$0.01" },
                    { value: 0.05, label: "$0.05" },
                    { value: 0.1, label: "$0.10" },
                  ]}
                />
              </ControlSection>

              <ControlSection title="Quality floor">
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={0.99}
                    step={0.01}
                    value={prefs.qualityFloor}
                    onChange={(e) => setPrefs({ qualityFloor: Number(e.target.value) })}
                    className="flex-1 cursor-pointer accent-sluice-navy"
                  />
                  <span className="w-12 text-right font-mono text-sm font-semibold text-sluice-navy">
                    {prefs.qualityFloor.toFixed(2)}
                  </span>
                </div>
              </ControlSection>
            </div>

            {/* Column 3 — Pill toggles (latency + privacy) */}
            <div className="relative space-y-6 md:pl-8">
              <ColumnDivider />
              <ControlSection title="Max latency">
                <SegmentedSelect<number>
                  value={prefs.maxLatencyMs}
                  onChange={(v) => setPrefs({ maxLatencyMs: v })}
                  options={[
                    { value: 1000, label: "1s" },
                    { value: 2000, label: "2s" },
                    { value: 5000, label: "5s" },
                  ]}
                />
              </ControlSection>

              <ControlSection title="Privacy tier">
                <SegmentedSelect<PrivacyTier>
                  value={prefs.privacyTier}
                  onChange={(v) => setPrefs({ privacyTier: v })}
                  options={privacyTierOptions.map((o) => ({ value: o.value, label: o.label }))}
                />
              </ControlSection>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export function AppWorkflowPage() {
  const { prefs } = useRoutingPreferences();
  const { providers: providerList } = useProviders();

  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [runState, setRunState] = useState<RunState>("idle");
  const [result, setResult] = useState<RunResult | null>(null);
  const [failure, setFailure] = useState<RunFailure | null>(null);
  const [streamedText, setStreamedText] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const timers = useRef<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [streamedText, runState, failure]);

  useEffect(() => {
    const input = promptInputRef.current;
    if (!input) return;
    input.style.height = "44px";
    const next = Math.max(44, Math.min(input.scrollHeight, 176));
    input.style.height = `${next}px`;
  }, [prompt]);

  const handleSend = useCallback(() => {
    const text = prompt.trim();
    if (!text || runState === "routing" || runState === "streaming") return;
    clearTimers();
    setSubmittedPrompt(text);
    setPrompt("");
    setResult(null);
    setFailure(null);
    setStreamedText("");
    setRunState("routing");

    timers.current.push(
      window.setTimeout(() => {
        const outcome = pickRoute(prefs.mode, prefs, providerList);
        if (!outcome.ok) {
          setFailure(outcome.failure);
          setRunState("idle");
          return;
        }
        setResult(outcome.result);
        setRunState("selected");

        timers.current.push(
          window.setTimeout(() => {
            setRunState("streaming");
            const fullText = outcome.result.responseText;
            let i = 0;
            const stream = window.setInterval(() => {
              i += Math.max(2, Math.round(fullText.length / 90));
              if (i >= fullText.length) {
                setStreamedText(fullText);
                window.clearInterval(stream);
                setRunState("complete");
                return;
              }
              setStreamedText(fullText.slice(0, i));
            }, STREAM_DELAY_MS);
            timers.current.push(stream as unknown as number);
          }, 350) as unknown as number,
        );
      }, 650) as unknown as number,
    );
  }, [prompt, runState, prefs, providerList, clearTimers]);

  const handleReset = useCallback(() => {
    clearTimers();
    setRunState("idle");
    setResult(null);
    setFailure(null);
    setStreamedText("");
    setSubmittedPrompt("");
    setPrompt("");
  }, [clearTimers]);

  const hasConversation = Boolean(submittedPrompt) || Boolean(failure);
  const busy = runState === "routing" || runState === "streaming" || runState === "selected";
  const promptComposer = (
    <div className="fixed inset-x-0 bottom-3 z-20 bg-sluice-paper/85 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] md:static md:inset-auto md:z-auto md:bg-transparent md:backdrop-blur-none md:pb-0">
      <div className="mx-auto w-full max-w-3xl px-4 pt-2 pb-2 md:px-1 md:pt-0 md:pb-0">
        {hasConversation && (
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-sans text-[12px] font-semibold text-sluice-navy/70 hover:bg-sluice-navy/5 hover:text-sluice-navy"
            >
              <RotateCcw size={12} strokeWidth={2} /> New conversation
            </button>
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative flex w-full items-end rounded-[28px] border border-sluice-navy/20 bg-white px-4 py-2 shadow-[0_8px_24px_-12px_rgba(29,52,135,0.18)]"
        >
          <textarea
            data-prompt-input
            ref={promptInputRef}
            rows={1}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={hasConversation ? "Ask a follow-up…" : defaultPrompt}
            disabled={busy}
            className="max-h-44 min-h-[44px] w-0 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-1 py-2.5 font-sans text-base leading-6 text-sluice-ink outline-none placeholder:text-sluice-muted/70 disabled:opacity-60 md:text-[15px]"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || busy}
            aria-label="Send prompt"
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-sluice-navy text-sluice-paper transition-colors hover:bg-sluice-deepNavy disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp size={16} strokeWidth={2.4} />
          </button>
        </form>
        <p className="mt-2 hidden text-center font-sans text-[11px] text-sluice-muted md:block">
          Sluice routes through your enabled providers · adjust policy in routing controls
        </p>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={appNavItems} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(74,119,220,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,52,135,0.1),transparent_30%)]" />

      <section className="container-shell flex min-h-screen flex-col pb-3 pt-20 md:pt-24">
        <div className="flex flex-wrap items-center justify-end gap-2 pb-3">
          <Link
            to="/app/settings"
            aria-label="Settings"
            title="Settings"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sluice-navy/15 bg-sluice-paper/70 text-sluice-navy transition-colors hover:bg-sluice-navy/5"
          >
            <Settings size={16} strokeWidth={1.8} />
          </Link>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open routing controls"
            title="Routing controls"
            aria-expanded={drawerOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sluice-navy/15 bg-sluice-paper/70 text-sluice-navy transition-colors hover:bg-sluice-navy/5"
          >
            <SlidersHorizontal size={16} strokeWidth={1.8} />
          </button>
        </div>

        {hasConversation ? (
          <>
            <div
              ref={scrollRef}
              className="flex flex-1 flex-col overflow-y-auto pb-28 md:pb-0"
            >
              <div className="mx-auto w-full max-w-3xl flex-1 px-1 py-6">
                <ResponseBlock
                  prompt={submittedPrompt}
                  runState={runState}
                  result={result}
                  failure={failure}
                  streamedText={streamedText}
                />
              </div>
            </div>
            {promptComposer}
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center pb-36 pt-2 md:pb-40 md:pt-0">
            <div className="flex w-full flex-col items-center">
              <h1 className="text-center font-sans text-4xl font-semibold leading-tight tracking-normal text-sluice-navy sm:text-5xl md:text-[4rem]">
                How can I help you?
              </h1>
              <div className="mt-8 w-full sm:mt-9 md:mt-10">
                {promptComposer}
              </div>
            </div>
          </div>
        )}

      </section>

      <RoutingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </main>
  );
}
