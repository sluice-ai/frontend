type WorkbenchActionsProps = {
  routingOpen: boolean;
  onOpenSettings: () => void;
  onOpenRouting: () => void;
};

export function WorkbenchActions({
  routingOpen,
  onOpenSettings,
  onOpenRouting,
}: WorkbenchActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2 pb-3">
      <ActionButton
        label="Settings"
        title="Settings"
        onClick={onOpenSettings}
        icon={<SettingsClusterIcon />}
      />
      <ActionButton
        label="Open routing controls"
        title="Routing controls"
        onClick={onOpenRouting}
        expanded={routingOpen}
        icon={<RoutingControlIcon />}
      />
    </div>
  );
}

function ActionButton({
  label,
  title,
  expanded,
  onClick,
  icon,
}: {
  label: string;
  title: string;
  expanded?: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={title}
      aria-expanded={expanded}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sluice-navy/15 bg-sluice-paper/70 text-sluice-navy transition-colors hover:bg-sluice-navy/5"
    >
      {icon}
    </button>
  );
}

function SettingsClusterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function RoutingControlIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 17H5" />
      <path d="M19 7h-9" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </svg>
  );
}
