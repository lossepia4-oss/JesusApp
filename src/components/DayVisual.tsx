import type { Day } from "@/data/days";

export function DayVisual({ kind, title }: { kind: Day["visual"]; title: string }) {
  return (
    <div className="visual" aria-hidden="true">
      <svg viewBox="0 0 320 180" role="img">
        <title>{title}</title>
        {kind === "door" && <DoorScene />}
        {kind === "vine" && <VineScene />}
        {kind === "whole-life" && <WholeLifeScene />}
        {kind === "neighbor" && <NeighborScene />}
        {kind === "reconcile" && <ReconcileScene />}
        {kind === "rain" && <RainScene />}
        {kind === "kingdom" && <KingdomScene />}
      </svg>
    </div>
  );
}

function DoorScene() {
  return (
    <g>
      <rect width="320" height="180" fill="#efe6d6" />
      <rect x="0" y="138" width="320" height="42" fill="#d9cbb4" />
      <rect x="18" y="92" width="70" height="48" rx="4" fill="#e7d8c0" />
      <rect x="26" y="100" width="22" height="16" fill="#cfe0ea" />
      <rect x="52" y="100" width="22" height="16" fill="#cfe0ea" />
      <path d="M118 138 V58 a34 34 0 0 1 68 0 V138" fill="#8b4a2b" />
      <path d="M128 138 V64 a24 24 0 0 1 48 0 V138" fill="#f3d48a" />
      <ellipse cx="152" cy="138" rx="48" ry="10" fill="#f6e7c2" opacity="0.7" />
      <rect x="210" y="108" width="36" height="30" rx="3" fill="#c4a07a" />
      <circle cx="228" cy="108" r="10" fill="#c4a07a" />
    </g>
  );
}

function VineScene() {
  return (
    <g>
      <rect width="320" height="180" fill="#e8f0e6" />
      <rect x="0" y="140" width="320" height="40" fill="#c9d8c4" />
      <path
        d="M40 150 C70 90, 90 70, 160 40 C190 28, 230 36, 280 70"
        fill="none"
        stroke="#3d5a45"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M120 88 C132 110, 128 132, 118 150"
        fill="none"
        stroke="#3d5a45"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M190 58 C210 80, 208 110, 200 140"
        fill="none"
        stroke="#3d5a45"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx="108" cy="70" rx="18" ry="10" fill="#4f7a58" transform="rotate(-20 108 70)" />
      <ellipse cx="148" cy="52" rx="20" ry="11" fill="#5c8a64" transform="rotate(12 148 52)" />
      <ellipse cx="214" cy="52" rx="18" ry="10" fill="#4f7a58" transform="rotate(-8 214 52)" />
      <circle cx="132" cy="108" r="7" fill="#8b4a2b" />
      <circle cx="146" cy="122" r="6" fill="#a05632" />
      <circle cx="218" cy="96" r="7" fill="#8b4a2b" />
      <circle cx="232" cy="114" r="6" fill="#a05632" />
    </g>
  );
}

function WholeLifeScene() {
  return (
    <g>
      <rect width="320" height="180" fill="#f3ead8" />
      <circle cx="258" cy="42" r="22" fill="#e8c36a" />
      <rect x="28" y="78" width="86" height="62" fill="#d9c4a4" />
      <polygon points="28,78 71,48 114,78" fill="#8b4a2b" />
      <rect x="62" y="108" width="22" height="32" fill="#6b4b32" />
      <rect x="140" y="118" width="72" height="22" rx="3" fill="#efe6d6" stroke="#8b4a2b" />
      <circle cx="176" cy="112" r="8" fill="#c45c48" />
      <path d="M230 150 L250 92 L270 150" fill="none" stroke="#3d5a45" strokeWidth="4" />
      <circle cx="250" cy="84" r="7" fill="#3d5a45" />
    </g>
  );
}

