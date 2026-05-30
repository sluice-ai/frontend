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
    <article className="docs-article">
      <div className="docs-placeholder__hero">
        <h1 className="docs-placeholder__title">Vision</h1>
        <p className="docs-index__subtitle">
          The future of decentralized AI routing
        </p>
      </div>

      <div className="docs-article__rule" />

      <div className="docs-article__body">
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

      <div className="sluice-core-section">
        <h2 className="sluice-core-section-title">What we believe</h2>
        <p className="sluice-core-section-body">
          Three convictions underpin the Sluice design.
        </p>
        <div className="vision-timeline" style={{ marginTop: "1.25rem" }}>
          {beliefs.map((b, i) => (
            <div key={b.title} className="vision-timeline__item">
              <div className="vision-timeline__marker">
                <span className="vision-timeline__num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="vision-timeline__dot" />
                {i < beliefs.length - 1 && (
                  <span className="vision-timeline__line" />
                )}
              </div>
              <div className="vision-timeline__content">
                <span className="vision-timeline__title">{b.title}</span>
                <p className="vision-timeline__desc" dangerouslySetInnerHTML={{ __html: b.desc }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sluice-core-section">
        <h2 className="sluice-core-section-title">Not another AI provider</h2>
        <div className="docs-article__body" style={{ marginTop: "0.75rem" }}>
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

      <div className="sluice-core-section">
        <h2 className="sluice-core-section-title">The flywheel</h2>
        <div className="docs-article__body" style={{ marginTop: "0.75rem" }}>
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
