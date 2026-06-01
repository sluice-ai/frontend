type EmptySectionProps = {
  label: string;
};

export function EmptySection({ label }: EmptySectionProps) {
  return (
    <div>
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-sluice-navy/55">
        {label}
      </p>
      <p className="mt-2 font-sans text-sm text-sluice-muted">-</p>
    </div>
  );
}
