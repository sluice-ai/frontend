import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import type { ReactNode } from "react";
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
  const brandRef = useRef<HTMLAnchorElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

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

  // Measure where the thread should begin (brand logo) and end (last link) so
  // the curve anchors to them across every breakpoint and label change.
  useLayoutEffect(() => {
    if (!showProgress) {
      setGeometry(null);
      return;
    }

    let frame = 0;
    const measure = () => {
      const nav = navRef.current;
      const bar = barRef.current;
      const brand = brandRef.current;
      const controls = controlsRef.current;
      if (!nav || !bar || !brand || !controls) return;

      const navRect = nav.getBoundingClientRect();
      // Desktop anchors the thread between the brand and the last link; mobile
      // runs it full-bleed edge to edge (matches the `md` nav breakpoint).
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const next: ThreadGeometry = {
        width: navRect.width,
        height: bar.getBoundingClientRect().height,
        xStart: isDesktop ? brand.getBoundingClientRect().left - navRect.left : 0,
        xEnd: isDesktop
          ? controls.getBoundingClientRect().right - navRect.left
          : navRect.width,
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
  }, [showProgress, items, rightContent, leftAccessory]);

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
        className="relative z-10 mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-16"
      >
        <div className="flex min-w-0 items-center gap-4 max-sm:gap-3">
          {leftAccessory}
          <Link
            ref={brandRef}
            to="/"
            className="flex min-w-0 items-center gap-2 font-sans text-2xl font-semibold leading-none tracking-tight text-sluice-navy no-underline"
            onClick={() => setIsOpen(false)}
          >
            <BrandLogo />
          </Link>
        </div>

        <div ref={controlsRef} className="flex items-center gap-3 sm:gap-4">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sluice-navy/20 text-sluice-navy outline-none focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sluice-routeBlue/35 md:hidden"
              aria-controls="mobile-navigation"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={() => setIsOpen((current) => !current)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {showItemNavigation && (
        <div
          id="mobile-navigation"
          className={cn(
            "relative z-10 border-t border-sluice-navy/10 bg-sluice-paper/75 px-6 py-5 backdrop-blur-xl md:hidden",
            !isOpen && "hidden",
          )}
        >
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <NavItemLink
                key={item.href}
                item={item}
                className={cn(
                  "rounded-pill px-4 py-3 font-sans text-base font-medium tracking-normal text-sluice-navy",
                  item.isPrimary &&
                    "bg-sluice-navy text-sluice-paper dark:bg-sluice-routeBlue dark:text-sluice-deepNavy",
                )}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItemLink({
  className,
  item,
  onClick,
}: {
  className?: string;
  item: NavItem;
  onClick?: () => void;
}) {
  if (isInternalRouteHref(item.href)) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}
