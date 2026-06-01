import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

interface Option<T> {
  value: T;
  label: string;
  rightLabel?: string;
  disabled?: boolean;
}

interface CustomSelectProps<T> {
  value: T | "";
  onChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
  className?: string;
}

export function CustomSelect<T extends string | number>({
  value,
  onChange,
  options,
  placeholder = "Select...",
  className = "",
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateMenuPosition = () => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const viewportGap = 16;
    const spaceBelow = window.innerHeight - rect.bottom - viewportGap;
    const spaceAbove = rect.top - viewportGap;
    const openUpward = spaceBelow < 240 && spaceAbove > spaceBelow;
    const availableHeight = Math.max(160, Math.min(280, openUpward ? spaceAbove : spaceBelow));

    setMenuStyle({
      left: rect.left,
      top: openUpward ? undefined : rect.bottom + 6,
      bottom: openUpward ? window.innerHeight - rect.top + 6 : undefined,
      width: rect.width,
      maxHeight: availableHeight,
    });
  };

  useEffect(() => {
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  const toggleOpen = () => {
    const nextOpen = !isOpen;
    if (nextOpen) updateMenuPosition();
    setIsOpen(nextOpen);
  };

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={toggleOpen}
        className="flex w-full items-center justify-between rounded-pill border border-sluice-navy/20 bg-white px-3.5 py-2 font-sans text-sm font-semibold text-sluice-navy outline-none focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown
          size={14}
          className={`text-sluice-navy/60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && menuStyle && createPortal(
        <div
          ref={menuRef}
          style={menuStyle}
          className="fixed z-[70] overflow-y-auto overscroll-contain rounded-card border border-sluice-navy/15 bg-white p-1.5 shadow-[0_16px_34px_-12px_rgba(29,52,135,0.3)]"
        >
          {options.length > 0 ? (
            <div className="grid gap-0.5">
              {options.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  disabled={p.disabled}
                  onClick={() => {
                    onChange(p.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-sans text-xs font-semibold transition-colors outline-none focus:!outline-none focus-visible:!outline-none focus:!ring-0 focus-visible:!ring-0 ${
                    p.disabled
                      ? "opacity-50 cursor-not-allowed text-sluice-muted"
                      : "text-sluice-navy hover:bg-sluice-navy/5"
                  } ${p.value === value ? "bg-sluice-navy/5" : ""}`}
                >
                  <span>{p.label}</span>
                  {p.rightLabel && (
                    <span className="rounded-pill bg-amber-50 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-700 ring-1 ring-amber-100">
                      {p.rightLabel}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <p className="p-3 text-center font-sans text-xs text-sluice-muted">
              No options available.
            </p>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}
