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
  RoadmapColumn,
  ScoreWeight,
  Step,
} from "../types";

export const navItems: NavItem[] = [
  { label: "Solution", href: "#solution" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Benchmark", href: "#benchmark" },
  { label: "Roadmap", href: "#roadmap" },
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
    value: "5",
    label: "Route constraints",
    note: "Quality, cost, latency, reliability, privacy",
  },
  {
    value: "1",
    label: "Best path per request",
    note: "Policy-aware selection",
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
    name: "Targon",
    title: "Privacy layer",
    description: "Confidential AI execution for sensitive workloads.",
  },
  {
    name: "Sluice",
    title: "Decision layer",
    description: "Routes by cost, latency, quality, reliability, and privacy.",
    isSluice: true,
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
      "The cheapest valid route that satisfies task requirements is selected and rewarded.",
  },
];

export const scoringWeights: ScoreWeight[] = [
  {
    label: "Quality",
    value: 0.42,
    detail: "Conversation, reasoning, and coding task performance",
  },
  {
    label: "Cost efficiency",
    value: 0.22,
    detail: "Lowest cost route that still clears the quality gate",
  },
  {
    label: "Latency",
    value: 0.16,
    detail: "Time to first token and completion time",
  },
  {
    label: "Reliability",
    value: 0.12,
    detail: "Success rate, timeout rate, and fallback stability",
  },
  {
    label: "Privacy fit",
    value: 0.08,
    detail: "Confidential compute and data-handling requirements",
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
      "Understands subnet-native supply, not only traditional APIs and centralized providers.",
    icon: Network,
  },
  {
    title: "Competitive routing policies",
    description:
      "Routing logic improves as miners compete to discover better route policies.",
    icon: GitBranch,
  },
  {
    title: "Benchmark telemetry moat",
    description:
      "A live dataset across quality, cost, latency, reliability, and privacy fit.",
    icon: Activity,
  },
  {
    title: "Policy-aware control",
    description:
      "Teams can encode budget, latency, privacy, and quality requirements per request.",
    icon: SlidersHorizontal,
  },
  {
    title: "Reliability-first fallback",
    description:
      "Fallback logic keeps workloads moving when a provider degrades or times out.",
    icon: ShieldCheck,
  },
  {
    title: "Latency and cost discipline",
    description:
      "Every decision is scored against live constraints, not static preference lists.",
    icon: Gauge,
  },
  {
    title: "Private workload routing",
    description:
      "Sensitive jobs can prefer confidential compute paths when policy requires it.",
    icon: LockKeyhole,
  },
  {
    title: "Visible route reasoning",
    description:
      "Route selection is explainable through scores, constraints, and provider telemetry.",
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

export const roadmap: RoadmapColumn[] = [
  {
    title: "Technical",
    window: "Weeks 1-4",
    items: [
      "Define request schema",
      "Integrate first providers",
      "Build baseline miner router",
      "Build validator benchmark runner",
    ],
  },
  {
    title: "Network",
    window: "Weeks 3-8",
    items: [
      "Launch private testnet",
      "Add health and fallback logic",
      "Run closed beta with real workloads",
      "Publish miner docs and validator rules",
      "Launch on mainnet",
    ],
  },
  {
    title: "Commercial",
    window: "Weeks 6-8+",
    items: [
      "Add API and dashboard",
      "Publish benchmark report",
      "Onboard first design partners",
      "Expand provider coverage",
      "Start premium routing",
    ],
  },
];
