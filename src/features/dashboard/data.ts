import Clock3 from "lucide-react/dist/esm/icons/clock-3";
import Code2 from "lucide-react/dist/esm/icons/code-2";
import DollarSign from "lucide-react/dist/esm/icons/dollar-sign";
import LockKeyhole from "lucide-react/dist/esm/icons/lock-keyhole";
import Route from "lucide-react/dist/esm/icons/route";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import TerminalSquare from "lucide-react/dist/esm/icons/terminal-square";

import type {
  ChartPoint,
  KpiCard,
  RouteRow,
  Timeframe,
} from "@/features/dashboard/types";

export const kpiCards: KpiCard[] = [
  {
    label: "Total Requests Routed",
    value: "128,420",
    icon: Route,
    trend: [32, 36, 34, 44, 42, 51, 49, 58],
  },
  {
    label: "Estimated Savings",
    value: "$3,842",
    icon: DollarSign,
    trend: [21, 24, 26, 25, 31, 29, 37, 43],
  },
  {
    label: "Average Latency",
    value: "1.2s",
    icon: Clock3,
    trend: [52, 49, 44, 45, 38, 40, 34, 31],
  },
  {
    label: "Quality Pass Rate",
    value: "94.3%",
    icon: ShieldCheck,
    trend: [72, 73, 74, 78, 79, 77, 82, 86],
  },
];

export const recentRoutes: RouteRow[] = [
  {
    promptType: "Coding",
    provider: "Claude",
    cost: "$0.021",
    latency: "3.4s",
    icon: Code2,
  },
  {
    promptType: "Simple Q&A",
    provider: "Chutes/Llama",
    cost: "$0.001",
    latency: "0.8s",
    icon: Sparkles,
  },
  {
    promptType: "Private Legal",
    provider: "Targon",
    cost: "$0.014",
    latency: "2.1s",
    icon: LockKeyhole,
  },
  {
    promptType: "Summarization",
    provider: "DeepSeek",
    cost: "$0.003",
    latency: "1.0s",
    icon: TerminalSquare,
  },
];

export const timeframeOptions: Array<{ label: string; value: Timeframe }> = [
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
];

export const chartSeries: Record<Timeframe, ChartPoint[]> = {
  "7d": [
    { label: "Mon", requests: 21400, savings: 980 },
    { label: "Tue", requests: 30200, savings: 1820 },
    { label: "Wed", requests: 25400, savings: 1390 },
    { label: "Thu", requests: 36100, savings: 2490 },
    { label: "Fri", requests: 30600, savings: 1590 },
    { label: "Sat", requests: 41200, savings: 2580 },
    { label: "Sun", requests: 32120, savings: 1920 },
  ],
  "30d": [
    { label: "Apr 19", requests: 28400, savings: 1120 },
    { label: "Apr 24", requests: 34600, savings: 1460 },
    { label: "Apr 29", requests: 31900, savings: 1340 },
    { label: "May 04", requests: 43200, savings: 2110 },
    { label: "May 09", requests: 47800, savings: 2460 },
    { label: "May 14", requests: 39400, savings: 1830 },
    { label: "May 18", requests: 51200, savings: 2920 },
  ],
  "90d": [
    { label: "Feb 18", requests: 18400, savings: 720 },
    { label: "Mar 04", requests: 22600, savings: 910 },
    { label: "Mar 18", requests: 29800, savings: 1280 },
    { label: "Apr 01", requests: 33800, savings: 1510 },
    { label: "Apr 15", requests: 42100, savings: 2180 },
    { label: "May 01", requests: 46400, savings: 2410 },
    { label: "May 18", requests: 58200, savings: 3420 },
  ],
};
