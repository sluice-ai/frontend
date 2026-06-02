import ArrowUp from "lucide-react/dist/esm/icons/arrow-up";
import Paperclip from "lucide-react/dist/esm/icons/paperclip";
import RotateCcw from "lucide-react/dist/esm/icons/rotate-ccw";
import X from "lucide-react/dist/esm/icons/x";
import { useEffect, useRef } from "react";

import { defaultPrompt } from "@/entities/routing/routing.data";
import type { ImageAttachment } from "@/features/routing-workbench/types";

type PromptComposerProps = {
  prompt: string;
  busy: boolean;
  hasConversation: boolean;
  imageAttachment: ImageAttachment | null;
  onPromptChange: (value: string) => void;
  onImageSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;
  onRemoveImage: () => void;
  onReset: () => void;
  onSend: () => Promise<void>;
};

export function PromptComposer({
  prompt,
  busy,
  hasConversation,
  imageAttachment,
  onPromptChange,
  onImageSelect,
  onPaste,
  onRemoveImage,
  onReset,
  onSend,
}: PromptComposerProps) {
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = promptInputRef.current;
    if (!input) return;

    input.style.height = "44px";
    const next = Math.max(44, Math.min(input.scrollHeight, 176));
    input.style.height = `${next}px`;
  }, [prompt]);

  return (
    <div className="fixed inset-x-0 bottom-3 z-20 bg-sluice-paper/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:static md:inset-auto md:z-auto md:bg-transparent md:pb-0 md:backdrop-blur-none">
      <div className="mx-auto w-full max-w-3xl px-4 pb-2 pt-2 md:px-1 md:pb-0 md:pt-0">
        {hasConversation && (
          <div className="mb-2 flex justify-end">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-pill px-3 py-1.5 font-sans text-[12px] font-semibold text-sluice-navy/70 hover:bg-sluice-navy/5 hover:text-sluice-navy"
            >
              <RotateCcw size={12} strokeWidth={2} />
              New conversation
            </button>
          </div>
        )}

        {imageAttachment && (
          <div className="mb-2 flex items-start gap-2">
            <div className="relative inline-block">
              <img
                src={imageAttachment.previewUrl}
                alt="Attached"
                className="h-20 max-w-[160px] rounded-md border border-sluice-navy/15 object-cover"
              />
              <button
                type="button"
                onClick={onRemoveImage}
                className="absolute -right-1.5 -top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-sluice-navy text-white shadow-sm hover:bg-sluice-deepNavy dark:bg-sluice-routeBlue dark:text-sluice-deepNavy dark:hover:bg-sluice-softBlue"
                aria-label="Remove image"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={onImageSelect}
          className="hidden"
        />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            void onSend();
          }}
          className="relative flex w-full items-center rounded-[28px] border border-sluice-navy/20 bg-white px-4 py-2 shadow-[0_8px_24px_-12px_rgba(29,52,135,0.18)] dark:border-white/12 dark:bg-sluice-paperMuted dark:shadow-none [contain:inline-size]"
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            aria-label="Attach image"
            title="Attach an image"
            className="mr-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sluice-navy/50 transition-colors hover:bg-sluice-navy/5 hover:text-sluice-navy disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
          >
            <Paperclip size={20} strokeWidth={2} />
          </button>

          <textarea
            data-prompt-input
            ref={promptInputRef}
            rows={1}
            value={prompt}
            onChange={(event) => onPromptChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void onSend();
              }
            }}
            onPaste={onPaste}
            placeholder={hasConversation ? "Ask a follow-up..." : defaultPrompt}
            disabled={busy}
            className="max-h-44 min-h-[44px] w-0 min-w-0 flex-1 resize-none overflow-y-auto bg-transparent px-1 py-2.5 font-sans text-base leading-6 text-sluice-ink outline-none [box-sizing:border-box] placeholder:text-sluice-muted/70 focus:outline-none focus:shadow-none focus-visible:outline-none focus-visible:shadow-none disabled:opacity-60 md:text-[15px]"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || busy}
            aria-label="Send prompt"
            className="ml-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sluice-navy text-sluice-paper transition-colors hover:bg-sluice-deepNavy disabled:cursor-not-allowed disabled:opacity-40 dark:bg-sluice-routeBlue dark:text-sluice-deepNavy dark:hover:bg-sluice-softBlue cursor-pointer"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </button>
        </form>
        <div className="mt-2.5 flex items-center justify-center">
          <p className="text-center font-sans text-[11px] font-medium tracking-[0.015em] text-sluice-muted/75">
            Sluice is a decentralized AI routing layer directing tasks to optimal models.
          </p>
        </div>
      </div>
    </div>
  );
}
