import { roadmap } from "@/features/marketing/content";
import type { RoadmapItem, RoadmapTrack } from "@/features/marketing/types";
import { Container } from "@/shared/ui/Container";
import { SectionHeader } from "@/shared/ui/SectionHeader";

// Nine columns: weeks 1–8 plus a trailing "8+" bucket.
const WEEK_LABELS = ["1", "2", "3", "4", "5", "6", "7", "8", "8+"];
const TOTAL_WEEKS = WEEK_LABELS.length;
const GRID_COLS = `repeat(${TOTAL_WEEKS}, minmax(0, 1fr))`;

// Each track maps to a theme-aware accent token defined in styles/index.css.
const TRACK_ACCENT: Record<RoadmapTrack["color"], string> = {
  navy: "--roadmap-tech",
  blue: "--roadmap-net",
  violet: "--roadmap-com",
};

export function Roadmap() {
  return (
    <section id="roadmap" className="scroll-mt-[4.5rem] py-12 md:py-16">
      <Container>
        <SectionHeader title="Roadmap" />

        <div className="mt-10 overflow-hidden rounded-card border border-sluice-navy/15 bg-sluice-paper/40 backdrop-blur-[1px] dark:bg-white/[0.03]">
          <WeekRuler />
          {roadmap.map((track) => (
            <TrackRow key={track.title} track={track} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function WeekRuler() {
  return (
    <div
      className="grid border-b border-sluice-navy/10 px-1"
      style={{ gridTemplateColumns: GRID_COLS }}
    >
      {WEEK_LABELS.map((label) => (
        <div
          key={label}
          className="border-r border-sluice-navy/10 py-2.5 text-center font-mono text-[11px] text-sluice-muted last:border-r-0"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

function TrackRow({ track }: { track: RoadmapTrack }) {
  const accent = `var(${TRACK_ACCENT[track.color]})`;
  // Order by start week so the numbering reads chronologically top-to-bottom.
  const items = [...track.items].sort(
    (a, b) => a.startWeek - b.startWeek || a.endWeek - b.endWeek,
  );

  return (
    <div className="border-b border-sluice-navy/10 pb-6 pt-[22px] last:border-b-0">
      {/* Track header */}
      <div className="mb-3.5 flex items-baseline justify-between gap-3 px-[22px]">
        <h3 className="inline-flex items-baseline gap-2.5 text-[17px] font-semibold text-sluice-navy">
          <span
            aria-hidden="true"
            className="size-2 self-center rounded-[3px]"
            style={{ background: `rgb(${accent})` }}
          />
          {track.title}
        </h3>
        <p className="font-mono text-[12.5px] text-sluice-muted">
          {track.window}
        </p>
      </div>

      {/* Bar canvas — bars positioned across the shared 9-week grid */}
      <div
        className="relative flex flex-col gap-1 px-1 py-1"
        style={{ display: "grid", gridTemplateColumns: GRID_COLS }}
      >
        {/* Vertical guide lines aligned to the ruler grid */}
        {WEEK_LABELS.slice(1).map((_, i) => (
          <div
            key={`guide-${i}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-px bg-sluice-navy/[0.07]"
            style={{ left: `${((i + 1) / TOTAL_WEEKS) * 100}%` }}
          />
        ))}
        {/* Bars span the full grid width */}
        <div className="col-span-full flex flex-col gap-1">
          {items.map((item, i) => (
            <TrackBar key={item.label} item={item} index={i} accent={accent} />
          ))}
        </div>
      </div>

      {/* Readable label list — always legible, no truncation */}
      <div className="mt-3.5 grid grid-cols-1 gap-0.5 px-[22px] min-[541px]:hidden">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="grid grid-cols-[22px_1fr_auto] items-baseline gap-3 py-[3px]"
          >
            <span
              className="font-mono text-[11px] font-semibold"
              style={{ color: `rgb(${accent})` }}
            >
              {twoDigits(i)}
            </span>
            <span className="text-[13.5px] font-medium text-sluice-navy">
              {item.label}
            </span>
            <span className="font-mono text-[11px] text-sluice-muted">
              {weekRange(item)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrackBar({
  item,
  index,
  accent,
}: {
  item: RoadmapItem;
  index: number;
  accent: string;
}) {
  const left = ((item.startWeek - 1) / TOTAL_WEEKS) * 100;
  const width = ((item.endWeek - item.startWeek + 1) / TOTAL_WEEKS) * 100;

  return (
    <div className="relative h-[26px]">
      <div
        className="absolute inset-y-[3px] flex items-center justify-center overflow-hidden rounded-lg px-1.5 font-mono text-[10.5px] text-sluice-ink min-[541px]:justify-start min-[541px]:px-2.5"
        style={{
          left: `${left}%`,
          width: `${width}%`,
          background: `rgb(${accent} / 0.22)`,
          border: `1px solid rgb(${accent} / 0.45)`,
        }}
        title={item.label}
      >
        <span
          className="font-semibold min-[541px]:mr-1.5"
          style={{ color: `rgb(${accent})` }}
        >
          {twoDigits(index)}
        </span>
        <span className="hidden truncate min-[541px]:inline">{item.label}</span>
      </div>
    </div>
  );
}

function twoDigits(index: number) {
  return String(index + 1).padStart(2, "0");
}

function weekRange(item: RoadmapItem) {
  // endWeek of 9 lands in the trailing "8+" bucket.
  if (item.endWeek >= TOTAL_WEEKS) return `w${item.startWeek} +`;
  return `w${item.startWeek} – ${item.endWeek}`;
}
