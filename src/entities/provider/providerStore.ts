import { useCallback, useEffect, useState } from "react";

import { providers as initialProviders } from "@/entities/provider/provider.data";
import type { Provider, ProviderId } from "@/entities/provider/provider.types";
import { defaultRoutingPreferences } from "@/entities/routing/routing.data";
import type { RoutingPreferences } from "@/entities/routing/routing.types";

const PROVIDERS_KEY = "sluice.mvp.providers";
const PREFS_KEY = "sluice.mvp.prefs";
const STORAGE_EVENT = "sluice-mvp-store-change";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Local storage can fail in private contexts; keep UI usable. */
  }
}

function emitStoreChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

function useStoreSubscription() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handler = () => setTick((tick) => tick + 1);
    window.addEventListener(STORAGE_EVENT, handler);
    window.addEventListener("storage", handler);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
}

export function useProviders() {
  useStoreSubscription();
  const providers = readJson<Provider[]>(PROVIDERS_KEY, initialProviders);

  const update = useCallback((id: ProviderId, patch: Partial<Provider>) => {
    const current = readJson<Provider[]>(PROVIDERS_KEY, initialProviders);
    const next = current.map((provider) =>
      provider.id === id ? { ...provider, ...patch } : provider,
    );
    writeJson(PROVIDERS_KEY, next);
    emitStoreChange();
  }, []);

  const addKey = useCallback(
    (id: ProviderId, key: string) => {
      const trimmed = key.trim();
      if (!trimmed) return;

      const masked =
        trimmed.length <= 4
          ? `****${trimmed}`
          : `${trimmed.slice(0, 3)}******${trimmed.slice(-4)}`;

      update(id, { status: "connected", enabled: true, maskedKey: masked });
    },
    [update],
  );

  const removeKey = useCallback(
    (id: ProviderId) => {
      update(id, { status: "missing_key", enabled: false, maskedKey: undefined });
    },
    [update],
  );

  const toggleEnabled = useCallback(
    (id: ProviderId) => {
      const current = readJson<Provider[]>(PROVIDERS_KEY, initialProviders);
      const target = current.find((provider) => provider.id === id);
      if (!target) return;
      if (target.status !== "connected" && !target.enabled) return;

      update(id, { enabled: !target.enabled });
    },
    [update],
  );

  return { providers, update, addKey, removeKey, toggleEnabled };
}

export function useRoutingPreferences() {
  useStoreSubscription();
  const rawPrefs = readJson<RoutingPreferences>(
    PREFS_KEY,
    defaultRoutingPreferences,
  );
  const prefs: RoutingPreferences = {
    ...defaultRoutingPreferences,
    ...rawPrefs,
    disallowedProviders: rawPrefs.disallowedProviders || [],
  };

  const setPrefs = useCallback((patch: Partial<RoutingPreferences>) => {
    const current = readJson<RoutingPreferences>(
      PREFS_KEY,
      defaultRoutingPreferences,
    );
    const next = { ...current, ...patch };
    writeJson(PREFS_KEY, next);
    emitStoreChange();
  }, []);

  return { prefs, setPrefs };
}
