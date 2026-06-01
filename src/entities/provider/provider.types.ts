import type { PrivacyTier } from "@/entities/routing/routing.types";

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
