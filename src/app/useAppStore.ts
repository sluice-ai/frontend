import { useCallback, useEffect, useState } from "react";

import {
  defaultRoutingPreferences,
  providers as initialProviders,
  type Provider,
  type ProviderId,
  type RoutingPreferences,
} from "./appData";

const PROVIDERS_KEY = "sluice.mvp.providers";
const PREFS_KEY = "sluice.mvp.prefs";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

const STORAGE_EVENT = "sluice-mvp-store-change";

function emit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function useSubscribed() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener(STORAGE_EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(STORAGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
}

export function useProviders() {
  useSubscribed();
  const list = readJson<Provider[]>(PROVIDERS_KEY, initialProviders);

  const update = useCallback((id: ProviderId, patch: Partial<Provider>) => {
    const current = readJson<Provider[]>(PROVIDERS_KEY, initialProviders);
    const next = current.map((p) => (p.id === id ? { ...p, ...patch } : p));
    writeJson(PROVIDERS_KEY, next);
    emit();
  }, []);

  const addKey = useCallback((id: ProviderId, key: string) => {
    const trimmed = key.trim();
    if (!trimmed) return;
    const masked =
      trimmed.length <= 4
        ? `••••${trimmed}`
        : `${trimmed.slice(0, 3)}••••••${trimmed.slice(-4)}`;
    update(id, { status: "connected", enabled: true, maskedKey: masked });
  }, [update]);

  const removeKey = useCallback((id: ProviderId) => {
    update(id, { status: "missing_key", enabled: false, maskedKey: undefined });
  }, [update]);

  const toggleEnabled = useCallback((id: ProviderId) => {
    const current = readJson<Provider[]>(PROVIDERS_KEY, initialProviders);
    const target = current.find((p) => p.id === id);
    if (!target) return;
    if (target.status !== "connected" && !target.enabled) return;
    update(id, { enabled: !target.enabled });
  }, [update]);

  return { providers: list, update, addKey, removeKey, toggleEnabled };
}

export function useRoutingPreferences() {
  useSubscribed();
  const rawPrefs = readJson<RoutingPreferences>(PREFS_KEY, defaultRoutingPreferences);
  const prefs = {
    ...defaultRoutingPreferences,
    ...rawPrefs,
    disallowedProviders: rawPrefs.disallowedProviders || [],
  };

  const setPrefs = useCallback((patch: Partial<RoutingPreferences>) => {
    const current = readJson<RoutingPreferences>(PREFS_KEY, defaultRoutingPreferences);
    const next = { ...current, ...patch };
    writeJson(PREFS_KEY, next);
    emit();
  }, []);

  return { prefs, setPrefs };
}

/* ── Gemini API key config ──────────────────────────────────────── */

const GEMINI_KEY = "sluice.mvp.geminiApiKey";

export function useGeminiConfig() {
  useSubscribed();
  const apiKey = readJson<string>(GEMINI_KEY, "");

  const setApiKey = useCallback((key: string) => {
    writeJson(GEMINI_KEY, key.trim());
    emit();
  }, []);

  const removeApiKey = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(GEMINI_KEY);
    }
    emit();
  }, []);

  return {
    apiKey,
    isConfigured: apiKey.length > 0,
    setApiKey,
    removeApiKey,
  };
}

