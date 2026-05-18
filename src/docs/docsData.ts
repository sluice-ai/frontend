import {
  BookOpen,
  Compass,
  Gauge,
  Zap,
  FileCode,
  Terminal,
  Webhook,
  Server,
  FileText,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

import { SluiceDocsLogoIcon } from "./SluiceDocsLogoIcon";

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
        label: "Sluice",
        href: "/docs/core/sluice",
        icon: SluiceDocsLogoIcon,
        description: "The routing layer at the center of the network",
      },
      {
        label: "Scoring Engine",
        href: "/docs/core/scoring",
        icon: Gauge,
        description: "Quality, cost, latency, reliability, privacy",
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
        label: "SDK Reference",
        href: "/docs/api/sdk",
        icon: FileCode,
        description: "TypeScript and Python client libraries",
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
    ],
  },
];
