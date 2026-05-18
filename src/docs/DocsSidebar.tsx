import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { docsSidebar } from "./docsData";
import type { DocNavSection } from "./docsData";

export function DocsSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const section of docsSidebar) {
      if (section.items.some((item) => item.href === location.pathname)) {
        initial.add(section.title);
      }
    }
    if (initial.size === 0) initial.add(docsSidebar[0].title);
    return initial;
  });

  useEffect(() => {
    for (const section of docsSidebar) {
      if (section.items.some((item) => item.href === location.pathname)) {
        setOpenSections((prev) => new Set(prev).add(section.title));
      }
    }
  }, [location.pathname]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="docs-sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`docs-sidebar ${isOpen ? "docs-sidebar--open" : ""}`}
        role="navigation"
        aria-label="Documentation navigation"
      >
        <div className="docs-sidebar__inner">
          <nav className="docs-sidebar__nav">
            {docsSidebar.map((section) => (
              <SidebarSection
                key={section.title}
                section={section}
                isOpen={openSections.has(section.title)}
                currentPath={location.pathname}
                onToggle={() => toggleSection(section.title)}
                onNavigate={onClose}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

function SidebarSection({
  section,
  isOpen,
  currentPath,
  onToggle,
  onNavigate,
}: {
  section: DocNavSection;
  isOpen: boolean;
  currentPath: string;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [animHeight, setAnimHeight] = useState<string>(isOpen ? "auto" : "0px");

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    if (isOpen) {
      // Measure then animate open
      const h = el.scrollHeight;
      setAnimHeight(`${h}px`);
      const timer = setTimeout(() => setAnimHeight("auto"), 260);
      return () => clearTimeout(timer);
    } else {
      // Snap to measured height, then collapse to 0
      const h = el.scrollHeight;
      setAnimHeight(`${h}px`);
      // Force a reflow before setting to 0
      void el.offsetHeight;
      requestAnimationFrame(() => setAnimHeight("0px"));
    }
  }, [isOpen]);

  return (
    <div className="docs-sidebar__section">
      <button
        type="button"
        className={`docs-sidebar__section-header ${isOpen ? "docs-sidebar__section-header--open" : ""}`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{section.title}</span>
        <ChevronRight
          size={14}
          className={`docs-sidebar__chevron ${isOpen ? "docs-sidebar__chevron--open" : ""}`}
        />
      </button>

      <div
        ref={listRef}
        className="docs-sidebar__items-wrap"
        style={{
          height: animHeight,
          overflow: "hidden",
          transition: "height 240ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <ul className="docs-sidebar__items">
          {section.items.map((item) => {
            const isActive = currentPath === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`docs-sidebar__link ${isActive ? "docs-sidebar__link--active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={onNavigate}
                >
                  <span className="docs-sidebar__link-icon">
                    <Icon size={15} strokeWidth={1.8} />
                  </span>
                  <span className="docs-sidebar__link-label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
