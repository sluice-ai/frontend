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
    y: 54,
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
    y: 124,
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
    y: 194,
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
    y: 264,
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
  const centerY = 160;
  const exitX = 348;
  const targetX = 542;
  const controlOffset = Math.abs(provider.y - centerY) > 82 ? 72 : 54;

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
    <figure className="overflow-visible">
      <svg
        viewBox="0 0 640 320"
        role="img"
        aria-label="Sluice route map"
        className="h-auto w-full"
      >
        <rect
          x="12"
          y="12"
          width="616"
          height="296"
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
          <circle
            className="svg-focus-ring"
            cx="68"
            cy="160"
            r="45"
            stroke="#4A77DC"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="68"
            cy="160"
            r="36"
            fill="rgba(242,243,245,0.58)"
            stroke="#1D3487"
          />
          <text
            x="68"
            y="153"
            textAnchor="middle"
            fill="#1D3487"
            fontSize="14"
            fontWeight="700"
          >
            REQ
          </text>
          <text
            x="68"
            y="173"
            textAnchor="middle"
            fill="#707380"
            fontSize="10"
          >
            constraints
          </text>
        </g>

        <path
          d="M104 160 H180"
          fill="none"
          stroke="#1D3487"
          strokeWidth="1.8"
        />

        <g>
          <rect
            x="180"
            y="104"
            width="168"
            height="112"
            rx="22"
            fill="rgba(242,243,245,0.44)"
            stroke="#1D3487"
            strokeWidth="1.35"
          />
          <text
            x="264"
            y="148"
            textAnchor="middle"
            fill="#1D3487"
            fontSize="18"
            fontWeight="700"
          >
            Sluice
          </text>
          <text
            x="264"
            y="173"
            textAnchor="middle"
            fill="#707380"
            fontSize="12"
          >
            {activePolicy.label} policy
          </text>
          <text
            x="264"
            y="195"
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
              <circle
                className="svg-focus-ring"
                cx="570"
                cy={provider.y}
                r="35"
                stroke="#4A77DC"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d={getRoutePath(provider)}
                fill="none"
                stroke={isSelected ? "#4A77DC" : "rgba(29,52,135,0.26)"}
                strokeLinecap="round"
                strokeWidth={isSelected ? "3" : "1.35"}
              />
              <circle
                cx="570"
                cy={provider.y}
                r="28"
                fill={isSelected ? "#1D3487" : "rgba(242,243,245,0.58)"}
                stroke={isSelected ? "#1D3487" : "rgba(29,52,135,0.72)"}
                strokeWidth="1.35"
              />
              <text
                x="570"
                y={provider.y - 7}
                textAnchor="middle"
                fill={isSelected ? "#F2F3F5" : "#1D3487"}
                fontSize="11"
                fontWeight="700"
              >
                {provider.name}
              </text>
              <text
                x="570"
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
