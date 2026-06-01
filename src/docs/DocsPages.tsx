import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { docsSidebar } from "./docsData";

const overviewLinkLabels = new Set([
  "Sluice",
  "Scoring Engine",
]);

const overviewLinks = docsSidebar
  .flatMap((section) => section.items)
  .filter((item) => overviewLinkLabels.has(item.label));

/**
 * Docs index page shown at /docs/introduction.
 */
export function DocsIndex() {
  return (
    <article className="animate-docs-fade-in motion-reduce:animate-none">
      <div>
        <h1 className="m-0 font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-[650] leading-[1.14] tracking-normal text-sluice-navy">
          Sluice Documentation
        </h1>
        <p className="mt-4 max-w-[620px] font-sans text-[1.05rem] font-normal leading-[1.65] tracking-normal text-sluice-muted">
          What is Sluice and why it exists
        </p>
      </div>

      <div className="my-[clamp(1.5rem,3vw,2rem)] h-px bg-[linear-gradient(90deg,rgba(29,52,135,0.18)_0,rgba(29,52,135,0.18)_9px,transparent_9px,transparent_18px)] bg-[length:18px_1px] bg-repeat-x" />

      <div className="flex max-w-[720px] flex-col gap-[1.7rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.05rem] [&_p]:font-normal [&_p]:leading-[1.72] [&_p]:tracking-normal [&_p]:text-sluice-ink [&_strong]:font-bold [&_strong]:text-sluice-navy">
        <p>
          AI is fragmenting fast. Every month there are more providers, more
          model APIs, more specialized subnets, and more tradeoffs to reason
          about. Picking the right destination for each request is becoming its
          own full-time problem.
        </p>
        <p>
          Sluice solves this at the network level. You send a request with a
          policy (budget, latency, quality floor, privacy requirements) and
          Sluice routes it to the best provider that satisfies those
          constraints. Miners compete to propose the optimal route. Validators
          benchmark the outcomes. The winning route gets executed and the miner
          that found it earns the reward.
        </p>
        <p>
          The result is a routing layer that improves automatically as the
          network grows. More miners bring more strategy diversity. More
          validators bring better signal. More requests build a richer picture
          of which providers actually perform.
        </p>
        <p>
          Start with the core concepts below. Guides and API reference will
          fill in as the testnet launches.
        </p>
      </div>

      <div className="mt-[clamp(2rem,4vw,2.75rem)] grid grid-cols-1 gap-3.5 min-[720px]:grid-cols-3" aria-label="Start here">
        {overviewLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className="group grid min-h-[132px] min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 rounded-2xl border border-sluice-navy/16 bg-sluice-paper/46 p-[1.125rem] text-inherit no-underline transition-colors hover:border-sluice-navy/32 hover:bg-sluice-paper/70"
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-sluice-navy/16 bg-sluice-navy/5 text-sluice-navy transition-colors group-hover:border-sluice-navy group-hover:bg-sluice-navy group-hover:text-sluice-paper">
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className="overflow-visible [&>*]:[transform-box:fill-box] [&>*]:[transform-origin:center]"
                />
              </span>
              <span className="flex min-w-0 flex-col gap-[0.35rem]">
                <span className="block font-sans text-sm font-bold leading-[1.25] tracking-normal text-sluice-navy">
                  {item.label}
                </span>
                <span className="block font-sans text-[13px] font-normal leading-[1.45] tracking-normal text-sluice-muted">
                  {item.description}
                </span>
              </span>
              <span className="inline-flex items-center justify-center text-sluice-navy opacity-0 transition-opacity group-hover:opacity-70" aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </article>
  );
}

/**
 * Generic placeholder page for any docs route that doesn't have
 * content yet. Shows the page title and a drafting state.
 */
export function DocsPlaceholder() {
  const location = useLocation();

  // Find the current item in the sidebar data
  let currentItem = null;
  for (const section of docsSidebar) {
    const found = section.items.find((item) => item.href === location.pathname);
    if (found) {
      currentItem = found;
      break;
    }
  }

  if (!currentItem) {
    return (
      <article className="animate-docs-fade-in motion-reduce:animate-none">
        <h1 className="m-0 font-sans text-[clamp(1.375rem,2.2vw,1.75rem)] font-[650] leading-[1.18] tracking-normal text-sluice-navy">
          Page Not Found
        </h1>
        <p className="m-0 font-sans text-[1.05rem] font-normal leading-[1.72] tracking-normal text-sluice-ink [&_strong]:font-bold [&_strong]:text-sluice-navy">
          This documentation page doesn't exist yet.
        </p>
        <Link
          to="/docs"
          className="mt-6 inline-flex font-sans text-sm font-bold tracking-normal text-sluice-navy no-underline transition-opacity hover:opacity-70"
        >
          Return to docs overview
        </Link>
      </article>
    );
  }

  return (
    <article className="animate-docs-fade-in motion-reduce:animate-none">
      <div>
        <h1 className="m-0 font-sans text-[clamp(1.375rem,2.2vw,1.75rem)] font-[650] leading-[1.18] tracking-normal text-sluice-navy">
          {currentItem.label}
        </h1>
        {currentItem.description && (
          <p className="mt-4 max-w-[620px] font-sans text-[1.05rem] font-normal leading-[1.65] tracking-normal text-sluice-muted">
            {currentItem.description}
          </p>
        )}
      </div>

      <div className="my-[clamp(1.5rem,3vw,2rem)] h-px bg-[linear-gradient(90deg,rgba(29,52,135,0.18)_0,rgba(29,52,135,0.18)_9px,transparent_9px,transparent_18px)] bg-[length:18px_1px] bg-repeat-x" />

      <div className="max-w-[720px] border-l border-sluice-navy/22 pl-5">
        <div className="mb-4 inline-flex h-7 items-center rounded-full border border-sluice-navy/14 bg-sluice-navy/6 px-2.5 font-sans text-[11px] font-bold uppercase leading-none tracking-normal text-sluice-navy">
          Drafting
        </div>
        <p className="m-0 font-sans text-[1.05rem] font-normal leading-[1.72] tracking-normal text-sluice-ink [&_strong]:font-bold [&_strong]:text-sluice-navy">
          This section is currently being written. Check back soon for
          comprehensive documentation on <strong>{currentItem.label}</strong>.
        </p>
        <div className="mt-[1.6rem] flex flex-col gap-2.5">
          <div className="h-2.5 w-full animate-docs-skeleton rounded-full bg-[linear-gradient(90deg,rgba(29,52,135,0.05)_0%,rgba(29,52,135,0.12)_50%,rgba(29,52,135,0.05)_100%)] bg-[length:200%_100%] motion-reduce:animate-none" />
          <div className="h-2.5 w-4/5 animate-docs-skeleton rounded-full bg-[linear-gradient(90deg,rgba(29,52,135,0.05)_0%,rgba(29,52,135,0.12)_50%,rgba(29,52,135,0.05)_100%)] bg-[length:200%_100%] motion-reduce:animate-none" />
          <div className="h-2.5 w-3/5 animate-docs-skeleton rounded-full bg-[linear-gradient(90deg,rgba(29,52,135,0.05)_0%,rgba(29,52,135,0.12)_50%,rgba(29,52,135,0.05)_100%)] bg-[length:200%_100%] motion-reduce:animate-none" />
          <div className="h-2.5 w-[90%] animate-docs-skeleton rounded-full bg-[linear-gradient(90deg,rgba(29,52,135,0.05)_0%,rgba(29,52,135,0.12)_50%,rgba(29,52,135,0.05)_100%)] bg-[length:200%_100%] motion-reduce:animate-none" />
          <div className="h-2.5 w-2/5 animate-docs-skeleton rounded-full bg-[linear-gradient(90deg,rgba(29,52,135,0.05)_0%,rgba(29,52,135,0.12)_50%,rgba(29,52,135,0.05)_100%)] bg-[length:200%_100%] motion-reduce:animate-none" />
        </div>
      </div>
    </article>
  );
}
