import type {
  RunFailure as RouteEngineFailure,
  RunResult as RouteEngineResult,
} from "@/entities/routing/routeEngine";
import type { GeminiError } from "@/features/routing-workbench/services/geminiRoutingService";

export type RunState = "idle" | "routing" | "complete";

export type RunFailure =
  | RouteEngineFailure
  | { kind: "gemini_error"; error: GeminiError };

export type RunResult = RouteEngineResult;

export type ImageAttachment = {
  file: File;
  base64: string;
  mimeType: string;
  previewUrl: string;
};
