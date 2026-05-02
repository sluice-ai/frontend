import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  isPrimary?: boolean;
};

export type Metric = {
  value: string;
  label: string;
  note: string;
};

export type Layer = {
  name: string;
  title: string;
  description: string;
  isSluice?: boolean;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

export type ScoreWeight = {
  label: string;
  value: number;
  detail: string;
};

export type Advantage = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type CustomerSegment = {
  number: string;
  title: string;
  description: string;
};

export type RoadmapColumn = {
  title: string;
  window: string;
  items: string[];
};

export type BenchmarkSeries = {
  label: string;
  values: number[];
  stroke: string;
};
