import {
  Activity,
  Gauge,
  GitBranch,
  LockKeyhole,
  Network,
  Route,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import type {
  Advantage,
  BenchmarkSeries,
  CustomerSegment,
  Layer,
  Metric,
  NavItem,
  RoadmapTrack,
  ScoreWeight,
  Step,
} from "../types";

export const navItems: NavItem[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Benchmark", href: "#benchmark" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Subnet", href: "/subnet" },
  { label: "Docs", href: "/docs" },
];

export const dashboardNavItems: NavItem[] = [
  { label: "Subnet", href: "/subnet" },
  { label: "Docs", href: "/docs" },
  { label: "Launch app", href: "/app", isPrimary: true },
];

export const appNavItems: NavItem[] = [
  { label: "Subnet", href: "/subnet" },
  { label: "Docs", href: "/docs" },
];

export const metrics: Metric[] = [
  {
    value: "88%",
    label: "Organizations using AI",
    note: "Enterprise AI adoption signal",
  },
  {
    value: "300+",
    label: "Models across routers",
    note: "Fragmented supply surface",
  },
  {
    value: "50%",
    label: "Use in 3+ functions",
    note: "Cross-workflow infrastructure",
  },
  {
    value: "23%",
    label: "Scaling AI agents",
    note: "Multi-model orchestration needs",
  },
];

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

export const benchmarkSeries: BenchmarkSeries[] = [
  {
    label: "Sluice route",
    values: [68, 72, 76, 79, 83, 86, 89, 91],
    stroke: "#1D3487",
  },
  {
    label: "Fixed provider",
    values: [64, 65, 63, 67, 66, 68, 67, 69],
    stroke: "#8990A9",
  },
  {
    label: "Cheapest only",
    values: [56, 59, 55, 61, 58, 62, 60, 63],
    stroke: "#4A77DC",
  },
];

export const advantages: Advantage[] = [
  {
    title: "Bittensor-native supply awareness",
    description:
      "Understands fragmented subnet-native supply, not just traditional APIs and centralized providers.",
    icon: Network,
  },
  {
    title: "Competitive routing policies",
    description:
      "Routing logic improves continuously as miners compete to discover better routes and validators reward measurable performance.",
    icon: GitBranch,
  },
  {
    title: "Benchmark telemetry moat",
    description:
      "Builds a live routing dataset across cost, latency, quality, reliability, and privacy fit that becomes harder to replicate over time.",
    icon: Activity,
  },
  {
    title: "Network effects",
    description:
      "More providers expand route diversity, more miners improve strategy, more validators strengthen scoring, and more users improve signal.",
    icon: Route,
  },
];

export const customerSegments: CustomerSegment[] = [
  {
    number: "01",
    title: "Bittensor subnet builders",
    description:
      "Teams building on Bittensor need neutral routing across fragmented subnet supply.",
  },
  {
    number: "02",
    title: "Agent builders",
    description:
      "Agent workflows need orchestration across multiple model calls, tools, and steps.",
  },
  {
    number: "03",
    title: "Privacy-sensitive protocols",
    description:
      "Some workloads require more than low cost, including confidential execution paths.",
  },
  {
    number: "04",
    title: "Multi-provider teams",
    description:
      "Teams already switching providers manually can replace that complexity with policy.",
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
