import type { ProviderId } from "@/entities/provider/provider.types";

export type PrivacyTier = "public" | "sensitive" | "confidential";

export type RoutingMode =
  | "cheapest_valid_route"
  | "best_quality"
  | "lowest_latency"
  | "privacy_first";

export type RoutingPreferences = {
  mode: RoutingMode;
  maxCostPerRequest: number;
  maxLatencyMs: number;
  qualityFloor: number;
  privacyTier: PrivacyTier;
  disallowedProviders: ProviderId[];
};

export type RouteAlternative = {
  model: string;
  provider: string;
  cost: number;
  latencyMs: number;
  quality: number;
  reason: string;
};

export type RoutingReceipt = {
  requestId: string;
  timestamp: string;
  mode: RoutingMode;
  route: { model: string; provider: string; providerType: string };
  cost: {
    actual: number;
    baseline: number;
    baselineLabel: string;
    savedPercent: number;
  };
  latency: { totalMs: number; ttftMs: number; tokensOut: number };
  quality: { estimatedScore: number; floor: number; passedFloor: boolean };
  privacy: {
    requestedTier: PrivacyTier;
    routeTier: PrivacyTier;
    passed: boolean;
  };
  rationale: string;
  alternatives: RouteAlternative[];
};

export type MinerRouteDecision = {
  minerTag: "Miner 1";
  taskType: string;
  selectedProvider: string;
  selectedModel: string;
  confidence: number;
  reasoning: string;
  factors: {
    quality: number;
    cost: string;
    latency: string;
    privacy: string;
  };
  alternativeRoutes: Array<{
    provider: string;
    model: string;
    reason: string;
  }>;
};
