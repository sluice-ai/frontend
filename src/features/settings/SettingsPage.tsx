import { useNavigate } from "react-router-dom";

import { SettingsModal } from "@/features/settings/SettingsModal";
import { appNavItems } from "@/shared/config/navigation";
import { Navbar } from "@/shared/layout/Navbar";

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={appNavItems} />
      <div className="app-glow pointer-events-none fixed inset-0 -z-10" />
      <SettingsModal open onClose={() => navigate("/app")} />
    </main>
  );
}
