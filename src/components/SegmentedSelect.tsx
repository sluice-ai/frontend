import React from "react";

interface SegmentedSelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  className?: string;
  buttonClassName?: string;
}

export function SegmentedSelect<T extends string | number>({
  value,
  onChange,
  options,
  className = "w-full bg-white",
  buttonClassName = "flex-1",
}: SegmentedSelectProps<T>) {
  return (
    <div className={`inline-flex overflow-hidden rounded-pill border border-sluice-navy/15 p-1 ${className}`}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-pill px-3 py-1.5 font-sans text-xs font-semibold transition-colors outline-none focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0 ${
              active
                ? "bg-sluice-navy text-sluice-paper"
                : "text-sluice-navy/70 hover:bg-sluice-navy/5 hover:text-sluice-navy"
            } ${buttonClassName}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
