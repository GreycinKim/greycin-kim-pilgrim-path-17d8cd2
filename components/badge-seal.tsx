"use client"

import { useId } from "react"
import type { RegionId } from "@/lib/journey"
import type { Figure, Land, Mark, PlateSpec } from "@/lib/plate"

const inkFor: Record<RegionId, string> = {
  destruction: "#1e3f73",
  salvation: "#6d3b28",
  shadow: "#2c4a38",
  celestial: "#6a4512",
}

export function BadgeSeal({
  plate,
  regionId,
  label,
}: {
  plate: PlateSpec
  regionId: RegionId
  label: string
}) {
  const clip = useId().replace(/:/g, "")
  const ink = inkFor[regionId]
  const line = {
    fill: "none" as const,
    stroke: ink,
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  }
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={label} className="size-full">
      <defs>
        <clipPath id={clip}>
          <circle cx="60" cy="60" r="55.5" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <rect width="120" height="120" fill={plate.sky === "night" ? "#ebe4d4" : "#f6edd8"} />
        {plate.sky === "night" ? <Stars ink={ink} /> : null}
        {plate.sky === "glory" ? <circle cx="92" cy="28" r="8" fill="#e7c56a" /> : null}
        <LandLines land={plate.land} ink={ink} line={line} />
        <MarkGlyph mark={plate.mark} ink={ink} line={line} />
        <FigureGlyph figure={plate.figure} ink={ink} />
      </g>
      <circle cx="60" cy="60" r="55.5" fill="none" stroke={ink} strokeWidth="2.6" />
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke={ink}
        strokeWidth="0.9"
        strokeDasharray="2.6 2.3"
      />
    </svg>
  )
}

function Stars({ ink }: { ink: string }) {
  const points = [
    [22, 24],
    [36, 16],
    [78, 18],
    [96, 34],
    [18, 40],
  ]
  return (
    <g fill={ink}>
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" />
      ))}
    </g>
  )
}

function LandLines({
  land,
  ink,
  line,
}: {
  land: Land
  ink: string
  line: { fill: "none"; stroke: string; strokeWidth: number; strokeLinecap: "round"; strokeLinejoin: "round" }
}) {
  if (land === "bog") {
    return (
      <g {...line} strokeWidth="1.2">
        <path d="M8 78 C24 72 36 84 52 76 C68 68 80 82 112 74" />
        <path d="M10 88 C28 82 40 94 58 86 C76 78 90 92 112 84" />
        <path d="M14 98 C34 92 48 104 70 96 C86 90 98 100 112 94" />
      </g>
    )
  }
  if (land === "mount") {
    return <path d="M8 92 L32 48 L48 68 L70 36 L112 92 Z" fill={ink} opacity="0.12" stroke={ink} strokeWidth="1.4" />
  }
  if (land === "hill") {
    return <path d="M0 96 C28 88 40 52 68 58 C90 62 104 84 120 78 L120 120 L0 120 Z" fill={ink} opacity="0.12" />
  }
  if (land === "water") {
    return (
      <g {...line} strokeWidth="1.3">
        <path d="M8 80 C22 74 34 86 50 80 C66 74 80 86 112 78" />
        <path d="M8 92 C24 86 38 98 56 92 C74 86 90 98 112 90" />
        <path d="M10 104 C28 98 42 110 60 104 C80 98 94 108 112 102" />
      </g>
    )
  }
  if (land === "town" || land === "fair") {
    return (
      <g {...line}>
        <path d="M18 96 V78 L32 66 L46 78 V96" />
        <path d="M52 96 V74 L68 60 L84 74 V96" />
        <path d="M8 96 H112" />
      </g>
    )
  }
  if (land === "house") {
    return (
      <g {...line}>
        <path d="M34 96 V62 L60 42 L86 62 V96" />
        <path d="M52 96 V74 H68 V96" />
      </g>
    )
  }
  if (land === "walls" || land === "castle") {
    return (
      <g {...line}>
        <path d="M22 96 V58 H34 V48 H46 V58 H58 V46 H70 V58 H82 V50 H94 V96" />
        <path d="M22 96 H94" />
      </g>
    )
  }
  if (land === "garden") {
    return (
      <g {...line}>
        <circle cx="34" cy="70" r="12" />
        <circle cx="78" cy="66" r="16" />
        <path d="M34 82 V100 M78 82 V100" />
        <path d="M8 100 H112" />
      </g>
    )
  }
  if (land === "road") {
    return (
      <g {...line} strokeWidth="1.3">
        <path d="M8 100 H112" />
        <path d="M60 100 C58 86 62 74 60 58" strokeDasharray="2 3" />
      </g>
    )
  }
  return (
    <g {...line} strokeWidth="1.3">
      <path d="M6 86 C28 78 46 96 70 84 C90 74 104 88 116 80" />
      <path d="M8 100 H112" />
    </g>
  )
}

