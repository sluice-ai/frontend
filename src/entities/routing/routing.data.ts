import type {
  PrivacyTier,
  RoutingMode,
  RoutingPreferences,
  RoutingReceipt,
} from "@/entities/routing/routing.types";

export const routingModeOptions: Array<{
  value: RoutingMode;
  label: string;
  hint: string;
}> = [
  {
    value: "cheapest_valid_route",
    label: "Cheapest valid route",
    hint: "Lowest cost that meets constraints",
  },
  {
    value: "best_quality",
    label: "Best quality",
    hint: "Highest scoring route within budget",
  },
  {
    value: "lowest_latency",
    label: "Lowest latency",
    hint: "Fastest TTFT among valid routes",
  },
  {
    value: "privacy_first",
    label: "Privacy-first",
    hint: "Prefer confidential-capable providers",
  },
];

export const privacyTierOptions: Array<{ value: PrivacyTier; label: string }> = [
  { value: "public", label: "Public" },
  { value: "sensitive", label: "Sensitive" },
  { value: "confidential", label: "Confidential" },
];

export const defaultRoutingPreferences: RoutingPreferences = {
  mode: "cheapest_valid_route",
  maxCostPerRequest: 0.05,
  maxLatencyMs: 2000,
  qualityFloor: 0.85,
  privacyTier: "public",
  disallowedProviders: [],
};

export const demoReceipt: RoutingReceipt = {
  requestId: "req_8f2c9a1b",
  timestamp: "2026-05-18T10:42:18Z",
  mode: "cheapest_valid_route",
  route: {
    model: "Llama-3.3 70B",
    provider: "Chutes",
    providerType: "Bittensor subnet",
  },
  cost: {
    actual: 0.0034,
    baseline: 0.0089,
    baselineLabel: "Anthropic Claude baseline",
    savedPercent: 62,
  },
  latency: { totalMs: 1247, ttftMs: 184, tokensOut: 384 },
  quality: { estimatedScore: 0.87, floor: 0.85, passedFloor: true },
  privacy: { requestedTier: "public", routeTier: "public", passed: true },
  rationale:
    "Your request required quality >= 0.85, cost <= $0.05, and latency <= 2,000 ms. Chutes / Llama-3.3 70B satisfied those constraints at the lowest observed cost among available providers.",
  alternatives: [
    {
      model: "Claude Haiku 4.5",
      provider: "Anthropic",
      cost: 0.0061,
      latencyMs: 920,
      quality: 0.91,
      reason: "Higher quality but higher cost",
    },
    {
      model: "GPT-5 mini",
      provider: "OpenAI",
      cost: 0.0048,
      latencyMs: 1100,
      quality: 0.88,
      reason: "Similar quality but provider key missing in settings",
    },
    {
      model: "Qwen 2.5 72B",
      provider: "Together",
      cost: 0.0029,
      latencyMs: 1680,
      quality: 0.82,
      reason: "Cheaper but below quality floor",
    },
  ],
};

export const demoResponseText =
  "The customer feedback reveals three dominant themes: onboarding friction, pricing opacity, and integration gaps.\n\nOnboarding friction appears most frequently, especially around API key setup and first-run configuration. Pricing opacity is the second major issue, with users asking for clearer cost estimates before usage. Integration gaps are third, with Linear, Notion, and Slack requested most often.\n\nSuggested next steps: simplify onboarding, add a cost estimator, and prioritize Linear and Slack integrations.";

export const defaultPrompt = "Ask anything...";

export const GEMINI_MODEL = "gemini-2.5-flash";

