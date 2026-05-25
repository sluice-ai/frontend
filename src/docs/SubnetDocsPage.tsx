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

      <section className="container-shell flex flex-1 items-center justify-center pb-16 pt-28 md:pt-24">
        <div className="w-full">
          <div className="subnet-stats-grid">
            {subnetStats.map((stat, index) => (
              <article
                key={stat.label}
                className="subnet-stat-card reveal-soft"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="subnet-stat-card__label">{stat.label}</span>
                <span className="subnet-stat-card__value font-serif">
                  {stat.value}
                  {stat.denom ? <span className="denom">{stat.denom}</span> : null}
                </span>
                {stat.desc ? (
                  <span className="subnet-stat-card__desc">{stat.desc}</span>
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
