import {
  BookOpen,
  Compass,
  Layers,
  Route,
  ShieldCheck,
  Network,
  Cpu,
  SlidersHorizontal,
  GitBranch,
  Gauge,
  Activity,
  LockKeyhole,
  Zap,
  FileCode,
  Terminal,
  Webhook,
  Server,
  Users,
  Globe,
  BarChart3,
  FileText,
  HelpCircle,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

export interface DocNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export interface DocNavSection {
  title: string;
  items: DocNavItem[];
}

export const docsSidebar: DocNavSection[] = [
  {
    title: "Introduction",
    items: [
      {
        label: "Overview",
        href: "/docs/introduction",
        icon: BookOpen,
        description: "What is Sluice and why it exists",
      },
      {
        label: "Vision",
        href: "/docs/vision",
        icon: Compass,
        description: "The future of decentralized AI routing",
      },
      {
        label: "Quick Start",
        href: "/docs/quick-start",
        icon: Zap,
        description: "Get started in under 5 minutes",
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        label: "Routing Layer",
        href: "/docs/core/routing-layer",
        icon: Route,
        description: "How Sluice selects the best-fit provider",
      },
      {
        label: "Policy Engine",
        href: "/docs/core/policy-engine",
        icon: SlidersHorizontal,
        description: "Encoding constraints per request",
      },
      {
        label: "Scoring System",
        href: "/docs/core/scoring",
        icon: Gauge,
        description: "Quality, cost, latency, reliability, privacy",
      },
      {
        label: "Supply Network",
        href: "/docs/core/supply-network",
        icon: Network,
        description: "Providers, subnets, and model availability",
      },
    ],
  },
  {
    title: "Architecture",
    items: [
      {
        label: "System Overview",
        href: "/docs/architecture/overview",
        icon: Layers,
        description: "High-level architecture diagram",
      },
      {
        label: "Miners",
        href: "/docs/architecture/miners",
        icon: Cpu,
        description: "Route proposal and competition",
      },
      {
        label: "Validators",
        href: "/docs/architecture/validators",
        icon: ShieldCheck,
        description: "Benchmark execution and scoring",
      },
      {
        label: "Request Lifecycle",
        href: "/docs/architecture/request-lifecycle",
        icon: Activity,
        description: "From prompt to routed response",
      },
    ],
  },
  {
    title: "Guides",
    items: [
      {
        label: "Run a Miner",
        href: "/docs/guides/run-miner",
        icon: Terminal,
        description: "Set up and operate a Sluice miner",
      },
      {
        label: "Run a Validator",
        href: "/docs/guides/run-validator",
        icon: Server,
        description: "Validate and benchmark routes",
      },
      {
        label: "Integrate Routing",
        href: "/docs/guides/integrate",
        icon: GitBranch,
        description: "Add Sluice routing to your application",
      },
      {
        label: "Private Workloads",
        href: "/docs/guides/private-workloads",
        icon: LockKeyhole,
        description: "Route sensitive tasks securely",
      },
    ],
  },
  {
    title: "API Reference",
    items: [
      {
        label: "Route API",
        href: "/docs/api/route",
        icon: Webhook,
        description: "Submit routing requests",
      },
      {
        label: "Benchmark API",
        href: "/docs/api/benchmark",
        icon: BarChart3,
        description: "Query live benchmark telemetry",
      },
      {
        label: "Provider API",
        href: "/docs/api/providers",
        icon: Globe,
        description: "List and filter available providers",
      },
      {
        label: "SDK Reference",
        href: "/docs/api/sdk",
        icon: FileCode,
        description: "TypeScript and Python client libraries",
      },
    ],
  },
  {
    title: "Network",
    items: [
      {
        label: "Bittensor Integration",
        href: "/docs/network/bittensor",
        icon: Network,
        description: "Subnet-native routing on Bittensor",
      },
      {
        label: "Testnet",
        href: "/docs/network/testnet",
        icon: Zap,
        description: "Connect to the Sluice testnet",
      },
      {
        label: "Staking",
        href: "/docs/network/staking",
        icon: Users,
        description: "Staking mechanics and incentives",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        label: "Changelog",
        href: "/docs/resources/changelog",
        icon: FileText,
        description: "Latest updates and releases",
      },
      {
        label: "FAQ",
        href: "/docs/resources/faq",
        icon: HelpCircle,
        description: "Frequently asked questions",
      },
      {
        label: "Community",
        href: "/docs/resources/community",
        icon: MessageSquare,
        description: "Join the Sluice community",
      },
    ],
  },
];
