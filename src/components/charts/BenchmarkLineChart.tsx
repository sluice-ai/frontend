import { useMemo, useState } from "react";

import type { BenchmarkSeries } from "../../types";

type BenchmarkLineChartProps = {
  series: BenchmarkSeries[];
};

const width = 560;
const height = 300;
const padding = 44;
const yTicks = [50, 60, 70, 80, 90];

function scaleX(index: number, length: number) {
  return padding + (index * (width - padding * 2)) / (length - 1);
}

function scaleY(value: number) {
  const min = 50;
  const max = 92;

  return height - padding - ((value - min) / (max - min)) * (height - padding * 2);
}

function pathFor(values: number[]) {
  return values
    .map((value, index) => {
      const command = index === 0 ? "M" : "L";

      return `${command}${scaleX(index, values.length).toFixed(1)} ${scaleY(
        value,
      ).toFixed(1)}`;
    })
    .join(" ");
}

export function BenchmarkLineChart({ series }: BenchmarkLineChartProps) {
  const pointCount = series[0]?.values.length ?? 0;
  const [activeSeriesLabel, setActiveSeriesLabel] = useState(
    series[0]?.label ?? "",
  );
  const [activeIndex, setActiveIndex] = useState(Math.max(pointCount - 1, 0));

  const activeSeries = useMemo(() => {
    return (
      series.find((item) => item.label === activeSeriesLabel) ?? series[0]
    );
  }, [activeSeriesLabel, series]);

  const activeValue = activeSeries?.values[activeIndex] ?? 0;

  return (
    <figure className="rounded-card border border-sluice-navy/20 bg-sluice-paper/75 p-4 md:p-6">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-sans text-base font-semibold tracking-normal text-sluice-ink">
            Route score over benchmark windows
          </h3>
          <p className="caption">
            Custom SVG chart comparing policy-aware routing to simpler baselines.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {series.map((item) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={item.label === activeSeries?.label}
              className={`inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 font-sans text-xs font-medium transition-colors ${
                item.label === activeSeries?.label
                  ? "border-sluice-navy text-sluice-navy"
                  : "border-transparent text-sluice-muted hover:border-sluice-navy/20"
              }`}
              onClick={() => setActiveSeriesLabel(item.label)}
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.stroke }}
              />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 rounded-[14px] border border-sluice-navy/15 bg-sluice-paperWarm/50 px-4 py-3">
        <span className="font-sans text-sm font-semibold tracking-normal text-sluice-navy">
          W{activeIndex + 1}
        </span>
        <span className="mx-2 text-sluice-muted">/</span>
        <span className="font-sans text-sm text-sluice-ink">
          {activeSeries?.label}: {activeValue}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-labelledby="benchmark-chart-title benchmark-chart-desc"
        className="h-auto w-full"
      >
        <title id="benchmark-chart-title">Benchmark route score chart</title>
        <desc id="benchmark-chart-desc">
          Sluice route scores climb above fixed provider and cheapest only
          baselines.
        </desc>
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          rx="20"
          fill="#F2F3F5"
          stroke="rgba(29,52,135,0.12)"
        />

        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={padding}
              y1={scaleY(tick)}
              x2={width - padding}
              y2={scaleY(tick)}
              stroke="rgba(16,20,34,0.12)"
            />
            <text
              x={padding - 12}
              y={scaleY(tick) + 4}
              textAnchor="end"
              fill="#707380"
              fontSize="11"
            >
              {tick}
            </text>
          </g>
        ))}

        {Array.from({ length: pointCount }).map((_, index) => (
          <text
            key={index}
            x={scaleX(index, pointCount)}
            y={height - 16}
            textAnchor="middle"
            fill="#707380"
            fontSize="10"
          >
            W{index + 1}
          </text>
        ))}

        {series.map((item) => (
          <g key={item.label}>
            <path
              d={pathFor(item.values)}
              fill="none"
              stroke={item.stroke}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={item.label === activeSeries?.label ? "3" : "1.8"}
              opacity={item.label === activeSeries?.label ? "1" : "0.5"}
            />
            {item.values.map((value, index) => (
              <g
                key={`${item.label}-${index}`}
                role="button"
                tabIndex={0}
                aria-label={`${item.label} week ${index + 1}: ${value}`}
                className="cursor-pointer"
                onClick={() => {
                  setActiveSeriesLabel(item.label);
                  setActiveIndex(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    setActiveSeriesLabel(item.label);
                    setActiveIndex(index);
                  }
                }}
              >
                <circle
                  cx={scaleX(index, item.values.length)}
                  cy={scaleY(value)}
                  r={
                    item.label === activeSeries?.label && index === activeIndex
                      ? "6"
                      : "4"
                  }
                  fill={
                    item.label === activeSeries?.label && index === activeIndex
                      ? item.stroke
                      : "#F2F3F5"
                  }
                  stroke={item.stroke}
                  strokeWidth="1.8"
                />
              </g>
            ))}
          </g>
        ))}
      </svg>
    </figure>
  );
}
