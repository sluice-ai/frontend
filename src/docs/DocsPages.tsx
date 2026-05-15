import { Link, useLocation } from "react-router-dom";
import { docsSidebar } from "./docsData";

/**
 * Docs index page — shown at /docs and /docs/introduction.
 * Displays a card grid of all documentation sections, similar to the
 * Lens docs overview page with animated icon cards.
 */
export function DocsIndex() {
  return (
    <div className="docs-index">
      <div className="docs-index__hero">
        <h1 className="docs-index__title">Sluice Documentation</h1>
        <p className="docs-index__subtitle">
          Everything you need to understand, build on, and operate within
          the Sluice decentralized AI routing network.
        </p>
      </div>

      <div className="docs-index__sections">
        {docsSidebar.map((section) => (
          <div key={section.title} className="docs-section-group">
            <h2 className="docs-section-group__title">{section.title}</h2>
            <div className="docs-section-group__grid">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="docs-card"
                  >
                    <div className="docs-card__icon-wrap">
                      <Icon size={22} className="docs-card__icon" />
                    </div>
                    <div className="docs-card__body">
                      <h3 className="docs-card__title">{item.label}</h3>
                      {item.description && (
                        <p className="docs-card__desc">{item.description}</p>
                      )}
                    </div>
                    <div className="docs-card__arrow">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Generic placeholder page for any docs route that doesn't have
 * content yet. Shows the page title, section breadcrumb, and a
 * "coming soon" state with the icon.
 */
export function DocsPlaceholder() {
  const location = useLocation();

  // Find the current item in the sidebar data
  let currentItem = null;
  let currentSection = null;
  for (const section of docsSidebar) {
    const found = section.items.find((item) => item.href === location.pathname);
    if (found) {
      currentItem = found;
      currentSection = section;
      break;
    }
  }

  if (!currentItem) {
    return (
      <div className="docs-placeholder">
        <h1 className="docs-placeholder__title">Page Not Found</h1>
        <p className="docs-placeholder__text">
          This documentation page doesn't exist yet.
        </p>
        <Link to="/docs" className="docs-placeholder__link">
          Return to docs overview
        </Link>
      </div>
    );
  }

  const Icon = currentItem.icon;

  return (
    <div className="docs-placeholder">
      {currentSection && (
        <div className="docs-placeholder__breadcrumb">
          <Link to="/docs">Docs</Link>
          <span className="docs-placeholder__breadcrumb-sep">/</span>
          <span>{currentSection.title}</span>
          <span className="docs-placeholder__breadcrumb-sep">/</span>
          <span className="docs-placeholder__breadcrumb-current">
            {currentItem.label}
          </span>
        </div>
      )}

      <div className="docs-placeholder__hero">
        <div className="docs-placeholder__icon-wrap">
          <Icon size={36} className="docs-placeholder__icon" />
        </div>
        <h1 className="docs-placeholder__title">{currentItem.label}</h1>
        {currentItem.description && (
          <p className="docs-placeholder__subtitle">{currentItem.description}</p>
        )}
      </div>

      <div className="docs-placeholder__content-box">
        <div className="docs-placeholder__wip-badge">Coming Soon</div>
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
    </div>
  );
}
