import { useId, useState, type ReactNode } from "react";
import { Check, Copy, CircleAlert, Lightbulb } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

/* ============================================================
   Lightweight Python / TypeScript syntax highlighter.
   Tokenises a code string into coloured spans without pulling
   in a heavyweight highlighting dependency. Colours follow a
   GitHub-dark style so the block reads well in both themes.
   ============================================================ */

const PY_KEYWORDS = new Set([
  "from", "import", "as", "def", "class", "return", "if", "else", "elif",
  "for", "while", "in", "not", "and", "or", "is", "None", "True", "False",
  "with", "try", "except", "finally", "raise", "lambda", "yield", "await",
  "async", "pass", "break", "continue", "global", "nonlocal", "assert", "del",
]);

const TS_KEYWORDS = new Set([
  "import", "from", "export", "const", "let", "var", "function", "return",
  "await", "async", "new", "class", "extends", "implements", "interface",
  "type", "if", "else", "for", "while", "of", "in", "true", "false", "null",
  "undefined", "void", "this", "as", "default", "try", "catch", "finally",
  "throw",
]);

interface Token {
  text: string;
  cls: string;
}

type CodeLanguage = "python" | "typescript";

const TOKEN_COLORS: Record<string, string> = {
  comment: "text-[#8b949e] italic",
  string: "text-[#7ee787]",
  keyword: "text-[#ff7b72]",
  number: "text-[#79c0ff]",
  fn: "text-[#d2a8ff]",
  type: "text-[#79c0ff]",
  plain: "text-[#c9d1d9]",
};

function tokenize(code: string, lang: CodeLanguage): Token[] {
  const keywords = lang === "python" ? PY_KEYWORDS : TS_KEYWORDS;
  const tokens: Token[] = [];

  // Order matters: comments + strings first so their contents aren't re-parsed.
  const pattern = new RegExp(
    [
      lang === "python" ? "(#[^\\n]*)" : "(//[^\\n]*)", // comment
      "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)", // string
      "(\\b\\d+(?:\\.\\d+)?\\b)", // number
      "([A-Za-z_$][\\w$]*)", // identifier
    ].join("|"),
    "g",
  );

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: code.slice(lastIndex, match.index), cls: "plain" });
    }

    const [full, comment, string, number, ident] = match;

    if (comment !== undefined) {
      tokens.push({ text: full, cls: "comment" });
    } else if (string !== undefined) {
      tokens.push({ text: full, cls: "string" });
    } else if (number !== undefined) {
      tokens.push({ text: full, cls: "number" });
    } else if (ident !== undefined) {
      if (keywords.has(ident)) {
        tokens.push({ text: full, cls: "keyword" });
      } else {
        // Identifier immediately followed by "(" → function call.
        const after = code[pattern.lastIndex];
        if (after === "(") {
          tokens.push({ text: full, cls: "fn" });
        } else if (/^[A-Z]/.test(ident)) {
          tokens.push({ text: full, cls: "type" });
        } else {
          tokens.push({ text: full, cls: "plain" });
        }
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < code.length) {
    tokens.push({ text: code.slice(lastIndex), cls: "plain" });
  }

  return tokens;
}

interface CodeTab {
  id: string;
  label: string;
  code: string;
  language: CodeLanguage;
}

