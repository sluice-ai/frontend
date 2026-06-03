import type {
  Layer,
  RoadmapTrack,
  ScoreWeight,
  Step,
} from "@/features/marketing/types";

export const layers: Layer[] = [
  {
    name: "OpenRouter",
    title: "Access layer",
    description: "Unified model access for centralized and external APIs.",
  },
  {
    name: "Chutes",
    title: "Compute layer",
    description: "Decentralized inference supply that changes in real time.",
  },
  {
    name: "Sluice",
    title: "Decision layer",
    description: "Routes by cost, latency, quality, reliability, and privacy.",
    isSluice: true,
  },
  {
    name: "Targon",
    title: "Privacy layer",
    description: "Confidential AI execution for sensitive workloads.",
  },
  {
    name: "Validators",
    title: "Validation layer",
    description: "Continuous scoring and telemetry to prove routing optimality.",
  },
];

export const steps: Step[] = [
  {
    number: "01",
    subtitle: "Entry",
    title: "Request enters",
    description:
      "Prompt metadata, budget, latency target, quality threshold, and privacy needs arrive as a routing policy.",
    stageLabel: "policy.json",
    stageData: {
      kind: "policy",
      params: [
        { key: "latency", value: "< 200 ms" },
        { key: "budget", value: "$0.02 / 1k tok" },
        { key: "quality", value: ">= 0.85" },
        { key: "privacy", value: "standard" },
        { key: "region", value: "us, eu" },
      ],
    },
  },
  {
    number: "02",
    subtitle: "Competition",
    title: "Miners propose routes",
    description:
      "Competing miners produce route policies against current provider conditions and submit them within milliseconds.",
    stageLabel: "miners / proposals",
    stageData: {
      kind: "proposals",
      proposals: [
        { name: "Together AI", detail: "$0.018 / 142 ms", routeId: "m-7a" },
        { name: "Fireworks", detail: "$0.022 / 118 ms", routeId: "m-2c" },
        { name: "Anyscale", detail: "$0.024 / 165 ms", routeId: "m-9f" },
        { name: "DeepInfra", detail: "$0.020 / 154 ms", routeId: "m-1b" },
      ],
    },
  },
  {
    number: "03",
    subtitle: "Evaluation",
    title: "Validators benchmark",
    description:
      "Validators compare quality, cost, latency, and reliability, then produce a composite score for each proposal.",
    stageLabel: "validators / score",
    stageData: {
      kind: "scores",
      rows: [
        { name: "Together", score: 82 },
        { name: "Fireworks", score: 91, isWinner: true },
        { name: "Anyscale", score: 68 },
        { name: "DeepInfra", score: 77 },
      ],
    },
  },
  {
    number: "04",
    subtitle: "Resolution",
    title: "Best route wins",
    description:
      "The best valid route is selected, executed, and the winning miner is rewarded for satisfying the task requirements.",
    stageLabel: "winner / routed",
    stageData: {
      kind: "winner",
      winner: {
        name: "Fireworks / m-2c",
        detail: "$0.022 / 1k · 118 ms · score 91",
        runners: [
          "Together AI / m-7a / 82",
          "DeepInfra / m-1b / 77",
          "Anyscale / m-9f / 68",
        ],
      },
    },
  },
];

export const scoringWeights: ScoreWeight[] = [
  {
    label: "Quality",
    value: 0.50,
    detail: "Conversation, reasoning, and coding task performance",
  },
  {
    label: "Cost efficiency",
    value: 0.25,
    detail: "Lowest cost route that still clears the quality gate",
  },
  {
    label: "Latency",
    value: 0.15,
    detail: "Time to first token and completion time",
  },
  {
    label: "Reliability",
    value: 0.10,
    detail: "Success rate, timeout rate, and fallback stability",
  },
];

export const roadmap: RoadmapTrack[] = [
  {
    title: "Technical",
    window: "Weeks 1-4",
    windowStart: 1,
    windowEnd: 4,
    lanes: 3,
    color: "navy",
    items: [
      { label: "Define request schema", startWeek: 1, endWeek: 2, lane: 0 },
      { label: "Build baseline miner router", startWeek: 3, endWeek: 4, lane: 0 },
      { label: "Integrate first providers", startWeek: 2, endWeek: 3, lane: 1 },
      { label: "Build validator benchmark runner", startWeek: 3, endWeek: 4, lane: 2 },
    ],
  },
  {
    title: "Network",
    window: "Weeks 3-8",
    windowStart: 3,
    windowEnd: 8,
    lanes: 2,
    color: "blue",
    items: [
      { label: "Launch private testnet", startWeek: 3, endWeek: 4, lane: 0 },
      { label: "Add health and fallback logic", startWeek: 4, endWeek: 5, lane: 1 },
      { label: "Run closed beta with real workloads", startWeek: 5, endWeek: 6, lane: 0 },
      { label: "Publish miner docs and validator rules", startWeek: 6, endWeek: 7, lane: 1 },
      { label: "Launch on mainnet", startWeek: 7, endWeek: 8, lane: 0 },
    ],
  },
  {
    title: "Commercial",
    window: "Weeks 6-8+",
    windowStart: 6,
    windowEnd: 9,
    lanes: 3,
    color: "violet",
    items: [
      { label: "Add API and dashboard", startWeek: 6, endWeek: 7, lane: 0 },
      { label: "Expand provider coverage", startWeek: 8, endWeek: 9, lane: 0 },
      { label: "Publish benchmark report", startWeek: 6, endWeek: 7, lane: 1 },
      { label: "Start premium routing", startWeek: 8, endWeek: 9, lane: 1 },
      { label: "Onboard first design partners", startWeek: 7, endWeek: 8, lane: 2 },
    ],
  },
];
