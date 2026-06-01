import { useNavigate } from "react-router-dom";

import { SettingsModal } from "@/features/settings/SettingsModal";
import { appNavItems } from "@/shared/config/navigation";
import { Navbar } from "@/shared/layout/Navbar";

export function SettingsPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={appNavItems} showProgress={false} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(74,119,220,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,52,135,0.1),transparent_30%)]" />
      <SettingsModal open onClose={() => navigate("/app")} />
    </main>
  );
}
