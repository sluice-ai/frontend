import { scoringWeights } from "@/features/marketing/content";
import { Container } from "@/shared/ui/Container";
import { SectionHeader } from "@/shared/ui/SectionHeader";

const SEGMENT_STYLES = [
  { bg: "bg-[#6d96f0]", text: "text-[#06080f]", swatch: "bg-[#6d96f0]" },
  { bg: "bg-[#6d96f0]/68", text: "text-[#06080f]", swatch: "bg-[#6d96f0]/68" },
  { bg: "bg-[#6d96f0]/42", text: "text-[#edeff5]", swatch: "bg-[#6d96f0]/42" },
  { bg: "bg-[#6d96f0]/24", text: "text-[#edeff5]", swatch: "bg-[#6d96f0]/24" },
];

const getShortLabel = (label: string) => {
  if (label.toLowerCase().includes("cost")) return "cost";
  return label.toLowerCase();
};

const getCapitalizedShortLabel = (label: string) => {
  if (label.toLowerCase().includes("cost")) return "Cost";
  return label;
};

export function Benchmark() {
  const ariaLabel = `Weight distribution: ${scoringWeights
    .map((w) => `${getShortLabel(w.label)} ${Math.round(w.value * 100)}%`)
    .join(", ")}`;

  return (
    <section id="benchmark" className="scroll-mt-[4.5rem] py-8 md:py-12">
      <Container>
        {/* Title – spans full width above both columns */}
        <SectionHeader title="Benchmark" />

        {/* Two-column: description left, terminal right */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left – copy */}
          <div className="flex flex-col justify-center gap-6">
            <p className="font-sans text-base leading-7 tracking-normal text-sluice-ink md:text-lg">
              Validators benchmark proposed routes against reference
              alternatives and reward the cheapest valid option.
            </p>

            <p className="font-sans text-base leading-7 tracking-normal text-sluice-ink md:text-lg">
              <span className="font-semibold">Quality-first scoring</span>{" "}
              ensures routes clear quality thresholds before cost or speed
              matter. RouteLLM cuts costs by{" "}
              <span className="font-semibold">2×+</span> without losing quality.
            </p>

            <p className="font-sans text-base leading-7 tracking-normal text-sluice-ink md:text-lg">
              <span className="font-semibold">Dynamic routing</span>{" "}
              evaluates miners across changing model pools; UniRoute routes
              effectively across{" "}
              <span className="font-semibold">30+ unseen LLMs</span>.
            </p>
          </div>

          {/* Right – terminal */}
          <div>
            <div
              className="overflow-hidden rounded-[14px] border border-white/[0.17] bg-[#06080f] font-mono shadow-[0_30px_60px_-30px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.02)]"
              aria-label="Scoring formula"
            >
              {/* Title Bar */}
              <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-black/45 bg-gradient-to-b from-white/[0.045] to-white/[0.018] px-3.5 py-[11px]">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.35)]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.35)]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.35)]" />
                </div>
                <div className="text-center text-[11.5px] font-medium tracking-[0.02em] text-[#c3c8d6]">
                  <span className="text-[#838a9d]">~/sluice/</span>scoring.sl
                </div>
                <div />
              </div>

              {/* Body */}
              <div className="bg-[#06080f] bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(109,150,240,0.06),transparent_60%)] pt-[22px] px-[26px] pb-[26px] text-sm leading-[1.85] text-[#c3c8d6]">
                {/* Formula lines */}
                <div className="grid grid-cols-[22px_1fr] gap-3.5 items-baseline">
                  <span className="select-none text-right text-xs text-[#5b6275]">1</span>
                  <span className="text-[#c3c8d6]">
                    <span className="font-semibold text-[#edeff5]">score</span>{" "}
                    <span className="text-[#5b6275]">=</span>{" "}
                    <span className="font-semibold text-[#8aabf4]">gate</span>{" "}
                    <span className="text-[#5b6275]">× (</span>
                  </span>
                </div>

                {scoringWeights.map((weight, index) => {
                  const shortLabel = getShortLabel(weight.label);
                  const isLast = index === scoringWeights.length - 1;
                  const paddingLength = 12 - shortLabel.length;
                  const paddingSpaces = " ".repeat(Math.max(1, paddingLength));
                  return (
                    <div
                      key={weight.label}
                      className="grid grid-cols-[22px_1fr] gap-3.5 items-baseline"
                    >
                      <span className="select-none text-right text-xs text-[#5b6275]">
                        {index + 2}
                      </span>
                      <span className="pl-7 text-[#c3c8d6] whitespace-pre">
                        <span className="font-semibold text-[#edeff5]">
                          {weight.value.toFixed(2)}
                        </span>
                        {"  "}
                        <span className="text-[#838a9d]">{shortLabel}</span>
                        {isLast ? "" : paddingSpaces}
                        {!isLast && <span className="text-[#5b6275]">+</span>}
                      </span>
                    </div>
                  );
                })}

                <div className="grid grid-cols-[22px_1fr] gap-3.5 items-baseline">
                  <span className="select-none text-right text-xs text-[#5b6275]">
                    {scoringWeights.length + 2}
                  </span>
                  <span className="text-[#c3c8d6]">
                    <span className="text-[#5b6275]">)</span>
                    <span className="ml-0.5 inline-block h-3.5 w-[7px] align-text-bottom bg-[#6d96f0] animate-caret" />
                  </span>
                </div>

                {/* weight distribution separator */}
                <div
                  className="relative mt-[18px] mb-[16px] border-t border-dashed border-white/8 before:absolute before:top-[-8px] before:left-0 before:bg-[#06080f] before:pr-2.5 before:text-[10.5px] before:tracking-[0.02em] before:text-[#838a9d] before:content-['weight_distribution']"
                  aria-hidden="true"
                />

                {/* Stacked bar */}
                <div
                  className="flex h-[44px] overflow-hidden rounded-lg border border-white/7"
                  role="img"
                  aria-label={ariaLabel}
                >
                  {scoringWeights.map((weight, index) => {
                    const style = SEGMENT_STYLES[index] || { bg: "", text: "" };
                    const percent = Math.round(weight.value * 100);
                    return (
                      <div
                        key={weight.label}
                        className={`flex items-center px-3 text-[11.5px] font-semibold transition-[filter] duration-220 hover:brightness-[1.18] cursor-pointer ${style.bg} ${style.text}`}
                        style={{ flex: `${percent} 1 0%` }}
                      >
                        <span className="mr-2">{percent}%</span>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div
                  className="mt-3 flex justify-between gap-1.5 text-[10.5px] text-[#838a9d] max-[520px]:grid max-[520px]:grid-cols-2 max-[520px]:gap-2"
                  aria-hidden="true"
                >
                  {scoringWeights.map((weight, index) => {
                    const style = SEGMENT_STYLES[index] || { swatch: "" };
                    return (
                      <span key={weight.label} className="inline-flex items-center gap-1.75">
                        <span className={`h-2 w-2 rounded-[3px] ${style.swatch}`} />
                        {getCapitalizedShortLabel(weight.label)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
