import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Plug from "lucide-react/dist/esm/icons/plug";
import Plus from "lucide-react/dist/esm/icons/plus";
import { useEffect, useMemo, useRef, useState } from "react";

import type { ProviderId } from "@/entities/provider/provider.types";
import { useProviders } from "@/entities/provider/providerStore";
import { ProviderRow } from "@/features/settings/components/ProviderRow";

export function ProvidersSection() {
  const { providers, addKey } = useProviders();
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selected, setSelected] = useState<ProviderId | "">("");
  const [keyDraft, setKeyDraft] = useState("");
  const pickerRef = useRef<HTMLDivElement>(null);

  const connected = useMemo(
    () => providers.filter((provider) => provider.status === "connected"),
    [providers],
  );
  const unconnected = useMemo(
    () => providers.filter((provider) => provider.status !== "connected"),
    [providers],
  );

  useEffect(() => {
    if (!pickerOpen) return;

    const onClick = (event: MouseEvent) => {
      if (!pickerRef.current?.contains(event.target as Node)) {
        setPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [pickerOpen]);

  const selectedProvider = providers.find((provider) => provider.id === selected);
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
        <div className="relative min-w-[180px] flex-1" ref={pickerRef}>
          <button
            type="button"
            onClick={() => setPickerOpen((value) => !value)}
            className="flex h-10 w-full items-center justify-between gap-2 rounded-pill border border-sluice-navy/15 bg-white px-3.5 font-sans text-sm font-semibold text-sluice-navy outline-none transition-colors hover:bg-sluice-navy/5 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-white/[0.04]"
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
            <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-10 max-h-64 overflow-y-auto rounded-card border border-sluice-navy/15 bg-white p-1.5 shadow-[0_16px_34px_-12px_rgba(29,52,135,0.25)] dark:border-white/10 dark:bg-sluice-paperMuted dark:shadow-[0_16px_34px_-12px_rgba(0,0,0,0.6)]">
              {unconnected.length === 0 ? (
                <p className="px-3 py-2 text-center font-sans text-xs text-sluice-muted">
                  All providers connected.
                </p>
              ) : (
                unconnected.map((provider) => (
                  <button
                    key={provider.id}
                    type="button"
                    onClick={() => {
                      setSelected(provider.id);
                      setPickerOpen(false);
                    }}
                    className={[
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-sans text-xs font-semibold transition-colors",
                      provider.id === selected
                        ? "bg-sluice-navy/5 text-sluice-navy"
                        : "text-sluice-navy hover:bg-sluice-navy/5",
                    ].join(" ")}
                  >
                    <span>{provider.name}</span>
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
                      {provider.type}
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
          onChange={(event) => setKeyDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleAdd();
          }}
          placeholder="Paste API key"
          className="h-10 min-w-[200px] flex-[1.2] rounded-pill border border-sluice-navy/15 bg-white px-3.5 font-mono text-sm leading-none text-sluice-ink outline-none placeholder:font-sans placeholder:text-sm placeholder:text-sluice-muted/80 focus:border-sluice-routeBlue focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 dark:bg-white/[0.04]"
        />

        <button
          type="button"
          onClick={handleAdd}
          disabled={!canAdd}
          className={[
            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-pill px-4 font-sans text-sm font-semibold transition-colors",
            canAdd
              ? "bg-sluice-navy text-sluice-paper hover:bg-sluice-deepNavy dark:bg-sluice-routeBlue dark:text-sluice-deepNavy dark:hover:bg-sluice-softBlue"
              : "cursor-not-allowed bg-sluice-navy/15 text-sluice-navy/50",
          ].join(" ")}
        >
          <Plus size={14} strokeWidth={2.2} />
          Add key
        </button>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
          Connected / {connected.length}
        </p>
        <p className="font-sans text-[11px] leading-5 text-sluice-muted">
          toggle to pause routing
        </p>
      </div>

      <div className="mt-3 space-y-2.5">
        {connected.length === 0 ? (
          <div className="rounded-card border border-dashed border-sluice-navy/20 bg-white/30 px-4 py-8 text-center font-sans text-sm text-sluice-muted dark:bg-white/[0.02]">
            No providers connected yet.
          </div>
        ) : (
          connected.map((provider) => (
            <ProviderRow key={provider.id} provider={provider} />
          ))
        )}
      </div>
    </div>
  );
}
