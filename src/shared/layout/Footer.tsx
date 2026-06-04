import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { BrandLogo } from "@/shared/layout/BrandLogo";
import { Container } from "@/shared/ui/Container";

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Scoring", href: "#benchmark" },
];

const communityLinks = [
  {
    label: "GitHub",
    href: "https://github.com/sluice-ai",
    external: true,
  },
  {
    label: "Bittensor",
    href: "https://bittensor.com",
    external: true,
  },
];

/* ── Curved thread separator (matches the navbar wave style) ── */
const WAVELENGTH = 185;
const AMPLITUDE = 3;
const SVG_HEIGHT = 12;

function FooterThread({ width, inline }: { width: number; inline?: boolean }) {
  const wave = useMemo(() => {
    if (width <= 0) return "";
    const baseline = SVG_HEIGHT / 2;
    const cycles = Math.max(2, Math.round(width / WAVELENGTH));
    const steps = Math.min(Math.max(cycles * 16, 32), 256);

    const points: Array<[number, number]> = [];
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = width * t;
      const y = baseline - AMPLITUDE * Math.sin(t * Math.PI * 2 * cycles);
      points.push([x, y]);
    }

    return points
      .map(
        ([x, y], i) =>
          `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`,
      )
      .join(" ");
  }, [width]);

  if (width <= 0) return null;

  return (
    <svg
      className={
        inline
          ? "pointer-events-none block w-full"
          : "pointer-events-none absolute inset-x-0 top-0 block w-full -translate-y-1/2"
      }
      width={width}
      height={SVG_HEIGHT}
      viewBox={`0 0 ${width} ${SVG_HEIGHT}`}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={wave}
        className="text-sluice-navy/10 dark:text-white/[0.09]"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const measure = () => setWidth(el.getBoundingClientRect().width);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative pb-7 pt-9">
      <FooterThread width={width} />

      <Container>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-[1.2fr_auto_auto] sm:items-end sm:gap-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5">
              <BrandLogo
                markClassName="!h-[26px] text-sluice-routeBlue dark:text-[#8aabf4]"
                textClassName="font-sans text-[15px] font-semibold text-sluice-navy dark:text-white"
              />
            </div>
            <p className="mt-2.5 max-w-[300px] font-sans text-[13px] leading-[1.7] tracking-normal text-sluice-muted">
              Decentralized AI routing layer. Built on Bittensor. Routes by
              cost, latency, quality, reliability, and privacy.
            </p>
          </div>

          {/* Resources column */}
          <div>
            <div className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-sluice-muted">
              Resources
            </div>
            <div className="flex flex-col gap-2.5">
              {resourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-sans text-[13.5px] font-medium tracking-normal text-sluice-ink transition-colors hover:text-sluice-routeBlue dark:text-[#c3c8d6] dark:hover:text-[#8aabf4]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Community column */}
          <div>
            <div className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-sluice-muted">
              Community
            </div>
            <div className="flex flex-col gap-2.5">
              {communityLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="font-sans text-[13.5px] font-medium tracking-normal text-sluice-ink transition-colors hover:text-sluice-routeBlue dark:text-[#c3c8d6] dark:hover:text-[#8aabf4]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright bar — wave + text */}
        <div className="relative mt-7 pt-7">
          {/* Full-bleed wave: break out of Container to touch viewport edges */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 sm:hidden"
            style={{ width: `${width}px` }}
          >
            {width > 0 && (
              <FooterThread width={width} inline />
            )}
          </div>
          <p className="font-sans text-xs tracking-normal text-sluice-muted">
            © 2026 Sluice. Built on Bittensor.
          </p>
        </div>
      </Container>
    </footer>
  );
}
