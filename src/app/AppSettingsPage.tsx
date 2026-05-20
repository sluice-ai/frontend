import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Gauge,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { appNavItems } from "../data/siteContent";
import { CustomSelect } from "../components/CustomSelect";
import {
  privacyTierOptions,
  routingModeOptions,
  type PrivacyTier,
  type Provider,
  type ProviderId,
  type RoutingMode,
} from "./appData";
import { useProviders, useRoutingPreferences } from "./useAppStore";

type StatusLabel = { text: string; tone: "ok" | "warn" | "err" };

function SettingsSectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sluice-navy/10 text-sluice-navy">
        <Icon size={18} strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          {eyebrow}
        </p>
        <h2 className="mt-1 font-sans text-xl font-semibold leading-tight tracking-normal text-sluice-navy">
          {title}
        </h2>
        <p className="mt-1 font-sans text-sm leading-6 text-sluice-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

function SettingsMetric({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-card border border-sluice-navy/15 bg-white/45 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          {label}
        </p>
        <Icon size={15} className="text-sluice-navy/55" strokeWidth={1.8} />
      </div>
      <p className="mt-2 font-sans text-2xl font-semibold leading-none tracking-normal text-sluice-navy">
        {value}
      </p>
    </div>
  );
}

function statusFor(p: Provider): StatusLabel {
  switch (p.status) {
    case "connected":
      return { text: "Connected", tone: "ok" };
    case "missing_key":
      return { text: "Missing key", tone: "warn" };
    case "invalid_key":
      return { text: "Invalid key", tone: "err" };
  }
}

