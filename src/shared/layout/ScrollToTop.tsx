import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/cn";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sluice-navy text-sluice-paper transition-all duration-300 ease-sluice hover:bg-sluice-deepNavy focus:outline-none focus-visible:ring-2 focus-visible:ring-sluice-routeBlue focus-visible:ring-offset-2 md:bottom-10 md:right-10",
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
