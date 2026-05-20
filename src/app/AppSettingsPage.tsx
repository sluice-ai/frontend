import {
  Bell,
  ChevronDown,
  CreditCard,
  Gauge,
  Plug,
  Plus,
  Route,
  Trash2,
  User,
  Webhook,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { appNavItems } from "../data/siteContent";
import { type Provider, type ProviderId } from "./appData";
import { useProviders } from "./useAppStore";

type SectionId =
  | "providers"
  | "routing"
  | "limits"
  | "webhooks"
  | "notifications"
  | "billing"
  | "account";

type SectionDef = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
};

const SECTIONS: SectionDef[] = [
  { id: "providers", label: "Providers", icon: Plug },
  { id: "routing", label: "Routing", icon: Route },
  { id: "limits", label: "Limits", icon: Gauge },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "account", label: "Account", icon: User },
];

function ProviderRow({ provider }: { provider: Provider }) {
  const { removeKey, toggleEnabled } = useProviders();
  const isConnected = provider.status === "connected";
  const letter = provider.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-card border border-sluice-navy/15 bg-white/55 px-3.5 py-3 sm:px-4">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sluice-navy/10 font-sans text-sm font-semibold text-sluice-navy">
        {letter}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="font-sans text-sm font-semibold leading-tight text-sluice-navy">
            {provider.name}
          </p>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            {provider.type} · max {provider.privacyMax}
          </p>
        </div>
        <p className="mt-1 truncate font-mono text-[12px] text-sluice-muted">
          {provider.maskedKey ?? "No key on file"}
        </p>
      </div>

      <button
        type="button"
        onClick={() => toggleEnabled(provider.id)}
        disabled={!isConnected}
        aria-pressed={provider.enabled}
        aria-label={
          provider.enabled ? `Pause ${provider.name}` : `Resume ${provider.name}`
        }
        className={[
          "relative inline-flex h-5 w-9 shrink-0 items-center rounded-pill border transition-colors",
          provider.enabled
            ? "border-sluice-navy/30 bg-sluice-navy"
            : "border-sluice-navy/15 bg-sluice-paperMuted",
          !isConnected ? "cursor-not-allowed opacity-50" : "",
        ].join(" ")}
        title={provider.enabled ? "Pause routing" : "Resume routing"}
      >
        <span
          className={[
            "inline-block h-4 w-4 rounded-full bg-white transition-transform",
            provider.enabled ? "translate-x-[18px]" : "translate-x-0.5",
          ].join(" ")}
        />
      </button>

      <button
        type="button"
        onClick={() => removeKey(provider.id)}
        aria-label={`Remove ${provider.name} key`}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-sluice-navy/15 text-sluice-navy/70 transition-colors hover:bg-sluice-navy/5 hover:text-sluice-navy"
      >
        <Trash2 size={14} strokeWidth={1.8} />
      </button>
    </div>
  );
}

