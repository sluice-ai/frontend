export type NavItem = {
  label: string;
  href: string;
  isPrimary?: boolean;
};

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
