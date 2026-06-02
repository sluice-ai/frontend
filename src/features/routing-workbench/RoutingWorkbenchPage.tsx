import { useEffect, useRef, useState } from "react";

import { useProviders, useRoutingPreferences } from "@/entities/provider/providerStore";
import { PromptComposer } from "@/features/routing-workbench/components/PromptComposer";
import { ResponseBlock } from "@/features/routing-workbench/components/ResponseBlock";
import { RoutingDrawer } from "@/features/routing-workbench/components/RoutingDrawer";
import { WorkbenchActions } from "@/features/routing-workbench/components/WorkbenchActions";
import { useImageAttachment } from "@/features/routing-workbench/hooks/useImageAttachment";
import { useRoutingRun } from "@/features/routing-workbench/hooks/useRoutingRun";
import { SettingsModal } from "@/features/settings/SettingsModal";
import { appNavItems } from "@/shared/config/navigation";
import { Navbar } from "@/shared/layout/Navbar";

export function RoutingWorkbenchPage() {
  const { prefs } = useRoutingPreferences();
  const { providers } = useProviders();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    imageAttachment,
    handleImageSelect,
    handlePaste,
    removeImage,
  } = useImageAttachment();

  const {
    prompt,
    setPrompt,
    submittedPrompt,
    submittedImage,
    runState,
    result,
    failure,
    handleSend,
    handleReset,
  } = useRoutingRun({
    prefs,
    providers,
    imageAttachment,
    removeImage,
  });

  const hasConversation = Boolean(submittedPrompt) || Boolean(failure);
  const busy = runState === "routing";

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [failure, result, runState]);

  return (
    <main className="min-h-screen overflow-x-clip bg-sluice-paper text-sluice-ink">
      <Navbar items={appNavItems} showProgress={false} />
      <div className="app-glow pointer-events-none fixed inset-0 -z-10" />

      <section className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-6 pb-3 pt-20 sm:px-8 md:pt-24 lg:px-16">
        <WorkbenchActions
          routingOpen={drawerOpen}
          onOpenSettings={() => {
            setDrawerOpen(false);
            setSettingsOpen(true);
          }}
          onOpenRouting={() => setDrawerOpen(true)}
        />

        {hasConversation ? (
          <>
            <div
              ref={scrollRef}
              className="flex flex-1 flex-col overflow-y-auto pb-28 md:pb-0"
            >
              <div className="mx-auto w-full max-w-3xl flex-1 px-1 py-6">
                <ResponseBlock
                  prompt={submittedPrompt}
                  imagePreview={submittedImage}
                  runState={runState}
                  result={result}
                  failure={failure}
                  onOpenSettings={() => setSettingsOpen(true)}
                />
              </div>
            </div>
            <PromptComposer
              prompt={prompt}
              busy={busy}
              hasConversation={hasConversation}
              imageAttachment={imageAttachment}
              onPromptChange={setPrompt}
              onImageSelect={handleImageSelect}
              onPaste={handlePaste}
              onRemoveImage={removeImage}
              onReset={handleReset}
              onSend={handleSend}
            />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center pb-36 pt-2 md:pb-40 md:pt-0">
            <div className="flex w-full flex-col items-center">
              <h1 className="text-center font-sans text-4xl font-semibold leading-tight tracking-normal text-sluice-navy sm:text-5xl md:text-[4rem]">
                How can I help you?
              </h1>
              <div className="mt-8 w-full sm:mt-9 md:mt-10">
                <PromptComposer
                  prompt={prompt}
                  busy={busy}
                  hasConversation={hasConversation}
                  imageAttachment={imageAttachment}
                  onPromptChange={setPrompt}
                  onImageSelect={handleImageSelect}
                  onPaste={handlePaste}
                  onRemoveImage={removeImage}
                  onReset={handleReset}
                  onSend={handleSend}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <RoutingDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </main>
  );
}
