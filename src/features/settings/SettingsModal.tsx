import Bell from "lucide-react/dist/esm/icons/bell";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import Gauge from "lucide-react/dist/esm/icons/gauge";
import Plug from "lucide-react/dist/esm/icons/plug";
import Route from "lucide-react/dist/esm/icons/route";
import User from "lucide-react/dist/esm/icons/user";
import Webhook from "lucide-react/dist/esm/icons/webhook";
import X from "lucide-react/dist/esm/icons/x";
import { useEffect, useMemo, useState } from "react";

import { useProviders } from "@/entities/provider/providerStore";
import { EmptySection } from "@/features/settings/components/EmptySection";
import { ProvidersSection } from "@/features/settings/components/ProvidersSection";
import { SettingsSectionNav } from "@/features/settings/components/SettingsSectionNav";
import type {
  SettingsSection,
  SettingsSectionId,
} from "@/features/settings/types";
import { APP_VERSION } from "@/shared/config/appMeta";

const SECTIONS: SettingsSection[] = [
  { id: "providers", label: "Providers", icon: Plug },
  { id: "routing", label: "Routing", icon: Route },
  { id: "limits", label: "Limits", icon: Gauge },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "account", label: "Account", icon: User },
];

type SettingsModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { providers } = useProviders();
  const [active, setActive] = useState<SettingsSectionId>("providers");

  const connectedCount = useMemo(
    () => providers.filter((provider) => provider.status === "connected").length,
    [providers],
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

    root.classList.add("overflow-hidden");
    body.classList.add("overflow-hidden");

    return () => {
      root.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) return null;

  const activeSection =
    SECTIONS.find((section) => section.id === active) ?? SECTIONS[0];

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
          className="flex h-[calc(100dvh-2rem)] max-h-[760px] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] border border-sluice-navy/15 bg-white sm:h-[calc(100dvh-6rem)] sm:min-h-[620px] dark:border-white/10 dark:bg-sluice-paperMuted"
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
            <SettingsSectionNav
              sections={SECTIONS}
              active={active}
              connectedCount={connectedCount}
              onChange={setActive}
            />

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6 md:px-7">
              {active === "providers" ? (
                <ProvidersSection />
              ) : (
                <EmptySection label={activeSection.label} />
              )}
            </div>
          </div>

          <footer className="flex shrink-0 items-center justify-between gap-3 border-t border-sluice-navy/10 bg-sluice-paper/60 px-5 py-2.5 md:px-6 dark:bg-white/[0.02]">
            <p className="font-mono text-[11px] text-sluice-muted">
              {APP_VERSION}
            </p>
            {active === "providers" && (
              <p className="font-sans text-[11px] text-sluice-muted">
                <span className="font-semibold text-sluice-navy">
                  {connectedCount}
                </span>{" "}
                of {providers.length} connected
              </p>
            )}
          </footer>
        </section>
      </div>
    </div>
  );
}
