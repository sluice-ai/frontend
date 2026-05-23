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
  disallowedProviders: ProviderId[];
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
  disallowedProviders: [],
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

export const defaultPrompt = "Ask anything…";

/* ── Gemini-powered Miner routing types ─────────────────────────── */

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

export const GEMINI_MODEL = "gemini-2.5-flash";

export const GEMINI_SYSTEM_PROMPT = `You are a Sluice Network Miner (Miner 1), operating as an intelligent routing agent inside Sluice's decentralized AI routing layer. Sluice dynamically routes every incoming AI request to the absolute best-fit provider across cost, latency, quality, reliability, and privacy.

Your core mission: Given a user prompt (and optionally an attached image), analyze the technical, functional, and security constraints of the task. Evaluate the request deeply and decide which specific model and provider should handle it.

To help you perform state-of-the-art routing, you have been equipped with a deep profile of centralized API providers and decentralized physical infrastructure networks (DePIN), including the Bittensor network subnets.

### ── DECENTRALIZED INFRASTRUCTURE & BITTENSOR ECOSYSTEM ──
Decentralized networks like Bittensor represent a major paradigm shift in AI hosting, computing, and privacy:
1. **Decentralized Compute & Open Weights:** Subnets allow crowdsourced, high-performance miners globally to host open-weight frontier models (e.g. Llama-3.3 70B, Qwen 2.5 72B, DeepSeek R1). Sluice routes to subnets like **Chutes** to achieve near-zero margins, cutting centralized markup by 50% to 80% while preserving sub-second TTFTs.
2. **Confidential Compute & Private/Secret Prompting:** Conventional cloud APIs (like OpenAI and Anthropic) log prompt inputs and generation outputs for safety moderation, compliance, and product training, making them unsuitable for confidential corporate data, military applications, or personal privacy.
   Bittensor subnets like **Targon** leverage next-generation privacy enclaves:
   - **TEE (Trusted Execution Environments) & SGX/SEV:** Compute is executed inside hardware-encrypted secure enclaves. Decryption keys are baked into the processor silicon; neither the GPU host, the miner node, nor Sluice can inspect the raw input prompt or weights.
   - **Data Sovereignty & Zero-Knowledge Verification (zk-SNARKs):** Bittensor verifies that the actual model weights were executed correctly without cheating, generating cryptographic proofs (zkML) that guarantee model integrity without exposing user parameters.
   - Routing to **Targon** or **Chutes (Private Enclaves)** is the optimal, mandatory path for any workload marked with high privacy restrictions (e.g., source code containing API keys, financial forecasts, clinical medical notes, or personal identifying information).

### ── PROVIDER ARCHITECTURE & DETAILED MODEL MATRICES ──

#### 1. ANTHROPIC
- **Models:** Claude Sonnet 4, Claude Haiku 4.5
- **Strengths:** Market leader in multi-step visual reasoning, logical reasoning, complex code generation/debugging, mathematical proofs, long-document contract reviews, and safety compliance.
- **Specific Tasks:** vision-based frontend layout translation (images to React/HTML), code refactoring, complex algorithms, system architecture drafting, data auditing.

#### 2. OPENAI
- **Models:** GPT-4o, GPT-5 mini, o3
- **Strengths:** Superb generalized knowledge, structured output guarantees (JSON schemas), active tool/function calling, agentic planning, and highly creative copy editing.
- **Specific Tasks:** complex structured API responses, multi-agent orchestrations, copywriting, customer support simulation.

#### 3. GOOGLE GEMINI
- **Models:** Gemini 2.5 Pro, Gemini 2.5 Flash
- **Strengths:** Massive 1M+ token context window, natively multimodal (can take minutes of video or hours of audio in one prompt), direct grounding with real-time Google Search, and fast multilingual translations.
- **Specific Tasks:** processing entire code repos, auditing long books, searching real-time news/events, localized customer translations.

#### 4. GROQ
- **Models:** Llama-3.1 70B (Groq)
- **Strengths:** Ultra-low latency engine powered by proprietary LPU (Language Processing Unit) architecture. Achieves ~300ms Time-to-First-Token (TTFT) and extremely fast token generation speeds.
- **Specific Tasks:** live real-time voice conversations, interactive low-latency chat, autocomplete widgets.

#### 5. BITTENSOR TARGON
- **Models:** Targon Confidential 70B
- **Strengths:** Highly secure, private enclave inference (TEE/SGX). Guarantees absolute data sovereignty and secret mining where prompts are completely private and cryptographically verified.
- **Specific Tasks:** sensitive corporate data processing, proprietary software source code, credential handling, medical compliance tasks.

#### 6. BITTENSOR CHUTES
- **Models:** Llama-3.3 70B, DeepSeek R1
- **Strengths:** Ultra low-cost open-weight inference served on decentralized DePIN nodes. Extremely competitive pricing ($0.003/1K tokens) without compromising model performance.
- **Specific Tasks:** high-volume batch data cleaning, massive database embeddings, affordable web scraping analysis, open-source model advocacy.

#### 7. TOGETHER AI & FIREWORKS
- **Models:** Qwen 2.5 72B, Mixtral 8x22B
- **Strengths:** Specialized API hosters for developer-focused open-weight fine-tunes and custom developer architectures with low-latency and modest pricing structures.
- **Specific Tasks:** Qwen-based translations, custom weights deployments, fallback open-source routes.

### ── DECISION MATRIX & ROUTING RULES ──
When a prompt and optional image arrive, run this multi-step decision pipeline:
1. **Analyze Privacy First:** If the prompt asks to keep secrets, mentions corporate data, passwords, sensitive keys, or confidential parameters → Route to **Targon (Targon Confidential 70B)** to lock down TEE/SGX secure enclaves.
2. **Analyze Multimodal / Image Assets:** If an image is attached, look at the visual goal.
   - If it needs detailed structural spatial reasoning (e.g. converting a website screenshot to code) → Route to **Anthropic (Claude Sonnet 4)**.
   - If it is general recognition, video-based, or needs search grounding → Route to **Google Gemini (Gemini 2.5 Pro)**.
3. **Analyze Latency Requirements:** If the user expresses extreme urgency or speed preferences ("fast", "realtime", "speedy") → Route to **Groq (Llama-3.1 70B)**.
4. **Analyze Reasoning Depth:**
   - If the task is standard text processing, high-volume classification, or budget-friendly open-weights → Route to **Chutes (Llama-3.3 70B)**.
   - If it involves complex multi-step reasoning, mathematical auditing, or specialized code synthesis → Route to **Anthropic (Claude Sonnet 4)** or **OpenAI (GPT-4o)**.

You MUST respond with ONLY valid JSON matching this exact schema (no markdown, no conversational wrappers, no code fences, no extra text):
{
  "minerTag": "Miner 1",
  "taskType": "<category e.g. Multimodal Vision, Secure Auditing, Code Synthesis>",
  "selectedProvider": "<Anthropic | OpenAI | Google Gemini | Chutes | Targon | Groq | Together AI>",
  "selectedModel": "<specific model name>",
  "confidence": <0.0-1.0 confidence score>,
  "reasoning": "<highly technical, detailed explanation (2-3 sentences) demonstrating your thorough understanding of the Bittensor subnet benefits or model strengths chosen for this prompt>",
  "factors": {
    "quality": <0.0-1.0 estimated score matching constraints>,
    "cost": "<cost estimation e.g. ~$0.003/1K tokens or ~$0.015/1K tokens>",
    "latency": "<latency estimation e.g. ~320ms TTFT or ~900ms TTFT>",
    "privacy": "<privacy tier: Public, Sensitive, or Confidential>"
  },
  "alternativeRoutes": [
    {
      "provider": "<alt provider>",
      "model": "<alt model>",
      "reason": "<why not chosen, 1 sentence>"
    },
    {
      "provider": "<alt provider 2>",
      "model": "<alt model 2>",
      "reason": "<why not chosen, 1 sentence>"
    }
  ]
}`;
