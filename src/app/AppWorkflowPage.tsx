import { ArrowRight, GitBranch, Route, ShieldCheck } from "lucide-react";

import { Navbar } from "../components/Navbar";
import { appNavItems } from "../data/siteContent";

const workflowSteps = [
  {
    title: "Request",
    detail: "Prompt requirements, privacy needs, and budget enter the routing layer.",
    icon: Route,
  },
  {
    title: "Policy",
    detail: "Candidate routes are scored against live provider conditions.",
    icon: GitBranch,
  },
  {
    title: "Route",
    detail: "The best valid route is selected for the workload.",
    icon: ShieldCheck,
  },
];

export function AppWorkflowPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={appNavItems} />

      <section className="container-shell pb-14 pt-24 md:pt-28">
        <div className="max-w-3xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
            App preview
          </p>
          <h1 className="mt-3 font-sans text-2xl font-semibold leading-tight tracking-normal text-sluice-navy sm:text-3xl">
            Workflow mock space
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-6 text-sluice-muted sm:text-[15px]">
            A lightweight placeholder for the Sluice app workflow. The layout can
            evolve once the product flow is clearer.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="rounded-card border border-sluice-navy/15 bg-sluice-paper/58 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sluice-navy/10 text-sluice-navy">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  {index < workflowSteps.length - 1 && (
                    <ArrowRight
                      className="hidden text-sluice-navy/35 md:block"
                      size={18}
                      strokeWidth={1.8}
                    />
                  )}
                </div>
                <h2 className="mt-5 font-sans text-lg font-semibold leading-tight text-sluice-navy">
                  {step.title}
                </h2>
                <p className="mt-2 font-sans text-sm leading-6 text-sluice-muted">
                  {step.detail}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
