import { KpiGrid } from "@/features/dashboard/components/KpiGrid";
import { RecentRoutesTable } from "@/features/dashboard/components/RecentRoutesTable";
import { RoutingEfficiencyChart } from "@/features/dashboard/components/RoutingEfficiencyChart";
import { dashboardNavItems } from "@/shared/config/navigation";
import { Navbar } from "@/shared/layout/Navbar";

export function DashboardPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={dashboardNavItems} showProgress={false} />
      <div className="app-glow pointer-events-none fixed inset-0 -z-10" />

      <section
        id="overview"
        className="mx-auto w-full max-w-[1280px] px-6 pb-14 pt-24 sm:px-8 md:pt-28 lg:px-16"
      >
        <h1 className="animate-rise-in font-sans text-xl font-semibold leading-tight tracking-normal text-sluice-navy motion-reduce:animate-none sm:text-2xl">
          Dashboard
        </h1>

        <KpiGrid />

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <RoutingEfficiencyChart />
          </div>
          <RecentRoutesTable />
        </div>
      </section>
    </main>
  );
}
