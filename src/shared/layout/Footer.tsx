import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { BrandLogo } from "@/shared/layout/BrandLogo";
import { Container } from "@/shared/ui/Container";

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "View Subnet", href: "/subnet" },
  { label: "Scoring", href: "#benchmark" },
];

const GITHUB_HREF = "https://github.com/sluice-ai";
const DISCORD_HREF =
  "https://discord.com/channels/799672011265015819/1508523783953055806";

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
          <div className="pt-[50px] sm:self-start">
            <div className="flex items-center gap-2">
              <a
                href={GITHUB_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sluice-ink transition-colors hover:bg-sluice-routeBlue/10 hover:text-sluice-routeBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sluice-routeBlue dark:text-[#c3c8d6] dark:hover:bg-[#6d96f0]/12 dark:hover:text-[#8aabf4]"
                title="Sluice on GitHub"
                aria-label="Sluice on GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={DISCORD_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sluice-ink transition-colors hover:bg-sluice-routeBlue/10 hover:text-sluice-routeBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sluice-routeBlue dark:text-[#c3c8d6] dark:hover:bg-[#6d96f0]/12 dark:hover:text-[#8aabf4]"
                title="Sluice on Discord"
                aria-label="Sluice on Discord"
              >
                <DiscordIcon />
              </a>
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

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.36 3c-.22.39-.47.91-.64 1.29a18.4 18.4 0 0 0-5.44 0A13.7 13.7 0 0 0 8.64 3a19.74 19.74 0 0 0-4.97 1.38C.52 9.05-.31 13.58.1 18.01a19.9 19.9 0 0 0 6.08 3.06c.49-.66.92-1.36 1.29-2.08-.71-.27-1.39-.6-2.04-.99.17-.12.34-.25.5-.38a14.1 14.1 0 0 0 12.14 0c.16.13.33.26.5.38-.65.39-1.33.72-2.04.99.37.72.8 1.42 1.29 2.08a19.86 19.86 0 0 0 6.08-3.06c.49-5.14-.82-9.57-3.58-13.64ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.41 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.33-.95 2.41-2.16 2.41Zm7.96 0c-1.18 0-2.16-1.08-2.16-2.41 0-1.33.95-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.33-.95 2.41-2.16 2.41Z" />
    </svg>
  );
}
