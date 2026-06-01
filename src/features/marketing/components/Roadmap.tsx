import { useRef, useState } from "react";
import { roadmap } from "@/features/marketing/content";
import type { RoadmapItem, RoadmapTrack } from "@/features/marketing/types";
import { Container } from "@/shared/ui/Container";

const WEEK_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "8+"];
const TOTAL_WEEKS = WEEK_LABELS.length;
const LABEL_COL = "190px";
const GRID_TEMPLATE = `${LABEL_COL} repeat(${TOTAL_WEEKS}, minmax(0, 1fr))`;
const LANE_HEIGHT = 46;
const LANE_GAP = 8;
const TRACK_V_PADDING = 16;

type TrackColor = RoadmapTrack["color"];

type Palette = {
  pill: string;
  pillText: string;
  backdrop: string;
  border: string;
  indicator: string;
  shadow: string;
};

const PALETTES: Record<TrackColor, Palette> = {
  navy: {
    pill: "#263D8F",
    pillText: "#F7F8FA",
    backdrop: "rgba(38, 61, 143, 0.055)",
    border: "rgba(38, 61, 143, 0.17)",
    indicator: "#263D8F",
    shadow: "0 2px 8px rgba(38, 61, 143, 0.08)",
  },
  blue: {
    pill: "#255A6E",
    pillText: "#F7F8FA",
    backdrop: "rgba(37, 90, 110, 0.055)",
    border: "rgba(37, 90, 110, 0.17)",
    indicator: "#255A6E",
    shadow: "0 2px 8px rgba(37, 90, 110, 0.08)",
  },
  violet: {
    pill: "#4B4E7C",
    pillText: "#F7F8FA",
    backdrop: "rgba(75, 78, 124, 0.055)",
    border: "rgba(75, 78, 124, 0.17)",
    indicator: "#4B4E7C",
    shadow: "0 2px 8px rgba(75, 78, 124, 0.08)",
  },
};

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

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
    <section id="roadmap" className="scroll-mt-[4.5rem] py-12 md:py-16">
      <Container>
        <header>
          <h2 className="font-display text-4xl font-normal leading-[1.08] tracking-[-0.02em] text-sluice-navy md:text-5xl lg:text-[3.5rem]">
            Roadmap
          </h2>
        </header>

        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="mt-10 cursor-grab select-none overflow-x-auto rounded-frame border border-sluice-navy/15 bg-sluice-paper/40 backdrop-blur-[1px] [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        >
          <div className="min-w-[1440px] px-6 pb-8 pt-6 md:px-10 md:pb-10 md:pt-8">
            <WeekHeader />
            <div className="mt-3 flex flex-col gap-3">
              {roadmap.map((track) => (
                <TrackRow key={track.title} track={track} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function WeekHeader() {
  return (
    <div
      className="grid items-center pb-3"
      style={{ gridTemplateColumns: GRID_TEMPLATE }}
    >
      <div />
      {WEEK_LABELS.map((label, i) => (
        <div
          key={label}
          className={`text-center font-sans text-xs font-semibold tracking-normal ${
            i === TOTAL_WEEKS - 1 ? "text-sluice-muted/70" : "text-sluice-muted"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function TrackRow({ track }: { track: RoadmapTrack }) {
  const palette = PALETTES[track.color];
  const chartHeight =
    track.lanes * LANE_HEIGHT + Math.max(0, track.lanes - 1) * LANE_GAP;
  const totalRowHeight = chartHeight + TRACK_V_PADDING * 2;

  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: GRID_TEMPLATE,
        minHeight: `${totalRowHeight}px`,
      }}
    >
      {/* Label column */}
      <div className="flex flex-col gap-1 self-center pr-6">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="size-3 rounded-[3px]"
            style={{ backgroundColor: palette.indicator }}
          />
          <h3 className="font-sans text-lg font-semibold leading-none tracking-normal text-sluice-navy">
            {track.title}
          </h3>
        </div>
        <p className="pl-[22px] font-sans text-xs font-medium text-sluice-muted">
          {track.window}
        </p>
      </div>

      {/* Chart area spans the 9 week columns */}
      <div
        className="relative self-stretch"
        style={{
          gridColumn: `2 / span ${TOTAL_WEEKS}`,
          paddingBlock: `${TRACK_V_PADDING}px`,
        }}
      >
        <ChartArea
          track={track}
          chartHeight={chartHeight}
          palette={palette}
        />
      </div>
    </div>
  );
}

function ChartArea({
  track,
  chartHeight,
  palette,
}: {
  track: RoadmapTrack;
  chartHeight: number;
  palette: Palette;
}) {
  const backdropLeft = ((track.windowStart - 1) / TOTAL_WEEKS) * 100;
  const backdropRight = ((TOTAL_WEEKS - track.windowEnd) / TOTAL_WEEKS) * 100;

  return (
    <div className="relative h-full">
      {/* Vertical week guidelines */}
      {WEEK_LABELS.slice(0, -1).map((_, i) => (
        <div
          key={`guide-${i}`}
          className="pointer-events-none absolute inset-y-0 w-px bg-sluice-navy/[0.08]"
          style={{ left: `${((i + 1) / TOTAL_WEEKS) * 100}%` }}
          aria-hidden="true"
        />
      ))}

      {/* Active range backdrop, tinted with track color */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-3 -bottom-3 rounded-2xl border"
        style={{
          left: `${backdropLeft}%`,
          right: `${backdropRight}%`,
          backgroundColor: palette.backdrop,
          borderColor: palette.border,
        }}
      />

      {/* Items grid */}
      <div
        className="relative grid"
        style={{
          height: `${chartHeight}px`,
          gridTemplateColumns: `repeat(${TOTAL_WEEKS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${track.lanes}, ${LANE_HEIGHT}px)`,
          rowGap: `${LANE_GAP}px`,
        }}
      >
        {track.items.map((item) => (
          <ItemPill key={item.label} item={item} palette={palette} />
        ))}
      </div>
    </div>
  );
}

function ItemPill({
  item,
  palette,
}: {
  item: RoadmapItem;
  palette: Palette;
}) {
  return (
    <div
      className="relative z-10 mx-1 flex items-center justify-center overflow-hidden rounded-full px-2 font-sans text-[11px] font-semibold leading-tight tracking-normal text-center"
      style={{
        gridColumn: `${item.startWeek} / ${item.endWeek + 1}`,
        gridRow: item.lane + 1,
        background: palette.pill,
        color: palette.pillText,
        boxShadow: palette.shadow,
      }}
      title={item.label}
    >
      <span className="truncate">{item.label}</span>
    </div>
  );
}
