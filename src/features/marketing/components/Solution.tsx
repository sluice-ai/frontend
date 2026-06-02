import { layers } from "@/features/marketing/content";
import { cn } from "@/shared/lib/cn";

const marqueeLayers = [
  ...layers.slice(1),
  layers[0],
];

function LayerCard({ layer }: { layer: (typeof layers)[number] }) {
  const isSluice = !!layer.isSluice;

  return (
    <article
      className={cn(
        "relative flex min-h-[160px] w-[76vw] min-w-[280px] max-w-[480px] shrink-0 select-none flex-col justify-between rounded-card border p-6 md:min-h-[188px] md:w-[31vw] lg:w-[24vw] xl:w-[23.5vw]",
        isSluice
          ? "z-10 border-sluice-routeBlue/45 bg-[#EBF0FF] dark:bg-sluice-routeBlue/12"
          : "border-sluice-navy/15 bg-[#FAF9F5]/70 dark:bg-white/[0.03]",
      )}
    >
      <div>
        <div
          className={cn(
            "font-sans text-[11px] font-semibold uppercase leading-none tracking-widest",
            isSluice ? "text-sluice-routeBlue" : "text-sluice-navy/60",
          )}
        >
          {layer.name}
        </div>
        <h3 className="mt-4 font-display text-2xl font-normal leading-[1.15] tracking-normal text-sluice-navy md:text-3xl">
          {layer.title}
        </h3>
      </div>
      <p className="mt-4 max-w-[32ch] font-sans text-sm leading-[1.5] tracking-normal text-sluice-muted md:text-base">
        {layer.description}
      </p>
    </article>
  );
}

export function Solution() {
  return (
    <section id="solution" className="overflow-hidden py-12 md:py-16">
      <div className="w-full overflow-hidden py-5 md:py-8">
        <div className="flex w-max animate-sluice-layer-marquee will-change-transform [backface-visibility:hidden] hover:[animation-play-state:paused] active:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((setIndex) => (
            <div
              key={setIndex}
              aria-hidden={setIndex === 1}
              className="flex shrink-0 gap-5 pr-5 md:gap-6 md:pr-6"
            >
              {marqueeLayers.map((layer) => (
                <LayerCard key={`${setIndex}-${layer.name}`} layer={layer} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
