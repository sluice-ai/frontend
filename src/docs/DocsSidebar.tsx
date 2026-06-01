import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { cn } from "../lib/cn";
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
          className="fixed inset-x-0 bottom-0 top-16 z-[29] bg-sluice-deepNavy/28 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed bottom-0 left-0 top-16 z-30 w-[min(84vw,320px)] overflow-hidden border-r border-sluice-navy/12 bg-sluice-paper/97 transition-transform duration-[280ms] ease-sluice lg:sticky lg:bottom-auto lg:z-[1] lg:h-[calc(100vh-64px)] lg:w-[264px] lg:translate-x-0 lg:border-r-0 lg:bg-transparent",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
        role="navigation"
        aria-label="Documentation navigation"
      >
        <div className="h-full overflow-y-auto py-4 pb-8 [scrollbar-color:rgba(29,52,135,0.12)_transparent] [scrollbar-width:thin] lg:py-8 lg:pb-20">
          <nav className="flex flex-col gap-0.5">
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
    <div className="px-2.5">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-lg border-0 bg-transparent px-3 py-2.5 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.05em] text-sluice-navy transition-colors hover:text-sluice-navy"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{section.title}</span>
        <ChevronRight
          size={14}
          className={cn(
            "shrink-0 opacity-40 transition-transform duration-200 ease-sluice",
            isOpen && "rotate-90",
          )}
        />
      </button>

      <div
        ref={listRef}
        className="will-change-[height]"
        style={{
          height: animHeight,
          overflow: "hidden",
          transition: "height 240ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <ul className="m-0 list-none px-0 pb-1.5 pt-0.5">
          {section.items.map((item) => {
            const isActive = currentPath === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 font-sans text-[13.5px] font-[450] tracking-[-0.005em] text-sluice-muted no-underline transition-colors hover:text-sluice-navy",
                    isActive && "bg-sluice-navy/8 font-[520] text-sluice-navy",
                  )}
                  aria-current={isActive ? "page" : undefined}
                  onClick={onNavigate}
                >
                  <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md text-inherit [&_svg]:overflow-visible [&_svg>*]:[transform-box:fill-box] [&_svg>*]:[transform-origin:center]">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