function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const indicatorId = useId();
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const tokens = tokenize(active.code, active.language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1117] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 bg-white/[0.02] px-3 py-2.5">
        <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.4 }}>
          <div
            role="tablist"
            aria-label="SDK language"
            className="inline-flex rounded-md border border-white/10 bg-white/[0.03] p-0.5"
          >
            {tabs.map((tab) => {
              const isActive = tab.id === active.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveId(tab.id);
                    setCopied(false);
                  }}
                  className={`relative h-7 rounded px-2.5 font-sans text-[11px] font-semibold outline-none transition-colors focus:!outline-none focus-visible:!outline-none ${
                    isActive
                      ? "text-[#e6edf3]"
                      : "text-[#8b949e] hover:text-[#c9d1d9]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId={indicatorId}
                      className="absolute inset-0 rounded bg-white/[0.12]"
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </MotionConfig>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 font-sans text-[11px] font-semibold text-[#8b949e] transition-colors hover:border-white/20 hover:text-[#c9d1d9]"
        >
          {copied ? (
            <>
              <Check size={13} strokeWidth={2} className="text-[#7ee787]" />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} strokeWidth={2} />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="relative overflow-x-auto overflow-y-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.pre
            key={active.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="px-4 py-4 text-[13px] leading-[1.7] motion-reduce:!transform-none"
          >
            <code className="font-mono">
              {tokens.map((tok, i) => (
                <span key={i} className={TOKEN_COLORS[tok.cls]}>
                  {tok.text}
                </span>
              ))}
            </code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   Small presentational helpers shared across the page.
   ============================================================ */

function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="m-0 mb-2.5 scroll-mt-24 font-sans text-lg font-[650] leading-normal tracking-[-0.01em] text-sluice-navy"
    >
      {children}
    </h2>
  );
}

function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn";
  title: string;
  children: ReactNode;
}) {
  const Icon = tone === "warn" ? CircleAlert : Lightbulb;

  const textToneColor =
    tone === "warn"
      ? "text-orange-700 dark:text-amber-400"
      : "text-[#1d3487] dark:text-[#6d96f0]";

  const iconColor =
    tone === "warn"
      ? "text-orange-600 dark:text-amber-400"
      : "text-[#4a77dc] dark:text-[#6d96f0]";

  const bgGradient =
    tone === "warn"
      ? "bg-gradient-to-r from-amber-500/[0.06] via-amber-500/[0.02] to-transparent dark:from-amber-500/[0.05] dark:via-amber-500/[0.01]"
      : "bg-gradient-to-r from-sluice-routeBlue/[0.07] via-sluice-routeBlue/[0.02] to-transparent dark:from-sluice-routeBlue/[0.06] dark:via-sluice-routeBlue/[0.01]";

  return (
    <div className={`my-6 flex flex-col gap-2 p-4 pl-5 relative overflow-hidden rounded-lg ${bgGradient}`}>
      <div className="flex items-center gap-2.5">
        <span className={`${iconColor} flex items-center justify-center shrink-0`} aria-hidden="true">
          <Icon size={16} strokeWidth={2.5} />
        </span>
        <span className={`font-sans text-[11px] font-bold tracking-wider uppercase ${textToneColor}`}>
          {title}
        </span>
      </div>
      <div className="pl-[26px] font-sans text-[13.5px] leading-[1.7] text-sluice-ink [&_code]:rounded [&_code]:bg-sluice-navy/8 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:text-sluice-navy [&_strong]:font-[650] [&_strong]:text-sluice-navy dark:[&_code]:bg-white/[0.08] dark:[&_code]:text-white dark:[&_strong]:text-white">
        {children}
      </div>
    </div>
  );
}

interface ParamRow {
  name: string;
  type: string;
  required?: boolean;
  desc: ReactNode;
}

function ParamTable({ rows }: { rows: ParamRow[] }) {
  return (
    <div className="my-6 overflow-hidden rounded-[14px] border border-sluice-navy/14">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-sans text-[13px]">
          <thead>
            <tr className="bg-sluice-navy/5 text-left dark:bg-white/[0.04]">
              <th className="px-4 py-2.5 font-semibold text-sluice-navy">Parameter</th>
              <th className="px-4 py-2.5 font-semibold text-sluice-navy">Type</th>
              <th className="px-4 py-2.5 font-semibold text-sluice-navy">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.name}
                className="border-t border-sluice-navy/10 align-top"
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[12.5px] text-sluice-navy dark:bg-white/[0.08]">
                    {row.name}
                  </code>
                  {row.required && (
                    <span className="ml-2 font-sans text-[10px] font-bold uppercase tracking-[0.04em] text-[#EA580C] dark:text-[#f59e0b]">
                      required
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-[12.5px] text-sluice-muted">
                  {row.type}
                </td>
                <td className="px-4 py-3 leading-[1.6] text-sluice-ink [&_code]:rounded [&_code]:bg-sluice-navy/8 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-sluice-navy dark:[&_code]:bg-white/[0.08]">
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   Code samples
   ============================================================ */

const INSTALL_PY = `pip install sluice`;

const INSTALL_TS = `npm install sluice`;

const QUICK_START_PY = `from sluice import SluiceClient

client = SluiceClient(
    sluice_api_key="SLUICE_X...",
    byok_providers={
        "chutes": "CHUTES_API_KEY",
        "targon": "TARGON_API_KEY",
    },
)

response = client.chat.completions.create(
    messages=[{"role": "user", "content": "Analyze this contract"}],
    optimization_metric="cost_optimized",
)

print(response.choices[0].message.content)`;

const QUICK_START_TS = `import { SluiceClient } from "sluice";

const client = new SluiceClient({
  sluiceApiKey: "SLUICE_X...",
  byokProviders: {
    chutes: "CHUTES_API_KEY",
    targon: "TARGON_API_KEY",
  },
});

const response = await client.chat.completions.create({
  messages: [{ role: "user", content: "Analyze this contract" }],
  optimizationMetric: "cost_optimized",
});

console.log(response.choices[0].message.content);`;

const FALLBACK_EXAMPLE_PY = `response = client.chat.completions.create(
    messages=[{"role": "user", "content": "Translate to French"}],
    optimization_metric="lowest_latency",
)

print(response.route.suggested.provider)  # Sluice's best pick
print(response.route.provider)            # BYOK match or BYOK fallback`;

const FALLBACK_EXAMPLE_TS = `const response = await client.chat.completions.create({
  messages: [{ role: "user", content: "Translate to French" }],
  optimizationMetric: "lowest_latency",
});

console.log(response.route.suggested.provider); // Sluice's best pick
console.log(response.route.provider);           // BYOK match or BYOK fallback`;



/* ============================================================
   Page
   ============================================================ */

export function SdkReferencePage() {
  return (
    <article className="animate-docs-fade-in motion-reduce:animate-none">
      {/* Hero */}
      <div>
        <h1 className="m-0 font-sans text-[clamp(1.375rem,2.2vw,1.75rem)] font-[650] leading-[1.18] tracking-normal text-sluice-navy">
          SDK Reference
        </h1>
        <p className="mt-4 max-w-[640px] font-sans text-[1.05rem] font-normal leading-[1.65] tracking-normal text-sluice-muted">
          Python and TypeScript clients for routing requests through Sluice with
          your BYOK provider keys.
        </p>
      </div>

      <div className="my-[clamp(1.5rem,3vw,2rem)] h-px bg-[linear-gradient(90deg,rgba(29,52,135,0.18)_0,rgba(29,52,135,0.18)_9px,transparent_9px,transparent_18px)] bg-[length:18px_1px] bg-repeat-x dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_9px,transparent_9px,transparent_18px)]" />

      {/* Intro */}
      <div className="flex max-w-[720px] flex-col gap-[1.4rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.02rem] [&_p]:font-normal [&_p]:leading-[1.72] [&_p]:tracking-normal [&_p]:text-sluice-ink [&_strong]:font-[650] [&_strong]:text-sluice-navy">
        <p>
          The SDK wraps the Route API behind an OpenAI-style{" "}
          <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.9em] text-sluice-navy dark:bg-white/[0.08]">chat.completions.create</code>{" "}
          call. Sluice first suggests the best provider and model for the task;
          that suggestion does <strong>not</strong> need to be in your BYOK map.
          Your BYOK map is the set of providers the SDK can actually call with
          your credentials.
        </p>
      </div>

      {/* Installation */}
      <div className="mt-11">
        <SectionHeading id="installation">Installation</SectionHeading>
        <p className="m-0 font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Install the package for the SDK you use.
        </p>
        <CodeTabs
          tabs={[
            { id: "python", label: "Python", code: INSTALL_PY, language: "python" },
            { id: "typescript", label: "TypeScript", code: INSTALL_TS, language: "typescript" },
          ]}
        />
      </div>

      {/* Quick start */}
      <div className="mt-11">
        <SectionHeading id="quick-start">Quick start</SectionHeading>
        <p className="m-0 font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Create a client with your Sluice key and BYOK provider keys.
        </p>
        <CodeTabs
          tabs={[
            { id: "python", label: "Python", code: QUICK_START_PY, language: "python" },
            { id: "typescript", label: "TypeScript", code: QUICK_START_TS, language: "typescript" },
          ]}
        />
      </div>

      {/* Authentication & BYOK */}
      <div className="mt-11">
        <SectionHeading id="auth-and-byok">Authentication &amp; BYOK</SectionHeading>
        <div className="flex max-w-[720px] flex-col gap-[1.2rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.0rem] [&_p]:leading-[1.72] [&_p]:text-sluice-ink [&_strong]:font-[650] [&_strong]:text-sluice-navy">
          <p>
            <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.9em] text-sluice-navy dark:bg-white/[0.08]">sluice_api_key</code>{" "}
            authenticates routing.{" "}
            <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.9em] text-sluice-navy dark:bg-white/[0.08]">byok_providers</code>{" "}
            lists providers you already have keys for. Those providers are used
            for direct matches and for fallback.
          </p>
        </div>
        <ParamTable
          rows={[
            {
              name: "sluice_api_key",
              type: "str",
              required: true,
              desc: <>Your Sluice network key. Authenticates the client and meters routing usage.</>,
            },
            {
              name: "byok_providers",
              type: "dict[str, str]",
              desc: (
                <>
                  Map of <code>provider_id</code> → your API key for that provider
                  (e.g. <code>chutes</code>, <code>targon</code>). This is the
                  SDK&apos;s BYOK execution and fallback pool.
                </>
              ),
            },
            {
              name: "allow_fallback",
              type: "bool",
              desc: (
                <>
                  When <code>True</code>, the SDK may choose the best fallback
                  from your <code>byok_providers</code> if Sluice&apos;s top
                  suggestion is not in BYOK. Defaults to <code>True</code>.
                </>
              ),
            },
            {
              name: "base_url",
              type: "str",
              desc: <>Override the Sluice gateway endpoint. Useful for testnet or self-hosted gateways.</>,
            },
          ]}
        />
      </div>

      {/* How resolution works */}
      <div className="mt-11">
        <SectionHeading id="route-resolution">How route resolution works</SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Sluice suggests the best route first. BYOK decides what the SDK is
          allowed to execute.
        </p>

        <div className="mt-2 flex flex-col">
          {[
            {
              title: "Best suggestion",
              desc: "The miner returns the best provider and model for the request. This can be outside your BYOK map.",
            },
            {
              title: "BYOK match",
              desc: "If the suggested provider is in byok_providers, the SDK calls it with your key.",
            },
            {
              title: "BYOK fallback",
              desc: "If the suggestion is not in BYOK and allow_fallback is true, the SDK falls back to the best eligible provider from your byok_providers map.",
            },
            {
              title: "No fallback",
              desc: "If fallback is disabled, or no BYOK fallback is available, the SDK does not execute a non-BYOK provider.",
            },
          ].map((step, i, arr) => (
            <div key={step.title} className="flex gap-5 pb-7 last:pb-0">
              <div className="flex w-8 shrink-0 flex-col items-center">
                <span className="mb-1 font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.04em] text-[#3b5bdb] dark:text-sluice-routeBlue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#3b5bdb] bg-white dark:border-sluice-routeBlue dark:bg-sluice-paperMuted" />
                {i < arr.length - 1 && (
                  <span className="mt-1 min-h-7 w-px flex-1 bg-sluice-navy/18" />
                )}
              </div>
              <div>
                <span className="mb-2 block font-sans text-[15px] font-semibold text-sluice-navy">
                  {step.title}
                </span>
                <p className="m-0 font-sans text-[13px] leading-[1.65] text-sluice-muted">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Callout tone="info" title="Fallback stays BYOK">
          The Sluice suggestion is the best route; it does not need to be BYOK.
          Fallback is different: with <code>allow_fallback=True</code>, fallback
          candidates come from your <code>byok_providers</code>.
        </Callout>

        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Read the route only when you need to show the Sluice suggestion beside
          the provider actually served with your BYOK key.
        </p>
        <CodeTabs
          tabs={[
            { id: "python", label: "Python", code: FALLBACK_EXAMPLE_PY, language: "python" },
            { id: "typescript", label: "TypeScript", code: FALLBACK_EXAMPLE_TS, language: "typescript" },
          ]}
        />

        <Callout tone="warn" title="Disabling fallback">
          Set <code>allow_fallback=False</code> if the SDK should only execute
          the top Sluice suggestion when that exact provider is in your BYOK map.
        </Callout>

      </div>

      {/* create() reference */}
      <div className="mt-11">
        <SectionHeading id="create-reference">
          chat.completions.create()
        </SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          The primary method. It accepts the familiar messages array plus a
          Sluice-specific <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">optimization_metric</code> that
          tells the miner what to optimise the route for. TypeScript uses
          camelCase names like <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">optimizationMetric</code>.
        </p>
        <ParamTable
          rows={[
            {
              name: "messages",
              type: "list[Message]",
              required: true,
              desc: <>The conversation, in OpenAI chat format (<code>role</code> + <code>content</code>).</>,
            },
            {
              name: "optimization_metric",
              type: "str",
              desc: (
                <>
                  What the miner should optimise the route for. One of{" "}
                  <code>cost_optimized</code>, <code>lowest_latency</code>, or{" "}
                  <code>highest_accuracy</code>. Defaults to <code>cost_optimized</code>.
                </>
              ),
            },
            {
              name: "model",
              type: "str | None",
              desc: <>Optional model hint. Leave unset to let the miner choose the best model for the metric.</>,
            },
            {
              name: "max_tokens",
              type: "int | None",
              desc: <>Standard generation control, forwarded to the resolved provider.</>,
            },
          ]}
        />
      </div>

      {/* optimization metric */}
      <div className="mt-11">
        <SectionHeading id="optimization-metric">Optimization metrics</SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          The metric tells the miner what "best" means for this request.
        </p>
        <ParamTable
          rows={[
            {
              name: "cost_optimized",
              type: "default",
              desc: <>Minimise spend while meeting the quality floor.</>,
            },
            {
              name: "lowest_latency",
              type: "",
              desc: <>Minimise response time.</>,
            },
            {
              name: "highest_accuracy",
              type: "",
              desc: <>Maximise benchmarked output quality.</>,
            },
          ]}
        />
      </div>
    </article>
  );
}
