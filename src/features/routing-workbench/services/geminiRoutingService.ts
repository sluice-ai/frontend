import { GEMINI_MODEL, GEMINI_SYSTEM_PROMPT } from "@/entities/routing/routing.data";
import type { MinerRouteDecision } from "@/entities/routing/routing.types";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export type GeminiError =
  | { kind: "no_key" }
  | { kind: "invalid_key" }
  | { kind: "rate_limited" }
  | { kind: "parse_error"; raw: string }
  | { kind: "network"; message: string }
  | { kind: "api_error"; message: string; status: number };

export type GeminiResult =
  | { ok: true; decision: MinerRouteDecision }
  | { ok: false; error: GeminiError };

export async function analyzeAndRoute(
  apiKey: string,
  prompt: string,
  imageBase64?: string,
  imageMimeType?: string,
): Promise<GeminiResult> {
  if (!apiKey.trim()) {
    return { ok: false, error: { kind: "no_key" } };
  }

  const parts: Array<Record<string, unknown>> = [{ text: prompt }];

  if (imageBase64 && imageMimeType) {
    parts.push({
      inline_data: {
        mime_type: imageMimeType,
        data: stripDataUriPrefix(imageBase64),
      },
    });
  }

  const url = `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: GEMINI_SYSTEM_PROMPT }],
        },
        contents: [
          {
            role: "user",
            parts,
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          maxOutputTokens: 1024,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) {
      return toGeminiHttpError(response);
    }

    const data = (await response.json()) as unknown;
    const rawText = extractGeminiText(data);

    if (!rawText.trim()) {
      return {
        ok: false,
        error: {
          kind: "parse_error",
          raw: JSON.stringify(data),
        },
      };
    }

    return parseMinerDecision(rawText);
  } catch (error) {
    return {
      ok: false,
      error: {
        kind: "network",
        message: error instanceof Error ? error.message : "Network request failed",
      },
    };
  }
}

export async function testConnection(
  apiKey: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!apiKey.trim()) {
    return { ok: false, error: "No API key provided" };
  }

  const url = `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: "Respond with the single word: connected" }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 16,
        },
      }),
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 403) {
        return { ok: false, error: "Invalid API key" };
      }
      if (response.status === 429) {
        return { ok: false, error: "Rate limited; try again in a moment" };
      }
      return { ok: false, error: `API error (${response.status})` };
    }

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

async function toGeminiHttpError(response: Response): Promise<GeminiResult> {
  if (response.status === 400 || response.status === 403) {
    return { ok: false, error: { kind: "invalid_key" } };
  }
  if (response.status === 429) {
    return { ok: false, error: { kind: "rate_limited" } };
  }

  const message = await response.text().catch(() => "Unknown error");
  return {
    ok: false,
    error: { kind: "api_error", message, status: response.status },
  };
}

function stripDataUriPrefix(value: string) {
  return value.includes(",") ? value.split(",")[1] : value;
}

function extractGeminiText(data: unknown) {
  const root = asRecord(data);
  const candidates = root ? root.candidates : undefined;
  if (!Array.isArray(candidates)) return "";

  const firstCandidate = asRecord(candidates[0]);
  const content = asRecord(firstCandidate?.content);
  const parts = content?.parts;
  if (!Array.isArray(parts)) return "";

  const firstPart = asRecord(parts[0]);
  return readString(firstPart, ["text"]) ?? "";
}

function parseMinerDecision(rawText: string): GeminiResult {
  const jsonText = extractJson(rawText);

  try {
    const parsed = JSON.parse(cleanJsonString(jsonText)) as unknown;
    const decision = normalizeMinerDecision(parsed);
    if (!decision) {
      return { ok: false, error: { kind: "parse_error", raw: jsonText } };
    }
    return { ok: true, decision };
  } catch {
    return { ok: false, error: { kind: "parse_error", raw: jsonText } };
  }
}

function normalizeMinerDecision(value: unknown): MinerRouteDecision | null {
  const record = asRecord(value);
  if (!record) return null;

  const selectedProvider = readString(record, [
    "selectedProvider",
    "provider",
    "selected_provider",
  ]);
  const selectedModel = readString(record, [
    "selectedModel",
    "model",
    "selected_model",
  ]);

  if (!selectedProvider || !selectedModel) return null;

  const factors = asRecord(record.factors) ?? {};
  const alternativeRoutes = readAlternativeRoutes(record);

  return {
    minerTag: "Miner 1",
    taskType: readString(record, ["taskType", "task_type"]) ?? "General",
    selectedProvider,
    selectedModel,
    confidence: readNumber(record, ["confidence"]) ?? 0.85,
    reasoning:
      readString(record, ["reasoning", "reason", "rationale"]) ??
      "Miner selected the route that best matched the request constraints.",
    factors: {
      quality: readNumber(factors, ["quality"]) ?? 0.85,
      cost: readString(factors, ["cost"]) ?? "",
      latency: readString(factors, ["latency"]) ?? "",
      privacy: readString(factors, ["privacy"]) ?? "Public",
    },
    alternativeRoutes,
  };
}

function readAlternativeRoutes(record: Record<string, unknown>) {
  const rawRoutes = Array.isArray(record.alternativeRoutes)
    ? record.alternativeRoutes
    : Array.isArray(record.alternatives)
      ? record.alternatives
      : [];

  return rawRoutes.flatMap((route) => {
    const routeRecord = asRecord(route);
    if (!routeRecord) return [];

    return [
      {
        provider:
          readString(routeRecord, ["provider", "selectedProvider"]) ?? "",
        model: readString(routeRecord, ["model", "selectedModel"]) ?? "",
        reason: readString(routeRecord, ["reason", "why"]) ?? "",
      },
    ];
  });
}

function extractJson(rawText: string) {
  const trimmed = rawText.trim();
  const startIndex = trimmed.indexOf("{");
  const endIndex = trimmed.lastIndexOf("}");

  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    return trimmed.substring(startIndex, endIndex + 1);
  }

  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  return fenceMatch ? fenceMatch[1].trim() : trimmed;
}

function cleanJsonString(value: string) {
  return value
    .trim()
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/,\s*([}\]])/g, "$1");
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;
}

function readString(
  record: Record<string, unknown> | null | undefined,
  keys: string[],
) {
  if (!record) return undefined;

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) return value;
  }

  return undefined;
}

function readNumber(
  record: Record<string, unknown> | null | undefined,
  keys: string[],
) {
  if (!record) return undefined;

  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string") {
      const parsed = Number.parseFloat(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }

  return undefined;
}
