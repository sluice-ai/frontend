import LockKeyhole from "lucide-react/dist/esm/icons/lock-keyhole";
import X from "lucide-react/dist/esm/icons/x";
import { useEffect } from "react";

import type { Provider, ProviderId } from "@/entities/provider/provider.types";
import {
  useProviders,
  useRoutingPreferences,
} from "@/entities/provider/providerStore";
import {
  privacyTierOptions,
  routingModeOptions,
} from "@/entities/routing/routing.data";
import type {
  PrivacyTier,
  RoutingMode,
} from "@/entities/routing/routing.types";
import { CustomSelect } from "@/shared/ui/CustomSelect";
import { SegmentedSelect } from "@/shared/ui/SegmentedSelect";

type RoutingDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function RoutingDrawer({ open, onClose }: RoutingDrawerProps) {
  const { prefs, setPrefs } = useRoutingPreferences();
  const { providers } = useProviders();

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

    root.classList.add("overflow-hidden");
    body.classList.add("overflow-hidden");

    return () => {
      root.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={[
          "fixed inset-y-0 left-0 z-[55] w-screen bg-sluice-deepNavy/35 backdrop-blur-[3px] transition-opacity duration-300 ease-sluice",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />
      <aside
        aria-hidden={!open}
        aria-label="Routing controls"
        className={[
          "fixed inset-x-0 bottom-0 z-[60] flex max-h-[calc(100dvh-12rem)] min-h-0 flex-col rounded-t-[24px] border-t border-sluice-navy/15 bg-white shadow-[0_-12px_48px_-15px_rgba(29,52,135,0.25)] transition-transform duration-300 ease-sluice md:mx-auto md:max-h-[90vh] md:max-w-6xl md:border-x",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <header className="relative flex shrink-0 items-center justify-between border-b border-sluice-navy/10 px-6 py-5 md:px-8">
          <h2 className="font-sans text-xl font-medium leading-tight text-sluice-navy">
            Routing Control
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-sluice-navy/10 text-sluice-navy transition-colors hover:bg-sluice-navy/5"
            aria-label="Close routing controls"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] md:px-8">
          <div className="grid gap-8 md:grid-cols-3 md:gap-0">
            <div className="space-y-6 md:pr-8">
              <ControlSection title="Active Routing Preset">
                <CustomSelect<RoutingMode>
                  value={prefs.mode}
                  onChange={(mode) => setPrefs({ mode })}
                  options={routingModeOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                />
              </ControlSection>

              <ControlSection title="Disallow Specific Providers">
                <DisallowedProviderSelect
                  allProviders={providers}
                  disallowedProviders={prefs.disallowedProviders}
                  onDisallow={(id) => {
                    setPrefs({
                      disallowedProviders: [...prefs.disallowedProviders, id],
                    });
                  }}
                />
              </ControlSection>

              {prefs.disallowedProviders.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {prefs.disallowedProviders.map((id) => {
                    const provider = providers.find((item) => item.id === id);
                    if (!provider) return null;

                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1.5 rounded-pill border border-rose-200 bg-rose-50/70 px-3 py-1.5 font-sans text-xs font-semibold text-rose-700"
                      >
                        {provider.privacyMax === "confidential" && (
                          <LockKeyhole size={11} strokeWidth={2} />
                        )}
                        {provider.name}
                        <button
                          type="button"
                          onClick={() => {
                            setPrefs({
                              disallowedProviders:
                                prefs.disallowedProviders.filter(
                                  (providerId) => providerId !== id,
                                ),
                            });
                          }}
                          className="transition-colors hover:text-rose-950 focus:outline-none"
                          aria-label={`Allow ${provider.name}`}
                        >
                          <X size={12} strokeWidth={2.5} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="relative space-y-6 md:px-8">
              <ColumnDivider />
              <ControlSection title="Max cost / request">
                <SegmentedSelect<number>
                  value={prefs.maxCostPerRequest}
                  onChange={(value) => setPrefs({ maxCostPerRequest: value })}
                  options={[
                    { value: 0.01, label: "$0.01" },
                    { value: 0.05, label: "$0.05" },
                    { value: 0.1, label: "$0.10" },
                  ]}
                />
              </ControlSection>

              <ControlSection title="Quality floor">
                <div className="mt-1 flex items-center gap-3">
                  <input
                    type="range"
                    min={0.5}
                    max={0.99}
                    step={0.01}
                    value={prefs.qualityFloor}
                    onChange={(event) =>
                      setPrefs({ qualityFloor: Number(event.target.value) })
                    }
                    className="flex-1 cursor-pointer accent-sluice-navy"
                  />
                  <span className="w-12 text-right font-mono text-sm font-semibold text-sluice-navy">
                    {prefs.qualityFloor.toFixed(2)}
                  </span>
                </div>
              </ControlSection>
            </div>

            <div className="relative space-y-6 md:pl-8">
              <ColumnDivider />
              <ControlSection title="Max latency">
                <SegmentedSelect<number>
                  value={prefs.maxLatencyMs}
                  onChange={(value) => setPrefs({ maxLatencyMs: value })}
                  options={[
                    { value: 1000, label: "1s" },
                    { value: 2000, label: "2s" },
                    { value: 5000, label: "5s" },
                  ]}
                />
              </ControlSection>

              <ControlSection title="Privacy tier">
                <SegmentedSelect<PrivacyTier>
                  value={prefs.privacyTier}
                  onChange={(privacyTier) => setPrefs({ privacyTier })}
                  options={privacyTierOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                />
              </ControlSection>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function ControlSection({
  title,
  children,
  hint,
}: {
  title: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
        {title}
      </p>
      <div className="mt-1.5">{children}</div>
      {hint && (
        <p className="mt-1 font-sans text-[11px] leading-5 text-sluice-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

function ColumnDivider() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute left-0 top-1/2 hidden h-[78%] w-px -translate-y-1/2 md:block"
    >
      <span className="absolute inset-0 bg-gradient-to-b from-transparent via-sluice-navy/25 to-transparent" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-sluice-paper ring-1 ring-sluice-navy/25" />
    </span>
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
  const options = allProviders
    .filter((provider) => !disallowedProviders.includes(provider.id))
    .map((provider) => {
      const usable = provider.enabled && provider.status === "connected";
      return {
        value: provider.id,
        label: provider.name,
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
