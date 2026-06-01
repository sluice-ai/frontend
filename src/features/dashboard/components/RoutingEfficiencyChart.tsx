import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import {
  chartSeries,
  timeframeOptions,
} from "@/features/dashboard/data";
import type { ChartPoint, Timeframe } from "@/features/dashboard/types";
import { SegmentedSelect } from "@/shared/ui/SegmentedSelect";

const WIDTH = 680;
const HEIGHT = 300;
const PADDING_Y = 36;
const CHART_BOTTOM = HEIGHT - PADDING_Y;
const CHART_TOP = PADDING_Y;
const CHART_LEFT = 48;
const CHART_RIGHT = WIDTH - 44;

type PointCoordinate = {
  x: number;
  yReq: number;
  ySav: number;
};

export function RoutingEfficiencyChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("7d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const data = chartSeries[timeframe];

  const { maxRequests, maxSavings, yTicksLeft, yTicksRight, pointCoords } =
    useMemo(() => buildChartModel(data), [data]);

  const requestPolyline = pointCoords
    .map((coordinate) => `${coordinate.x},${coordinate.yReq}`)
    .join(" ");
  const savingsPolyline = pointCoords
    .map((coordinate) => `${coordinate.x},${coordinate.ySav}`)
    .join(" ");
  const requestAreaPoints = `${CHART_LEFT},${CHART_BOTTOM} ${requestPolyline} ${CHART_RIGHT},${CHART_BOTTOM}`;

  const handleMouseMove = useCallback(
    (event: MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;

      const rect = svgRef.current.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * WIDTH;
      const closest = findClosestPointIndex(pointCoords, mouseX);
      setHoveredIndex(closest);
    },
    [pointCoords],
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  return (
    <section>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-sans text-xl font-semibold leading-tight tracking-normal text-sluice-navy">
            Routing efficiency
          </h2>
          <div className="flex flex-wrap gap-4 font-sans text-xs text-sluice-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-5 rounded-full bg-sluice-navy" />
              Requests
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-5 rounded-full bg-sluice-routeBlue" />
              Savings
            </span>
          </div>
        </div>

        <SegmentedSelect<Timeframe>
          value={timeframe}
          onChange={(value) => {
            setTimeframe(value);
            setHoveredIndex(null);
          }}
          options={timeframeOptions}
          className="w-fit bg-sluice-paper"
          buttonClassName=""
        />
      </div>

      <div className="mt-4 overflow-hidden rounded-[18px] border border-sluice-navy/10 bg-sluice-paper/60">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-[255px] w-full sm:h-[305px] xl:h-[325px]"
          role="img"
          aria-label="Routing efficiency chart"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: "crosshair" }}
        >
          <defs>
            <linearGradient id="requests-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1D3487" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#1D3487" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width={WIDTH} height={HEIGHT} fill="transparent" />

          {yTicksLeft.map((tick, index) => {
            const y = CHART_BOTTOM - (tick / maxRequests) * chartHeight();
            return (
              <g key={`left-${index}`}>
                <line
                  x1={CHART_LEFT}
                  x2={CHART_RIGHT}
                  y1={y}
                  y2={y}
                  stroke="rgba(29, 52, 135, 0.08)"
                  strokeDasharray={index === 0 ? "none" : "4 4"}
                />
                <text
                  x={CHART_LEFT - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-sluice-muted font-sans text-[10px]"
                >
                  {formatCompact(tick)}
                </text>
              </g>
            );
          })}

          {yTicksRight.map((tick, index) => {
            const y = CHART_BOTTOM - (tick / maxSavings) * chartHeight();
            return (
              <text
                key={`right-${index}`}
                x={CHART_RIGHT + 8}
                y={y + 4}
                textAnchor="start"
                className="fill-sluice-routeBlue font-sans text-[10px]"
              >
                ${formatCompact(tick)}
              </text>
            );
          })}

          <polygon points={requestAreaPoints} fill="url(#requests-area)" />
          <polyline
            points={requestPolyline}
            fill="none"
            stroke="#1D3487"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
          <polyline
            points={savingsPolyline}
            fill="none"
            stroke="#4A77DC"
            strokeDasharray="5 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />

          {pointCoords.map((coordinate, index) => (
            <g key={`dots-${index}`}>
              <circle
                cx={coordinate.x}
                cy={coordinate.yReq}
                r={hoveredIndex === index ? 5 : 3}
                fill="#1D3487"
                stroke="#f2f3f5"
                strokeWidth="2"
                style={{ transition: "r 150ms ease" }}
              />
              <circle
                cx={coordinate.x}
                cy={coordinate.ySav}
                r={hoveredIndex === index ? 5 : 3}
                fill="#4A77DC"
                stroke="#f2f3f5"
                strokeWidth="2"
                style={{ transition: "r 150ms ease" }}
              />
            </g>
          ))}

          {data.map((point, index) => {
            const x = pointCoords[index].x;
            return (
              <text
                key={point.label}
                x={x}
                y={HEIGHT - 10}
                textAnchor="middle"
                className={`font-sans text-[11px] ${
                  hoveredIndex === index
                    ? "fill-sluice-navy font-semibold"
                    : "fill-sluice-muted"
                }`}
              >
                {point.label}
              </text>
            );
          })}

          {hoveredIndex !== null && (
            <ChartTooltip
              coordinate={pointCoords[hoveredIndex]}
              point={data[hoveredIndex]}
            />
          )}
        </svg>
      </div>
    </section>
  );
}

