import type { CSSProperties, ReactNode } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { navItems, type NavItem } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { isInternalRouteHref } from "@/shared/lib/links";
import { BrandLogo } from "./BrandLogo";
import { NavThread } from "./NavThread";

type NavbarProps = {
  items?: NavItem[];
  showProgress?: boolean;
  leftAccessory?: ReactNode;
  rightContent?: ReactNode;
  position?: "fixed" | "sticky";
};

type ThreadGeometry = {
  width: number;
  height: number;
  xStart: number;
  xEnd: number;
};

const getScrollProgress = () => {
  const scrollElement = document.scrollingElement ?? document.documentElement;
  const scrollRange = scrollElement.scrollHeight - scrollElement.clientHeight;
  if (scrollRange <= 0) return 0;

  return Math.min(Math.max(scrollElement.scrollTop / scrollRange, 0), 1);
};

export function Navbar({
  items = navItems,
  showProgress = true,
  leftAccessory,
  rightContent,
  position = "fixed",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [geometry, setGeometry] = useState<ThreadGeometry | null>(null);
  const showItemNavigation = !rightContent && items.length > 0;

  const navRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, [isOpen]);

  useEffect(() => {
    if (!showProgress) return;

    const syncThreadProgress = () => {
      navRef.current?.style.setProperty(
        "--nav-thread-offset",
        (1 - getScrollProgress()).toFixed(4),
      );
    };

    syncThreadProgress();
    window.addEventListener("scroll", syncThreadProgress, { passive: true });
    window.addEventListener("resize", syncThreadProgress);

    return () => {
      window.removeEventListener("scroll", syncThreadProgress);
      window.removeEventListener("resize", syncThreadProgress);
    };
  }, [showProgress]);

  // Measure where the thread should begin and end. The thread runs
  // full-bleed edge to edge on all screen sizes.
  useLayoutEffect(() => {
    if (!showProgress) {
      setGeometry(null);
      return;
    }

    let frame = 0;
    const measure = () => {
      const nav = navRef.current;
      const bar = barRef.current;
      if (!nav || !bar) return;

      const navRect = nav.getBoundingClientRect();
      const next: ThreadGeometry = {
        width: navRect.width,
        height: bar.getBoundingClientRect().height,
        xStart: 0,
        xEnd: navRect.width,
      };

      setGeometry((prev) =>
        prev &&
        prev.width === next.width &&
        prev.height === next.height &&
        prev.xStart === next.xStart &&
        prev.xEnd === next.xEnd
          ? prev
          : next,
      );
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    const observer = new ResizeObserver(schedule);
    if (navRef.current) observer.observe(navRef.current);
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [showProgress]);

  return (
    <nav
      ref={navRef}
      className={cn(
        "left-0 right-0 top-0 z-50",
        position === "fixed" ? "fixed" : "sticky",
        // With the thread active, the strip background and border are painted
        // by the curved mask; otherwise keep the frosted-glass treatment.
        showProgress
          ? "bg-transparent"
          : "border-b border-sluice-navy/10 bg-sluice-paper/80 backdrop-blur-xl",
      )}
      aria-label="Primary navigation"
    >
      {showProgress && geometry && geometry.width > 0 && <NavThread {...geometry} />}

      <div
        ref={barRef}
        className="relative z-30 mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-16"
      >
        <div className="flex min-w-0 items-center gap-4 max-sm:gap-3">
          {leftAccessory}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 font-sans text-2xl font-semibold leading-none tracking-tight text-sluice-navy no-underline"
            onClick={() => setIsOpen(false)}
          >
            <BrandLogo />
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {rightContent ? (
            rightContent
          ) : (
            <div className="hidden items-center gap-8 md:flex">
              {items.map((item) => (
                <NavItemLink
                  key={item.href}
                  item={item}
                  className={cn(
                    "font-sans text-[15px] font-medium tracking-normal text-sluice-navy transition-opacity hover:opacity-70",
                    item.isPrimary &&
                      "rounded-pill bg-sluice-navy px-4 py-2 text-sm font-semibold text-sluice-paper hover:bg-sluice-deepNavy hover:opacity-100 dark:bg-sluice-routeBlue dark:text-sluice-deepNavy dark:hover:bg-sluice-softBlue",
                  )}
                />
              ))}
            </div>
          )}

          {showItemNavigation && (
            <button
              type="button"
              className={cn(
                "group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-sluice-navy outline-none transition-[background-color,color,transform] duration-300 ease-sluice hover:bg-sluice-navy/6 focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sluice-routeBlue/35 active:scale-[0.96] md:hidden dark:text-sluice-softBlue dark:hover:bg-white/[0.06]",
                isOpen && "bg-sluice-navy/8 text-sluice-routeBlue shadow-[0_10px_28px_-18px_rgba(29,52,135,0.85)] dark:bg-white/[0.08] dark:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.9)]",
              )}
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={() => setIsOpen((current) => !current)}
            >
              <MobileNavGlyph isOpen={isOpen} />
            </button>
          )}
        </div>
      </div>

      {showItemNavigation && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className={cn(
              "fixed inset-x-0 bottom-0 top-16 z-10 cursor-default bg-sluice-deepNavy/20 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 ease-sluice md:hidden",
              isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none",
            )}
            onClick={() => setIsOpen(false)}
          />
          <div
            id="mobile-navigation"
            aria-hidden={!isOpen}
            className={cn(
              "fixed inset-x-0 top-0 z-20 overflow-hidden bg-sluice-paper/88 shadow-[0_28px_80px_-54px_rgba(29,52,135,0.45)] backdrop-blur-xl transition-[height,border-radius,opacity,background-color,box-shadow] duration-[600ms] ease-sluice motion-reduce:transition-none md:hidden dark:bg-sluice-paper/95 dark:shadow-[0_28px_80px_-54px_rgba(0,0,0,0.65)]",
              isOpen
                ? "h-[min(57dvh,380px)] rounded-bl-[clamp(9rem,72vw,32rem)] opacity-100"
                : "pointer-events-none h-0 rounded-bl-none opacity-0",
            )}
          >
            <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col items-end gap-3 px-6 pb-6 pt-20 text-right sm:px-8">
              {items.map((item, index) => (
                <NavItemLink
                  key={item.href}
                  item={item}
                  className={cn(
                    "group/link inline-flex min-h-11 max-w-full items-center justify-end rounded-[16px] px-4 py-2.5 font-sans text-base font-medium tracking-normal text-sluice-navy transition-[background-color,color,opacity,transform] duration-[420ms] ease-sluice hover:bg-sluice-navy/6 dark:hover:bg-white/[0.06]",
                    item.isPrimary &&
                      "bg-sluice-navy text-sluice-paper hover:bg-sluice-deepNavy dark:bg-sluice-routeBlue dark:text-sluice-deepNavy dark:hover:bg-sluice-softBlue",
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
                  )}
                  style={{
                    transitionDelay: isOpen
                      ? `${index * 45}ms`
                      : `${(items.length - 1 - index) * 28}ms`,
                  }}
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? undefined : -1}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

function NavItemLink({
  className,
  item,
  onClick,
  tabIndex,
  style,
}: {
  className?: string;
  item: NavItem;
  onClick?: () => void;
  tabIndex?: number;
  style?: CSSProperties;
}) {
  if (isInternalRouteHref(item.href)) {
    return (
      <Link to={item.href} className={className} onClick={onClick} tabIndex={tabIndex} style={style}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onClick} tabIndex={tabIndex} style={style}>
      {item.label}
    </a>
  );
}

function MobileNavGlyph({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative block h-6 w-6" aria-hidden="true">
      <span
        className={cn(
          "absolute inset-0 transition-[opacity,transform] duration-300 ease-sluice",
          isOpen ? "scale-0 rotate-[-12deg] opacity-0" : "scale-100 rotate-0 opacity-100",
        )}
      >
        <span className="absolute left-0 top-[4px] h-[2px] w-6 -translate-y-1/2 rounded-full bg-current" />
        <span className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 rounded-full bg-current" />
        <span className="absolute left-0 top-[20px] h-[2px] w-6 -translate-y-1/2 rounded-full bg-current" />
      </span>
      <span
        className={cn(
          "absolute inset-0 transition-[opacity,transform] duration-300 ease-sluice",
          isOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-12 opacity-0",
        )}
      >
        <span className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 rotate-45 rounded-full bg-current" />
        <span className="absolute left-0 top-1/2 h-[2px] w-6 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
      </span>
    </span>
  );
}
