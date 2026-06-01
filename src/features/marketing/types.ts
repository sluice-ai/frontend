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

export type RoadmapItem = {
  label: string;
  startWeek: number;
  endWeek: number;
  lane: number;
};

export type RoadmapTrack = {
  title: string;
  window: string;
  windowStart: number;
  windowEnd: number;
  lanes: number;
  color: "navy" | "blue" | "violet";
  items: RoadmapItem[];
};