function ProvidersSection() {
  const { providers: list, addKey } = useProviders();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selected, setSelected] = useState<ProviderId | "">("");
  const [keyDraft, setKeyDraft] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);

  const connected = useMemo(
    () => list.filter((p) => p.status === "connected"),
    [list],
  );
  const unconnected = useMemo(
    () => list.filter((p) => p.status !== "connected"),
    [list],
  );

  useEffect(() => {
    if (!pickerOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!pickerRef.current?.contains(e.target as Node)) setPickerOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [pickerOpen]);

  const selectedProvider = list.find((p) => p.id === selected);
  const canAdd = Boolean(selected) && keyDraft.trim().length > 0;

  const handleAdd = () => {
    if (!canAdd || !selected) return;
    addKey(selected, keyDraft);
    setSelected("");
    setKeyDraft("");
  };

  return (
    <div>
      <h2 className="font-sans text-lg font-semibold leading-tight text-sluice-navy">
        Providers
      </h2>
      <p className="mt-1.5 font-sans text-sm leading-6 text-sluice-muted">
        Connect a provider key. Each route goes live the moment its key is saved
        and toggled on.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[180px]" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setPickerOpen((v) => !v)}
            className="flex h-10 w-full items-center justify-between gap-2 rounded-pill border border-sluice-navy/15 bg-white px-3.5 font-sans text-sm font-semibold text-sluice-navy outline-none transition-colors hover:bg-sluice-navy/5 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
          >
            <span className="inline-flex items-center gap-2 truncate">
              <Plug size={14} strokeWidth={1.8} className="text-sluice-navy/70" />
              <span className="truncate">
                {selectedProvider ? selectedProvider.name : "Select provider"}
              </span>
            </span>
            <ChevronDown
              size={14}
              className={`text-sluice-navy/60 transition-transform ${pickerOpen ? "rotate-180" : ""}`}
            />
          </button>
          {pickerOpen && (
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 max-h-64 overflow-y-auto rounded-card border border-sluice-navy/15 bg-white p-1.5 shadow-[0_16px_34px_-12px_rgba(29,52,135,0.25)]">
              {unconnected.length === 0 ? (
                <p className="px-3 py-2 text-center font-sans text-xs text-sluice-muted">
                  All providers connected.
                </p>
              ) : (
                unconnected.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelected(p.id);
                      setPickerOpen(false);
                    }}
                    className={[
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-sans text-xs font-semibold transition-colors",
                      p.id === selected
                        ? "bg-sluice-navy/5 text-sluice-navy"
                        : "text-sluice-navy hover:bg-sluice-navy/5",
                    ].join(" ")}
                  >
                    <span>{p.name}</span>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
                      {p.type}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <input
          type="password"
          value={keyDraft}
          onChange={(e) => setKeyDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder="Paste API key"
          className="h-10 flex-[1.2] min-w-[200px] rounded-pill border border-sluice-navy/15 bg-white px-3.5 font-mono text-sm leading-none text-sluice-ink placeholder:font-sans placeholder:text-sm placeholder:text-sluice-muted/80 outline-none focus:border-sluice-routeBlue focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0"
        />

        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className={[
            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-pill px-4 font-sans text-sm font-semibold transition-colors",
            canAdd
              ? "bg-sluice-navy text-sluice-paper hover:bg-sluice-deepNavy"
              : "bg-sluice-navy/15 text-sluice-navy/50 cursor-not-allowed",
          ].join(" ")}
        >
          <Plus size={14} strokeWidth={2.2} />
          Add key
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          Connected · {connected.length}
        </p>
        <p className="font-sans text-[11px] leading-5 text-sluice-muted">
          toggle to pause routing
        </p>
      </div>

      <div className="mt-3 space-y-2.5">
        {connected.length === 0 ? (
          <div className="rounded-card border border-dashed border-sluice-navy/20 bg-white/30 px-4 py-8 text-center font-sans text-sm text-sluice-muted">
            No providers connected yet.
          </div>
        ) : (
          connected.map((p) => <ProviderRow key={p.id} provider={p} />)
        )}
      </div>
    </div>
  );
}

function EmptySection({ label }: { label: string }) {
  return (
    <div>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
        {label}
      </p>
      <p className="mt-2 font-sans text-sm text-sluice-muted">—</p>
    </div>
  );
}

export function SettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { providers: list } = useProviders();
  const [active, setActive] = useState<SectionId>("providers");

  const connectedCount = useMemo(
    () => list.filter((p) => p.status === "connected").length,
    [list],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const body = document.body;

    root.classList.add("sluice-modal-open");
    body.classList.add("sluice-modal-open");

    return () => {
      root.classList.remove("sluice-modal-open");
      body.classList.remove("sluice-modal-open");
    };
  }, [open]);

  if (!open) return null;

  const activeSection = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];

  return (
    <div className="fixed inset-0 z-[70]">
      <div
        aria-hidden
        onClick={onClose}
        className="absolute inset-0 bg-sluice-deepNavy/35"
      />
      <div className="relative z-[1] flex min-h-full items-center justify-center p-3 pt-[calc(1rem+env(safe-area-inset-top))] sm:p-6">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-modal-title"
          className="flex h-[calc(100dvh-2rem)] max-h-[760px] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-sluice-navy/15 bg-white sm:h-[calc(100dvh-6rem)] sm:min-h-[620px]"
        >
          <header className="relative flex shrink-0 items-center justify-between border-b border-sluice-navy/10 px-5 py-4 md:px-6">
            <h2
              id="settings-modal-title"
              className="font-sans text-xl font-medium leading-tight text-sluice-navy"
            >
              Settings
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close settings"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sluice-navy/10 text-sluice-navy transition-colors hover:bg-sluice-navy/5"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </header>

          <div className="flex min-h-0 flex-1 flex-col md:flex-row">
            <nav
              aria-label="Settings sections"
              className="shrink-0 border-b border-sluice-navy/10 bg-sluice-paper/60 md:w-[200px] md:border-b-0 md:border-r md:border-sluice-navy/10"
            >
              <ul className="flex gap-1 overflow-x-auto p-2 md:flex-col md:gap-0.5 md:overflow-visible md:p-3">
                {SECTIONS.map((s) => {
                  const isActive = s.id === active;
                  const showBadge = s.id === "providers" && connectedCount > 0;
                  return (
                    <li key={s.id} className="shrink-0 md:shrink">
                      <button
                        type="button"
                        onClick={() => setActive(s.id)}
                        aria-current={isActive ? "page" : undefined}
                        className={[
                          "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 font-sans text-sm font-medium transition-colors",
                          isActive
                            ? "bg-sluice-navy/10 text-sluice-navy"
                            : "text-sluice-navy/75 hover:bg-sluice-navy/5 hover:text-sluice-navy",
                        ].join(" ")}
                      >
                        <span className="inline-flex items-center gap-2">
                          <s.icon
                            size={15}
                            strokeWidth={1.8}
                            className={
                              isActive ? "text-sluice-navy" : "text-sluice-navy/70"
                            }
                          />
                          {s.label}
                        </span>
                        {showBadge && (
                          <span
                            className={[
                              "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-pill px-1.5 font-sans text-[10px] font-semibold",
                              isActive
                                ? "bg-sluice-navy text-sluice-paper"
                                : "bg-sluice-navy/10 text-sluice-navy",
                            ].join(" ")}
                          >
                            {connectedCount}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6 md:px-7">
              {active === "providers" ? (
                <ProvidersSection />
              ) : (
                <EmptySection label={activeSection.label} />
              )}
            </div>
          </div>

          <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-sluice-navy/10 bg-sluice-paper/60 px-5 py-2.5 md:px-6">
            <p className="font-mono text-[11px] text-sluice-muted">v2.6.0</p>
            {active === "providers" && (
              <p className="font-sans text-[11px] text-sluice-muted">
                <span className="font-semibold text-sluice-navy">
                  {connectedCount}
                </span>{" "}
                of {list.length} connected
              </p>
            )}
          </footer>
        </section>
      </div>
    </div>
  );
}

export function AppSettingsPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={appNavItems} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(74,119,220,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,52,135,0.1),transparent_30%)]" />
      <SettingsModal open onClose={() => navigate("/app")} />
    </main>
  );
}
