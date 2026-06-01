import { useCallback, useState } from "react";

import type { Provider } from "@/entities/provider/provider.types";
import { demoReceipt, demoResponseText } from "@/entities/routing/routing.data";
import {
  getFallbackDecision,
  pickRoute,
} from "@/entities/routing/routeEngine";
import type { RoutingPreferences } from "@/entities/routing/routing.types";
import { analyzeAndRoute } from "@/features/routing-workbench/services/geminiRoutingService";
import type {
  ImageAttachment,
  RunFailure,
  RunResult,
  RunState,
} from "@/features/routing-workbench/types";

type UseRoutingRunOptions = {
  prefs: RoutingPreferences;
  providers: Provider[];
  imageAttachment: ImageAttachment | null;
  removeImage: () => void;
};

export function useRoutingRun({
  prefs,
  providers,
  imageAttachment,
  removeImage,
}: UseRoutingRunOptions) {
  const [prompt, setPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState("");
  const [runState, setRunState] = useState<RunState>("idle");
  const [result, setResult] = useState<RunResult | null>(null);
  const [failure, setFailure] = useState<RunFailure | null>(null);
  const [submittedImage, setSubmittedImage] = useState<string | undefined>();

  const handleSend = useCallback(async () => {
    const text = prompt.trim();
    if (!text || runState === "routing") return;

    const imageBase64 = imageAttachment?.base64;
    const imageMimeType = imageAttachment?.mimeType;

    setSubmittedPrompt(text);
    setSubmittedImage(imageBase64);
    setPrompt("");
    setResult(null);
    setFailure(null);
    setRunState("routing");
    removeImage();

    const geminiResult = await analyzeAndRoute(
      import.meta.env.VITE_GEMINI_API_KEY ?? "",
      text,
      imageBase64,
      imageMimeType,
    );

    const minerDecision = geminiResult.ok
      ? geminiResult.decision
      : geminiResult.error.kind === "parse_error"
        ? getFallbackDecision(text, Boolean(imageBase64))
        : undefined;

    if (!geminiResult.ok && !minerDecision) {
      setFailure({ kind: "gemini_error", error: geminiResult.error });
      setRunState("idle");
      return;
    }
    if (!minerDecision) return;

    const outcome = pickRoute(prefs.mode, prefs, providers);

    if (!outcome.ok) {
      setResult({
        responseText: demoResponseText,
        receipt: {
          ...demoReceipt,
          route: {
            model: minerDecision.selectedModel,
            provider: minerDecision.selectedProvider,
            providerType: "Miner-selected",
          },
          rationale: minerDecision.reasoning,
        },
        minerDecision,
      });
      setRunState("complete");
      return;
    }

    setResult({
      ...outcome.result,
      receipt: {
        ...outcome.result.receipt,
        route: {
          ...outcome.result.receipt.route,
          model: minerDecision.selectedModel,
          provider: minerDecision.selectedProvider,
        },
        rationale: minerDecision.reasoning,
      },
      minerDecision,
    });
    setRunState("complete");
  }, [imageAttachment, prefs, prompt, providers, removeImage, runState]);

  const handleReset = useCallback(() => {
    setRunState("idle");
    setResult(null);
    setFailure(null);
    setSubmittedPrompt("");
    setSubmittedImage(undefined);
    setPrompt("");
    removeImage();
  }, [removeImage]);

  return {
    prompt,
    setPrompt,
    submittedPrompt,
    submittedImage,
    runState,
    result,
    failure,
    handleSend,
    handleReset,
  };
}
