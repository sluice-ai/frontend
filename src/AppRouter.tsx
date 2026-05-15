import { Routes, Route, Navigate } from "react-router-dom";

import App from "./App";
import { DocsLayout } from "./docs/DocsLayout";
import { DocsIndex, DocsPlaceholder } from "./docs/DocsPages";

export default function AppRouter() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<App />} />

      {/* Docs section */}
      <Route path="/docs" element={<DocsLayout />}>
        {/* /docs redirects to /docs/introduction */}
        <Route index element={<Navigate to="/docs/introduction" replace />} />

        {/* Introduction */}
        <Route path="introduction" element={<DocsIndex />} />
        <Route path="vision" element={<DocsPlaceholder />} />
        <Route path="quick-start" element={<DocsPlaceholder />} />

        {/* Core Concepts */}
        <Route path="core/routing-layer" element={<DocsPlaceholder />} />
        <Route path="core/policy-engine" element={<DocsPlaceholder />} />
        <Route path="core/scoring" element={<DocsPlaceholder />} />
        <Route path="core/supply-network" element={<DocsPlaceholder />} />

        {/* Architecture */}
        <Route path="architecture/overview" element={<DocsPlaceholder />} />
        <Route path="architecture/miners" element={<DocsPlaceholder />} />
        <Route path="architecture/validators" element={<DocsPlaceholder />} />
        <Route path="architecture/request-lifecycle" element={<DocsPlaceholder />} />

        {/* Guides */}
        <Route path="guides/run-miner" element={<DocsPlaceholder />} />
        <Route path="guides/run-validator" element={<DocsPlaceholder />} />
        <Route path="guides/integrate" element={<DocsPlaceholder />} />
        <Route path="guides/private-workloads" element={<DocsPlaceholder />} />

        {/* API Reference */}
        <Route path="api/route" element={<DocsPlaceholder />} />
        <Route path="api/benchmark" element={<DocsPlaceholder />} />
        <Route path="api/providers" element={<DocsPlaceholder />} />
        <Route path="api/sdk" element={<DocsPlaceholder />} />

        {/* Network */}
        <Route path="network/bittensor" element={<DocsPlaceholder />} />
        <Route path="network/testnet" element={<DocsPlaceholder />} />
        <Route path="network/staking" element={<DocsPlaceholder />} />

        {/* Resources */}
        <Route path="resources/changelog" element={<DocsPlaceholder />} />
        <Route path="resources/faq" element={<DocsPlaceholder />} />
        <Route path="resources/community" element={<DocsPlaceholder />} />

        {/* Catch-all */}
        <Route path="*" element={<DocsPlaceholder />} />
      </Route>
    </Routes>
  );
}