function NeighborScene() {
  return (
    <g>
      <rect width="320" height="180" fill="#efe8dc" />
      <rect x="0" y="132" width="320" height="48" fill="#ddd0bc" />
      <rect x="70" y="118" width="70" height="10" rx="2" fill="#c4a07a" />
      <rect x="180" y="118" width="70" height="10" rx="2" fill="#c4a07a" />
      <g transform="translate(92 78)">
        <circle cx="0" cy="0" r="14" fill="#d8b48a" />
        <path d="M-18 54 v-22 a18 18 0 0 1 36 0 v22" fill="#6b7d9a" />
      </g>
      <g transform="translate(228 78)">
        <circle cx="0" cy="0" r="14" fill="#c9a074" />
        <path d="M-18 54 v-22 a18 18 0 0 1 36 0 v22" fill="#8b4a2b" />
      </g>
      <ellipse cx="118" cy="128" rx="10" ry="6" fill="#efe6d6" stroke="#8b4a2b" />
      <ellipse cx="202" cy="128" rx="10" ry="6" fill="#efe6d6" stroke="#8b4a2b" />
    </g>
  );
}

function ReconcileScene() {
  return (
    <g>
      <rect width="320" height="180" fill="#f1e6d8" />
      <rect x="0" y="140" width="320" height="40" fill="#d7c3aa" />
      <path d="M40 140 L40 88 L78 60 L116 88 L116 140" fill="#d9c4a4" stroke="#8b4a2b" />
      <path d="M204 140 L204 88 L242 60 L280 88 L280 140" fill="#d9c4a4" stroke="#8b4a2b" />
      <path d="M116 118 C148 118, 172 118, 204 118" stroke="#c45c48" strokeWidth="3" strokeDasharray="6 6" fill="none" />
      <path d="M128 118 C156 96, 164 96, 192 118" stroke="#3d5a45" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="128" cy="118" r="6" fill="#3d5a45" />
      <circle cx="192" cy="118" r="6" fill="#3d5a45" />
    </g>
  );
}

function RainScene() {
  return (
    <g>
      <rect width="320" height="180" fill="#dce6ea" />
      <circle cx="70" cy="40" r="18" fill="#e8c36a" />
      <g stroke="#7a9aab" strokeWidth="2" strokeLinecap="round">
        <line x1="130" y1="28" x2="122" y2="44" />
        <line x1="150" y1="22" x2="142" y2="40" />
        <line x1="170" y1="30" x2="162" y2="46" />
        <line x1="190" y1="20" x2="182" y2="38" />
        <line x1="210" y1="28" x2="202" y2="44" />
        <line x1="230" y1="18" x2="222" y2="36" />
        <line x1="250" y1="26" x2="242" y2="42" />
        <line x1="270" y1="22" x2="262" y2="40" />
      </g>
      <rect x="0" y="138" width="320" height="42" fill="#c5d0c0" />
      <path d="M48 138 L48 96 L86 70 L124 96 L124 138" fill="#efe6d6" stroke="#6b5e4e" />
      <path d="M196 138 L196 96 L234 70 L272 96 L272 138" fill="#efe6d6" stroke="#6b5e4e" />
    </g>
  );
}

function KingdomScene() {
  return (
    <g>
      <rect width="320" height="180" fill="#f6ead4" />
      <path d="M0 90 C80 70, 140 50, 320 78 L320 0 L0 0 Z" fill="#f0c98a" />
      <circle cx="54" cy="48" r="20" fill="#e8b85c" />
      <rect x="0" y="128" width="320" height="52" fill="#e4d3b8" />
      <rect x="96" y="108" width="128" height="36" rx="4" fill="#efe6d6" stroke="#8b4a2b" />
      <ellipse cx="160" cy="120" rx="22" ry="10" fill="#d9c4a4" />
      <g opacity="0.35">
        <rect x="24" y="86" width="28" height="18" fill="#8b4a2b" />
        <rect x="268" y="80" width="22" height="22" fill="#8b4a2b" />
        <rect x="292" y="94" width="16" height="16" fill="#8b4a2b" />
      </g>
    </g>
  );
}
