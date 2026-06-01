import { Routes, Route, Navigate } from "react-router-dom";

import { DashboardPage } from "@/features/dashboard/DashboardPage";
import { DocsLayout } from "@/features/docs/DocsLayout";
import { DocsIndex, DocsPlaceholder } from "@/features/docs/DocsPages";
import { FaqPage } from "@/features/docs/FaqPage";
import { SluiceCorePage } from "@/features/docs/SluiceCorePage";
import { SubnetDocsPage } from "@/features/docs/SubnetDocsPage";
import { VisionPage } from "@/features/docs/VisionPage";
import LandingPage from "@/features/marketing/LandingPage";
import { RoutingWorkbenchPage } from "@/features/routing-workbench/RoutingWorkbenchPage";
import { SettingsPage } from "@/features/settings/SettingsPage";

export default function AppRouter() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Dashboard preview */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* App workflow preview */}
      <Route path="/app" element={<RoutingWorkbenchPage />} />
      <Route path="/app/settings" element={<SettingsPage />} />

      {/* Docs section */}
      <Route path="/docs" element={<DocsLayout />}>
        {/* /docs redirects to /docs/introduction */}
        <Route index element={<Navigate to="/docs/introduction" replace />} />

        {/* Introduction */}
        <Route path="introduction" element={<DocsIndex />} />
        <Route path="vision" element={<VisionPage />} />
        <Route path="quick-start" element={<DocsPlaceholder />} />

        {/* Core Concepts */}
        <Route path="core/sluice" element={<SluiceCorePage />} />
        <Route path="core/scoring" element={<DocsPlaceholder />} />

        {/* Guides */}
        <Route path="guides/run-miner" element={<DocsPlaceholder />} />
        <Route path="guides/run-validator" element={<DocsPlaceholder />} />

        {/* API Reference */}
        <Route path="api/route" element={<DocsPlaceholder />} />
        <Route path="api/sdk" element={<DocsPlaceholder />} />

        {/* Resources */}
        <Route path="resources/changelog" element={<DocsPlaceholder />} />
        <Route path="resources/faq" element={<FaqPage />} />

        {/* Catch-all */}
        <Route path="*" element={<DocsPlaceholder />} />
      </Route>

      {/* Standalone Subnet Route */}
      <Route path="/subnet" element={<SubnetDocsPage />} />
    </Routes>
  );
}
