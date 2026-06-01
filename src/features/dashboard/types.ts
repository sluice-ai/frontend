import type { LucideIcon } from "lucide-react";

export type KpiCard = {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: number[];
};

export type RouteRow = {
  promptType: string;
  provider: string;
  cost: string;
  latency: string;
  icon: LucideIcon;
};

export type Timeframe = "7d" | "30d" | "90d";

export type ChartPoint = {
  label: string;
  requests: number;
  savings: number;
};
