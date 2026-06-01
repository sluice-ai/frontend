import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import type { NavItem } from "../types";

type SubnetStat = {
  label: string;
  value: string;
  denom?: string;
  desc?: string;
};

const subnetNavItems: NavItem[] = [
  { label: "Subnet", href: "/subnet" },
  { label: "Docs", href: "/docs" },
];

const subnetStats: SubnetStat[] = [
  {
    label: "Active Miners",
    value: "1",
  },
  {
    label: "Active Validators",
    value: "1",
  },
  {
    label: "Total Stake",
    value: "44.64k",
    denom: "α",
  },
  {
    label: "TAO Pool",
    value: "3.15",
    denom: "τ",
  },
  {
    label: "Daily Emission",
    value: "296.02",
    denom: "α",
    desc: "0.0004 τ/block rate",
  },
];

export function SubnetDocsPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={subnetNavItems} showProgress={false} />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(74,119,220,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(29,52,135,0.1),transparent_30%)]" />

      <section className="mx-auto flex w-full max-w-[1280px] flex-1 items-center justify-center px-6 pb-16 pt-28 sm:px-8 md:pt-24 lg:px-16">
        <div className="w-full">
          <div className="mb-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
            {subnetStats.map((stat, index) => (
              <article
                key={stat.label}
                className="flex animate-rise-in flex-col gap-2.5 rounded-2xl border border-sluice-navy/16 bg-sluice-paper/50 p-7 shadow-[0_4px_20px_rgba(16,20,34,0.02)] transition-colors motion-reduce:animate-none hover:border-sluice-navy/28 hover:bg-sluice-paper/80"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="font-sans text-[12.5px] font-semibold uppercase tracking-[0.06em] text-sluice-muted">
                  {stat.label}
                </span>
                <span className="font-display text-[clamp(28px,3.3vw,38px)] font-normal leading-[1.05] text-sluice-navy">
                  {stat.value}
                  {stat.denom ? (
                    <span className="ml-1 font-sans text-[clamp(19px,2vw,22px)] font-semibold opacity-85">
                      {stat.denom}
                    </span>
                  ) : null}
                </span>
                {stat.desc ? (
                  <span className="font-sans text-[13px] leading-[1.4] text-sluice-muted">
                    {stat.desc}
                  </span>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
