import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { docsSidebar } from "./docsData";

const overviewLinkLabels = new Set([
  "Sluice",
  "Scoring Engine",
]);

const overviewLinks = docsSidebar
  .flatMap((section) => section.items)
  .filter((item) => overviewLinkLabels.has(item.label));

/**
 * Docs index page shown at /docs/introduction.
 */
export function DocsIndex() {
  return (
    <article className="docs-index docs-article">
      <div className="docs-index__hero">
        <h1 className="docs-index__title">Sluice Documentation</h1>
        <p className="docs-index__subtitle">
          Everything you need to understand, build on, and operate within
          the Sluice decentralized AI routing network.
        </p>
      </div>

      <div className="docs-article__rule" />

      <div className="docs-article__body">
        <p>
          Sluice is a decentralized routing layer for AI work. It selects the
          best-fit provider for each request across cost, latency, quality,
          reliability, and privacy requirements.
        </p>
        <p>
          The network turns provider fragmentation into a market for routing
          policies: miners propose routes, validators benchmark outcomes, and
          applications send work through the path that clears the task policy.
        </p>
        <p>
          Start with the core concepts below, then move into guides and API
          reference as the testnet docs come online.
        </p>
      </div>

      <div className="docs-index__quick-links" aria-label="Start here">
        {overviewLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link key={item.href} to={item.href} className="docs-card">
              <span className="docs-card__icon-wrap">
                <Icon size={19} strokeWidth={1.8} className="docs-card__icon" />
              </span>
              <span className="docs-card__body">
                <span className="docs-card__title">{item.label}</span>
                <span className="docs-card__desc">{item.description}</span>
              </span>
              <span className="docs-card__arrow" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </article>
  );
}

/**
 * Generic placeholder page for any docs route that doesn't have
 * content yet. Shows the page title and a drafting state.
 */
export function DocsPlaceholder() {
  const location = useLocation();

  // Find the current item in the sidebar data
  let currentItem = null;
  for (const section of docsSidebar) {
    const found = section.items.find((item) => item.href === location.pathname);
    if (found) {
      currentItem = found;
      break;
    }
  }

  if (!currentItem) {
    return (
      <article className="docs-placeholder docs-article">
        <h1 className="docs-placeholder__title">Page Not Found</h1>
        <p className="docs-placeholder__text">
          This documentation page doesn't exist yet.
        </p>
        <Link to="/docs" className="docs-placeholder__link">
          Return to docs overview
        </Link>
      </article>
    );
  }

  return (
    <article className="docs-placeholder docs-article">
      <div className="docs-placeholder__hero">
        <h1 className="docs-placeholder__title">{currentItem.label}</h1>
      </div>

      <div className="docs-article__rule" />

      <div className="docs-placeholder__content-box">
        <div className="docs-placeholder__wip-badge">Drafting</div>
        <p className="docs-placeholder__text">
          This section is currently being written. Check back soon for
          comprehensive documentation on <strong>{currentItem.label}</strong>.
        </p>
        <div className="docs-placeholder__skeleton">
          <div className="docs-placeholder__skeleton-line docs-placeholder__skeleton-line--full" />
          <div className="docs-placeholder__skeleton-line docs-placeholder__skeleton-line--80" />
          <div className="docs-placeholder__skeleton-line docs-placeholder__skeleton-line--60" />
          <div className="docs-placeholder__skeleton-line docs-placeholder__skeleton-line--90" />
          <div className="docs-placeholder__skeleton-line docs-placeholder__skeleton-line--40" />
        </div>
      </div>
    </article>
  );
}
