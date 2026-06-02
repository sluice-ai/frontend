import React, { useId } from "react";
import { motion, MotionConfig } from "motion/react";

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
  className = "w-full bg-white dark:bg-white/[0.04]",
  buttonClassName = "flex-1",
}: SegmentedSelectProps<T>) {
  const layoutId = useId();

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
      <div className={`inline-flex overflow-hidden rounded-pill border border-sluice-navy/15 p-1 ${className}`}>
        {options.map((o) => {
          const active = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              onClick={() => onChange(o.value)}
              className={`relative cursor-pointer rounded-pill px-3 py-1.5 font-sans text-xs font-semibold transition-colors outline-none focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0 ${
                active
                  ? "text-sluice-paper dark:text-sluice-deepNavy"
                  : "text-sluice-navy/70 hover:bg-sluice-navy/5 hover:text-sluice-navy dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
              } ${buttonClassName}`}
            >
              {active && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-pill bg-sluice-navy dark:bg-sluice-routeBlue"
                  style={{ zIndex: 0 }}
                />
              )}
              <span className="relative z-10">{o.label}</span>
            </button>
          );
        })}
      </div>
    </MotionConfig>
  );
}
