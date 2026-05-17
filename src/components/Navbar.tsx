import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navItems } from "../data/siteContent";
import { cn } from "../lib/cn";
import type { NavItem } from "../types";

type NavbarProps = {
  items?: NavItem[];
};

export function Navbar({ items = navItems }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-white">
        <div 
          className="h-full bg-sluice-navy transition-all duration-75 ease-out" 
          style={{ width: `${scrollProgress}%` }} 
        />
      </div>
      <nav
        className="fixed left-0 right-0 top-[3px] z-40 border-b border-sluice-navy/10 bg-sluice-paper/80 backdrop-blur-xl"
        aria-label="Primary navigation"
      >
        <div className="container-shell flex h-16 items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 font-sans text-2xl font-semibold tracking-tight text-sluice-navy"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/logo.svg"
              alt=""
              aria-hidden="true"
              className="h-6 w-auto shrink-0"
            />
            <span>Sluice</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "font-sans text-[15px] font-medium tracking-normal text-sluice-navy transition-opacity hover:opacity-70",
                  item.isPrimary &&
                    "rounded-pill bg-sluice-navy px-4 py-2 text-sm font-semibold text-sluice-paper hover:bg-sluice-deepNavy hover:opacity-100",
                )}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sluice-navy/20 text-sluice-navy md:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div
          id="mobile-navigation"
          className={cn(
            "border-t border-sluice-navy/10 bg-sluice-paper/75 px-6 py-5 backdrop-blur-xl md:hidden",
            !isOpen && "hidden",
          )}
        >
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-pill px-4 py-3 font-sans text-base font-medium tracking-normal text-sluice-navy",
                  item.isPrimary && "bg-sluice-navy text-sluice-paper",
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
