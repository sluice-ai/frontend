import { AtSign } from "lucide-react";

import { teamMembers } from "@/features/marketing/content";
import type { TeamMember } from "@/features/marketing/types";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/Container";

const PORTRAIT_PALETTES: Record<
  TeamMember["palette"],
  {
    background: string;
    body: string;
    glow: string;
  }
> = {
  blue: {
    background:
      "radial-gradient(circle at 28% 22%, rgba(237, 239, 245, 0.92) 0 14%, transparent 30%), linear-gradient(145deg, #cde0ff 0%, #6d96f0 38%, #1d3487 72%, #06080f 100%)",
    body: "linear-gradient(145deg, rgba(29, 52, 135, 0.96), rgba(6, 8, 15, 0.92))",
    glow: "rgba(109, 150, 240, 0.54)",
  },
  teal: {
    background:
      "radial-gradient(circle at 72% 20%, rgba(237, 239, 245, 0.88) 0 14%, transparent 30%), linear-gradient(145deg, #d8fff9 0%, #5fc4d1 36%, #1d3487 76%, #06080f 100%)",
    body: "linear-gradient(145deg, rgba(11, 100, 112, 0.96), rgba(6, 8, 15, 0.92))",
    glow: "rgba(95, 196, 209, 0.5)",
  },
  violet: {
    background:
      "radial-gradient(circle at 36% 18%, rgba(237, 239, 245, 0.9) 0 14%, transparent 30%), linear-gradient(145deg, #eee7ff 0%, #a085f0 36%, #4a3ea1 72%, #06080f 100%)",
    body: "linear-gradient(145deg, rgba(104, 86, 198, 0.96), rgba(6, 8, 15, 0.92))",
    glow: "rgba(160, 133, 240, 0.52)",
  },
};

export function Team() {
  return (
    <section
      id="team"
      className="scroll-mt-[4.5rem] py-12 md:py-16"
    >
      <Container>
        <header className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-[clamp(40px,6vw,68px)] font-normal leading-[1.04] tracking-normal text-sluice-navy dark:text-white">
            Meet the{" "}
            <em className="italic text-sluice-routeBlue dark:text-[#8aabf4]">Sluice</em>{" "}
            team
          </h2>
        </header>

        <div className="mx-auto mt-[clamp(34px,5vw,56px)] grid max-w-[980px] grid-cols-1 justify-items-center gap-y-10 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3 lg:gap-x-16">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const palette = PORTRAIT_PALETTES[member.palette];

  return (
    <article className="w-full max-w-[260px] min-w-0">
      {member.imageSrc ? (
        <div className="relative aspect-[4/5] overflow-hidden rounded-card border border-white/[0.12] shadow-[0_26px_70px_-44px_rgba(0,0,0,0.78)] transition-none">
          <img
            src={member.imageSrc}
            alt={member.imageAlt ?? `${member.name} avatar`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="relative aspect-[4/5] overflow-hidden rounded-card border border-white/[0.12] shadow-[0_26px_70px_-44px_rgba(0,0,0,0.78)] transition-none"
          style={{ background: palette.background }}
        >
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.28) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div
            className="absolute left-1/2 top-[18%] h-[30%] w-[39%] -translate-x-1/2 rounded-full border border-white/25 bg-[#f1dfcc]/95 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.78)]"
            style={{
              boxShadow: `0 0 54px -8px ${palette.glow}`,
            }}
          />
          <div
            className="absolute bottom-[-15%] left-1/2 h-[55%] w-[74%] -translate-x-1/2 rounded-t-[46%] border border-white/[0.12]"
            style={{ background: palette.body }}
          />
          <div className="absolute inset-x-0 bottom-[18%] flex justify-center">
            <span className="font-display text-[clamp(58px,7vw,86px)] leading-none tracking-normal text-white drop-shadow-[0_14px_24px_rgba(0,0,0,0.45)]">
              {member.initials}
            </span>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{
              backgroundImage:
                "linear-gradient(180deg, transparent, rgba(6, 8, 15, 0.72))",
            }}
          />
        </div>
      )}

      <div className="relative mt-4 min-h-[86px]">
        <div className="min-w-0">
          <p className="whitespace-nowrap text-sm font-semibold leading-tight tracking-normal text-sluice-routeBlue dark:text-[#8aabf4]">
            {member.role}
          </p>
          <h3 className="mt-1 break-words text-[22px] font-semibold leading-[1.08] tracking-normal text-sluice-navy dark:text-white">
            {member.name}
          </h3>
          <p className="mt-2 font-mono text-xs font-semibold leading-tight tracking-normal text-sluice-muted dark:text-[#c3c8d6]">
            [ {member.handle} ]
          </p>
        </div>

        <div className="absolute right-0 top-0 flex items-center gap-2">
          {member.githubHref ? (
            <a
              href={member.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-full text-sluice-navy transition-colors duration-200 dark:text-[#edeff5]",
                "hover:bg-sluice-routeBlue/10 hover:text-sluice-routeBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sluice-routeBlue dark:hover:bg-[#6d96f0]/12 dark:hover:text-[#8aabf4]",
              )}
              title={`${member.name} on GitHub`}
              aria-label={`${member.name} on GitHub`}
            >
              <GitHubIcon />
            </a>
          ) : null}
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full text-sluice-navy transition-colors duration-200 dark:text-[#edeff5]",
              "hover:bg-sluice-routeBlue/10 hover:text-sluice-routeBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sluice-routeBlue dark:hover:bg-[#6d96f0]/12 dark:hover:text-[#8aabf4]",
            )}
            title={`${member.name} official account coming soon`}
            aria-label={`${member.name} official account coming soon`}
            role="img"
          >
            <AtSign size={24} strokeWidth={2.15} />
          </span>
        </div>
      </div>
    </article>
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
