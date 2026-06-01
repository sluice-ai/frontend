import { type LucideIcon } from "lucide-react";

import { ChangelogIcon } from "./icons/ChangelogIcon";
import { FaqIcon } from "./icons/FaqIcon";
import { MinerIcon } from "./icons/MinerIcon";
import { OverviewIcon } from "./icons/OverviewIcon";
import { QuickStartIcon } from "./icons/QuickStartIcon";
import { RouteApiIcon } from "./icons/RouteApiIcon";
import { ScoringEngineIcon } from "./icons/ScoringEngineIcon";
import { SdkReferenceIcon } from "./icons/SdkReferenceIcon";
import { SluiceDocsLogoIcon } from "./icons/SluiceDocsLogoIcon";
import { ValidatorIcon } from "./icons/ValidatorIcon";
import { VisionIcon } from "./icons/VisionIcon";

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
        icon: OverviewIcon,
        description: "What is Sluice and why it exists",
      },
      {
        label: "Vision",
        href: "/docs/vision",
        icon: VisionIcon,
        description: "The future of decentralized AI routing",
      },
      {
        label: "Quick Start",
        href: "/docs/quick-start",
        icon: QuickStartIcon,
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
        icon: ScoringEngineIcon,
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
        icon: MinerIcon,
        description: "Set up and operate a Sluice miner",
      },
      {
        label: "Run a Validator",
        href: "/docs/guides/run-validator",
        icon: ValidatorIcon,
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
        icon: RouteApiIcon,
        description: "Submit routing requests",
      },
      {
        label: "SDK Reference",
        href: "/docs/api/sdk",
        icon: SdkReferenceIcon,
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
        icon: ChangelogIcon,
        description: "Latest updates and releases",
      },
      {
        label: "FAQ",
        href: "/docs/resources/faq",
        icon: FaqIcon,
        description: "Frequently asked questions",
      },
    ],
  },
];
