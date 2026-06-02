import { recentRoutes } from "@/features/dashboard/data";

export function RecentRoutesTable() {
  return (
    <section
      id="routes"
      className="min-w-0 rounded-card border border-sluice-navy/15 bg-sluice-paper/58 p-4 sm:p-5 lg:col-span-5 lg:self-end dark:bg-white/[0.03]"
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
                  <td className="break-words py-3.5 pr-3 align-top leading-tight text-sluice-navy">
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
  );
}
