import { useMemo, useState } from "react";

const nodes = [
  { label: "API", x: 74, y: 104 },
  { label: "GPU", x: 168, y: 72 },
  { label: "TEE", x: 282, y: 102 },
  { label: "LLM", x: 410, y: 80 },
  { label: "Private", x: 112, y: 220 },
  { label: "Fast", x: 380, y: 244 },
  { label: "Tools", x: 488, y: 220 },
  { label: "Code", x: 72, y: 330 },
  { label: "Chat", x: 226, y: 330 },
  { label: "Vision", x: 380, y: 330 },
] as const;

const edges = [
  ["API", "GPU"],
  ["API", "Private"],
  ["GPU", "TEE"],
  ["GPU", "Chat"],
  ["TEE", "LLM"],
  ["TEE", "Fast"],
  ["LLM", "Fast"],
  ["LLM", "Tools"],
  ["Private", "Code"],
  ["Private", "Fast"],
  ["Code", "Chat"],
  ["Chat", "Vision"],
  ["Vision", "Tools"],
  ["Fast", "Tools"],
] as const;

const focusCopy: Record<string, string> = {
  "Route policy": "turns fragments into paths",
  API: "unified access point",
  GPU: "available compute",
  TEE: "privacy capability",
  LLM: "model quality",
  Private: "sensitive workload",
  Fast: "latency route",
  Tools: "agent workflow",
  Code: "coding task",
  Chat: "conversation task",
  Vision: "multimodal task",
};

function getNode(label: string) {
  return nodes.find((node) => node.label === label);
}

export function FragmentationMap() {
  const [activeNode, setActiveNode] = useState("Route policy");

  const activeEdges = useMemo(() => {
    return new Set(
      edges
        .filter(([from, to]) => {
          return (
            activeNode === "Route policy" ||
            from === activeNode ||
            to === activeNode
          );
        })
        .flatMap(([from, to]) => [`${from}-${to}`, `${to}-${from}`]),
    );
  }, [activeNode]);

  return (
    <figure className="overflow-visible">
      <svg
        viewBox="0 0 560 390"
        role="img"
        aria-label="Interactive fragmented AI supply map"
        className="h-auto w-full"
      >
        {edges.map(([fromLabel, toLabel]) => {
          const from = getNode(fromLabel);
          const to = getNode(toLabel);

          if (!from || !to) {
            return null;
          }

          const isActive = activeEdges.has(`${fromLabel}-${toLabel}`);

          return (
            <line
              key={`${fromLabel}-${toLabel}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={isActive ? "#4A77DC" : "rgba(29,52,135,0.14)"}
              strokeWidth={isActive ? "2.2" : "1.2"}
            />
          );
        })}

        <path
          d="M112 220 C176 174 258 164 380 244 C422 260 452 236 488 220"
          fill="none"
          stroke="#4A77DC"
          strokeDasharray="7 9"
          strokeLinecap="round"
          strokeWidth={activeNode === "Route policy" ? "3" : "1.7"}
          opacity={activeNode === "Route policy" ? "1" : "0.55"}
        />

        {nodes.map((node) => {
          const isActive = node.label === activeNode;

          return (
            <g
              key={node.label}
              role="button"
              tabIndex={0}
              aria-label={`Focus ${node.label}`}
              className="group cursor-pointer"
              onClick={() => setActiveNode(node.label)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setActiveNode(node.label);
                }
              }}
            >
              <circle
                className="pointer-events-none opacity-0 transition-opacity duration-[160ms] group-focus-visible:opacity-100"
                cx={node.x}
                cy={node.y}
                r="35"
                stroke="#4A77DC"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? "29" : "24"}
                fill={isActive ? "#1D3487" : "rgba(242,243,245,0.58)"}
                stroke={isActive ? "#1D3487" : "rgba(29,52,135,0.68)"}
                strokeWidth={isActive ? "2" : "1.25"}
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fill={isActive ? "#F2F3F5" : "#1D3487"}
                fontSize="11"
                fontWeight="700"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <g
          role="button"
          tabIndex={0}
          aria-label="Focus route policy"
          className="group cursor-pointer"
          onClick={() => setActiveNode("Route policy")}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setActiveNode("Route policy");
            }
          }}
        >
          <rect
            className="pointer-events-none opacity-0 transition-opacity duration-[160ms] group-focus-visible:opacity-100"
            x="204"
            y="158"
            width="168"
            height="70"
            rx="22"
            stroke="#4A77DC"
            strokeWidth="2.5"
            fill="none"
          />
          <rect
            x="210"
            y="164"
            width="156"
            height="58"
            rx="17"
            fill="rgba(16,20,34,0.9)"
            stroke="rgba(242,243,245,0.24)"
          />
          <text
            x="280"
            y="194"
            textAnchor="middle"
            fill="#F2F3F5"
            fontSize="13"
            fontWeight="700"
          >
            Route policy
          </text>
          <text
            x="280"
            y="214"
            textAnchor="middle"
            fill="#C8D5FF"
            fontSize="10"
          >
            {focusCopy[activeNode]}
          </text>
        </g>
      </svg>
    </figure>
  );
}
