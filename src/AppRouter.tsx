import { Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import { AppWorkflowPage } from "./app/AppWorkflowPage";
import { DashboardPage } from "./dashboard/DashboardPage";
import { DocsLayout } from "./docs/DocsLayout";
import { DocsIndex, DocsPlaceholder } from "./docs/DocsPages";

export default function AppRouter() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<App />} />

      {/* Dashboard preview */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* App workflow preview */}
      <Route path="/app" element={<AppWorkflowPage />} />

      {/* Docs section */}
      <Route path="/docs" element={<DocsLayout />}>
        {/* /docs redirects to /docs/introduction */}
        <Route index element={<Navigate to="/docs/introduction" replace />} />

        {/* Introduction */}
        <Route path="introduction" element={<DocsIndex />} />
        <Route path="vision" element={<DocsPlaceholder />} />
        <Route path="quick-start" element={<DocsPlaceholder />} />

        {/* Core Concepts */}
        <Route path="core/sluice" element={<DocsPlaceholder />} />
        <Route path="core/scoring" element={<DocsPlaceholder />} />

        {/* Guides */}
        <Route path="guides/run-miner" element={<DocsPlaceholder />} />
        <Route path="guides/run-validator" element={<DocsPlaceholder />} />

        {/* API Reference */}
        <Route path="api/route" element={<DocsPlaceholder />} />
        <Route path="api/sdk" element={<DocsPlaceholder />} />

        {/* Resources */}
        <Route path="resources/changelog" element={<DocsPlaceholder />} />
        <Route path="resources/faq" element={<DocsPlaceholder />} />

        {/* Catch-all */}
        <Route path="*" element={<DocsPlaceholder />} />
      </Route>
    </Routes>
  );
}
