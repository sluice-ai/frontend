import {
  Clock3,
  Code2,
  DollarSign,
  LockKeyhole,
  Route,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";

import { Navbar } from "../components/Navbar";
import { SegmentedSelect } from "../components/SegmentedSelect";
import { dashboardNavItems } from "../data/siteContent";

type KpiCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: number[];
};

type RouteRow = {
  promptType: string;
  provider: string;
  cost: string;
  latency: string;
  icon: LucideIcon;
};

type Timeframe = "7d" | "30d" | "90d";

type ChartPoint = {
  label: string;
  requests: number;
  savings: number;
};

const kpiCards: KpiCard[] = [
  {
    label: "Total Requests Routed",
    value: "128,420",
    icon: Route,
    trend: [32, 36, 34, 44, 42, 51, 49, 58],
  },
  {
    label: "Estimated Savings",
    value: "$3,842",
    icon: DollarSign,
    trend: [21, 24, 26, 25, 31, 29, 37, 43],
  },
  {
    label: "Average Latency",
    value: "1.2s",
    icon: Clock3,
    trend: [52, 49, 44, 45, 38, 40, 34, 31],
  },
  {
    label: "Quality Pass Rate",
    value: "94.3%",
    icon: ShieldCheck,
    trend: [72, 73, 74, 78, 79, 77, 82, 86],
  },
];

const recentRoutes: RouteRow[] = [
  {
    promptType: "Coding",
    provider: "Claude",
    cost: "$0.021",
    latency: "3.4s",
    icon: Code2,
  },
  {
    promptType: "Simple Q&A",
    provider: "Chutes/Llama",
    cost: "$0.001",
    latency: "0.8s",
    icon: Sparkles,
  },
  {
    promptType: "Private Legal",
    provider: "Targon",
    cost: "$0.014",
    latency: "2.1s",
    icon: LockKeyhole,
  },
  {
    promptType: "Summarization",
    provider: "DeepSeek",
    cost: "$0.003",
    latency: "1.0s",
    icon: TerminalSquare,
  },
];

const timeframeOptions: Array<{
  label: string;
  value: Timeframe;
}> = [
    { label: "7D", value: "7d" },
    { label: "30D", value: "30d" },
    { label: "90D", value: "90d" },
  ];

const chartSeries: Record<Timeframe, ChartPoint[]> = {
  "7d": [
    { label: "Mon", requests: 21400, savings: 980 },
    { label: "Tue", requests: 30200, savings: 1820 },
    { label: "Wed", requests: 25400, savings: 1390 },
    { label: "Thu", requests: 36100, savings: 2490 },
    { label: "Fri", requests: 30600, savings: 1590 },
    { label: "Sat", requests: 41200, savings: 2580 },
    { label: "Sun", requests: 32120, savings: 1920 },
  ],
  "30d": [
    { label: "Apr 19", requests: 28400, savings: 1120 },
    { label: "Apr 24", requests: 34600, savings: 1460 },
    { label: "Apr 29", requests: 31900, savings: 1340 },
    { label: "May 04", requests: 43200, savings: 2110 },
    { label: "May 09", requests: 47800, savings: 2460 },
    { label: "May 14", requests: 39400, savings: 1830 },
    { label: "May 18", requests: 51200, savings: 2920 },
  ],
  "90d": [
    { label: "Feb 18", requests: 18400, savings: 720 },
    { label: "Mar 04", requests: 22600, savings: 910 },
    { label: "Mar 18", requests: 29800, savings: 1280 },
    { label: "Apr 01", requests: 33800, savings: 1510 },
    { label: "Apr 15", requests: 42100, savings: 2180 },
    { label: "May 01", requests: 46400, savings: 2410 },
    { label: "May 18", requests: 58200, savings: 3420 },
  ],
};

