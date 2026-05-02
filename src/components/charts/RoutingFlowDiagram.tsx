import { useMemo, useState } from "react";

import { cn } from "../../lib/cn";

type RoutePolicy = {
  id: string;
  label: string;
  weights: Record<string, number>;
};

type RouteProvider = {
  id: string;
  name: string;
  caption: string;
  y: number;
  scores: Record<string, number>;
};

type RoutingFlowDiagramProps = {
  policies?: RoutePolicy[];
  providers?: RouteProvider[];
  initialPolicyId?: string;
};

const defaultPolicies: RoutePolicy[] = [
  {
    id: "balanced",
    label: "Balanced",
    weights: {
      quality: 0.42,
      cost: 0.22,
      latency: 0.16,
      reliability: 0.12,
      privacy: 0.08,
    },
  },
  {
    id: "quality",
    label: "Quality",
    weights: { quality: 1 },
  },
  {
    id: "cost",
    label: "Cost",
    weights: { cost: 1 },
  },
  {
    id: "latency",
    label: "Latency",
    weights: { latency: 1 },
  },
  {
    id: "privacy",
    label: "Privacy",
    weights: { privacy: 1 },
  },
];

const defaultProviders: RouteProvider[] = [
  {
    id: "chutes",
    name: "Chutes",
    caption: "compute",
    y: 66,
    scores: {
      quality: 77,
      cost: 83,
      latency: 72,
      reliability: 80,
      privacy: 62,
    },
  },
  {
    id: "targon",
    name: "Targon",
    caption: "private",
    y: 142,
    scores: {
      quality: 84,
      cost: 72,
      latency: 74,
      reliability: 85,
      privacy: 96,
    },
  },
  {
    id: "external",
    name: "External",
    caption: "api",
    y: 218,
    scores: {
      quality: 88,
      cost: 58,
      latency: 68,
      reliability: 82,
      privacy: 54,
    },
  },
  {
    id: "subnet",
    name: "Subnet",
    caption: "market",
    y: 292,
    scores: {
      quality: 72,
      cost: 91,
      latency: 79,
      reliability: 70,
      privacy: 68,
    },
  },
];

function getRouteScore(provider: RouteProvider, policy: RoutePolicy) {
  const entries = Object.entries(policy.weights);
  const totalWeight = entries.reduce((total, [, weight]) => total + weight, 0);

  if (totalWeight === 0) {
    return 0;
  }

  const score = entries.reduce((total, [key, weight]) => {
    return total + (provider.scores[key] ?? 0) * weight;
  }, 0);

  return Math.round(score / totalWeight);
}

function getRoutePath(provider: RouteProvider) {
  const centerY = 186;
  const exitX = 342;
  const targetX = 446;
  const controlOffset = Math.abs(provider.y - centerY) > 90 ? 58 : 42;

  return `M${exitX} ${centerY} C${exitX + controlOffset} ${centerY}, ${
    targetX - controlOffset
  } ${provider.y}, ${targetX} ${provider.y}`;
}

