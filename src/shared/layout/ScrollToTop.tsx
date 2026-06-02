import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const scrollInstantlyTo = (top: number) => {
  window.scrollTo({ top, left: 0, behavior: "instant" });
};

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsVisible = window.scrollY > 400;
      if (nextIsVisible === isVisibleRef.current) return;

      isVisibleRef.current = nextIsVisible;
      setIsVisible(nextIsVisible);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const scrollToTop = () => {
    cancelAnimationFrame(frameRef.current);

    const startY = window.scrollY;
    if (startY <= 0) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      scrollInstantlyTo(0);
      return;
    }

    const duration = Math.min(900, Math.max(350, startY * 0.45));
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      scrollInstantlyTo(Math.round(startY * (1 - easeInOutCubic(t))));
      if (t < 1) frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sluice-navy text-sluice-paper transition-all duration-300 ease-sluice hover:bg-sluice-deepNavy focus:outline-none focus-visible:ring-2 focus-visible:ring-sluice-routeBlue focus-visible:ring-offset-2 dark:bg-sluice-routeBlue dark:text-sluice-deepNavy dark:hover:bg-sluice-softBlue md:bottom-10 md:right-10",
        isVisible
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      )}
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
