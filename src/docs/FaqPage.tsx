import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";

interface FaqItem {
  q: string;
  a: string | JSX.Element;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    title: "General",
    items: [
      {
        q: "What is Sluice?",
        a: "Sluice is a decentralized routing layer for AI workloads. Instead of locking every request into a single provider, it picks the best destination for each job based on cost, latency, quality, reliability, and privacy constraints you define. That destination could be a model API, a specialized subnet, or private compute.",
      },
      {
        q: "What problem does Sluice solve?",
        a: "AI demand is fragmenting across dozens of providers, subnets, and data pipelines. Manually picking the right provider for each request type is complex, expensive, and static. Sluice turns that decision into a live competitive market where miners propose routes, validators benchmark outcomes, and the best route wins. The network gets better over time as it learns which providers perform best for which task types.",
      },
      {
        q: "How is Sluice different from just calling an AI API directly?",
        a: "When you call a provider directly, you get whatever that provider gives you. No fallback, no cost optimisation, no quality verification, and no way to express constraints like a privacy flag or a latency ceiling. Sluice sits in front of all providers and enforces a policy you define on every request. If a provider degrades or raises prices, the network re-routes automatically.",
      },
      {
        q: "What is the relationship between Sluice and Bittensor?",
        a: "Sluice operates as a Bittensor subnet. Bittensor handles the staking, incentives, and consensus layer. Sluice builds the routing market on top of that. TAO flows to the miners who propose winning routes and the validators who benchmark them.",
      },
    ],
  },
  {
    title: "For Developers",
    items: [
      {
        q: "How do I integrate Sluice into my application?",
        a: "You submit a request to the Route API with a prompt and a policy object. The policy describes your budget ceiling, latency target, quality floor, and privacy requirements. Sluice returns the response from the winning provider. From your application's perspective it's a single API call; everything else happens inside the network.",
      },
      {
        q: "What constraints can I set on a routing request?",
        a: (
          <span>
            You can set a <strong>budget ceiling</strong> (max spend per request), a{" "}
            <strong>latency target</strong> (max acceptable response time), a{" "}
            <strong>quality floor</strong> (minimum benchmark score), and a{" "}
            <strong>privacy flag</strong> that restricts routing to providers that guarantee no
            training on your data. Constraint weights are configurable, so you can push hard on cost
            while keeping latency as a hard requirement, or the other way around.
          </span>
        ),
      },
      {
        q: "Is there an SDK?",
        a: "TypeScript and Python client libraries are in development and will be the primary way to integrate. Both wrap the Route API and give you typed interfaces for building the policy object. The SDK Reference section will fill in once the testnet is live.",
      },
      {
        q: "What AI providers does Sluice route to?",
        a: "At launch, Sluice targets Chutes, Targon, and direct model APIs. The provider set grows as miners propose new routes and validators confirm those destinations meet benchmark standards. No provider is hard-coded. If a miner finds a better route and a validator confirms it, it joins the network.",
      },
    ],
  },
  {
    title: "For Miners",
    items: [
      {
        q: "What does a miner do in Sluice?",
        a: "Miners receive task metadata for each incoming request and independently propose the routing decision they think best satisfies the stated policy. A proposal is a destination address plus a predicted score across cost, latency, quality, reliability, and privacy. Miners that consistently produce winning proposals earn more TAO over time.",
      },
      {
        q: "How do miners earn rewards?",
        a: "Rewards go to the miner whose proposed route earns the highest validator score on a given request. The scoring is regret-weighted, meaning the network compares the winning route's actual outcome against reference alternatives. A miner that consistently beats the counterfactual earns disproportionately more. There's no participation reward for losing proposals.",
      },
      {
        q: "What hardware do I need to run a miner?",
        a: "Miners are routing agents, not compute nodes. They don't run the models themselves, so a standard server or VPS is enough. The quality of your routing strategy matters far more than raw hardware. Detailed setup guidance will be available in the Run a Miner guide when the testnet launches.",
      },
      {
        q: "Can multiple miners propose the same route?",
        a: "Yes. Miners operate independently and may converge on the same destination. When that happens, the validator still scores the executed route and reward goes to the miner credited for the winning proposal according to the on-chain resolution rules. Strategy differentiation, not just route selection, is what separates good miners from great ones over time.",
      },
    ],
  },
  {
    title: "For Validators",
    items: [
      {
        q: "What do validators do?",
        a: "Validators execute proposed routes, measure actual outcomes (latency, quality score, cost, privacy compliance), and compute a regret-weighted score for each miner's proposal. That score feeds into the Bittensor consensus mechanism to determine how rewards are distributed. Validators are the ground truth of the network.",
      },
      {
        q: "How is a route's quality measured?",
        a: "Quality is measured by running the prompt through the proposed provider and comparing the output against reference responses from one or more alternatives. The comparison uses a task-appropriate metric like semantic similarity, accuracy against a ground-truth label, or a human-preference proxy. Quality is one component of the composite score alongside cost, latency, reliability, and privacy compliance.",
      },
      {
        q: "What happens if a validator gives inaccurate scores?",
        a: "Bittensor's consensus layer detects validators whose scores diverge systematically from the honest majority and reduces their influence over reward distribution. Validators that consistently disagree with consensus lose stake weight, which cuts both their earnings and the damage they can do to miner incentives. Running a validator requires staked TAO.",
      },
    ],
  },
  {
    title: "Tokenomics & Incentives",
    items: [
      {
        q: "Do I need TAO to use Sluice as a developer?",
        a: "No. Developers pay for inference through the provider's normal billing. The cost of the request is passed through to the winning provider. TAO is the reward and staking currency for miners and validators who operate the routing market, not a payment token for API consumers.",
      },
      {
        q: "How does the reward mechanism prevent gaming?",
        a: "Regret-weighted scoring means a miner only earns meaningfully when their route outperforms the counterfactual. Proposing a safe default repeatedly converges toward near-zero marginal reward as validators build up a strong baseline. The incentive is to develop a genuine edge in predicting which providers will outperform under what conditions, not to game a leaderboard.",
      },
      {
        q: "Where can I learn about the subnet tokenomics in detail?",
        a: "The Subnet page has live on-chain data including emission rate, total stake, registered neurons, and tempo. Detailed tokenomics documentation will be published in the Resources section as the testnet matures.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      {
        q: "How does Sluice enforce a privacy constraint?",
        a: "When a request carries a privacy flag, the routing market restricts winning proposals to providers that have made an on-chain attestation that they don't train on user data. Validators verify compliance as part of the benchmark. Miners that propose non-compliant routes for flagged requests are penalised in scoring.",
      },
      {
        q: "Is my prompt stored by the Sluice network?",
        a: "Sluice is a routing layer, so it doesn't persist prompt content. Task metadata like policy constraints, predicted scores, and benchmark results is recorded on-chain for consensus purposes, but the prompt text goes directly to the winning provider and is subject only to that provider's data retention policy.",
      },
      {
        q: "Is Sluice open source?",
        a: "The subnet code and validator/miner reference implementations will be released publicly. The routing strategy logic miners develop privately is their competitive advantage and doesn't need to be open. Core protocol code, benchmark tooling, and SDK libraries will all be open source.",
      },
    ],
  },
];