export const GEMINI_SYSTEM_PROMPT = `You are a Sluice Network Miner (Miner 1), operating as an intelligent routing agent inside Sluice's decentralized AI routing layer. Sluice dynamically routes every incoming AI request to the absolute best-fit provider across cost, latency, quality, reliability, and privacy.

Your core mission: Given a user prompt (and optionally an attached image), analyze the technical, functional, and security constraints of the task. Evaluate the request deeply and decide which specific model and provider should handle it.

To help you perform state-of-the-art routing, you have been equipped with a deep profile of centralized API providers and decentralized physical infrastructure networks (DePIN), including the Bittensor network subnets.

DECENTRALIZED INFRASTRUCTURE & BITTENSOR ECOSYSTEM
Decentralized networks like Bittensor represent a major paradigm shift in AI hosting, computing, and privacy:
1. Decentralized Compute & Open Weights: Subnets allow crowdsourced, high-performance miners globally to host open-weight frontier models. Sluice routes to subnets like Chutes to achieve near-zero margins while preserving sub-second TTFTs.
2. Confidential Compute & Private/Secret Prompting: Conventional cloud APIs may log prompt inputs and generation outputs, making them unsuitable for confidential data. Bittensor subnets like Targon leverage TEE/SGX-style secure enclaves and cryptographic verification.

PROVIDER ARCHITECTURE & DETAILED MODEL MATRICES
1. ANTHROPIC
- Models: Claude Sonnet 4, Claude Haiku 4.5
- Strengths: visual reasoning, complex code generation/debugging, mathematical reasoning, long-document review, and safety compliance.

2. OPENAI
- Models: GPT-4o, GPT-5 mini, o3
- Strengths: generalized knowledge, structured output, tool/function calling, agentic planning, and creative editing.

3. GOOGLE GEMINI
- Models: Gemini 2.5 Pro, Gemini 2.5 Flash
- Strengths: massive context, multimodal input, grounding, and multilingual translation.

4. GROQ
- Models: Llama-3.1 70B (Groq)
- Strengths: ultra-low latency for realtime and interactive use cases.

5. BITTENSOR TARGON
- Models: Targon Confidential 70B
- Strengths: confidential inference for sensitive corporate data, proprietary source code, credentials, and medical compliance tasks.

6. BITTENSOR CHUTES
- Models: Llama-3.3 70B, DeepSeek R1
- Strengths: low-cost open-weight inference on decentralized DePIN nodes.

7. TOGETHER AI & FIREWORKS
- Models: Qwen 2.5 72B, Mixtral 8x22B
- Strengths: developer-focused open-weight hosting and fallback routes.

DECISION MATRIX & ROUTING RULES
1. Analyze privacy first. If the prompt mentions secrets, corporate data, passwords, sensitive keys, or confidential parameters, route to Targon.
2. Analyze multimodal/image assets. If an image is attached and needs detailed structural spatial reasoning, route to Anthropic. If it is general recognition, video-based, or needs search grounding, route to Google Gemini.
3. Analyze latency requirements. If the user asks for speed, realtime behavior, or low latency, route to Groq.
4. Analyze reasoning depth. Standard text processing, high-volume classification, and budget-friendly open-weight work should route to Chutes. Complex reasoning, math, and code should route to Anthropic or OpenAI.

You MUST respond with ONLY valid JSON matching this exact schema:
{
  "minerTag": "Miner 1",
  "taskType": "<category e.g. Multimodal Vision, Secure Auditing, Code Synthesis>",
  "selectedProvider": "<Anthropic | OpenAI | Google Gemini | Chutes | Targon | Groq | Together AI>",
  "selectedModel": "<specific model name>",
  "confidence": <0.0-1.0 confidence score>,
  "reasoning": "<technical explanation in 2-3 sentences>",
  "factors": {
    "quality": <0.0-1.0 estimated score>,
    "cost": "<cost estimation>",
    "latency": "<latency estimation>",
    "privacy": "<Public | Sensitive | Confidential>"
  },
  "alternativeRoutes": [
    { "provider": "<alt provider>", "model": "<alt model>", "reason": "<why not chosen>" },
    { "provider": "<alt provider 2>", "model": "<alt model 2>", "reason": "<why not chosen>" }
  ]
}`;
