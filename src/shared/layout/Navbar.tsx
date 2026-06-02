import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { navItems, type NavItem } from "@/shared/config/navigation";
import { cn } from "@/shared/lib/cn";
import { isInternalRouteHref } from "@/shared/lib/links";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { BrandLogo } from "./BrandLogo";

type NavbarProps = {
  items?: NavItem[];
  showProgress?: boolean;
  leftAccessory?: ReactNode;
  rightContent?: ReactNode;
  position?: "fixed" | "sticky";
};

export function Navbar({
  items = navItems,
  showProgress = true,
  leftAccessory,
  rightContent,
  position = "fixed",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const showItemNavigation = !rightContent && items.length > 0;

  useEffect(() => {
    if (!showProgress) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showProgress]);

  return (
    <nav
      className={cn(
        "left-0 right-0 top-0 z-50 border-b border-sluice-navy/10 bg-sluice-paper/80 backdrop-blur-xl",
        position === "fixed" ? "fixed" : "sticky",
      )}
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-16">
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

          <ThemeToggle />

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
            "border-t border-sluice-navy/10 bg-sluice-paper/75 px-6 py-5 backdrop-blur-xl md:hidden",
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

      {showProgress && (
        <div
          data-navbar-progress-track
          className="absolute inset-x-0 bottom-0 h-[3px] bg-sluice-paper/80 dark:bg-transparent"
        >
          <div
            className="h-full bg-sluice-navy transition-all duration-75 ease-out dark:bg-sluice-routeBlue"
            style={{ width: `${scrollProgress}%` }}
          />
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
