import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { navItems } from "../data/siteContent";
import { cn } from "../lib/cn";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const updateShadow = () => setHasShadow(window.scrollY > 32);

    updateShadow();
    window.addEventListener("scroll", updateShadow, { passive: true });

    return () => window.removeEventListener("scroll", updateShadow);
  }, []);

  return (
    <>
      <div className="top-line" />
      <nav
        className={cn(
          "fixed left-0 right-0 top-[3px] z-40 border-b border-sluice-navy/10 bg-sluice-paper/85 backdrop-blur-xl transition-shadow duration-200",
          hasShadow && "shadow-soft",
        )}
        aria-label="Primary navigation"
      >
        <div className="container-shell flex h-16 items-center justify-between">
          <a
            href="#hero"
            className="font-display text-2xl font-bold tracking-normal text-sluice-navy"
            onClick={() => setIsOpen(false)}
          >
            Sluice
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "font-sans text-[15px] font-medium tracking-normal text-sluice-navy transition-opacity hover:opacity-70",
                  item.isPrimary &&
                    "rounded-pill bg-sluice-navy px-5 py-2.5 text-sluice-paper hover:bg-sluice-deepNavy hover:opacity-100",
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
            "border-t border-sluice-navy/10 bg-sluice-paper/95 px-6 py-5 backdrop-blur-xl md:hidden",
            !isOpen && "hidden",
          )}
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
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
