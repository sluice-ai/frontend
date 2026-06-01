import type { Provider, ProviderId } from "@/entities/provider/provider.types";
import { demoReceipt, demoResponseText, routingModeOptions } from "@/entities/routing/routing.data";
import type {
  MinerRouteDecision,
  PrivacyTier,
  RoutingMode,
  RoutingPreferences,
  RoutingReceipt,
} from "@/entities/routing/routing.types";

export type RunResult = {
  responseText: string;
  receipt: RoutingReceipt;
  minerDecision?: MinerRouteDecision;
};

export type RunFailure =
  | { kind: "no_providers" }
  | { kind: "no_route"; reason: string };

type Candidate = {
  model: string;
  cost: number;
  latencyMs: number;
  quality: number;
};

const privacyRank: Record<PrivacyTier, number> = {
  public: 0,
  sensitive: 1,
  confidential: 2,
};

const candidatesByProvider: Record<ProviderId, Candidate> = {
  anthropic: {
    model: "Claude Haiku 4.5",
    cost: 0.0061,
    latencyMs: 920,
    quality: 0.91,
  },
  openai: {
    model: "GPT-5 mini",
    cost: 0.0048,
    latencyMs: 1100,
    quality: 0.88,
  },
  chutes: {
    model: "Llama-3.3 70B",
    cost: 0.0034,
    latencyMs: 1247,
    quality: 0.87,
  },
  targon: {
    model: "Targon Confidential 70B",
    cost: 0.0052,
    latencyMs: 1450,
    quality: 0.86,
  },
  together: {
    model: "Qwen 2.5 72B",
    cost: 0.0029,
    latencyMs: 1680,
    quality: 0.82,
  },
  fireworks: {
    model: "Mixtral 8x22B",
    cost: 0.0041,
    latencyMs: 1320,
    quality: 0.84,
  },
  groq: {
    model: "Llama-3.1 70B (Groq)",
    cost: 0.0058,
    latencyMs: 320,
    quality: 0.85,
  },
  deepinfra: {
    model: "Llama-3 70B",
    cost: 0.0033,
    latencyMs: 1510,
    quality: 0.83,
  },
  openrouter: {
    model: "Auto (OpenRouter)",
    cost: 0.0046,
    latencyMs: 1380,
    quality: 0.86,
  },
};

export function pickRoute(
  mode: RoutingMode,
  prefs: RoutingPreferences,
  providers: Provider[],
): { ok: true; result: RunResult } | { ok: false; failure: RunFailure } {
  const usable = providers.filter(
    (provider) =>
      !prefs.disallowedProviders.includes(provider.id) &&
      provider.enabled &&
      provider.status === "connected",
  );

  if (usable.length === 0) {
    return { ok: false, failure: { kind: "no_providers" } };
  }

  const candidates = usable.map((provider) => ({
    provider,
    ...candidatesByProvider[provider.id],
    privacyMax: provider.privacyMax,
  }));

  const valid = candidates.filter(
    (candidate) =>
      candidate.cost <= prefs.maxCostPerRequest &&
      candidate.latencyMs <= prefs.maxLatencyMs &&
      candidate.quality >= prefs.qualityFloor &&
      privacyRank[candidate.privacyMax] >= privacyRank[prefs.privacyTier],
  );

  if (valid.length === 0) {
    return {
      ok: false,
      failure: {
        kind: "no_route",
        reason: buildNoRouteReason(candidates, prefs),
      },
    };
  }

  const sorted = [...valid].sort((a, b) => {
    if (mode === "best_quality") return b.quality - a.quality || a.cost - b.cost;
    if (mode === "lowest_latency") return a.latencyMs - b.latencyMs || a.cost - b.cost;
    if (mode === "privacy_first") {
      return privacyRank[b.privacyMax] - privacyRank[a.privacyMax] || a.cost - b.cost;
    }
    return a.cost - b.cost;
  });

  const chosen = sorted[0];
  const alternatives = sorted.slice(1, 4).map((candidate) => ({
    model: candidate.model,
    provider: candidate.provider.name,
    cost: candidate.cost,
    latencyMs: candidate.latencyMs,
    quality: candidate.quality,
    reason:
      candidate.cost > chosen.cost
        ? "Higher cost than chosen route"
        : candidate.latencyMs > chosen.latencyMs
          ? "Higher latency than chosen route"
          : "Edge-case tradeoff",
  }));

  const baseline = Math.max(...candidates.map((candidate) => candidate.cost));
  const savedPercent =
    baseline > 0 ? Math.round(((baseline - chosen.cost) / baseline) * 100) : 0;
  const modeLabel =
    routingModeOptions.find((option) => option.value === mode)?.label ?? mode;

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
    latency: {
      totalMs: chosen.latencyMs,
      ttftMs: Math.max(120, Math.round(chosen.latencyMs * 0.15)),
      tokensOut: 384,
    },
    quality: {
      estimatedScore: chosen.quality,
      floor: prefs.qualityFloor,
      passedFloor: true,
    },
    privacy: {
      requestedTier: prefs.privacyTier,
      routeTier: chosen.privacyMax,
      passed: true,
    },
    rationale: `Your request required quality >= ${prefs.qualityFloor.toFixed(2)}, cost <= $${prefs.maxCostPerRequest.toFixed(2)}, and latency <= ${prefs.maxLatencyMs.toLocaleString()} ms. ${chosen.provider.name} / ${chosen.model} satisfied those constraints under "${modeLabel}" routing.`,
    alternatives: alternatives.length > 0 ? alternatives : demoReceipt.alternatives,
  };

  return { ok: true, result: { responseText: demoResponseText, receipt } };
}

