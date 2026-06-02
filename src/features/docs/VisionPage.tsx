const beliefs = [
  {
    title: "Routing is infrastructure",
    desc: "When there are ten AI providers, you can pick one manually. When there are a hundred, picking is a full-time job. When there are a thousand, it's infrastructure-level work. <strong>The layer that handles routing becomes as foundational as DNS or load balancing.</strong>",
  },
  {
    title: "Markets find truth faster than managers",
    desc: "A centralized router picks providers based on deals, contracts, and internal priorities. A competitive market picks based on outcomes. Miners who find better routes earn more. <strong>The network's understanding of provider quality sharpens with every request.</strong>",
  },
  {
    title: "Control of routing is control of the stack",
    desc: "Whoever controls where AI work flows controls the economics of the entire AI layer. That's too much power for any single company to hold. <strong>Distributing routing across a decentralized network means no one entity decides who wins.</strong>",
  },
];

export function VisionPage() {
  return (
    <article className="animate-docs-fade-in motion-reduce:animate-none">
      <div>
        <h1 className="m-0 font-sans text-[clamp(1.375rem,2.2vw,1.75rem)] font-[650] leading-[1.18] tracking-normal text-sluice-navy">
          Vision
        </h1>
        <p className="mt-4 max-w-[620px] font-sans text-[1.05rem] font-normal leading-[1.65] tracking-normal text-sluice-muted">
          The future of decentralized AI routing
        </p>
      </div>

      <div className="my-[clamp(1.5rem,3vw,2rem)] h-px bg-[linear-gradient(90deg,rgba(29,52,135,0.18)_0,rgba(29,52,135,0.18)_9px,transparent_9px,transparent_18px)] bg-[length:18px_1px] bg-repeat-x dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_9px,transparent_9px,transparent_18px)]" />

      <div className="flex max-w-[720px] flex-col gap-[1.7rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.05rem] [&_p]:font-normal [&_p]:leading-[1.72] [&_p]:tracking-normal [&_p]:text-sluice-ink [&_strong]:font-bold [&_strong]:text-sluice-navy">
        <p>
          AI isn't consolidating into one provider. It's going the other
          direction. Every few months there are more model APIs, more
          specialized subnets, more private compute options, more on-chain
          inference networks. The assumption that you pick one provider and
          stick with it is already breaking down for serious workloads.
        </p>
        <p>
          This creates a problem that gets worse as the space matures. The
          optimal provider for a cheap summarization task is different from
          the optimal provider for a complex reasoning job. Those choices
          shift as providers update pricing, degrade under load, or release
          new model versions. Keeping up manually doesn't scale.
        </p>
        <p>
          Sluice is built on the belief that routing is the next foundational
          layer of the AI stack, and that it should be decentralized from
          the start.
        </p>
      </div>

      <div className="mt-11">
        <h2 className="m-0 mb-2.5 font-sans text-lg font-[650] leading-normal tracking-[-0.01em] text-sluice-navy">
          What we believe
        </h2>
        <p className="m-0 font-sans text-[1.025rem] leading-[1.72] text-sluice-ink">
          Three convictions underpin the Sluice design.
        </p>
        <div className="mt-5 flex flex-col">
          {beliefs.map((b, i) => (
            <div key={b.title} className="flex gap-5 pb-8 last:pb-0">
              <div className="flex w-8 shrink-0 flex-col items-center">
                <span className="mb-1 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.04em] text-[#3b5bdb] dark:text-sluice-routeBlue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#3b5bdb] bg-white dark:border-sluice-routeBlue dark:bg-sluice-paperMuted" />
                {i < beliefs.length - 1 && (
                  <span className="mt-1 min-h-8 w-px flex-1 bg-sluice-navy/18" />
                )}
              </div>
              <div>
                <span className="mb-2 block font-sans text-[15px] font-semibold text-sluice-navy">
                  {b.title}
                </span>
                <p
                  className="m-0 font-sans text-[13px] leading-[1.65] text-sluice-muted [&_strong]:font-bold [&_strong]:text-sluice-navy"
                  dangerouslySetInnerHTML={{ __html: b.desc }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-11">
        <h2 className="m-0 mb-2.5 font-sans text-lg font-[650] leading-normal tracking-[-0.01em] text-sluice-navy">
          Not another AI provider
        </h2>
        <div className="mt-3 flex max-w-[720px] flex-col gap-[1.7rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.05rem] [&_p]:font-normal [&_p]:leading-[1.72] [&_p]:tracking-normal [&_p]:text-sluice-ink [&_strong]:font-bold [&_strong]:text-sluice-navy">
          <p>
            Sluice doesn't run models. It doesn't compete with Targon, Chutes,
            or any model API. The goal isn't to be the best provider; it's to
            be the layer that finds the best provider for each job and makes
            that decision trustworthy.
          </p>
          <p>
            Think of it as meta-infrastructure. DNS didn't compete with
            websites. TCP/IP didn't compete with applications. Sluice doesn't
            compete with the providers it routes to; it makes the whole
            ecosystem more useful by connecting demand to supply efficiently.
          </p>
          <p>
            That positioning matters because it means Sluice's success is
            aligned with the success of the broader AI provider ecosystem.
            More providers with distinct capabilities make routing more
            valuable, not less.
          </p>
        </div>
      </div>

      <div className="mt-11">
        <h2 className="m-0 mb-2.5 font-sans text-lg font-[650] leading-normal tracking-[-0.01em] text-sluice-navy">
          The flywheel
        </h2>
        <div className="mt-3 flex max-w-[720px] flex-col gap-[1.7rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.05rem] [&_p]:font-normal [&_p]:leading-[1.72] [&_p]:tracking-normal [&_p]:text-sluice-ink [&_strong]:font-bold [&_strong]:text-sluice-navy">
          <p>
            The compounding effect of a routing network is the core
            long-term bet. Every request generates signal about which
            providers perform best for which task types, under what
            conditions, at what price points. That signal makes the next
            routing decision better.
          </p>
          <p>
            Miners who invest in better routing strategies earn more rewards
            and stay competitive. Validators who benchmark accurately maintain
            their stake and credibility. Applications get progressively better
            outcomes without changing their integration. The network improves
            as a byproduct of being used.
          </p>
          <p>
            This is distinct from a routing product built by a single company,
            where improvements are gated on engineering resources and internal
            priorities. In a decentralized market, every participant has a
            financial incentive to make the network smarter.
          </p>
        </div>
      </div>

    </article>
  );
}
