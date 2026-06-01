import { useRef, useState, useEffect } from "react";
import { layers } from "@/features/marketing/content";
import { Container } from "@/shared/ui/Container";
import { cn } from "@/shared/lib/cn";

export function Solution() {
  const [activeIndex, setActiveIndex] = useState(2); // Starts at Sluice (Decision layer)
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobileState, setIsMobileState] = useState(false);
  const lastInteractionRef = useRef(Date.now());
  const activeIndexRef = useRef(activeIndex);

  // Keep ref up to date to prevent closure staleness in listeners
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const registerInteraction = () => {
    lastInteractionRef.current = Date.now();
  };

  const updateDynamicStyles = () => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    if (!isMobile) return; // Do absolutely nothing to style attributes on desktop to preserve pristine cascade blurs

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const maxDist = 320; // Card width + gap

    const currentActiveIndex = activeIndexRef.current;
    let closestIndex = currentActiveIndex;
    let closestDistance = Infinity;

    Array.from(container.children).forEach((childNode, index) => {
      const child = childNode as HTMLElement;

      const childRect = child.getBoundingClientRect();
      const childCenter = childRect.left + childRect.width / 2;
      const dist = Math.abs(childCenter - containerCenter);
      const ratio = Math.min(dist / maxDist, 1);

      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = index;
      }

      // Apply high-performance dynamic inline styles
      child.style.filter = `blur(${ratio * 4.5}px)`;
      child.style.opacity = String(1 - ratio * 0.6);
      child.style.transform = `scale(${1 - ratio * 0.08})`;
    });

    if (closestIndex !== currentActiveIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollToCard = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const activeChild = container.children.item(index) as HTMLElement;
    if (activeChild) {
      const containerRect = container.getBoundingClientRect();
      const activeChildRect = activeChild.getBoundingClientRect();
      const relativeLeft = activeChildRect.left - containerRect.left + container.scrollLeft;
      const targetScrollLeft = relativeLeft - (containerRect.width / 2) + (activeChildRect.width / 2);
      
      container.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkMobile = () => window.innerWidth < 768;
    setIsMobileState(checkMobile());

    const centerActiveCard = () => {
      const activeChild = container.children.item(activeIndexRef.current) as HTMLElement;
      if (activeChild) {
        const containerRect = container.getBoundingClientRect();
        const activeChildRect = activeChild.getBoundingClientRect();
        const relativeLeft = activeChildRect.left - containerRect.left + container.scrollLeft;
        
        container.scrollLeft = relativeLeft - (containerRect.width / 2) + (activeChildRect.width / 2);
      }
      updateDynamicStyles();
    };

    // Center Sluice card immediately on mount
    centerActiveCard();

    // ResizeObserver monitors box size shifts (dynamic width stabilization, font loads, and screen sizing)
    const resizeObserver = new ResizeObserver(() => {
      centerActiveCard();
    });

    resizeObserver.observe(container);
    Array.from(container.children).forEach((child) => {
      resizeObserver.observe(child);
    });

    // Fallbacks to handle late-stabilizing font assets and SVG renders
    const timeouts = [
      setTimeout(centerActiveCard, 50),
      setTimeout(centerActiveCard, 150),
      setTimeout(centerActiveCard, 300),
      setTimeout(centerActiveCard, 600),
    ];

    // Window resize event handler
    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobileState(mobile);
      if (!mobile) {
        setActiveIndex(2); // Reset focus back to Sluice on desktop
      }
      centerActiveCard();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      resizeObserver.disconnect();
      timeouts.forEach(clearTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Autoplay loop on mobile (respects manual interaction pauses)
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    let isMobile = checkMobile();

    const handleResize = () => {
      isMobile = checkMobile();
    };
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      if (isMobile && !isDragging && Date.now() - lastInteractionRef.current > 4000) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % layers.length;
          scrollToCard(next);
          return next;
        });
      }
    }, 3800);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    registerInteraction();
    setIsDragging(true);
    // Store drag starting state
    container.dataset.startX = String(e.pageX - container.offsetLeft);
    container.dataset.scrollLeft = String(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;

    registerInteraction();
    e.preventDefault();
    const startX = Number(container.dataset.startX || 0);
    const scrollLeft = Number(container.dataset.scrollLeft || 0);

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5; // drag sensitivity multiplier
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="pt-[56px] md:pt-[72px] pb-12 md:pb-16 overflow-hidden">
      <Container>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onScroll={() => {
            registerInteraction();
            updateDynamicStyles();
          }}
          className="flex w-full cursor-grab select-none flex-row items-stretch justify-start gap-5 overflow-x-auto px-[calc(50vw-145px)] py-10 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing md:justify-center md:overflow-x-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {layers.map((layer, index) => {
            const distance = Math.abs(index - activeIndex);
            const isActive = distance === 0;
            const isSluice = !!layer.isSluice;

            return (
              <div
                key={layer.name}
                className={cn(
                  "relative flex min-h-[170px] w-full min-w-[290px] max-w-[380px] shrink-0 cursor-default select-none flex-col justify-between rounded-card border p-7 transition-all duration-[450ms] ease-sluice will-change-[transform,filter,opacity,box-shadow]",
                  isSluice
                    ? "z-20 !border-sluice-routeBlue/45 !bg-[#EBF0FF] !shadow-none"
                    : "bg-[#FAF9F5]/70 border-sluice-navy/15 z-10"
                )}
                style={isMobileState ? {} : {
                  filter: distance <= 1 ? "blur(0px)" : "blur(2.5px)",
                  opacity: distance === 0 ? 1 : distance === 1 ? 0.95 : 0.45,
                  transform: "scale(1) translateY(0)",
                }}
              >
                <div>
                  <div
                    className={cn(
                      "font-sans text-[11px] font-semibold uppercase leading-none tracking-widest text-sluice-navy",
                      isSluice ? "text-sluice-routeBlue" : "text-sluice-navy/60"
                    )}
                  >
                    {layer.name}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-normal leading-[1.15] tracking-[-0.01em] text-sluice-navy">
                    {layer.title}
                  </h3>
                </div>
                <p className="mt-4 font-sans text-sm leading-[1.5] tracking-normal text-sluice-muted">
                  {layer.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