export function getFallbackDecision(
  promptText: string,
  hasImage: boolean,
): MinerRouteDecision {
  const text = promptText.toLowerCase();
  let provider = "Chutes";
  let model = "Llama-3.3 70B";
  let reasoning =
    "Routed to Chutes / Llama-3.3 70B as the most cost-effective open-source route for standard textual tasks.";
  let confidence = 0.88;
  let taskType = "General Text";
  let quality = 0.86;
  let cost = "~$0.003/1K tokens";
  let latency = "~1.2s TTFT";
  let privacy = "Public";

  if (hasImage) {
    provider = "Anthropic";
    model = "Claude Sonnet 4";
    reasoning =
      "Detected image attachment requiring advanced multimodal vision capability. Anthropic Claude Sonnet 4 was selected for visual analysis and spatial reasoning.";
    taskType = "Multimodal Vision";
    quality = 0.94;
    cost = "~$0.015/1K tokens";
    latency = "~900ms TTFT";
  } else if (
    text.includes("code") ||
    text.includes("debug") ||
    text.includes("error") ||
    text.includes("function") ||
    text.includes("write a program") ||
    text.includes("clone") ||
    text.includes("instagram")
  ) {
    provider = "Anthropic";
    model = "Claude Sonnet 4";
    reasoning =
      "Complexity analysis indicates high reasoning depth required for software engineering. Claude Sonnet 4 was selected for strong coding task accuracy.";
    taskType = "Code Generation";
    quality = 0.93;
    cost = "~$0.015/1K tokens";
    latency = "~950ms TTFT";
  } else if (
    text.includes("privacy") ||
    text.includes("secret") ||
    text.includes("confidential") ||
    text.includes("personal data")
  ) {
    provider = "Targon";
    model = "Targon Confidential 70B";
    reasoning =
      "Workload contains sensitive terms requiring high privacy assurances. Routed to the Targon subnet for confidential compute.";
    taskType = "Secure Analysis";
    quality = 0.88;
    cost = "~$0.005/1K tokens";
    latency = "~1.4s TTFT";
    privacy = "Confidential";
  } else if (
    text.includes("speed") ||
    text.includes("fast") ||
    text.includes("realtime") ||
    text.includes("latency")
  ) {
    provider = "Groq";
    model = "Llama-3.1 70B (Groq)";
    reasoning =
      "User expressed a latency-critical preference. Groq's LPU implementation provides the lowest observed time to first token.";
    taskType = "Low-latency Chat";
    quality = 0.85;
    cost = "~$0.0058/1K tokens";
    latency = "~320ms TTFT";
  }

  return {
    minerTag: "Miner 1",
    taskType,
    selectedProvider: provider,
    selectedModel: model,
    confidence,
    reasoning,
    factors: {
      quality,
      cost,
      latency,
      privacy,
    },
    alternativeRoutes: [
      {
        provider: "OpenAI",
        model: "GPT-5 mini",
        reason: "Slightly faster but provider key currently disabled.",
      },
      {
        provider: "Together AI",
        model: "Qwen 2.5 72B",
        reason: "Lower cost but does not meet constraints as well.",
      },
    ],
  };
}

function buildNoRouteReason(
  candidates: Array<Candidate & { privacyMax: PrivacyTier }>,
  prefs: RoutingPreferences,
) {
  const reasons: string[] = [];
  if (!candidates.some((candidate) => candidate.cost <= prefs.maxCostPerRequest)) {
    reasons.push("max cost too low");
  }
  if (!candidates.some((candidate) => candidate.latencyMs <= prefs.maxLatencyMs)) {
    reasons.push("max latency too low");
  }
  if (!candidates.some((candidate) => candidate.quality >= prefs.qualityFloor)) {
    reasons.push("quality floor too high");
  }
  if (
    !candidates.some(
      (candidate) => privacyRank[candidate.privacyMax] >= privacyRank[prefs.privacyTier],
    )
  ) {
    reasons.push("no provider meets privacy tier");
  }

  return reasons.length > 0
    ? `Constraints too strict: ${reasons.join(", ")}.`
    : "No candidate route satisfied all constraints.";
}
