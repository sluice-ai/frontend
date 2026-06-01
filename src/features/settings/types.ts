import type { LucideIcon } from "lucide-react";

export type SettingsSectionId =
  | "providers"
  | "routing"
  | "limits"
  | "webhooks"
  | "notifications"
  | "billing"
  | "account";

export type SettingsSection = {
  id: SettingsSectionId;
  label: string;
  icon: LucideIcon;
};