function MarkGlyph({
  mark,
  ink,
  line,
}: {
  mark: Mark
  ink: string
  line: { fill: "none"; stroke: string; strokeWidth: number; strokeLinecap: "round"; strokeLinejoin: "round" }
}) {
  if (mark === "none") return null
  if (mark === "cross") {
    return (
      <g {...line} strokeWidth="2.4">
        <path d="M60 28 V62" />
        <path d="M46 40 H74" />
      </g>
    )
  }
  if (mark === "gate") {
    return (
      <g {...line}>
        <path d="M40 70 V40 H80 V70" />
        <path d="M52 70 V50 H68 V70" />
      </g>
    )
  }
  if (mark === "castle") {
    return (
      <g {...line}>
        <path d="M38 70 V42 H50 V34 H62 V42 H82 V70" />
      </g>
    )
  }
  if (mark === "city") {
    return <path d="M34 70 L48 36 L58 52 L72 30 L90 70 Z" fill={ink} opacity="0.18" stroke={ink} strokeWidth="1.4" />
  }
  if (mark === "lions") {
    return (
      <g {...line}>
        <ellipse cx="48" cy="62" rx="10" ry="6" />
        <circle cx="56" cy="56" r="4" />
        <ellipse cx="72" cy="64" rx="8" ry="5" />
        <circle cx="78" cy="59" r="3" />
      </g>
    )
  }
  if (mark === "mine") {
    return (
      <g {...line}>
        <path d="M36 70 L60 36 L84 70 Z" />
        <path d="M52 70 V56 H68 V70" />
      </g>
    )
  }
  if (mark === "net") {
    return (
      <g {...line} strokeWidth="1.2">
        <path d="M42 36 H80 L74 72 H48 Z" />
        <path d="M46 48 H76 M44 60 H78 M54 36 V72 M66 36 V72" />
      </g>
    )
  }
  if (mark === "cage") {
    return (
      <g {...line}>
        <rect x="44" y="36" width="32" height="34" />
        <path d="M52 36 V70 M60 36 V70 M68 36 V70" />
      </g>
    )
  }
  if (mark === "pillar") {
    return (
      <g {...line}>
        <path d="M52 34 H68" />
        <path d="M56 34 V68 H64 V34" />
        <path d="M50 68 H70" />
      </g>
    )
  }
  if (mark === "fire") {
    return <path d="M60 68 C50 54 58 46 56 34 C66 46 76 48 68 68 Z" fill={ink} opacity="0.2" stroke={ink} strokeWidth="1.4" />
  }
  if (mark === "spring") {
    return (
      <g {...line}>
        <ellipse cx="60" cy="58" rx="16" ry="7" />
        <path d="M48 58 C52 54 56 62 60 58 C64 54 68 62 72 58" />
      </g>
    )
  }
  if (mark === "stalls") {
    return (
      <g {...line}>
        <path d="M36 66 V50 L48 40 L60 50 V66" />
        <path d="M60 66 V48 L74 38 L88 48 V66" />
      </g>
    )
  }
  if (mark === "tomb") {
    return (
      <g {...line}>
        <path d="M46 66 V52 H74 V66" />
        <path d="M46 66 H74" />
      </g>
    )
  }
  if (mark === "glass") {
    return (
      <g {...line}>
        <circle cx="56" cy="50" r="12" />
        <path d="M65 58 L76 70" />
      </g>
    )
  }
  if (mark === "arrows") {
    return (
      <g {...line}>
        <path d="M40 40 L70 58" />
        <path d="M64 52 L70 58 L62 62" />
        <path d="M46 32 L74 48" />
        <path d="M68 42 L74 48 L66 52" />
      </g>
    )
  }
  if (mark === "tree") {
    return (
      <g {...line}>
        <circle cx="60" cy="46" r="14" />
        <path d="M60 60 V74" />
      </g>
    )
  }
  if (mark === "roll") {
    return (
      <g {...line}>
        <rect x="42" y="46" width="36" height="16" rx="3" />
        <path d="M48 52 H72 M48 57 H66" />
      </g>
    )
  }
  if (mark === "burden") {
    return <ellipse cx="60" cy="52" rx="16" ry="10" fill={ink} opacity="0.18" stroke={ink} strokeWidth="1.4" />
  }
  if (mark === "sword") {
    return (
      <g {...line} strokeWidth="1.8">
        <path d="M48 70 L72 36" />
        <path d="M44 64 L54 70" />
      </g>
    )
  }
  if (mark === "book") {
    return (
      <g {...line}>
        <path d="M42 40 H60 V68 H42 Z" />
        <path d="M60 40 H78 V68 H60 Z" />
        <path d="M48 48 H56 M48 54 H56 M66 48 H74 M66 54 H74" />
      </g>
    )
  }
  if (mark === "key") {
    return (
      <g {...line}>
        <circle cx="50" cy="46" r="8" />
        <path d="M58 46 H80" />
        <path d="M72 46 V54 M80 46 V56" />
      </g>
    )
  }
  if (mark === "crown") {
    return <path d="M38 62 L46 42 L60 56 L74 40 L82 62 Z" {...line} />
  }
  if (mark === "staff") {
    return (
      <g {...line} strokeWidth="1.8">
        <path d="M64 30 V72" />
        <path d="M64 30 C74 30 74 42 64 42" />
      </g>
    )
  }
  if (mark === "pit") {
    return <ellipse cx="60" cy="62" rx="18" ry="8" fill={ink} opacity="0.22" stroke={ink} strokeWidth="1.4" />
  }
  return null
}

function FigureGlyph({ figure, ink }: { figure: Figure; ink: string }) {
  if (figure === "none") return null
  const x = figure === "pair" ? 28 : 24
  return (
    <g>
      <Person x={x} ink={ink} />
      {figure === "pair" ? <Person x={40} ink={ink} /> : null}
    </g>
  )
}

function Person({ x, ink }: { x: number; ink: string }) {
  return (
    <g transform={`translate(${x} 78)`} fill={ink} stroke={ink} strokeWidth="1.3" strokeLinecap="round">
      <circle cx="4" cy="0" r="2.4" stroke="none" />
      <path d="M4 3 V10 M1 6 H7 M4 10 L1 15 M4 10 L7 15" fill="none" />
    </g>
  )
}
