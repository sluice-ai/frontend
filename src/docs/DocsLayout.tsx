import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

import { BrandLogo } from "../components/BrandLogo";
import { DocsSidebar } from "./DocsSidebar";
import { docsSidebar } from "./docsData";

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
    <div className="min-h-screen overflow-x-clip bg-sluice-paper bg-[linear-gradient(180deg,rgba(242,243,245,0.92),rgba(237,238,238,0.74)),radial-gradient(rgba(29,52,135,0.1)_1px,transparent_1.2px),radial-gradient(rgba(74,119,220,0.06)_1px,transparent_1.2px)] bg-[position:0_0,0_0,12px_12px] bg-[size:auto,18px_18px,18px_18px]">
      <header className="sticky top-0 z-50 border-b border-sluice-navy/10 bg-sluice-paper/82 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 sm:px-8 lg:px-16">
          <div className="flex min-w-0 items-center gap-4 max-sm:gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sluice-navy/18 bg-transparent text-sluice-navy outline-none transition-colors hover:border-sluice-navy/30 hover:bg-sluice-navy/6 focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-sluice-routeBlue/35 lg:hidden"
              onClick={() => setSidebarOpen((prev) => !prev)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link
              to="/"
              className="flex min-w-0 items-center gap-2 font-sans text-2xl font-semibold leading-none tracking-[-0.025em] text-sluice-navy no-underline"
            >
              <BrandLogo />
            </Link>
          </div>
          <div className="ml-4 flex items-center gap-7">
            <span className="inline-flex h-7 items-center whitespace-nowrap rounded-full border border-sluice-navy/12 bg-sluice-navy/6 px-2.5 font-sans text-[11px] font-semibold leading-none tracking-normal text-sluice-navy">
              v0.1.0
            </span>
            <Link
              to="/dashboard"
              className="whitespace-nowrap font-sans text-[15px] font-medium leading-none tracking-normal text-sluice-navy no-underline transition-opacity hover:opacity-70 max-sm:hidden"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

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
                    className="flex min-w-0 flex-col gap-1 rounded-[14px] border border-sluice-navy/14 bg-sluice-paper/42 px-4 py-[0.95rem] text-inherit no-underline transition-colors hover:border-sluice-navy/32 hover:bg-sluice-paper/70"
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
                    className="flex min-w-0 flex-col gap-1 rounded-[14px] border border-sluice-navy/14 bg-sluice-paper/42 px-4 py-[0.95rem] text-inherit no-underline transition-colors hover:border-sluice-navy/32 hover:bg-sluice-paper/70 sm:text-right"
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
