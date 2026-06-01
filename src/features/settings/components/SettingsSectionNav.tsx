import type {
  SettingsSection,
  SettingsSectionId,
} from "@/features/settings/types";

type SettingsSectionNavProps = {
  sections: SettingsSection[];
  active: SettingsSectionId;
  connectedCount: number;
  onChange: (section: SettingsSectionId) => void;
};

export function SettingsSectionNav({
  sections,
  active,
  connectedCount,
  onChange,
}: SettingsSectionNavProps) {
  return (
    <nav
      aria-label="Settings sections"
      className="shrink-0 border-b border-sluice-navy/10 bg-sluice-paper/60 md:w-[200px] md:border-b-0 md:border-r md:border-sluice-navy/10"
    >
      <ul className="flex gap-1 overflow-x-auto p-2 md:flex-col md:gap-0.5 md:overflow-visible md:p-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = section.id === active;
          const showBadge = section.id === "providers" && connectedCount > 0;

          return (
            <li key={section.id} className="shrink-0 md:shrink">
              <button
                type="button"
                onClick={() => onChange(section.id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 font-sans text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sluice-navy/10 text-sluice-navy"
                    : "text-sluice-navy/75 hover:bg-sluice-navy/5 hover:text-sluice-navy",
                ].join(" ")}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon
                    size={15}
                    strokeWidth={1.8}
                    className={
                      isActive ? "text-sluice-navy" : "text-sluice-navy/70"
                    }
                  />
                  {section.label}
                </span>
                {showBadge && (
                  <span
                    className={[
                      "inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-pill px-1.5 font-sans text-[10px] font-semibold",
                      isActive
                        ? "bg-sluice-navy text-sluice-paper"
                        : "bg-sluice-navy/10 text-sluice-navy",
                    ].join(" ")}
                  >
                    {connectedCount}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
