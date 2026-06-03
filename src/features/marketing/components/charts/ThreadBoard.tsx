import { cn } from "@/shared/lib/cn";

/* ------------------------------------------------------------------ */
/*  SVG paths                                                         */
/* ------------------------------------------------------------------ */

/* Desktop keeps the same storytelling cadence, but pulls the side clouds
   inward so each cloud feels attached to its content block on wide screens. */
const DESKTOP_PATH =
  "M 132 78 C 132 390 210 390 210 702 C 210 1079 132 1079 132 1456 C 132 1823 210 1823 210 2190";

/* Mobile path: a tight serpentine that passes through the center of each
   cloud and crosses horizontally only in the gap between step panels.
   Cloud centers (in viewBox 0 0 390 2600):
     Cloud 1 -> (58, 78)    Cloud 2 -> (332, 702)
     Cloud 3 -> (58, 1560)  Cloud 4 -> (332, 2190)
   The cubic control points are placed at the midpoints between clouds
   so the horizontal transition happens in the gap, not across text. */
const MOBILE_PATH =
  "M 58 78 C 58 390 332 390 332 702 C 332 1131 58 1131 58 1560 C 58 1895 332 1895 332 2190";

/* ------------------------------------------------------------------ */
/*  Step cloud positions                                              */
/* ------------------------------------------------------------------ */

type CloudDef = {
  stepIndex: number;
  label: string;
  desktopPos: { left: string; top: string };
  mobilePos: { left: string; top: string };
  tilt: string;
  borderRadius: string;
};

const clouds: CloudDef[] = [
  {
    stepIndex: 0,
    label: "Entry",
    desktopPos: { left: "34%", top: "3%" },
    mobilePos: { left: "15%", top: "3%" },
    tilt: "-2deg",
    borderRadius: "57% 43% 48% 52% / 45% 58% 42% 55%",
  },
  {
    stepIndex: 1,
    label: "Competition",
    desktopPos: { left: "54%", top: "27%" },
    mobilePos: { left: "85%", top: "27%" },
    tilt: "3deg",
    borderRadius: "44% 56% 52% 48% / 57% 45% 55% 43%",
  },
  {
    stepIndex: 2,
    label: "Evaluation",
    desktopPos: { left: "34%", top: "56%" },
    mobilePos: { left: "15%", top: "60%" },
    tilt: "-4deg",
    borderRadius: "51% 49% 57% 43% / 43% 61% 39% 57%",
  },
  {
    stepIndex: 3,
    label: "Resolution",
    desktopPos: { left: "54%", top: "84%" },
    mobilePos: { left: "85%", top: "84%" },
    tilt: "2deg",
    borderRadius: "48% 52% 42% 58% / 60% 41% 59% 40%",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

type ThreadBoardProps = {
  activeStep: number;
  progressPaths: React.RefObject<SVGPathElement[]>;
};

export function ThreadBoard({ activeStep, progressPaths }: ThreadBoardProps) {
  return (
    <div className="routing-thread-board relative w-full" style={{ aspectRatio: "1.84" }}>
      {/* Desktop SVG */}
      <svg
        className="routing-desktop-svg pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 390 2600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="routing-thread-base"
          d={DESKTOP_PATH}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="var(--color-sluice-navy)"
          strokeWidth="1"
          opacity="0.16"
        />
        <path
          ref={(el) => {
            if (el && progressPaths.current) progressPaths.current[0] = el;
          }}
          className="routing-thread-progress"
          d={DESKTOP_PATH}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="var(--color-sluice-routeBlue)"
          strokeWidth="1.2"
          style={{
            transition: "stroke-dashoffset 140ms linear",
          }}
        />
      </svg>

      {/* Mobile SVG */}
      <svg
        className="routing-mobile-svg pointer-events-none absolute inset-0 hidden h-full w-full"
        viewBox="0 0 390 2600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={MOBILE_PATH}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="var(--color-sluice-navy)"
          strokeWidth="0.85"
          opacity="0.13"
        />
        <path
          ref={(el) => {
            if (el && progressPaths.current) progressPaths.current[1] = el;
          }}
          d={MOBILE_PATH}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="var(--color-sluice-routeBlue)"
          strokeWidth="1.1"
          style={{
            transition: "stroke-dashoffset 140ms linear",
          }}
        />
      </svg>

      {/* Step clouds */}
      {clouds.map((cloud) => {
        const isActive = cloud.stepIndex === activeStep;
        return (
          <div
            key={cloud.stepIndex}
            className={cn(
              "routing-step-cloud pointer-events-none absolute z-[2] grid min-h-[74px] min-w-[158px] place-items-center p-4 px-5 transition-opacity duration-[420ms]",
              isActive && "routing-step-cloud-active",
            )}
            style={{
              left: cloud.desktopPos.left,
              top: cloud.desktopPos.top,
              ["--tilt" as string]: cloud.tilt,
              ["--cloud-left-desktop" as string]: cloud.desktopPos.left,
              ["--cloud-top-desktop" as string]: cloud.desktopPos.top,
              ["--cloud-left-mobile" as string]: cloud.mobilePos.left,
              ["--cloud-top-mobile" as string]: cloud.mobilePos.top,
              borderRadius: cloud.borderRadius,
              transform: "translate(-50%, -50%) rotate(var(--tilt, 0deg))",
              opacity: isActive ? 1 : 0.46,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              background: "rgba(242, 243, 245, 0.98)",
              boxShadow: "0 22px 38px -22px rgba(29, 52, 135, 0.42)",
            }}
            aria-current={isActive ? "step" : undefined}
          >
            {/* Inner colored fill */}
            <div
              className="pointer-events-none absolute z-0 rounded-[inherit]"
              style={{
                inset: "5px",
                background: "var(--color-sluice-navy)",
                transform: "rotate(-1deg)",
              }}
            />
            <span className="routing-step-cloud-label relative z-[2] text-center block whitespace-nowrap text-[16px] font-extrabold leading-[1.1] text-white tracking-wide">
              {cloud.label}
            </span>
          </div>
        );
      })}

      {/* Scroll hint (desktop only) */}
      <div className="routing-scroll-hint absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[11px] text-sluice-muted/70 lg:inline-flex">
        <span
          className="inline-block h-[18px] w-[7px] rounded-full border border-sluice-navy/30"
          style={{
            background:
              "linear-gradient(var(--color-sluice-routeBlue), var(--color-sluice-routeBlue)) 50% 4px / 3px 3px no-repeat",
          }}
          aria-hidden="true"
        />
        scroll the thread
      </div>
    </div>
  );
}
