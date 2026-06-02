import type { KpiCard } from "@/features/dashboard/types";

type TrendSparklineProps = {
  card: KpiCard;
  index: number;
};

export function TrendSparkline({ card, index }: TrendSparklineProps) {
  const points = toPolyline(card.trend, 96, 40, 5);
  const areaPoints = `5,35 ${points} 91,35`;
  const gradientId = `kpi-sparkline-${index}`;

  return (
    <svg viewBox="0 0 96 40" className="h-11 w-24" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--color-sluice-routeBlue)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-sluice-routeBlue)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke="var(--color-sluice-routeBlue)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function toPolyline(
  values: number[],
  width: number,
  height: number,
  padding = 8,
) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  return values
    .map((value, index) => {
      const x =
        padding + (index / Math.max(values.length - 1, 1)) * (width - padding * 2);
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");
}