function buildChartModel(data: ChartPoint[]) {
  const maxRequests = niceMax(Math.max(...data.map((point) => point.requests)));
  const maxSavings = niceMax(Math.max(...data.map((point) => point.savings)));
  const tickCount = 5;

  return {
    maxRequests,
    maxSavings,
    yTicksLeft: Array.from({ length: tickCount }, (_, index) =>
      Math.round((maxRequests / (tickCount - 1)) * index),
    ),
    yTicksRight: Array.from({ length: tickCount }, (_, index) =>
      Math.round((maxSavings / (tickCount - 1)) * index),
    ),
    pointCoords: data.map((point, index) => {
      const x =
        CHART_LEFT +
        (index / Math.max(data.length - 1, 1)) * (CHART_RIGHT - CHART_LEFT);
      const yReq =
        CHART_BOTTOM - (point.requests / maxRequests) * chartHeight();
      const ySav =
        CHART_BOTTOM - (point.savings / maxSavings) * chartHeight();
      return { x, yReq, ySav };
    }),
  };
}

function ChartTooltip({
  coordinate,
  point,
}: {
  coordinate: PointCoordinate;
  point: ChartPoint;
}) {
  const tooltipWidth = 140;
  const tooltipHeight = 52;
  const tooltipY = CHART_TOP - 4;
  const rawX = coordinate.x - tooltipWidth / 2;
  const x = Math.max(CHART_LEFT, Math.min(rawX, CHART_RIGHT - tooltipWidth));

  return (
    <>
      <line
        x1={coordinate.x}
        x2={coordinate.x}
        y1={CHART_TOP}
        y2={CHART_BOTTOM}
        stroke="rgba(29, 52, 135, 0.18)"
        strokeWidth="1"
        strokeDasharray="4 3"
      />
      <g>
        <rect
          x={x}
          y={tooltipY}
          width={tooltipWidth}
          height={tooltipHeight}
          rx="10"
          fill="#1D3487"
          fillOpacity="0.95"
        />
        <text
          x={x + tooltipWidth / 2}
          y={tooltipY + 20}
          textAnchor="middle"
          className="font-sans text-[11px] font-semibold"
          fill="#fff"
        >
          {point.requests.toLocaleString()} reqs
        </text>
        <text
          x={x + tooltipWidth / 2}
          y={tooltipY + 38}
          textAnchor="middle"
          className="font-sans text-[10px]"
          fill="rgba(255,255,255,0.7)"
        >
          ${point.savings.toLocaleString()} saved
        </text>
      </g>
    </>
  );
}

function findClosestPointIndex(points: PointCoordinate[], mouseX: number) {
  let closest = 0;
  let minDistance = Infinity;

  points.forEach((point, index) => {
    const distance = Math.abs(mouseX - point.x);
    if (distance < minDistance) {
      minDistance = distance;
      closest = index;
    }
  });

  return closest;
}

function niceMax(value: number) {
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  return Math.ceil(value / magnitude) * magnitude;
}

function chartHeight() {
  return CHART_BOTTOM - CHART_TOP;
}

function formatCompact(value: number) {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)}K`;
}
