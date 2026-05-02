import { useState } from "react";

const flowNodes = [
  { label: "Request", detail: "policy input", x: 78 },
  { label: "Miner", detail: "route proposal", x: 214 },
  { label: "Validator", detail: "benchmark", x: 350 },
  { label: "Winner", detail: "best route", x: 486 },
];

export function ProcessFlowChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeNode = flowNodes[activeIndex];

  return (
    <figure className="overflow-hidden rounded-[24px] bg-sluice-paper/70 md:rounded-frame">
      <div className="mb-3 rounded-[14px] border border-sluice-navy/15 bg-sluice-paperWarm/50 px-4 py-3">
        <span className="font-sans text-sm font-semibold tracking-normal text-sluice-navy">
          {activeNode.label}
        </span>
        <span className="mx-2 text-sluice-muted">/</span>
        <span className="font-sans text-sm text-sluice-ink">
          {activeNode.detail}
        </span>
      </div>
      <svg
        viewBox="0 0 560 200"
        role="img"
        aria-labelledby="process-flow-title process-flow-desc"
        className="h-auto w-full"
      >
        <title id="process-flow-title">Four step routing process</title>
        <desc id="process-flow-desc">
          Request, miner proposal, validator benchmark, and winning route.
        </desc>
        <defs>
          <marker
            id="process-arrow"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="6"
            refY="3"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#1D3487" />
          </marker>
        </defs>
        <rect
          x="10"
          y="16"
          width="540"
          height="168"
          rx="28"
          fill="#F2F3F5"
        />

        {flowNodes.slice(0, -1).map((node, index) => {
          const next = flowNodes[index + 1];

          return (
            <path
              key={`${node.label}-${next.label}`}
              d={`M${node.x + 42} 100 C${node.x + 72} 100 ${
                next.x - 72
              } 100 ${next.x - 44} 100`}
              fill="none"
              stroke={index < activeIndex ? "#4A77DC" : "#1D3487"}
              strokeWidth={index < activeIndex ? "2.6" : "1.5"}
              markerEnd="url(#process-arrow)"
            />
          );
        })}

        {flowNodes.map((node, index) => (
          <g
            key={node.label}
            role="button"
            tabIndex={0}
            aria-label={`${node.label}: ${node.detail}`}
            className="cursor-pointer"
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                setActiveIndex(index);
              }
            }}
          >
            <circle
              cx={node.x}
              cy="100"
              r="40"
              fill={index === activeIndex ? "#1D3487" : "#F2F3F5"}
              stroke="#1D3487"
              strokeWidth={index === activeIndex ? "2" : "1.25"}
            />
            <text
              x={node.x}
              y="94"
              textAnchor="middle"
              fill={index === activeIndex ? "#F2F3F5" : "#1D3487"}
              fontSize="12"
              fontWeight="700"
            >
              {node.label}
            </text>
            <text
              x={node.x}
              y="113"
              textAnchor="middle"
              fill={index === activeIndex ? "#DCE7FF" : "#707380"}
              fontSize="9"
            >
              {node.detail}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
