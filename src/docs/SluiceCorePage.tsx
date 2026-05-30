const steps = [
  {
    num: "01",
    title: "Request",
    desc: "A user or application submits a prompt with constraints: budget ceiling, latency target, quality floor, and privacy requirements.",
  },
  {
    num: "02",
    title: "Compete",
    desc: "Miners receive the task metadata and independently propose the routing decision they believe best satisfies the stated policy.",
  },
  {
    num: "03",
    title: "Benchmark",
    desc: "Validators execute proposed routes, compare outcomes against reference alternatives, and compute a regret-weighted score for each miner.",
  },
  {
    num: "04",
    title: "Reward",
    desc: "The miner whose route best satisfies the objective function earns the reward. The winning route is returned to the application.",
  },
];

const pillars = [
  {
    title: "Evaluation moat",
    desc: "The hardest part isn't proposing a route; it's proving it was optimal under real conditions. A strong benchmark layer becomes a durable competitive advantage.",
  },
  {
    title: "Data flywheel",
    desc: "Each request improves the network's understanding of which providers perform best on which task types, how prices shift, and what tradeoffs users actually care about.",
  },
  {
    title: "Network effects",
    desc: "More providers increase route diversity. More miners increase strategy diversity. More validators improve scoring credibility. More users create better signal.",
  },
];

function SluiceNetworkDiagram() {
  return (
    <figure className="sluice-core-figure">
      <svg
        viewBox="0 0 580 620"
        role="img"
        aria-label="Sluice network flow: user request routed through competing miners, scored by validator, forwarded to best provider with a network-improves feedback loop"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "540px",
          display: "block",
          margin: "0 auto",
        }}
      >
        <defs>
          <marker
            id="sfn-arrow-gray"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#9CA3AF" />
          </marker>
          <marker
            id="sfn-arrow-navy"
            markerWidth="10"
            markerHeight="10"
            refX="10"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="#8A98C2" />
          </marker>
        </defs>

        {/* ─── Left feedback loop ─── */}
        <path
          d="M132 482 H36 V370 M36 270 V152 H142"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.4"
          strokeDasharray="5,4"
          markerEnd="url(#sfn-arrow-gray)"
        />
        <text
          x="36"
          y="320"
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="9.5"
          fontStyle="italic"
          fontFamily="Inter, system-ui, sans-serif"
          transform="rotate(-90, 36, 320)"
        >
          network improves
        </text>

        {/* ─── User box ─── */}
        <rect
          x="190"
          y="12"
          width="200"
          height="56"
          rx="12"
          fill="#E5E7EB"
          stroke="#9CA3AF"
          strokeWidth="1.5"
        />
        <text
          x="290"
          y="37"
          textAnchor="middle"
          fill="#374151"
          fontSize="14"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          User
        </text>
        <text
          x="290"
          y="55"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="11"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Prompt + Budget
        </text>

        {/* ─── User → Sluice arrow ─── */}
        <line
          x1="290"
          y1="68"
          x2="290"
          y2="120"
          stroke="#9CA3AF"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-gray)"
        />
        <text
          x="324"
          y="98"
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="10"
          fontFamily="Inter, system-ui, sans-serif"
        >
          request
        </text>

        {/* ─── Sluice box ─── */}
        <rect x="142" y="120" width="296" height="64" rx="14" fill="#1D3487" />
        <text
          x="290"
          y="149"
          textAnchor="middle"
          fill="#F2F3F5"
          fontSize="17"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Sluice
        </text>
        <text
          x="290"
          y="171"
          textAnchor="middle"
          fill="rgba(242,243,245,0.7)"
          fontSize="11"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Intelligent traffic controller
        </text>

        {/* ─── Sluice → Miners arrows ─── */}
        <path
          d="M210 184 C210 240 132 220 132 272"
          fill="none"
          stroke="#8A98C2"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-navy)"
        />
        <path
          d="M290 184 L290 216 M290 242 L290 272"
          fill="none"
          stroke="#8A98C2"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-navy)"
        />
        <path
          d="M370 184 C370 240 448 220 448 272"
          fill="none"
          stroke="#8A98C2"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-navy)"
        />

        <text
          x="140"
          y="210"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="10"
          fontFamily="Inter, system-ui, sans-serif"
        >
          tasks
        </text>
        <text
          x="290"
          y="233"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="10"
          fontFamily="Inter, system-ui, sans-serif"
        >
          competing miners
        </text>

        {/* ─── Miner A ─── */}
        <circle cx="132" cy="310" r="38" fill="#16A34A" />
        <text
          x="132"
          y="307"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Miner A
        </text>
        <text
          x="132"
          y="324"
          textAnchor="middle"
          fill="rgba(255,255,255,0.82)"
          fontSize="9"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Routes prompt
        </text>

        {/* ─── Miner B ─── */}
        <circle cx="290" cy="310" r="38" fill="#16A34A" />
        <text
          x="290"
          y="307"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Miner B
        </text>
        <text
          x="290"
          y="324"
          textAnchor="middle"
          fill="rgba(255,255,255,0.82)"
          fontSize="9"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Routes prompt
        </text>

        {/* ─── Miner C ─── */}
        <circle cx="448" cy="310" r="38" fill="#16A34A" />
        <text
          x="448"
          y="307"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Miner C
        </text>
        <text
          x="448"
          y="324"
          textAnchor="middle"
          fill="rgba(255,255,255,0.82)"
          fontSize="9"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Routes prompt
        </text>

        {/* ─── Miners → Validator arrows ─── */}
        <path
          d="M132 348 C132 400 210 410 238 450"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-gray)"
        />
        <line
          x1="290"
          y1="348"
          x2="290"
          y2="450"
          stroke="#9CA3AF"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-gray)"
        />
        <path
          d="M448 348 C448 400 370 410 342 450"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-gray)"
        />

        <text
          x="430"
          y="415"
          textAnchor="middle"
          fill="#6B7280"
          fontSize="10"
          fontFamily="Inter, system-ui, sans-serif"
        >
          routing decisions
        </text>

        {/* ─── Validator box ─── */}
        <rect x="132" y="450" width="316" height="64" rx="14" fill="#EA580C" />
        <text
          x="290"
          y="478"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Validator
        </text>
        <text
          x="290"
          y="500"
          textAnchor="middle"
          fill="rgba(255,255,255,0.8)"
          fontSize="11"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Scores quality, cost, latency
        </text>

        {/* ─── Validator → Best Provider arrow ─── */}
        <line
          x1="290"
          y1="514"
          x2="290"
          y2="556"
          stroke="#9CA3AF"
          strokeWidth="1.5"
          markerEnd="url(#sfn-arrow-gray)"
        />
        <text
          x="340"
          y="539"
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="10"
          fontFamily="Inter, system-ui, sans-serif"
        >
          best route wins
        </text>

        {/* ─── Best Provider ─── */}
        <rect x="140" y="556" width="300" height="48" rx="12" fill="#DC2626" />
        <text
          x="290"
          y="585"
          textAnchor="middle"
          fill="white"
          fontSize="12.5"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Best provider: Chutes / Targon / API
        </text>
      </svg>
      <figcaption className="sluice-core-figcaption">
        Each request enters Sluice with a policy. Miners compete to propose the
        optimal route. The validator benchmarks outcomes and rewards the winning
        path. Scores feed back into the network over time.
      </figcaption>
    </figure>
  );
}

