export type ProviderId =
  | "anthropic"
  | "openai"
  | "chutes"
  | "targon"
  | "together"
  | "fireworks"
  | "groq"
  | "deepinfra"
  | "openrouter";

export type ProviderType = "api" | "bittensor" | "aggregator";
export type PrivacyTier = "public" | "sensitive" | "confidential";
export type ProviderStatus = "connected" | "missing_key" | "invalid_key";

export type Provider = {
  id: ProviderId;
  name: string;
  type: ProviderType;
  privacyMax: PrivacyTier;
  status: ProviderStatus;
  enabled: boolean;
  maskedKey?: string;
};

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
  allowedProviders: ProviderId[];
};

export const routingModeOptions: Array<{ value: RoutingMode; label: string; hint: string }> = [
  { value: "cheapest_valid_route", label: "Cheapest valid route", hint: "Lowest cost that meets constraints" },
  { value: "best_quality", label: "Best quality", hint: "Highest scoring route within budget" },
  { value: "lowest_latency", label: "Lowest latency", hint: "Fastest TTFT among valid routes" },
  { value: "privacy_first", label: "Privacy-first", hint: "Prefer confidential-capable providers" },
];

export const privacyTierOptions: Array<{ value: PrivacyTier; label: string }> = [
  { value: "public", label: "Public" },
  { value: "sensitive", label: "Sensitive" },
  { value: "confidential", label: "Confidential" },
];

export const providers: Provider[] = [
  { id: "anthropic", name: "Anthropic", type: "api", privacyMax: "public", status: "connected", enabled: true, maskedKey: "sk-ant-••••••abc1" },
  { id: "openai", name: "OpenAI", type: "api", privacyMax: "public", status: "missing_key", enabled: false },
  { id: "chutes", name: "Chutes", type: "bittensor", privacyMax: "sensitive", status: "connected", enabled: true, maskedKey: "ch_••••••92ff" },
  { id: "targon", name: "Targon", type: "bittensor", privacyMax: "confidential", status: "connected", enabled: true, maskedKey: "tg_••••••71bc" },
  { id: "together", name: "Together AI", type: "api", privacyMax: "public", status: "missing_key", enabled: false },
  { id: "fireworks", name: "Fireworks", type: "api", privacyMax: "public", status: "missing_key", enabled: false },
  { id: "groq", name: "Groq", type: "api", privacyMax: "public", status: "missing_key", enabled: false },
  { id: "deepinfra", name: "DeepInfra", type: "api", privacyMax: "sensitive", status: "missing_key", enabled: false },
  { id: "openrouter", name: "OpenRouter", type: "aggregator", privacyMax: "public", status: "missing_key", enabled: false },
];

export const defaultRoutingPreferences: RoutingPreferences = {
  mode: "cheapest_valid_route",
  maxCostPerRequest: 0.05,
  maxLatencyMs: 2000,
  qualityFloor: 0.85,
  privacyTier: "public",
  allowedProviders: ["anthropic", "chutes", "targon"],
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
  cost: { actual: number; baseline: number; baselineLabel: string; savedPercent: number };
  latency: { totalMs: number; ttftMs: number; tokensOut: number };
  quality: { estimatedScore: number; floor: number; passedFloor: boolean };
  privacy: { requestedTier: PrivacyTier; routeTier: PrivacyTier; passed: boolean };
  rationale: string;
  alternatives: RouteAlternative[];
};

export const demoReceipt: RoutingReceipt = {
  requestId: "req_8f2c9a1b",
  timestamp: "2026-05-18T10:42:18Z",
  mode: "cheapest_valid_route",
  route: { model: "Llama-3.3 70B", provider: "Chutes", providerType: "Bittensor subnet" },
  cost: { actual: 0.0034, baseline: 0.0089, baselineLabel: "Anthropic Claude baseline", savedPercent: 62 },
  latency: { totalMs: 1247, ttftMs: 184, tokensOut: 384 },
  quality: { estimatedScore: 0.87, floor: 0.85, passedFloor: true },
  privacy: { requestedTier: "public", routeTier: "public", passed: true },
  rationale:
    "Your request required quality ≥ 0.85, cost ≤ $0.05, and latency ≤ 2,000 ms. Chutes / Llama-3.3 70B satisfied those constraints at the lowest observed cost among available providers.",
  alternatives: [
    { model: "Claude Haiku 4.5", provider: "Anthropic", cost: 0.0061, latencyMs: 920, quality: 0.91, reason: "Higher quality but higher cost" },
    { model: "GPT-5 mini", provider: "OpenAI", cost: 0.0048, latencyMs: 1100, quality: 0.88, reason: "Similar quality but provider key missing in settings" },
    { model: "Qwen 2.5 72B", provider: "Together", cost: 0.0029, latencyMs: 1680, quality: 0.82, reason: "Cheaper but below quality floor" },
  ],
};

export const demoResponseText =
  "The customer feedback reveals three dominant themes: onboarding friction, pricing opacity, and integration gaps.\n\nOnboarding friction appears most frequently, especially around API key setup and first-run configuration. Pricing opacity is the second major issue, with users asking for clearer cost estimates before usage. Integration gaps are third, with Linear, Notion, and Slack requested most often.\n\nSuggested next steps: simplify onboarding, add a cost estimator, and prioritize Linear and Slack integrations.";

export const defaultPrompt =
  "Summarize the attached customer feedback and identify the top 3 issues.";
