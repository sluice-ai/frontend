import { useMemo } from "react";

type NavThreadProps = {
  /** Full nav width in px. */
  width: number;
  /** Height of the nav bar strip in px. */
  height: number;
  /** Left anchor, where the thread begins. */
  xStart: number;
  /** Right anchor, where the thread ends. */
  xEnd: number;
};

const WAVELENGTH = 185;
const AMPLITUDE = 2.5;
const BOTTOM_GAP = 1;

/**
 * A soft watercolor edge that doubles as the navbar bottom border and the
 * scroll progress indicator. The dash offset is driven by a CSS variable so it
 * can update on every scroll frame without rerendering React.
 */
export function NavThread({ width, height, xStart, xEnd }: NavThreadProps) {
  const { fill, wave } = useMemo(() => {
    const baseline = height - AMPLITUDE - BOTTOM_GAP;
    const span = Math.max(xEnd - xStart, 1);
    const cycles = Math.max(2, Math.round(span / WAVELENGTH));
    const steps = Math.min(Math.max(cycles * 16, 32), 256);

    const points: Array<[number, number]> = [];
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = xStart + span * t;
      const y = baseline - AMPLITUDE * Math.sin(t * Math.PI * 2 * cycles);
      points.push([x, y]);
    }

    const fmt = ([x, y]: [number, number]) => `${x.toFixed(2)},${y.toFixed(2)}`;

    const wave = points
      .map((point, i) => `${i === 0 ? "M" : "L"}${fmt(point)}`)
      .join(" ");

    const reversed = points
      .slice()
      .reverse()
      .map((point) => `L${fmt(point)}`)
      .join(" ");
    const fill = `M0,0 H${width.toFixed(2)} V${baseline.toFixed(2)} ${reversed} L0,${baseline.toFixed(2)} Z`;

    return { fill, wave };
  }, [width, height, xStart, xEnd]);

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-0 block h-16 w-full"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={fill} style={{ fill: "var(--sluice-canvas-from)" }} />

      <path
        d={wave}
        className="text-sluice-navy dark:text-sluice-routeBlue"
        stroke="currentColor"
        strokeOpacity={0.9}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1 1"
        style={{ strokeDashoffset: "var(--nav-thread-offset, 1)" }}
      />
    </svg>
  );
}