export function SluiceCorePage() {
  return (
    <article className="docs-article">
      {/* Hero */}
      <div className="docs-placeholder__hero">
        <h1 className="docs-placeholder__title">Sluice</h1>
        <p className="docs-index__subtitle">
          A decentralized market for routing policies, acting as the coordination layer
          that decides where each AI request should go.
        </p>
      </div>

      <div className="docs-article__rule" />

      {/* Intro */}
      <div className="docs-article__body">
        <p>
          AI demand is fragmenting across model APIs, specialized subnets, data
          pipelines, and private compute providers. The hard problem is no longer
          just how to compute; it is increasingly{" "}
          <strong>where each request should go</strong>.
        </p>
        <p>
          Sluice turns this routing decision into a competitive market. Users or
          applications submit a request together with constraints. Miners generate
          routing decisions. Validators benchmark those decisions against live
          execution and reference alternatives, then reward the routes that best
          satisfy the objective function.
        </p>
        <p>
          This makes Sluice meta-infrastructure: it does not try to outcompete
          every model provider. Instead, it helps the network discover, price,
          and route to the best provider for each job.
        </p>
      </div>

      {/* Flow diagram */}
      <SluiceNetworkDiagram />

      {/* How it works */}
      <div className="sluice-core-section">
        <h2 className="sluice-core-section-title">How it works</h2>
        <p className="sluice-core-section-body">
          Every request passes through four stages before a route is committed.
        </p>
        <div className="vision-timeline" style={{ marginTop: "1.25rem" }}>
          {steps.map((step, i) => (
            <div key={step.num} className="vision-timeline__item">
              <div className="vision-timeline__marker">
                <span className="vision-timeline__num">{step.num}</span>
                <span className="vision-timeline__dot" />
                {i < steps.length - 1 && (
                  <span className="vision-timeline__line" />
                )}
              </div>
              <div className="vision-timeline__content">
                <span className="vision-timeline__title">{step.title}</span>
                <p className="vision-timeline__desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What makes it defensible */}
      <div className="sluice-core-section">
        <h2 className="sluice-core-section-title">What makes it defensible</h2>
        <div className="sluice-core-pillars">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="sluice-core-pillar">
              <span className="sluice-core-pillar__title">{pillar.title}</span>
              <p className="sluice-core-pillar__desc">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
