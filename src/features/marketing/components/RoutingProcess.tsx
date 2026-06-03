import { useCallback, useEffect, useRef, useState } from "react";

import { steps } from "@/features/marketing/content";
import { ThreadBoard } from "./charts/ThreadBoard";
import { StepPanel } from "./StepPanel";
import { Container } from "@/shared/ui/Container";

/* ------------------------------------------------------------------ */
/*  Scroll-driven routing process                                     */
/* ------------------------------------------------------------------ */

export function RoutingProcess() {
  const storyRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const progressPaths = useRef<SVGPathElement[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const ticking = useRef(false);

  /* ---- Prepare SVG dash arrays on mount + resize ---- */
  const preparePaths = useCallback(() => {
    progressPaths.current.forEach((path) => {
      if (!path) return;
      const length = path.getTotalLength();
      path.dataset.length = String(length);
      path.style.strokeDasharray = String(length);
      path.style.strokeDashoffset = String(length);
    });
  }, []);

  /* ---- Find which panel is closest to viewport center ---- */
  const getNearestStep = useCallback((): number => {
    const viewportCenter = window.innerHeight * 0.5;
    let nearest = 0;
    let bestDist = Infinity;

    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const panelCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(panelCenter - viewportCenter);
      if (distance < bestDist) {
        bestDist = distance;
        nearest = index;
      }
    });

    return nearest;
  }, []);

  /* ---- Update thread progress based on scroll position ---- */
  const updateThreadProgress = useCallback(() => {
    const story = storyRef.current;
    if (!story) return;

    const rect = story.getBoundingClientRect();
    const maxScroll = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / maxScroll));

    progressPaths.current.forEach((path) => {
      if (!path) return;
      const length = Number(path.dataset.length || path.getTotalLength());
      path.style.strokeDashoffset = String(length * (1 - progress));
    });
  }, []);

  /* ---- Combined scroll handler ---- */
  const updateFromScroll = useCallback(() => {
    ticking.current = false;
    setActiveStep(getNearestStep());
    updateThreadProgress();
  }, [getNearestStep, updateThreadProgress]);

  const requestUpdate = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(updateFromScroll);
  }, [updateFromScroll]);

  /* ---- Effect: setup listeners ---- */
  useEffect(() => {
    preparePaths();
    updateFromScroll();

    const handleResize = () => {
      preparePaths();
      requestUpdate();
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    // Wait for fonts then recalculate
    if (document.fonts?.ready) {
      document.fonts.ready.then(requestUpdate);
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [preparePaths, updateFromScroll, requestUpdate]);

  return (
    <section
      id="how-it-works"
      className="routing-process-section scroll-mt-[4.5rem] overflow-clip pb-12 pt-4 md:pb-16 md:pt-6"
    >
      <Container>
        <div
          ref={storyRef}
          className="routing-scroll-story relative mt-0 overflow-hidden"
        >
          {/* Thread stage behind the scrolling steps */}
          <aside
            className="routing-thread-stage pointer-events-none absolute inset-0 z-0 block"
            aria-label="Routing process thread"
          >
            <ThreadBoard
              activeStep={activeStep}
              progressPaths={progressPaths}
            />
          </aside>

          {/* Scrolling step panels */}
          <main
            className="routing-step-copy relative z-[3]"
            aria-label="Routing steps"
          >
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                data-step={index}
              >
                <StepPanel
                  step={step}
                  index={index}
                  isActive={index === activeStep}
                />
              </div>
            ))}
          </main>
        </div>
      </Container>
    </section>
  );
}
