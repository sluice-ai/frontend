import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { DocsSidebar } from "./DocsSidebar";
import { docsSidebar } from "./docsData";
import { cn } from "@/shared/lib/cn";
import { MobileNavGlyph, Navbar } from "@/shared/layout/Navbar";

export function DocsLayout(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Find current, previous, and next page for bottom navigation
  const allPages = docsSidebar.flatMap((s) => s.items);
  const currentIndex = allPages.findIndex(
    (p) => p.href === location.pathname
  );
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="app-canvas min-h-screen">
      <Navbar
        items={[]}
        position="sticky"
        rightContent={
          <div className="ml-4 flex items-center gap-3 sm:gap-7">

            <Link
              to="/dashboard"
              className="whitespace-nowrap font-sans text-[15px] font-medium leading-none tracking-normal text-sluice-navy no-underline transition-opacity hover:opacity-70 max-sm:hidden"
            >
              Dashboard
            </Link>
            <button
              type="button"
              className={cn(
                "group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-sluice-navy outline-none transition-[background-color,color,transform] duration-300 ease-sluice hover:bg-sluice-navy/6 focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sluice-routeBlue/35 active:scale-[0.96] lg:hidden dark:text-sluice-softBlue dark:hover:bg-white/[0.06]",
                sidebarOpen && "bg-sluice-navy/8 text-sluice-routeBlue shadow-[0_10px_28px_-18px_rgba(29,52,135,0.85)] dark:bg-white/[0.08] dark:shadow-[0_10px_28px_-18px_rgba(0,0,0,0.9)]",
              )}
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              <MobileNavGlyph isOpen={sidebarOpen} />
            </button>
          </div>
        }
      />

      <div className="mx-auto block w-full max-w-[1280px] px-6 sm:px-8 lg:grid lg:grid-cols-[264px_minmax(0,780px)] lg:items-start lg:gap-x-[clamp(4rem,8vw,7rem)] lg:px-16">
        <DocsSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0">
          <div className="mx-auto w-full max-w-[780px] py-6 pb-20 sm:py-6 sm:pb-24 lg:mx-0 lg:max-w-none lg:py-8 lg:pb-28">
            <Outlet />

            {/* Bottom nav */}
            {(prevPage || nextPage) && (
              <div className="mt-[clamp(2rem,4vw,2.75rem)] grid grid-cols-1 gap-4 border-t border-sluice-navy/14 pt-6 sm:grid-cols-2">
                {prevPage && (
                  <Link
                    to={prevPage.href}
                    className="flex min-w-0 flex-col gap-1 rounded-[14px] border border-sluice-navy/14 bg-sluice-paper/42 px-4 py-[0.95rem] text-inherit no-underline transition-colors hover:border-sluice-navy/32 hover:bg-sluice-paper/70 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
                  >
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-xs font-semibold tracking-normal text-sluice-muted">
                      Previous
                    </span>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-sm font-bold tracking-normal text-sluice-navy">
                      {prevPage.label}
                    </span>
                  </Link>
                )}
                {nextPage && (
                  <Link
                    to={nextPage.href}
                    className="flex min-w-0 flex-col gap-1 rounded-[14px] border border-sluice-navy/14 bg-sluice-paper/42 px-4 py-[0.95rem] text-inherit no-underline transition-colors hover:border-sluice-navy/32 hover:bg-sluice-paper/70 dark:bg-white/[0.03] dark:hover:bg-white/[0.06] sm:text-right"
                  >
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-xs font-semibold tracking-normal text-sluice-muted">
                      Next
                    </span>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap font-sans text-sm font-bold tracking-normal text-sluice-navy">
                      {nextPage.label}
                    </span>
                  </Link>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