function FaqAccordionItem({ item, isOpen, onToggle }: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-sluice-navy/10 last:border-b-0">
      <button
        type="button"
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-5 py-[1.125rem] text-left transition-colors hover:bg-sluice-navy/4",
          isOpen && "bg-sluice-navy/4",
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="font-sans text-[14.5px] font-[580] leading-[1.4] tracking-[-0.005em] text-sluice-navy">
          {item.q}
        </span>
        <span
          className={cn(
            "inline-flex shrink-0 items-center text-sluice-navy opacity-40 transition-[transform,opacity] duration-200 ease-sluice",
            isOpen && "rotate-90 opacity-70",
          )}
          aria-hidden="true"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </span>
      </button>
      <div className="px-5 pb-5" hidden={!isOpen}>
        <p className="m-0 font-sans text-[13.5px] font-normal leading-[1.72] tracking-normal text-sluice-ink [&_strong]:font-[650] [&_strong]:text-sluice-navy">
          {item.a}
        </p>
      </div>
    </div>
  );
}

export function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  function toggle(key: string) {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <article className="animate-docs-fade-in motion-reduce:animate-none">
      <div>
        <h1 className="m-0 font-sans text-[clamp(1.375rem,2.2vw,1.75rem)] font-[650] leading-[1.18] tracking-normal text-sluice-navy">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-[620px] font-sans text-[1.05rem] font-normal leading-[1.65] tracking-normal text-sluice-muted">
          Frequently asked questions
        </p>
      </div>

      <div className="mt-[clamp(1.5rem,3vw,2rem)] flex flex-col gap-11">
        {faqSections.map((section) => (
          <section key={section.title}>
            <h2 className="m-0 mb-3.5 font-sans text-[0.8rem] font-bold uppercase tracking-[0.07em] text-sluice-navy opacity-55">
              {section.title}
            </h2>
            <div className="flex flex-col gap-0 overflow-hidden rounded-[14px] border border-sluice-navy/14 bg-sluice-paper/36">
              {section.items.map((item, i) => {
                const key = `${section.title}-${i}`;
                return (
                  <FaqAccordionItem
                    key={key}
                    item={item}
                    isOpen={!!openItems[key]}
                    onToggle={() => toggle(key)}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