function toPolyline(values: number[], width: number, height: number, padding = 8) {
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

function TrendSparkline({ card, index }: { card: KpiCard; index: number }) {
  const points = toPolyline(card.trend, 96, 40, 5);
  const areaPoints = `5,35 ${points} 91,35`;
  const gradientId = `kpi-sparkline-${index}`;

  return (
    <svg viewBox="0 0 96 40" className="h-11 w-24" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4A77DC" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4A77DC" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={points}
        fill="none"
        stroke="#4A77DC"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function RoutingEfficiencyChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>("7d");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const data = chartSeries[timeframe];
  const width = 680;
  const height = 300;
  const paddingY = 36;
  const chartBottom = height - paddingY;
  const chartTop = paddingY;
  const chartLeft = 48;
  const chartRight = width - 44;

  const { maxRequests, maxSavings, yTicksLeft, yTicksRight, pointCoords } =
    useMemo(() => {
      const maxReq = Math.max(...data.map((p) => p.requests));
      const maxSav = Math.max(...data.map((p) => p.savings));

      // Nice round numbers for Y ticks
      const niceMax = (v: number) => {
        const mag = Math.pow(10, Math.floor(Math.log10(v)));
        return Math.ceil(v / mag) * mag;
      };
      const niceReq = niceMax(maxReq);
      const niceSav = niceMax(maxSav);

      const tickCount = 5;
      const leftTicks = Array.from({ length: tickCount }, (_, i) =>
        Math.round((niceReq / (tickCount - 1)) * i)
      );
      const rightTicks = Array.from({ length: tickCount }, (_, i) =>
        Math.round((niceSav / (tickCount - 1)) * i)
      );

      const coords = data.map((point, index) => {
        const x =
          chartLeft +
          (index / Math.max(data.length - 1, 1)) * (chartRight - chartLeft);
        const yReq =
          chartBottom -
          (point.requests / niceReq) * (chartBottom - chartTop);
        const ySav =
          chartBottom -
          (point.savings / niceSav) * (chartBottom - chartTop);
        return { x, yReq, ySav };
      });

      return {
        maxRequests: niceReq,
        maxSavings: niceSav,
        yTicksLeft: leftTicks,
        yTicksRight: rightTicks,
        pointCoords: coords,
      };
    }, [data, chartBottom, chartTop, chartLeft, chartRight]);

  const requestPolyline = pointCoords.map((c) => `${c.x},${c.yReq}`).join(" ");
  const savingsPolyline = pointCoords.map((c) => `${c.x},${c.ySav}`).join(" ");
  const requestAreaPoints = `${chartLeft},${chartBottom} ${requestPolyline} ${chartRight},${chartBottom}`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const mouseX =
        ((e.clientX - rect.left) / rect.width) * width;
      let closest = 0;
      let minDist = Infinity;
      pointCoords.forEach((c, i) => {
        const dist = Math.abs(mouseX - c.x);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setHoveredIndex(closest);
    },
    [pointCoords, width]
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
          onChange={(v) => {
            setTimeframe(v);
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
          viewBox={`0 0 ${width} ${height}`}
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

          {/* Invisible rect for edge-to-edge hover capture */}
          <rect width={width} height={height} fill="transparent" />

          {/* Y-axis left ticks (Requests) */}
          {yTicksLeft.map((tick, i) => {
            const y =
              chartBottom -
              (tick / maxRequests) * (chartBottom - chartTop);
            return (
              <g key={`left-${i}`}>
                <line
                  x1={chartLeft}
                  x2={chartRight}
                  y1={y}
                  y2={y}
                  stroke="rgba(29, 52, 135, 0.08)"
                  strokeDasharray={i === 0 ? "none" : "4 4"}
                />
                <text
                  x={chartLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-sluice-muted font-sans text-[10px]"
                >
                  {tick >= 1000
                    ? `${(tick / 1000).toFixed(tick % 1000 === 0 ? 0 : 1)}K`
                    : tick}
                </text>
              </g>
            );
          })}

          {/* Y-axis right ticks (Savings) */}
          {yTicksRight.map((tick, i) => {
            const y =
              chartBottom -
              (tick / maxSavings) * (chartBottom - chartTop);
            return (
              <text
                key={`right-${i}`}
                x={chartRight + 8}
                y={y + 4}
                textAnchor="start"
                className="fill-sluice-routeBlue font-sans text-[10px]"
              >
                ${tick >= 1000
                  ? `${(tick / 1000).toFixed(tick % 1000 === 0 ? 0 : 1)}K`
                  : tick}
              </text>
            );
          })}

          {/* Area + lines */}
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

          {/* Data point dots */}
          {pointCoords.map((c, i) => (
            <g key={`dots-${i}`}>
              <circle
                cx={c.x}
                cy={c.yReq}
                r={hoveredIndex === i ? 5 : 3}
                fill="#1D3487"
                stroke="#f2f3f5"
                strokeWidth="2"
                style={{ transition: "r 150ms ease" }}
              />
              <circle
                cx={c.x}
                cy={c.ySav}
                r={hoveredIndex === i ? 5 : 3}
                fill="#4A77DC"
                stroke="#f2f3f5"
                strokeWidth="2"
                style={{ transition: "r 150ms ease" }}
              />
            </g>
          ))}

          {/* X-axis labels */}
          {data.map((point, index) => {
            const x = pointCoords[index].x;
            return (
              <text
                key={point.label}
                x={x}
                y={height - 10}
                textAnchor="middle"
                className={`font-sans text-[11px] ${hoveredIndex === index
                  ? "fill-sluice-navy font-semibold"
                  : "fill-sluice-muted"
                  }`}
              >
                {point.label}
              </text>
            );
          })}

          {/* Hover crosshair + tooltip */}
          {hoveredIndex !== null && (
            <>
              <line
                x1={pointCoords[hoveredIndex].x}
                x2={pointCoords[hoveredIndex].x}
                y1={chartTop}
                y2={chartBottom}
                stroke="rgba(29, 52, 135, 0.18)"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
              {/* Tooltip background */}
              {(() => {
                const tooltipW = 140;
                const tooltipH = 52;
                const cx = pointCoords[hoveredIndex].x;
                const tooltipY = chartTop - 4;
                const rawX = cx - tooltipW / 2;
                const clampedX = Math.max(
                  chartLeft,
                  Math.min(rawX, chartRight - tooltipW)
                );
                return (
                  <g>
                    <rect
                      x={clampedX}
                      y={tooltipY}
                      width={tooltipW}
                      height={tooltipH}
                      rx="10"
                      fill="#1D3487"
                      fillOpacity="0.95"
                    />
                    <text
                      x={clampedX + tooltipW / 2}
                      y={tooltipY + 20}
                      textAnchor="middle"
                      className="font-sans text-[11px] font-semibold"
                      fill="#fff"
                    >
                      {data[hoveredIndex].requests.toLocaleString()} reqs
                    </text>
                    <text
                      x={clampedX + tooltipW / 2}
                      y={tooltipY + 38}
                      textAnchor="middle"
                      className="font-sans text-[10px]"
                      fill="rgba(255,255,255,0.7)"
                    >
                      ${data[hoveredIndex].savings.toLocaleString()} saved
                    </text>
                  </g>
                );
              })()}
            </>
          )}
        </svg>
      </div>
    </section>
  );
}

export function DashboardPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={dashboardNavItems} showProgress={false} />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(74,119,220,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,52,135,0.1),transparent_30%)]" />

      <section id="overview" className="container-shell pb-14 pt-24 md:pt-28">

        <h1 className="reveal-soft font-sans text-xl font-semibold leading-tight tracking-normal text-sluice-navy sm:text-2xl">
          Dashboard
        </h1>
        <div className="mt-5 md:mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <article
                key={card.label}
                className="reveal-soft rounded-card border border-sluice-navy/15 bg-sluice-paper/58 p-5 backdrop-blur-[1px]"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sluice-navy/10 text-sluice-navy">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <TrendSparkline card={card} index={index} />
                </div>
                <p className="mt-4 font-sans text-sm font-semibold text-sluice-navy/60">
                  {card.label}
                </p>
                <p className="mt-1.5 font-sans text-3xl font-semibold leading-none tracking-normal text-sluice-navy tabular-nums sm:text-[2rem]">
                  {card.value}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <RoutingEfficiencyChart />
          </div>

          <section
            id="routes"
            className="min-w-0 rounded-card border border-sluice-navy/15 bg-sluice-paper/58 p-4 sm:p-5 lg:col-span-5 lg:self-end"
          >
            <h2 className="font-sans text-xl font-semibold leading-tight tracking-normal text-sluice-navy">
              Recent routes
            </h2>

            <div className="mt-5">
              <table className="w-full table-fixed border-collapse font-sans text-[13px] sm:text-sm">
                <thead>
                  <tr className="border-b border-sluice-navy/20 text-left text-[13px] leading-tight text-sluice-navy/60">
                    <th className="w-[42%] pb-3 pr-3 font-semibold">Prompt Type</th>
                    <th className="w-[28%] pb-3 pr-3 font-semibold">Chosen Provider</th>
                    <th className="w-[15%] pb-3 pr-2 text-right font-semibold">Cost</th>
                    <th className="w-[15%] pb-3 text-right font-semibold">Latency</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRoutes.map((route) => {
                    const Icon = route.icon;
                    return (
                      <tr
                        key={route.promptType}
                        className="border-b border-sluice-navy/10 last:border-b-0"
                      >
                        <td className="py-3.5 pr-3 align-top">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sluice-navy/10 text-sluice-navy">
                              <Icon size={16} strokeWidth={1.8} />
                            </span>
                            <span className="min-w-0 break-words font-medium leading-tight text-sluice-ink">
                              {route.promptType}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 pr-3 align-top break-words leading-tight text-sluice-navy">
                          {route.provider}
                        </td>
                        <td className="py-3.5 pr-2 text-right align-top font-mono text-[12px] text-sluice-ink sm:text-[13px]">
                          {route.cost}
                        </td>
                        <td className="py-3.5 text-right align-top font-mono text-[12px] text-sluice-muted sm:text-[13px]">
                          {route.latency}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
