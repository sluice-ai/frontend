import { kpiCards } from "@/features/dashboard/data";
import { TrendSparkline } from "@/features/dashboard/components/TrendSparkline";

export function KpiGrid() {
  return (
    <div className="mt-5 grid gap-4 md:mt-6 sm:grid-cols-2 xl:grid-cols-4">
      {kpiCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <article
            key={card.label}
            className="animate-rise-in rounded-card border border-sluice-navy/15 bg-sluice-paper/58 p-5 backdrop-blur-[1px] motion-reduce:animate-none"
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
  );
}
