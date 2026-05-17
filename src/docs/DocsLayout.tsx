import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { DocsSidebar } from "./DocsSidebar";
import { docsSidebar } from "./docsData";

export function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Find current, previous, and next page for bottom navigation
  const allPages = docsSidebar.flatMap((s) => s.items);
  const currentIndex = allPages.findIndex(
    (p) => p.href === location.pathname
  );
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="docs-layout">
      {/* Top bar for docs */}
      <header className="docs-topbar">
        <div className="docs-topbar__progress" />
        <div className="docs-topbar__inner">
          <div className="docs-topbar__left">
            <button
              type="button"
              className="docs-topbar__menu-btn"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link to="/" className="docs-topbar__brand">
              <img
                src="/logo.svg"
                alt=""
                aria-hidden="true"
                className="docs-topbar__brand-mark"
              />
              <span className="docs-topbar__brand-text">Sluice</span>
            </Link>
          </div>
          <div className="docs-topbar__right">
            <span className="docs-topbar__version">v0.1.0</span>
          </div>
        </div>
      </header>

      <div className="docs-body">
        <DocsSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="docs-main">
          <div className="docs-content">
            <Outlet />

            {/* Bottom nav */}
            {(prevPage || nextPage) && (
              <div className="docs-bottom-nav">
                {prevPage ? (
                  <Link to={prevPage.href} className="docs-bottom-nav__link docs-bottom-nav__link--prev">
                    <span className="docs-bottom-nav__direction">Previous</span>
                    <span className="docs-bottom-nav__label">{prevPage.label}</span>
                  </Link>
                ) : (
                  <div />
                )}
                {nextPage ? (
                  <Link to={nextPage.href} className="docs-bottom-nav__link docs-bottom-nav__link--next">
                    <span className="docs-bottom-nav__direction">Next</span>
                    <span className="docs-bottom-nav__label">{nextPage.label}</span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
