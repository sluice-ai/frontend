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
    <figure className="my-10 mb-6 overflow-visible rounded-card border border-sluice-navy/12 bg-sluice-paper/38 px-4 pb-4 pt-6 dark:bg-white/[0.03]">
      <svg
        viewBox="0 0 580 620"
        role="img"
        aria-label="Sluice network flow: user request routed through competing miners, scored by validator, forwarded to best provider with a network-improves feedback loop"
        className="mx-auto block h-auto w-full max-w-[540px]"
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
        <rect x="142" y="120" width="296" height="64" rx="14" fill="var(--sluice-dg-brand)" />
        <text
          x="290"
          y="149"
          textAnchor="middle"
          fill="var(--sluice-dg-on-brand)"
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
          fill="var(--sluice-dg-on-brand-soft)"
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
      <figcaption className="mx-auto mt-4 max-w-[460px] text-center font-sans text-[13px] leading-[1.55] text-sluice-muted">
        Each request enters Sluice with a policy. Miners compete to propose the
        optimal route. The validator benchmarks outcomes and rewards the winning
        path. Scores feed back into the network over time.
      </figcaption>
    </figure>
  );
}

export function SluiceCorePage() {
  return (
    <article className="animate-docs-fade-in motion-reduce:animate-none">
      {/* Hero */}
      <div>
        <h1 className="m-0 font-sans text-[clamp(1.375rem,2.2vw,1.75rem)] font-[650] leading-[1.18] tracking-normal text-sluice-navy">
          Sluice
        </h1>
        <p className="mt-4 max-w-[620px] font-sans text-[1.05rem] font-normal leading-[1.65] tracking-normal text-sluice-muted">
          A decentralized market for routing policies, acting as the coordination layer
          that decides where each AI request should go.
        </p>
      </div>

      <div className="my-[clamp(1.5rem,3vw,2rem)] h-px bg-[linear-gradient(90deg,rgba(29,52,135,0.18)_0,rgba(29,52,135,0.18)_9px,transparent_9px,transparent_18px)] bg-[length:18px_1px] bg-repeat-x dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_9px,transparent_9px,transparent_18px)]" />

      {/* Intro */}
      <div className="flex max-w-[720px] flex-col gap-[1.7rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.05rem] [&_p]:font-normal [&_p]:leading-[1.72] [&_p]:tracking-normal [&_p]:text-sluice-ink [&_strong]:font-bold [&_strong]:text-sluice-navy">
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
      <div className="mt-11">
        <h2 className="m-0 mb-2.5 font-sans text-lg font-[650] leading-normal tracking-[-0.01em] text-sluice-navy">
          How it works
        </h2>
        <p className="m-0 font-sans text-[1.025rem] leading-[1.72] text-sluice-ink">
          Every request passes through four stages before a route is committed.
        </p>
        <div className="mt-5 flex flex-col">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-5 pb-8 last:pb-0">
              <div className="flex w-8 shrink-0 flex-col items-center">
                <span className="mb-1 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.04em] text-[#3b5bdb] dark:text-sluice-routeBlue">
                  {step.num}
                </span>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#3b5bdb] bg-white dark:border-sluice-routeBlue dark:bg-sluice-paperMuted" />
                {i < steps.length - 1 && (
                  <span className="mt-1 min-h-8 w-px flex-1 bg-sluice-navy/18" />
                )}
              </div>
              <div>
                <span className="mb-2 block font-sans text-[15px] font-semibold text-sluice-navy">
                  {step.title}
                </span>
                <p className="m-0 font-sans text-[13px] leading-[1.65] text-sluice-muted [&_strong]:font-bold [&_strong]:text-sluice-navy">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What makes it defensible */}
      <div className="mt-11">
        <h2 className="m-0 mb-2.5 font-sans text-lg font-[650] leading-normal tracking-[-0.01em] text-sluice-navy">
          What makes it defensible
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-[14px] border border-sluice-navy/14 bg-sluice-paper/38 p-5 dark:bg-white/[0.03]"
            >
              <span className="mb-2 block font-sans text-sm font-bold text-sluice-navy">
                {pillar.title}
              </span>
              <p className="m-0 font-sans text-[13px] leading-normal text-sluice-muted">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
