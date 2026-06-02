import Trash2 from "lucide-react/dist/esm/icons/trash-2";

import type { Provider } from "@/entities/provider/provider.types";
import { useProviders } from "@/entities/provider/providerStore";

type ProviderRowProps = {
  provider: Provider;
};

export function ProviderRow({ provider }: ProviderRowProps) {
  const { removeKey, toggleEnabled } = useProviders();
  const isConnected = provider.status === "connected";
  const letter = provider.name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-3 rounded-card border border-sluice-navy/15 bg-white/55 px-3.5 py-3 sm:px-4 dark:bg-white/[0.04]">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sluice-navy/10 font-sans text-sm font-semibold text-sluice-navy">
        {letter}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="font-sans text-sm font-semibold leading-tight text-sluice-navy">
            {provider.name}
          </p>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            {provider.type} / max {provider.privacyMax}
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
            ? "border-sluice-navy/30 bg-sluice-navy dark:border-sluice-routeBlue dark:bg-sluice-routeBlue"
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
