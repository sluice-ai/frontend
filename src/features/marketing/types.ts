export type Layer = {
  name: string;
  title: string;
  description: string;
  isSluice?: boolean;
};

export type PolicyParam = { key: string; value: string };
export type MinerProposal = { name: string; detail: string; routeId: string };
export type ScoreRow = { name: string; score: number; isWinner?: boolean };
export type WinnerInfo = { name: string; detail: string; runners: string[] };

export type StageData =
  | { kind: "policy"; params: PolicyParam[] }
  | { kind: "proposals"; proposals: MinerProposal[] }
  | { kind: "scores"; rows: ScoreRow[] }
  | { kind: "winner"; winner: WinnerInfo };

export type Step = {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  stageLabel: string;
  stageData: StageData;
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
};

export type RoadmapTrack = {
  title: string;
  window: string;
  color: "navy" | "blue" | "violet";
  items: RoadmapItem[];
};