export function RoutingFlowDiagram({
  initialPolicyId = "balanced",
  policies = defaultPolicies,
  providers = defaultProviders,
}: RoutingFlowDiagramProps) {
  const [activePolicyId, setActivePolicyId] = useState(initialPolicyId);
  const [focusedProviderId, setFocusedProviderId] = useState<string | null>(
    null,
  );

  const activePolicy =
    policies.find((policy) => policy.id === activePolicyId) ?? policies[0];

  const rankedProviders = useMemo(() => {
    return providers
      .map((provider) => ({
        ...provider,
        routeScore: getRouteScore(provider, activePolicy),
      }))
      .sort((a, b) => b.routeScore - a.routeScore);
  }, [activePolicy, providers]);

  const selectedProvider = focusedProviderId
    ? rankedProviders.find((provider) => provider.id === focusedProviderId)
    : rankedProviders[0];

  const selectedProviderId = selectedProvider?.id ?? rankedProviders[0]?.id;
  const cyclePolicy = () => {
    const currentIndex = policies.findIndex(
      (policy) => policy.id === activePolicy.id,
    );
    const nextPolicy = policies[(currentIndex + 1) % policies.length];

    setActivePolicyId(nextPolicy.id);
    setFocusedProviderId(null);
  };

  return (
    <figure className="overflow-visible rounded-[24px] p-2 md:rounded-frame md:p-4 lg:p-0">
      <div className="mb-4 lg:hidden">
        <div className="flex flex-wrap gap-2" aria-label="Route policy controls">
          {policies.map((policy) => {
            const isActive = policy.id === activePolicy.id;

            return (
              <button
                key={policy.id}
                type="button"
                aria-pressed={isActive}
                className={cn(
                  "rounded-pill border px-3.5 py-2 font-sans text-sm font-medium tracking-normal transition-colors",
                  isActive
                    ? "border-sluice-navy bg-sluice-navy text-sluice-paper"
                    : "border-sluice-navy/25 text-sluice-navy hover:bg-sluice-navy/5",
                )}
                onClick={() => {
                  setActivePolicyId(policy.id);
                  setFocusedProviderId(null);
                }}
              >
                {policy.label}
              </button>
            );
          })}
        </div>
      </div>

      <svg
        viewBox="0 0 560 360"
        role="img"
        aria-label="Sluice route map"
        className="h-auto w-full"
      >
        <rect
          x="12"
          y="12"
          width="536"
          height="336"
          rx="28"
          fill="transparent"
        />

        <g
          role="button"
          tabIndex={0}
          aria-label={`Cycle route policy. Current policy is ${activePolicy.label}`}
          className="cursor-pointer"
          onClick={cyclePolicy}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              cyclePolicy();
            }
          }}
        >
          <circle cx="78" cy="186" r="36" fill="#F2F3F5" stroke="#1D3487" />
          <text
            x="78"
            y="179"
            textAnchor="middle"
            fill="#1D3487"
            fontSize="14"
            fontWeight="700"
          >
            REQ
          </text>
          <text
            x="78"
            y="199"
            textAnchor="middle"
            fill="#707380"
            fontSize="10"
          >
            constraints
          </text>
        </g>

        <path
          d="M114 186 H176"
          fill="none"
          stroke="#1D3487"
          strokeWidth="1.8"
        />

        <g>
          <rect
            x="182"
            y="126"
            width="160"
            height="120"
            rx="22"
            fill="rgba(29,52,135,0.06)"
            stroke="#1D3487"
            strokeWidth="1.35"
          />
          <text
            x="262"
            y="171"
            textAnchor="middle"
            fill="#1D3487"
            fontSize="18"
            fontWeight="700"
          >
            Sluice
          </text>
          <text
            x="262"
            y="196"
            textAnchor="middle"
            fill="#707380"
            fontSize="12"
          >
            {activePolicy.label} policy
          </text>
          <text
            x="262"
            y="218"
            textAnchor="middle"
            fill="#707380"
            fontSize="11"
          >
            live score + route fit
          </text>
        </g>

        {providers.map((provider) => {
          const score = getRouteScore(provider, activePolicy);
          const isSelected = provider.id === selectedProviderId;

          return (
            <g
              key={provider.id}
              role="button"
              tabIndex={0}
              aria-label={`Select ${provider.name} route`}
              className="cursor-pointer"
              onClick={() => setFocusedProviderId(provider.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setFocusedProviderId(provider.id);
                }
              }}
            >
              <path
                d={getRoutePath(provider)}
                fill="none"
                stroke={isSelected ? "#4A77DC" : "rgba(29,52,135,0.26)"}
                strokeLinecap="round"
                strokeWidth={isSelected ? "3" : "1.35"}
              />
              <circle
                cx="488"
                cy={provider.y}
                r="28"
                fill={isSelected ? "#1D3487" : "#F2F3F5"}
                stroke="#1D3487"
                strokeWidth="1.35"
              />
              <text
                x="488"
                y={provider.y - 7}
                textAnchor="middle"
                fill={isSelected ? "#F2F3F5" : "#1D3487"}
                fontSize="11"
                fontWeight="700"
              >
                {provider.name}
              </text>
              <text
                x="488"
                y={provider.y + 9}
                textAnchor="middle"
                fill={isSelected ? "#DCE7FF" : "#707380"}
                fontSize="10"
              >
                {score}
              </text>
            </g>
          );
        })}

      </svg>
    </figure>
  );
}
