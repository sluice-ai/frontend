import { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

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

const TOKEN_COLORS: Record<string, string> = {
  comment: "text-[#8b949e] italic",
  string: "text-[#7ee787]",
  keyword: "text-[#ff7b72]",
  number: "text-[#79c0ff]",
  fn: "text-[#d2a8ff]",
  type: "text-[#79c0ff]",
  plain: "text-[#c9d1d9]",
};

function tokenize(code: string, lang: "python" | "typescript"): Token[] {
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

function CodeBlock({
  code,
  language = "python",
  label,
}: {
  code: string;
  language?: "python" | "typescript";
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const tokens = tokenize(code, language);
  const displayLabel = label ?? (language === "python" ? "Python" : "TypeScript");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1117] shadow-[0_18px_40px_-24px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.02] px-4 py-2.5">
        <span className="font-sans text-[12px] font-semibold tracking-normal text-[#8b949e]">
          {displayLabel}
        </span>
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
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-[1.7]">
        <code className="font-mono">
          {tokens.map((tok, i) => (
            <span key={i} className={TOKEN_COLORS[tok.cls]}>
              {tok.text}
            </span>
          ))}
        </code>
      </pre>
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
  const accent =
    tone === "warn"
      ? "border-l-[#EA580C] dark:border-l-[#f59e0b]"
      : "border-l-sluice-routeBlue";

  return (
    <div
      className={`my-6 rounded-[12px] border border-sluice-navy/14 border-l-[3px] ${accent} bg-sluice-paper/46 p-4 dark:bg-white/[0.03]`}
    >
      <span className="mb-1.5 block font-sans text-[13px] font-bold text-sluice-navy">
        {title}
      </span>
      <p className="m-0 font-sans text-[13.5px] leading-[1.7] text-sluice-ink [&_code]:rounded [&_code]:bg-sluice-navy/8 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[12.5px] [&_code]:text-sluice-navy [&_strong]:font-[650] [&_strong]:text-sluice-navy dark:[&_code]:bg-white/[0.08]">
        {children}
      </p>
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
   Resolution flow — visualises how the SDK decides between a
   stored BYOK key and a Sluice-served fallback provider.
   ============================================================ */

function ResolutionFlow() {
  return (
    <figure className="my-8 overflow-hidden rounded-card border border-sluice-navy/12 bg-sluice-paper/38 p-5 dark:bg-white/[0.03]">
      <svg
        viewBox="0 0 600 470"
        role="img"
        aria-label="BYOK resolution flow: the SDK asks the Sluice miner for the best route, checks whether the suggested provider is in your BYOK list, then either calls your own key or falls back to a Sluice-served provider."
        className="mx-auto block h-auto w-full max-w-[560px]"
      >
        <defs>
          <marker id="sdk-arrow" markerWidth="9" markerHeight="9" refX="9" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 z" fill="#9CA3AF" />
          </marker>
        </defs>

        {/* Request */}
        <rect x="200" y="8" width="200" height="50" rx="12" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1.4" />
        <text x="300" y="30" textAnchor="middle" fill="#374151" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">SDK request</text>
        <text x="300" y="47" textAnchor="middle" fill="#6B7280" fontSize="10.5" fontFamily="Inter, system-ui, sans-serif">prompt + optimization_metric</text>

        <line x1="300" y1="58" x2="300" y2="92" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#sdk-arrow)" />

        {/* Miner */}
        <rect x="172" y="92" width="256" height="58" rx="14" fill="var(--sluice-dg-brand)" />
        <text x="300" y="117" textAnchor="middle" fill="var(--sluice-dg-on-brand)" fontSize="15" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Sluice Miner</text>
        <text x="300" y="137" textAnchor="middle" fill="var(--sluice-dg-on-brand-soft)" fontSize="10.5" fontFamily="Inter, system-ui, sans-serif">suggests best model / provider</text>

        <line x1="300" y1="150" x2="300" y2="184" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#sdk-arrow)" />

        {/* Decision diamond */}
        <path d="M300 184 L392 232 L300 280 L208 232 Z" fill="#FEF3C7" stroke="#EA580C" strokeWidth="1.5" />
        <text x="300" y="226" textAnchor="middle" fill="#9A3412" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Provider in</text>
        <text x="300" y="242" textAnchor="middle" fill="#9A3412" fontSize="11" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">your BYOK list?</text>

        {/* Yes branch */}
        <path d="M208 232 H92 V330" fill="none" stroke="#16A34A" strokeWidth="1.6" markerEnd="url(#sdk-arrow)" />
        <text x="150" y="222" textAnchor="middle" fill="#16A34A" fontSize="10.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">yes — match</text>

        {/* No branch */}
        <path d="M392 232 H508 V330" fill="none" stroke="#DC2626" strokeWidth="1.6" markerEnd="url(#sdk-arrow)" />
        <text x="452" y="222" textAnchor="middle" fill="#DC2626" fontSize="10.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">no match</text>

        {/* BYOK box */}
        <rect x="8" y="330" width="168" height="64" rx="12" fill="#16A34A" />
        <text x="92" y="356" textAnchor="middle" fill="white" fontSize="12.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Use your key</text>
        <text x="92" y="375" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontFamily="Inter, system-ui, sans-serif">billed to your BYOK</text>

        {/* Fallback box */}
        <rect x="424" y="330" width="168" height="64" rx="12" fill="#DC2626" />
        <text x="508" y="352" textAnchor="middle" fill="white" fontSize="12.5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">Sluice fallback</text>
        <text x="508" y="370" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontFamily="Inter, system-ui, sans-serif">new provider, not</text>
        <text x="508" y="382" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9.5" fontFamily="Inter, system-ui, sans-serif">in your list</text>

        {/* Merge to response */}
        <path d="M92 394 V430 H300" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
        <path d="M508 394 V430 H300" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
        <line x1="300" y1="430" x2="300" y2="444" stroke="#9CA3AF" strokeWidth="1.5" markerEnd="url(#sdk-arrow)" />
        <rect x="232" y="444" width="136" height="22" rx="11" fill="none" stroke="#9CA3AF" strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="300" y="459" textAnchor="middle" fill="#6B7280" fontSize="10.5" fontWeight="600" fontFamily="Inter, system-ui, sans-serif">unified response</text>
      </svg>
      <figcaption className="mx-auto mt-4 max-w-[480px] text-center font-sans text-[13px] leading-[1.55] text-sluice-muted">
        The miner picks the optimal route first. The SDK then honours your stored
        BYOK keys whenever the suggestion matches one, and only falls back to a
        Sluice-served provider when it doesn&apos;t.
      </figcaption>
    </figure>
  );
}

/* ============================================================
   Code samples
   ============================================================ */

const QUICK_START = `from sluice import SluiceClient

# Sluice wraps the user's downstream credentials safely
client = SluiceClient(
    sluice_api_key="SLUICE_X...",
    byok_providers={
        "chutes": "CHUTES_API_KEY",
        "targon": "TARGON_API_KEY",
    },
)

# The SDK automatically queries Sluice Miner -> gets best route -> hits provider
response = client.chat.completions.create(
    messages=[{"role": "user", "content": "Analyze this smart contract for reentrancy bugs"}],
    optimization_metric="cost_optimized",  # or "lowest_latency", "highest_accuracy"
)

print(response.choices[0].message.content)`;

const INSTALL = `pip install sluice`;

const RESPONSE_SHAPE = `# response.route describes how Sluice fulfilled the request
print(response.route.provider)        # "chutes"
print(response.route.model)           # "deepseek-ai/DeepSeek-V3"
print(response.route.source)          # "byok"  -> your key was used
print(response.route.fallback)        # False
print(response.route.miner_uid)       # the miner whose route won

# Usage + cost attribution
print(response.usage.total_tokens)    # 1843
print(response.route.billed_to)       # "byok" or "sluice"`;

const FALLBACK_EXAMPLE = `response = client.chat.completions.create(
    messages=[{"role": "user", "content": "Translate to French"}],
    optimization_metric="lowest_latency",
)

if response.route.fallback:
    # The miner's best route wasn't in your BYOK list, so Sluice served it.
    print(f"Served via Sluice fallback: {response.route.provider}")
    print(f"Suggested adding it as BYOK: {response.route.suggested_byok}")
else:
    print(f"Served with your own key: {response.route.provider}")`;

const STREAMING = `stream = client.chat.completions.create(
    messages=[{"role": "user", "content": "Write a haiku about routing"}],
    optimization_metric="lowest_latency",
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="")`;

const ERROR_HANDLING = `from sluice import SluiceClient
from sluice.errors import AuthenticationError, NoRouteError, ProviderError

try:
    response = client.chat.completions.create(
        messages=[{"role": "user", "content": "Summarize this document"}],
        optimization_metric="highest_accuracy",
    )
except AuthenticationError:
    # Invalid sluice_api_key
    ...
except NoRouteError:
    # No miner could satisfy the policy and no fallback was permitted
    ...
except ProviderError as err:
    # The downstream provider (your BYOK key or fallback) returned an error
    print(err.provider, err.status_code)`;

const TS_QUICK_START = `import { SluiceClient } from "sluice";

const client = new SluiceClient({
  sluiceApiKey: "SLUICE_X...",
  byokProviders: {
    chutes: "CHUTES_API_KEY",
    targon: "TARGON_API_KEY",
  },
});

const response = await client.chat.completions.create({
  messages: [{ role: "user", content: "Analyze this smart contract" }],
  optimizationMetric: "cost_optimized",
});

console.log(response.choices[0].message.content);`;

const DISABLE_FALLBACK = `client = SluiceClient(
    sluice_api_key="SLUICE_X...",
    byok_providers={"chutes": "CHUTES_API_KEY"},
    allow_fallback=False,  # raise NoRouteError instead of using a Sluice provider
)`;

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
          The Sluice SDK gives you a single client that authenticates with your
          Sluice API key, holds your bring-your-own-key (BYOK) provider
          credentials, and routes every request through the Sluice miner network.
        </p>
      </div>

      <div className="my-[clamp(1.5rem,3vw,2rem)] h-px bg-[linear-gradient(90deg,rgba(29,52,135,0.18)_0,rgba(29,52,135,0.18)_9px,transparent_9px,transparent_18px)] bg-[length:18px_1px] bg-repeat-x dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_0,rgba(255,255,255,0.16)_9px,transparent_9px,transparent_18px)]" />

      {/* Intro */}
      <div className="flex max-w-[720px] flex-col gap-[1.4rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.02rem] [&_p]:font-normal [&_p]:leading-[1.72] [&_p]:tracking-normal [&_p]:text-sluice-ink [&_strong]:font-[650] [&_strong]:text-sluice-navy">
        <p>
          The SDK is the recommended way to integrate Sluice. It wraps the Route
          API behind an OpenAI-style <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.9em] text-sluice-navy dark:bg-white/[0.08]">chat.completions.create</code> interface,
          so adopting it is mostly a matter of swapping your client and
          declaring which providers you already pay for.
        </p>
        <p>
          You give the client two things: a <strong>Sluice API key</strong> that
          authenticates you to the network, and a <strong>BYOK provider map</strong> of
          the downstream providers you hold credentials for. On every request the
          SDK queries a Sluice miner for the best route, then resolves that route
          against your BYOK keys — using your own credentials when the suggestion
          matches, and falling back to a Sluice-served provider when it
          doesn&apos;t.
        </p>
      </div>

      {/* Installation */}
      <div className="mt-11">
        <SectionHeading id="installation">Installation</SectionHeading>
        <p className="m-0 font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Install the Python package from PyPI. A TypeScript package is published
          on npm as <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">sluice</code>.
        </p>
        <CodeBlock code={INSTALL} language="python" label="Shell" />
      </div>

      {/* Quick start */}
      <div className="mt-11">
        <SectionHeading id="quick-start">Quick start</SectionHeading>
        <p className="m-0 font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Construct a client with your Sluice key and BYOK providers, then create
          a completion. The SDK handles the miner query and provider call for you.
        </p>
        <CodeBlock code={QUICK_START} language="python" />
      </div>

      {/* Authentication & BYOK */}
      <div className="mt-11">
        <SectionHeading id="auth-and-byok">Authentication &amp; BYOK</SectionHeading>
        <div className="flex max-w-[720px] flex-col gap-[1.2rem] [&_p]:m-0 [&_p]:font-sans [&_p]:text-[1.0rem] [&_p]:leading-[1.72] [&_p]:text-sluice-ink [&_strong]:font-[650] [&_strong]:text-sluice-navy">
          <p>
            The <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.9em] text-sluice-navy dark:bg-white/[0.08]">sluice_api_key</code> identifies
            you to the network and meters your usage of the routing layer. It is
            not a payment token for inference — that is settled directly with the
            provider that fulfils the request.
          </p>
          <p>
            The <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.9em] text-sluice-navy dark:bg-white/[0.08]">byok_providers</code> map is
            where you list every provider you already have an account with. Keys
            are held by the client and used only to call the matching provider;
            Sluice never needs to store your downstream secrets to route a
            request. Enterprises typically register the full set of providers their
            procurement team has approved.
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
                  (e.g. <code>chutes</code>, <code>targon</code>). Providers listed
                  here are eligible to be served with your own credentials.
                </>
              ),
            },
            {
              name: "allow_fallback",
              type: "bool",
              desc: (
                <>
                  Whether Sluice may serve a request through a provider that is{" "}
                  <em>not</em> in your BYOK map. Defaults to <code>True</code>.
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
          This is the core behaviour of the SDK. A request never picks a provider
          blindly — the Sluice miner network decides the optimal route first, and
          your BYOK list then determines <em>how</em> that route is fulfilled.
        </p>

        <ResolutionFlow />

        <div className="mt-2 flex flex-col">
          {[
            {
              title: "Query the miner",
              desc: "The SDK sends task metadata and your optimization_metric to the network. A Sluice miner proposes the best model and provider for the job under that objective.",
            },
            {
              title: "Check your BYOK list",
              desc: "The SDK compares the miner's suggested provider (and model) against the providers in your byok_providers map.",
            },
            {
              title: "Match → use your key",
              desc: "If the suggestion is a provider you hold a key for, Sluice calls that provider with your credentials. Inference is billed to your BYOK account and the route is marked source = \"byok\".",
            },
            {
              title: "No match → Sluice fallback",
              desc: "If the optimal provider isn't in your list, Sluice fulfils the request through a Sluice-served provider that is not in your BYOK set, and returns it as a suggested provider you could add. The route is marked fallback = true.",
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

        <Callout tone="info" title="Why route first, then resolve?">
          Routing is decided by the open miner market, so you always get the
          best-scoring provider for the job. BYOK simply controls{" "}
          <strong>billing and credentials</strong>: you keep using the accounts
          you already pay for whenever they are the right destination, and Sluice
          covers the gaps so a request never fails just because you haven&apos;t
          onboarded a provider yet.
        </Callout>

        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Inspect <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">response.route</code> to
          see exactly how a request was fulfilled and whether a fallback was used:
        </p>
        <CodeBlock code={FALLBACK_EXAMPLE} language="python" />

        <Callout tone="warn" title="Disabling fallback">
          Set <code>allow_fallback=False</code> on the client if you must never
          send traffic to a provider you don&apos;t hold a key for. With fallback
          off, a request whose optimal route isn&apos;t in your BYOK list raises{" "}
          <code>NoRouteError</code> instead of being served by Sluice.
        </Callout>
        <CodeBlock code={DISABLE_FALLBACK} language="python" />
      </div>

      {/* create() reference */}
      <div className="mt-11">
        <SectionHeading id="create-reference">
          chat.completions.create()
        </SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          The primary method. It accepts the familiar messages array plus a
          Sluice-specific <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">optimization_metric</code> that
          tells the miner what to optimise the route for.
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
              name: "stream",
              type: "bool",
              desc: <>Stream the response as server-sent chunks. Defaults to <code>False</code>.</>,
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
          The metric is the objective the miner scores routes against. It shapes
          which provider gets suggested before BYOK resolution happens.
        </p>
        <ParamTable
          rows={[
            {
              name: "cost_optimized",
              type: "default",
              desc: <>Minimise spend per request while still clearing the quality floor. Best for high-volume or batch workloads.</>,
            },
            {
              name: "lowest_latency",
              type: "",
              desc: <>Minimise time-to-first-token and total response time. Best for interactive and real-time use.</>,
            },
            {
              name: "highest_accuracy",
              type: "",
              desc: <>Maximise benchmarked output quality regardless of cost. Best for analysis, reasoning, and evaluation tasks.</>,
            },
          ]}
        />
      </div>

      {/* Response object */}
      <div className="mt-11">
        <SectionHeading id="response">The response object</SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          The response is OpenAI-compatible (<code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">choices</code>,{" "}
          <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">usage</code>) and adds a{" "}
          <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">route</code> object describing the
          routing decision and how it was billed.
        </p>
        <CodeBlock code={RESPONSE_SHAPE} language="python" />
      </div>

      {/* Streaming */}
      <div className="mt-11">
        <SectionHeading id="streaming">Streaming</SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          Pass <code className="rounded bg-sluice-navy/8 px-1.5 py-0.5 font-mono text-[0.85em] text-sluice-navy dark:bg-white/[0.08]">stream=True</code> to
          receive incremental chunks. Resolution still happens once up front, then
          tokens stream directly from the resolved provider.
        </p>
        <CodeBlock code={STREAMING} language="python" />
      </div>

      {/* Error handling */}
      <div className="mt-11">
        <SectionHeading id="errors">Error handling</SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          The SDK raises typed exceptions so you can distinguish an auth problem
          from a routing problem from a downstream provider failure.
        </p>
        <CodeBlock code={ERROR_HANDLING} language="python" />
      </div>

      {/* TypeScript */}
      <div className="mt-11">
        <SectionHeading id="typescript">TypeScript</SectionHeading>
        <p className="m-0 max-w-[720px] font-sans text-[1.0rem] leading-[1.72] text-sluice-ink">
          The TypeScript client mirrors the Python API with camelCase options and
          promise-based calls. The BYOK resolution and fallback behaviour is
          identical.
        </p>
        <CodeBlock code={TS_QUICK_START} language="typescript" />
      </div>
    </article>
  );
}
