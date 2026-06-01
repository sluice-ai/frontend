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
    title: "Request enters",
    description:
      "Prompt metadata, budget, latency target, quality threshold, and privacy needs enter the network.",
  },
  {
    number: "02",
    title: "Miners propose routes",
    description:
      "Competing miners produce route policies against current provider conditions.",
  },
  {
    number: "03",
    title: "Validators benchmark",
    description:
      "Validators execute candidate routes and compare quality, cost, latency, and reliability.",
  },
  {
    number: "04",
    title: "Best route wins",
    description:
      "The best valid route that satisfies task requirements is selected and rewarded.",
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
