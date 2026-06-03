import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { cn } from "@/shared/lib/cn";
import { MobileNavGlyph } from "@/shared/layout/Navbar";
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

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, [isOpen, onClose]);

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
      {/* Full-screen overlay — sits below panel (z-49) but above everything else */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[49] cursor-default bg-sluice-deepNavy/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 ease-sluice lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none",
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed right-0 top-0 z-[51] w-[min(84vw,320px)] overflow-hidden bg-sluice-paper/88 shadow-[0_28px_80px_-54px_rgba(29,52,135,0.45)] backdrop-blur-xl transition-[height,border-radius,opacity] duration-[600ms] ease-sluice motion-reduce:transition-none dark:bg-sluice-paper/95 dark:shadow-[0_28px_80px_-54px_rgba(0,0,0,0.65)]",
          isOpen
            ? "h-[100dvh] rounded-bl-3xl opacity-100"
            : "pointer-events-none h-0 rounded-bl-none opacity-0",
          "lg:pointer-events-auto lg:sticky lg:bottom-auto lg:top-16 lg:z-[1] lg:h-[calc(100vh-64px)] lg:w-[264px] lg:rounded-bl-none lg:opacity-100 lg:shadow-none lg:dark:shadow-none lg:[backdrop-filter:none] lg:bg-transparent lg:dark:bg-transparent",
        )}
        role="navigation"
        aria-label="Documentation navigation"
      >
        {/* Close button — replaces the navbar toggle button that's now behind the panel */}
        <button
          type="button"
          className="absolute right-6 top-[10px] z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-sluice-navy/8 text-sluice-routeBlue shadow-[0_10px_28px_-18px_rgba(29,52,135,0.85)] outline-none transition-[background-color,color,transform] duration-300 ease-sluice hover:bg-sluice-navy/12 focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sluice-routeBlue/35 active:scale-[0.96] dark:bg-white/[0.08] dark:text-sluice-softBlue dark:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.9)] dark:hover:bg-white/[0.12] lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
          tabIndex={isOpen ? undefined : -1}
        >
          <MobileNavGlyph isOpen={true} />
        </button>

        <div className="h-full overflow-hidden pb-8 pt-20 lg:overflow-y-auto lg:py-8 lg:pb-20 lg:pt-8 lg:[scrollbar-color:rgba(29,52,135,0.12)_transparent] lg:[scrollbar-width:thin]">
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