function StatusPill({ status }: { status: StatusLabel }) {
  const toneClass =
    status.tone === "ok"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
      : status.tone === "warn"
        ? "bg-amber-50 text-amber-700 ring-amber-200"
        : "bg-rose-50 text-rose-700 ring-rose-200";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-sans text-[11px] font-semibold ring-1 ${toneClass}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status.tone === "ok"
            ? "bg-emerald-500"
            : status.tone === "warn"
              ? "bg-amber-500"
              : "bg-rose-500"
        }`}
      />
      {status.text}
    </span>
  );
}

function ProviderRow({ provider }: { provider: Provider }) {
  const { addKey, removeKey, toggleEnabled, update } = useProviders();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const status = statusFor(provider);

  const submit = () => {
    if (!draft.trim()) return;
    addKey(provider.id, draft);
    setDraft("");
    setEditing(false);
  };

  return (
    <div className="rounded-card border border-sluice-navy/15 bg-white/45 p-4 shadow-[0_12px_30px_-24px_rgba(29,52,135,0.35)] sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sluice-navy/10 text-sluice-navy">
              <KeyRound size={16} strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <p className="font-sans text-[15px] font-semibold leading-tight text-sluice-navy">
                {provider.name}
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[0.06em] text-sluice-navy/55">
                {provider.type} · max {provider.privacyMax}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill status={status} />
          <button
            type="button"
            onClick={() => toggleEnabled(provider.id)}
            disabled={provider.status !== "connected"}
            aria-pressed={provider.enabled}
            aria-label={provider.enabled ? `Disable ${provider.name}` : `Enable ${provider.name}`}
            className={[
              "relative inline-flex h-6 w-11 items-center rounded-pill border transition-colors",
              provider.enabled
                ? "border-sluice-navy/30 bg-sluice-navy"
                : "border-sluice-navy/15 bg-sluice-paperMuted",
              provider.status !== "connected" ? "cursor-not-allowed opacity-50" : "",
            ].join(" ")}
            title={provider.enabled ? "Disable provider" : "Enable provider"}
          >
            <span
              className={[
                "inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
                provider.enabled ? "translate-x-5" : "translate-x-0.5",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="font-mono text-[12px] text-sluice-muted">
          {provider.maskedKey ?? "No key on file"}
        </div>
        <div className="flex flex-wrap gap-2">
          {!editing ? (
            <>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-1.5 rounded-pill border border-sluice-navy/20 px-3 py-1.5 font-sans text-xs font-semibold text-sluice-navy hover:bg-sluice-navy/5"
              >
                <KeyRound size={12} strokeWidth={2} />
                {provider.maskedKey ? "Replace key" : "Add key"}
              </button>
              {provider.maskedKey && (
                <>
                  <button
                    type="button"
                    onClick={() => update(provider.id, { status: "connected" })}
                    className="inline-flex items-center gap-1.5 rounded-pill border border-sluice-navy/20 px-3 py-1.5 font-sans text-xs font-semibold text-sluice-navy hover:bg-sluice-navy/5"
                  >
                    <CheckCircle2 size={12} strokeWidth={2} />
                    Test connection
                  </button>
                  <button
                    type="button"
                    onClick={() => removeKey(provider.id)}
                    className="inline-flex items-center gap-1 rounded-pill border border-rose-200 px-3 py-1.5 font-sans text-xs font-semibold text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 size={12} strokeWidth={2} /> Remove
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
              <input
                type="password"
                autoFocus
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submit();
                  if (e.key === "Escape") {
                    setEditing(false);
                    setDraft("");
                  }
                }}
                placeholder={`${provider.name} API key`}
                className="w-full min-w-[220px] rounded-pill border border-sluice-navy/20 bg-white px-3 py-1.5 font-mono text-xs text-sluice-ink outline-none focus:border-sluice-routeBlue sm:w-auto"
              />
              <button
                type="button"
                onClick={submit}
                className="rounded-pill bg-sluice-navy px-3 py-1.5 font-sans text-xs font-semibold text-sluice-paper hover:bg-sluice-deepNavy"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setDraft("");
                }}
                className="rounded-pill border border-sluice-navy/20 px-3 py-1.5 font-sans text-xs font-semibold text-sluice-navy hover:bg-sluice-navy/5"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DisallowedProviderSelect({
  allProviders,
  disallowedProviders,
  onDisallow,
}: {
  allProviders: Provider[];
  disallowedProviders: ProviderId[];
  onDisallow: (id: ProviderId) => void;
}) {
  const candidates = allProviders.filter((p) => !disallowedProviders.includes(p.id));
  const options = candidates.map((p) => {
    const usable = p.enabled && p.status === "connected";
    return {
      value: p.id,
      label: p.name,
      rightLabel: !usable ? "key missing or disabled" : undefined,
    };
  });

  return (
    <CustomSelect<ProviderId>
      value=""
      onChange={onDisallow}
      options={options}
      placeholder="+ Add provider to disallow..."
    />
  );
}

function PrefsCard() {
  const { prefs, setPrefs } = useRoutingPreferences();
  const { providers: allProviders } = useProviders();

  return (
    <section className="rounded-card border border-sluice-navy/15 bg-white/45 p-5 shadow-[0_12px_30px_-24px_rgba(29,52,135,0.35)]">
      <SettingsSectionHeader
        icon={SlidersHorizontal}
        eyebrow="Routing defaults"
        title="Policy settings"
        description="Prefill playground routing controls for new requests."
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Default mode
          </span>
          <CustomSelect<RoutingMode>
            className="mt-1.5"
            value={prefs.mode}
            onChange={(mode) => setPrefs({ mode })}
            options={routingModeOptions.map((o) => ({
              value: o.value,
              label: o.label,
            }))}
          />
        </label>

        <label className="block">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Privacy tier
          </span>
          <CustomSelect<PrivacyTier>
            className="mt-1.5"
            value={prefs.privacyTier}
            onChange={(privacyTier) => setPrefs({ privacyTier })}
            options={privacyTierOptions.map((o) => ({
              value: o.value,
              label: o.label,
            }))}
          />
        </label>

        <label className="block">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Max cost per request ($)
          </span>
          <input
            type="number"
            step="0.005"
            min={0}
            value={prefs.maxCostPerRequest}
            onChange={(e) => setPrefs({ maxCostPerRequest: Number(e.target.value) || 0 })}
            className="mt-1.5 w-full rounded-pill border border-sluice-navy/20 bg-white px-3 py-2 font-mono text-sm text-sluice-ink outline-none focus:border-sluice-routeBlue"
          />
        </label>

        <label className="block">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Max latency (ms)
          </span>
          <input
            type="number"
            step="100"
            min={0}
            value={prefs.maxLatencyMs}
            onChange={(e) => setPrefs({ maxLatencyMs: Number(e.target.value) || 0 })}
            className="mt-1.5 w-full rounded-pill border border-sluice-navy/20 bg-white px-3 py-2 font-mono text-sm text-sluice-ink outline-none focus:border-sluice-routeBlue"
          />
        </label>

        <label className="block sm:col-span-2">
          <span className="flex items-center justify-between font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            <span>Quality floor</span>
            <span className="font-mono text-sluice-navy">{prefs.qualityFloor.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min={0.5}
            max={0.99}
            step={0.01}
            value={prefs.qualityFloor}
            onChange={(e) => setPrefs({ qualityFloor: Number(e.target.value) })}
            className="mt-2 w-full accent-sluice-navy"
          />
        </label>
      </div>

      <div className="mt-6">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          Default disallowed providers
        </p>
        <div className="mt-2">
          <DisallowedProviderSelect
            allProviders={allProviders}
            disallowedProviders={prefs.disallowedProviders}
            onDisallow={(id) => {
              setPrefs({ disallowedProviders: [...prefs.disallowedProviders, id] });
            }}
          />
        </div>

        {prefs.disallowedProviders.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {prefs.disallowedProviders.map((id) => {
              const p = allProviders.find((prov) => prov.id === id);
              if (!p) return null;
              return (
                <span
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-pill border border-rose-200 bg-rose-50 px-3 py-1.5 font-sans text-xs font-semibold text-rose-700"
                >
                  {p.name}
                  <button
                    type="button"
                    onClick={() => {
                      const next = prefs.disallowedProviders.filter((x) => x !== id);
                      setPrefs({ disallowedProviders: next });
                    }}
                    className="hover:text-rose-900 transition-colors focus:outline-none"
                    aria-label={`Allow ${p.name}`}
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function EnvironmentCard() {
  return (
    <section className="rounded-card border border-sluice-navy/15 bg-white/45 p-5 shadow-[0_12px_30px_-24px_rgba(29,52,135,0.35)]">
      <SettingsSectionHeader
        icon={Gauge}
        eyebrow="Runtime"
        title="Environment"
        description="Current app runtime and key-storage state."
      />
      <dl className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Environment
          </dt>
          <dd className="mt-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-sluice-navy/10 px-2.5 py-1 font-sans text-[11px] font-semibold text-sluice-navy">
              <span className="h-1.5 w-1.5 rounded-full bg-sluice-routeBlue" />
              Mainnet test
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Routing backend
          </dt>
          <dd className="mt-1.5 inline-flex items-center gap-1.5 font-sans text-[13px] text-sluice-ink">
            <CheckCircle2 size={14} className="text-emerald-600" /> Mock router
          </dd>
        </div>
        <div>
          <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            Key storage
          </dt>
          <dd className="mt-1.5 inline-flex items-center gap-1.5 font-sans text-[13px] text-sluice-ink">
            <ShieldAlert size={14} className="text-amber-600" /> Local mock (browser)
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-start gap-2 rounded-card border border-amber-200 bg-amber-50/70 p-3 font-sans text-[13px] leading-6 text-amber-900">
        <ShieldAlert size={14} className="mt-0.5 shrink-0" />
        <p>
          Mainnet test mode: keys are stored locally in your browser for testing only.
          Do not enter production secrets until secure storage is enabled.
        </p>
      </div>
    </section>
  );
}

export function AppSettingsPage() {
  const { providers: list } = useProviders();
  const { prefs } = useRoutingPreferences();
  const connectedCount = list.filter((p) => p.status === "connected").length;
  const enabledCount = list.filter((p) => p.enabled && p.status === "connected").length;
  const privacyLabel =
    privacyTierOptions.find((o) => o.value === prefs.privacyTier)?.label ??
    prefs.privacyTier;

  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={appNavItems} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(74,119,220,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,52,135,0.1),transparent_30%)]" />

      <section className="container-shell pb-16 pt-24 md:pt-28">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/app"
            className="inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-pill border border-sluice-navy/15 bg-sluice-paper/70 px-3.5 font-sans text-sm font-semibold text-sluice-navy transition-colors hover:bg-sluice-navy/5"
          >
            <ArrowLeft size={16} strokeWidth={1.8} />
            <span>Back to app</span>
          </Link>
          <div className="inline-flex min-h-10 items-center gap-2 rounded-pill border border-sluice-navy/15 bg-sluice-paper/70 px-3.5 font-sans text-[12px] font-semibold text-sluice-navy">
            <ShieldCheck size={14} className="text-sluice-navy/60" strokeWidth={1.8} />
            {connectedCount} connected / {enabledCount} enabled
          </div>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-3xl">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
              Workspace settings
            </p>
            <h1 className="mt-2 font-display text-5xl font-normal leading-[1.02] tracking-normal text-sluice-navy sm:text-6xl">
              Provider keys &amp; routing defaults
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-sm leading-6 text-sluice-muted sm:text-[15px]">
              Connect provider keys, choose which providers Sluice may route through,
              and set the defaults used by the playground.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            <SettingsMetric
              icon={ShieldCheck}
              label="Connected"
              value={String(connectedCount)}
            />
            <SettingsMetric
              icon={CheckCircle2}
              label="Enabled"
              value={String(enabledCount)}
            />
            <SettingsMetric
              icon={Gauge}
              label="Privacy"
              value={privacyLabel}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <SettingsSectionHeader
              icon={KeyRound}
              eyebrow="Provider access"
              title="BYOK provider keys"
              description="Each provider routes only when its key is connected and the toggle is on."
            />
            <div className="mt-4 space-y-3">
              {list.map((p) => (
                <ProviderRow key={p.id} provider={p} />
              ))}
            </div>
          </section>

          <div className="space-y-6 lg:col-span-5">
            <PrefsCard />
            <EnvironmentCard />
          </div>
        </div>
      </section>
    </main>
  );
}
