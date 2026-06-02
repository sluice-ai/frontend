import { useCallback, useEffect, useState } from "react";


export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const THEME_KEY = "sluice.theme";
const THEME_EVENT = "sluice-theme-change";

const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: "#f2f3f5",
  dark: "#0a0d16",
};

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readPreference(): ThemePreference {
  if (typeof window === "undefined") return "system";
  try {
    const raw = window.localStorage.getItem(THEME_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    /* Local storage can fail in private contexts; fall back to system. */
  }
  return "system";
}

function writePreference(preference: ThemePreference) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_KEY, preference);
  } catch {
    /* Keep the UI usable even if persistence fails. */
  }
}

function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

function applyResolvedTheme(resolved: ResolvedTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.style.colorScheme = resolved;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", THEME_COLORS[resolved]);
}

function emitThemeChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readPreference);
  const [resolved, setResolved] = useState<ResolvedTheme>(() =>
    resolveTheme(readPreference()),
  );

  // Sync this hook instance with changes from other instances / other tabs.
  useEffect(() => {
    const sync = () => {
      const pref = readPreference();
      const next = resolveTheme(pref);
      setPreference(pref);
      setResolved(next);
      applyResolvedTheme(next);
    };

    sync();
    window.addEventListener(THEME_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(THEME_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // When following the system, react to OS-level light/dark changes live.
  useEffect(() => {
    if (preference !== "system" || typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const next = getSystemTheme();
      setResolved(next);
      applyResolvedTheme(next);
    };

    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [preference]);

  const setTheme = useCallback((next: ThemePreference) => {
    const nextResolved = resolveTheme(next);
    writePreference(next);
    setPreference(next);
    setResolved(nextResolved);
    applyResolvedTheme(nextResolved);
    emitThemeChange();
  }, []);

  const toggleTheme = useCallback(() => {
    // Flip relative to what is currently displayed; this also promotes a
    // "system" preference to an explicit choice the user can rely on.
    const current = resolveTheme(readPreference());
    setTheme(current === "dark" ? "light" : "dark");
  }, [setTheme]);

  return { theme: preference, resolvedTheme: resolved, setTheme, toggleTheme };
}
