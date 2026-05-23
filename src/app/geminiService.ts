import { GEMINI_MODEL, GEMINI_SYSTEM_PROMPT, type MinerRouteDecision } from "./appData";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

function cleanJsonString(str: string): string {
  let cleaned = str.trim();

  // Remove single line comments: // ...
  cleaned = cleaned.replace(/\/\/.*/g, "");

  // Remove multi-line comments: /* ... */
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, "");

  // Remove trailing commas before } or ]
  cleaned = cleaned.replace(/,\s*([}\]])/g, "$1");

  return cleaned;
}

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

/**
 * Calls Gemini to analyze the user's prompt (+ optional image)
 * and return a structured Miner routing decision.
 */
export async function analyzeAndRoute(
  apiKey: string,
  prompt: string,
  imageBase64?: string,
  imageMimeType?: string,
): Promise<GeminiResult> {
  if (!apiKey.trim()) {
    return { ok: false, error: { kind: "no_key" } };
  }

  // Build parts array
  const parts: Array<Record<string, unknown>> = [{ text: prompt }];

  if (imageBase64 && imageMimeType) {
    // Strip data URI prefix if present
    const rawBase64 = imageBase64.includes(",")
      ? imageBase64.split(",")[1]
      : imageBase64;

    parts.push({
      inline_data: {
        mime_type: imageMimeType,
        data: rawBase64,
      },
    });
  }

  const url = `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body = {
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
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 403) {
        return { ok: false, error: { kind: "invalid_key" } };
      }
      if (response.status === 429) {
        return { ok: false, error: { kind: "rate_limited" } };
      }
      const errText = await response.text().catch(() => "Unknown error");
      return {
        ok: false,
        error: { kind: "api_error", message: errText, status: response.status },
      };
    }

    const data = await response.json();

    // Extract text from Gemini response
    const candidates = data?.candidates;
    if (!candidates || candidates.length === 0) {
      console.error("Gemini API response has no candidates:", data);
      return {
        ok: false,
        error: { kind: "parse_error", raw: JSON.stringify(data) },
      };
    }

    const rawText: string =
      candidates[0]?.content?.parts?.[0]?.text ?? "";

    if (!rawText.trim()) {
      console.error("Gemini API candidate content is empty. Full response:", data);
      return {
        ok: false,
        error: { kind: "parse_error", raw: "Empty response from model" },
      };
    }

    // Parse the JSON response — Gemini might wrap in markdown code fences or return plain json
    let jsonStr = rawText.trim();
    
    // Extract JSON block using braces to be extremely robust
    const startIdx = jsonStr.indexOf("{");
    const endIdx = jsonStr.lastIndexOf("}");
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      jsonStr = jsonStr.substring(startIdx, endIdx + 1);
    } else {
      // Fallback: Strip ```json ... ``` or ``` ... ```
      const fenceMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (fenceMatch) {
        jsonStr = fenceMatch[1].trim();
      }
    }

    try {
      const cleaned = cleanJsonString(jsonStr);
      const rawDecision = JSON.parse(cleaned) as any;

      // Extract properties using fuzzy mapping to make it bulletproof
      const selectedProvider = rawDecision.selectedProvider || rawDecision.provider || rawDecision.selected_provider || "";
      const selectedModel = rawDecision.selectedModel || rawDecision.model || rawDecision.selected_model || "";
      
      if (!selectedProvider || !selectedModel) {
        console.error("Gemini parsed JSON is missing selectedProvider/selectedModel. Raw JSON string:", jsonStr);
        return {
          ok: false,
          error: { kind: "parse_error", raw: jsonStr },
        };
      }

      const minerTag = rawDecision.minerTag || rawDecision.miner_tag || "Miner 1";
      const taskType = rawDecision.taskType || rawDecision.task_type || "General";
      const confidence = typeof rawDecision.confidence === "number" 
        ? rawDecision.confidence 
        : parseFloat(rawDecision.confidence) || 0.85;
      
      const reasoning = rawDecision.reasoning || rawDecision.reason || rawDecision.rationale || "";
      
      const rawFactors = rawDecision.factors || {};
      const quality = typeof rawFactors.quality === "number" 
        ? rawFactors.quality 
        : parseFloat(rawFactors.quality) || 0.85;
      const cost = rawFactors.cost || "";
      const latency = rawFactors.latency || "";
      const privacy = rawFactors.privacy || "Public";

      const rawAlts = Array.isArray(rawDecision.alternativeRoutes) 
        ? rawDecision.alternativeRoutes 
        : Array.isArray(rawDecision.alternatives) 
          ? rawDecision.alternatives 
          : [];
          
      const alternativeRoutes = rawAlts.map((alt: any) => ({
        provider: alt.provider || alt.selectedProvider || "",
        model: alt.model || alt.selectedModel || "",
        reason: alt.reason || alt.why || ""
      }));

      const decision: MinerRouteDecision = {
        minerTag: "Miner 1", // Hardcoded as required by user
        taskType,
        selectedProvider,
        selectedModel,
        confidence,
        reasoning,
        factors: {
          quality,
          cost,
          latency,
          privacy,
        },
        alternativeRoutes,
      };

      return { ok: true, decision };
    } catch (parseErr) {
      console.error("Gemini failed to parse JSON. Raw response content:", rawText, "Cleaned JSON string tried:", cleanJsonString(jsonStr), "Parse error details:", parseErr);
      return {
        ok: false,
        error: { kind: "parse_error", raw: jsonStr },
      };
    }
  } catch (err) {
    console.error("Gemini analyzeAndRoute network or runtime error:", err);
    return {
      ok: false,
      error: {
        kind: "network",
        message: err instanceof Error ? err.message : "Network request failed",
      },
    };
  }
}

/**
 * Quick connectivity test — sends a minimal prompt and checks for a valid response.
 */
export async function testConnection(
  apiKey: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!apiKey.trim()) {
    return { ok: false, error: "No API key provided" };
  }

  const url = `${GEMINI_API_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: "Respond with the single word: connected" }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 16,
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      if (res.status === 400 || res.status === 403) {
        return { ok: false, error: "Invalid API key" };
      }
      if (res.status === 429) {
        return { ok: false, error: "Rate limited — try again in a moment" };
      }
      return { ok: false, error: `API error (${res.status})` };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
