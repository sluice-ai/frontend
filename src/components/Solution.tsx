import { useRef, useState, useEffect } from "react";
import { layers } from "../data/siteContent";
import { Container } from "./ui/Container";
import { cn } from "../lib/cn";

export function Solution() {
  const activeIndex = 2; // Sluice (Decision layer) is statically centered at index 2
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const activeChild = container.children[activeIndex] as HTMLElement;
      if (activeChild) {
        // Small delay to ensure the browser has computed layout dimensions
        setTimeout(() => {
          const containerRect = container.getBoundingClientRect();
          const activeChildRect = activeChild.getBoundingClientRect();
          const relativeLeft = activeChildRect.left - containerRect.left + container.scrollLeft;
          
          container.scrollLeft = relativeLeft - (containerRect.width / 2) + (activeChildRect.width / 2);
        }, 120);
      }
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    // Store drag starting state
    container.dataset.startX = String(e.pageX - container.offsetLeft);
    container.dataset.scrollLeft = String(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = containerRef.current;
    if (!container) return;

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
          className="flex flex-row justify-start md:justify-center items-stretch gap-5 md:gap-5 py-10 px-[calc(50vw-145px)] md:px-0 overflow-x-auto md:overflow-x-visible hide-scrollbar w-full select-none cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {layers.map((layer, index) => {
            const distance = Math.abs(index - activeIndex);
            const isActive = distance === 0;

            return (
              <div
                key={layer.name}
                className={cn(
                  "quiet-card cascade-card flex flex-col justify-between cursor-default min-h-[170px] w-full max-w-[380px] min-w-[290px] relative rounded-card border p-7 select-none",
                  isActive
                    ? "spotlight-active-card z-20"
                    : "bg-[#FAF9F5]/70 border-sluice-navy/15 z-10"
                )}
                style={{
                  filter: distance === 0 ? "blur(0px)" : distance === 1 ? "blur(0px)" : "var(--cascade-blur)",
                  opacity: distance === 0 ? 1 : distance === 1 ? 0.95 : "var(--cascade-opacity)",
                  transform: distance === 0
                    ? "var(--cascade-scale-active)"
                    : distance === 1
                      ? "var(--cascade-scale-near)"
                      : "var(--cascade-scale-far)",
                }}
              >
                <div>
                  <div
                    className={cn(
                      "section-label uppercase tracking-widest text-[11px] font-semibold",
                      isActive ? "text-sluice-routeBlue" : "text-sluice-navy/60"
                    )}
                  >
                    {layer.name}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-normal leading-[1.15] tracking-[-0.01em] text-sluice-navy">
                    {layer.title}
                  </h3>
                </div>
                <p className="caption mt-4 text-sm leading-[1.5] text-sluice-muted">
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
