import { useId } from "react"
import type { Figure, Land, Mark, PlateSpec, Sky } from "@/lib/plate"

const skyFill: Record<Sky, [string, string]> = {
  day: ["#f3e6cf", "#e7d3ae"],
  dusk: ["#e7c49a", "#c4896a"],
  night: ["#2c261f", "#4a3b32"],
  glory: ["#f7efd4", "#e7c56a"],
}

const landFill: Record<Land, string> = {
  field: "#7d8f62",
  bog: "#6d5a3e",
  mount: "#8d7b66",
  town: "#8a7358",
  hill: "#6f8a58",
  house: "#7f8a68",
  water: "#6d8a86",
  walls: "#8d7a62",
  garden: "#6e8f62",
  fair: "#8d7048",
  road: "#7a8a62",
  castle: "#6a6258",
}

const figureFill: Record<Exclude<Figure, "none" | "pair">, string> = {
  pilgrim: "#7a3030",
  elder: "#241c14",
  gentle: "#3d4c66",
  lady: "#8a4e58",
  giant: "#3a332c",
  fiend: "#1a1410",
  shining: "#f7f1e4",
  sleep: "#5c4e3d",
}

export function CharacterPortrait({ plate, label }: { plate: PlateSpec; label: string }) {
  const sky = skyFill[plate.sky][0]
  const figure = plate.figure === "none" ? "elder" : plate.figure === "pair" ? "pilgrim" : plate.figure
  return (
    <svg viewBox="0 0 80 80" role="img" aria-label={label} className="size-full">
      <rect width="80" height="80" fill={sky} />
      <PortraitBust figure={figure} />
    </svg>
  )
}

export function ReferencePlate({ plate, label }: { plate: PlateSpec; label: string }) {
  const skyId = useId().replace(/:/g, "")
  const [skyTop, skyBottom] = skyFill[plate.sky]
  const night = plate.sky === "night"
  return (
    <svg viewBox="0 0 720 420" role="img" aria-label={label} className="h-auto w-full">
      <defs>
        <linearGradient id={skyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="1" stopColor={skyBottom} />
        </linearGradient>
      </defs>
      <rect width="720" height="420" fill={`url(#${skyId})`} />
      {night ? <Stars /> : <Sun glory={plate.sky === "glory"} />}
      <Hills night={night} />
      <LandShape land={plate.land} />
      <MarkShape mark={plate.mark} />
      <Figures figure={plate.figure} />
      <rect x="8" y="8" width="704" height="404" fill="none" stroke="#241c14" strokeOpacity="0.35" />
    </svg>
  )
}

function Sun({ glory }: { glory: boolean }) {
  return <circle cx="590" cy="78" r={glory ? 36 : 22} fill={glory ? "#f4e2a8" : "#f0d7a2"} />
}

function Stars() {
  const points = [
    [80, 48],
    [140, 86],
    [220, 40],
    [310, 70],
    [420, 36],
    [510, 78],
    [600, 44],
    [660, 90],
  ]
  return (
    <g fill="#f4ecdf">
      {points.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />
      ))}
    </g>
  )
}

function Hills({ night }: { night: boolean }) {
  return (
    <path
      d="M0 250 C80 210 140 230 210 200 C280 170 320 210 400 190 C480 170 540 210 620 180 C680 160 700 190 720 176 L720 420 L0 420 Z"
      fill={night ? "#3a322b" : "#c6b498"}
    />
  )
}

function LandShape({ land }: { land: Land }) {
  const fill = landFill[land]
  if (land === "bog") {
    return (
      <g>
        <path d="M0 300 C120 280 200 330 360 300 C500 274 600 330 720 300 L720 420 L0 420 Z" fill={fill} />
        <ellipse cx="180" cy="340" rx="70" ry="18" fill="#3e4c48" opacity="0.45" />
        <ellipse cx="420" cy="360" rx="90" ry="16" fill="#3e4c48" opacity="0.4" />
      </g>
    )
  }
  if (land === "mount") {
    return <path d="M80 300 L300 90 L390 170 L520 70 L660 300 Z" fill="#9a8b78" />
  }
  if (land === "hill") {
    return <path d="M40 340 C180 300 240 120 400 150 C520 170 600 280 700 300 L700 420 L40 420 Z" fill={fill} />
  }
  if (land === "water") {
    return (
      <g>
        <path d="M0 280 L720 250 L720 420 L0 420 Z" fill="#5f8e88" />
        <path d="M0 320 C120 300 200 340 360 316 C520 292 600 340 720 310" fill="none" stroke="#f4ecdf" strokeOpacity="0.45" />
        <path d="M0 360 C140 340 240 380 400 352 C560 324 640 376 720 350" fill="none" stroke="#f4ecdf" strokeOpacity="0.3" />
      </g>
    )
  }
  if (land === "town" || land === "fair") {
    return (
      <g>
        <path d="M0 300 L720 280 L720 420 L0 420 Z" fill={fill} />
        <House x={470} y={250} />
        <House x={560} y={262} />
        {land === "fair" ? <path d="M450 250 L520 210 L590 250" fill="#c6a15a" /> : null}
      </g>
    )
  }
  if (land === "house") {
    return (
      <g>
        <path d="M0 310 L720 290 L720 420 L0 420 Z" fill={fill} />
        <House x={430} y={200} scale={1.5} />
      </g>
    )
  }
  if (land === "walls" || land === "castle") {
    return (
      <g>
        <path d="M0 310 L720 290 L720 420 L0 420 Z" fill={fill} />
        <rect x="430" y="150" width="180" height="150" fill="#4a4038" />
        <rect x="450" y="120" width="28" height="40" fill="#4a4038" />
        <rect x="560" y="110" width="28" height="50" fill="#4a4038" />
        <rect x="500" y="250" width="36" height="50" fill="#1a1410" />
      </g>
    )
  }
  if (land === "garden") {
    return (
      <g>
        <path d="M0 300 L720 280 L720 420 L0 420 Z" fill={fill} />
        <circle cx="520" cy="250" r="36" fill="#2f5a3a" />
        <circle cx="575" cy="270" r="28" fill="#3d6b49" />
        <circle cx="470" cy="275" r="24" fill="#3d6b49" />
      </g>
    )
  }
  return <path d="M0 300 C160 270 240 330 400 292 C540 260 620 320 720 290 L720 420 L0 420 Z" fill={fill} />
}

function House({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <rect width="70" height="54" fill="#5c4636" />
      <path d="M-6 0 L35 -28 L76 0 Z" fill="#3a2a22" />
      <rect x="28" y="24" width="14" height="30" fill="#f4ecdf" />
    </g>
  )
}

function MarkShape({ mark }: { mark: Mark }) {
  if (mark === "none") return null
  const common = { fill: "none" as const, stroke: "#241c14", strokeWidth: 3 }
  if (mark === "cross") {
    return (
      <g stroke="#241c14" strokeWidth="8" fill="none">
        <path d="M470 120 V230" />
        <path d="M430 160 H510" />
      </g>
    )
  }
  if (mark === "gate") {
    return (
      <g {...common}>
        <path d="M430 140 H560 V280 H430 Z" />
        <path d="M478 280 V190 H512 V280" />
      </g>
    )
  }
  if (mark === "city") {
    return (
      <g fill="#f4ecdf" stroke="#241c14" strokeWidth="3">
        <path d="M430 250 L470 140 L500 190 L540 120 L590 250 Z" />
      </g>
    )
  }
  if (mark === "lions") {
    return (
      <g fill="#c6a15a">
        <ellipse cx="500" cy="286" rx="28" ry="14" />
        <circle cx="522" cy="274" r="10" />
        <ellipse cx="450" cy="292" rx="24" ry="12" />
        <circle cx="468" cy="282" r="8" />
      </g>
    )
  }
  if (mark === "cage") {
    return (
      <g stroke="#241c14" strokeWidth="3" fill="none">
        <rect x="455" y="160" width="80" height="100" />
        <path d="M475 160 V260 M495 160 V260 M515 160 V260" />
      </g>
    )
  }
  if (mark === "fire") {
    return <path d="M500 250 C480 200 520 180 500 130 C530 180 560 190 530 250 Z" fill="#c65a32" />
  }
  if (mark === "spring") {
    return <ellipse cx="500" cy="300" rx="36" ry="12" fill="#7eb0b8" />
  }
  if (mark === "tomb") {
    return <rect x="470" y="230" width="70" height="40" fill="#d9cbb3" stroke="#241c14" />
  }
  if (mark === "pillar") {
    return <rect x="490" y="150" width="22" height="130" fill="#e7e0d4" stroke="#241c14" />
  }
  if (mark === "mine") {
    return <path d="M450 280 L520 180 L590 280 Z" fill="#8a8f96" />
  }
  if (mark === "net") {
    return (
      <path
        d="M430 150 L590 150 L560 300 L460 300 Z M450 180 H570 M445 210 H575 M455 240 H565 M460 270 H560 M480 150 V300 M520 150 V300 M555 155 V290"
        fill="none"
        stroke="#241c14"
        strokeWidth="2"
      />
    )
  }
  if (mark === "glass") {
    return <circle cx="520" cy="200" r="28" fill="none" stroke="#241c14" strokeWidth="3" />
  }
  if (mark === "arrows") {
    return (
      <g stroke="#241c14" strokeWidth="3">
        <path d="M430 120 L520 210" />
        <path d="M460 100 L540 190" />
        <path d="M500 90 L560 170" />
      </g>
    )
  }
  if (mark === "tree") {
    return (
      <g>
        <rect x="508" y="210" width="10" height="70" fill="#5c4636" />
        <circle cx="513" cy="190" r="28" fill="#2f5a3a" />
      </g>
    )
  }
  if (mark === "roll") {
    return <rect x="300" y="250" width="36" height="16" rx="3" fill="#f7f1e4" stroke="#241c14" />
  }
  if (mark === "burden") {
    return <ellipse cx="250" cy="230" rx="28" ry="18" fill="#3a332c" />
  }
  if (mark === "sword") {
    return <path d="M300 150 L318 250" stroke="#c6a15a" strokeWidth="4" />
  }
  if (mark === "book") {
    return <rect x="250" y="210" width="28" height="20" fill="#f7f1e4" stroke="#241c14" />
  }
  if (mark === "key") {
    return <path d="M250 230 H290 M270 230 V248 M282 230 V244" stroke="#c6a15a" strokeWidth="3" fill="none" />
  }
  if (mark === "crown") {
    return <path d="M470 150 L490 190 L520 150 L550 190 L570 150 L555 210 H485 Z" fill="#c6a15a" />
  }
  if (mark === "staff") {
    return <path d="M280 140 V280" stroke="#5c4636" strokeWidth="4" />
  }
  if (mark === "pit") {
    return <ellipse cx="500" cy="320" rx="40" ry="14" fill="#1a1410" />
  }
  if (mark === "stalls") {
    return <path d="M430 230 L500 180 L570 230 V290 H430 Z" fill="#8f3a32" />
  }
  if (mark === "castle") {
    return <rect x="455" y="140" width="90" height="130" fill="#4a4038" />
  }
  return null
}

function Figures({ figure }: { figure: Figure }) {
  if (figure === "none") return null
  if (figure === "pair") {
    return (
      <g>
        <Person x={200} kind="pilgrim" />
        <Person x={290} kind="elder" />
      </g>
    )
  }
  return <Person x={220} kind={figure} />
}

function PortraitBust({ figure }: { figure: Exclude<Figure, "none" | "pair"> }) {
  const fill = figureFill[figure]
  const skin = figure === "shining" ? "#f7f1e4" : figure === "fiend" ? "#2a221c" : "#efd0b0"
  return (
    <g transform="translate(40 86)">
      <path d="M0 0 L-34 -6 L-20 -36 Q0 -48 20 -36 L34 -6 Z" fill={fill} stroke="#241c14" strokeWidth="2" />
      <circle cy="-58" r="16" fill={skin} stroke="#241c14" strokeWidth="2" />
      {figure === "shining" ? <circle cy="-58" r="24" fill="none" stroke="#c6a15a" strokeWidth="3" /> : null}
      {figure === "elder" || figure === "gentle" || figure === "giant" ? (
        <path d="M-16 -66 H16 L12 -52 H-12 Z" fill="#241c14" />
      ) : null}
      {figure === "lady" ? (
        <path d="M-18 -60 Q0 -80 18 -60 L12 -50 H-12 Z" fill={fill} stroke="#241c14" strokeWidth="2" />
      ) : null}
      {figure === "fiend" ? (
        <g stroke="#c6a15a" strokeWidth="3" strokeLinecap="round">
          <path d="M-8 -70 L-16 -84" />
          <path d="M8 -70 L16 -84" />
        </g>
      ) : null}
      {figure === "pilgrim" ? <ellipse cx="10" cy="-24" rx="12" ry="8" fill="#241c14" /> : null}
    </g>
  )
}

function Person({ x, kind }: { x: number; kind: Exclude<Figure, "none" | "pair"> }) {
  const fill = figureFill[kind]
  const tall = kind === "giant" || kind === "fiend"
  const height = tall ? 132 : 104
  const shoulder = tall ? 22 : 16
  const hem = tall ? 36 : 28
  const skin = kind === "shining" ? "#f7f1e4" : kind === "fiend" ? "#2a221c" : "#efd0b0"
  const sleep = kind === "sleep"
  return (
    <g transform={sleep ? `translate(${x - 20} 318) rotate(-78)` : `translate(${x} 336)`}>
      <path
        d={`M0 0 L${-hem} -8 L${-shoulder} ${-height + 34} Q0 ${-height + 14} ${shoulder} ${-height + 34} L${hem} -8 Z`}
        fill={fill}
        stroke="#241c14"
        strokeWidth="2"
      />
      <circle cy={-height} r={tall ? 16 : 13} fill={skin} stroke="#241c14" strokeWidth="2" />
      {kind === "shining" ? (
        <circle cy={-height} r="24" fill="none" stroke="#c6a15a" strokeWidth="3" />
      ) : null}
      {kind === "elder" || kind === "gentle" ? (
        <path d={`M-15 ${-height - 6} H15 L11 ${-height + 6} H-11 Z`} fill="#241c14" />
      ) : null}
      {kind === "lady" ? (
        <path
          d={`M-18 ${-height - 2} Q0 ${-height - 24} 18 ${-height - 2} L12 ${-height + 8} H-12 Z`}
          fill={fill}
          stroke="#241c14"
          strokeWidth="2"
        />
      ) : null}
      {kind === "fiend" ? (
        <g stroke="#c6a15a" strokeWidth="3" strokeLinecap="round">
          <path d={`M-8 ${-height - 12} L-18 ${-height - 32}`} />
          <path d={`M8 ${-height - 12} L18 ${-height - 32}`} />
          <path d={`M${shoulder} ${-height + 40} L${shoulder + 28} ${-height - 8}`} />
        </g>
      ) : null}
      {kind === "giant" ? (
        <path d={`M-20 ${-height - 4} H20 L14 ${-height + 8} H-14 Z`} fill="#241c14" />
      ) : null}
      {kind === "pilgrim" ? (
        <ellipse cx="8" cy={-height + 42} rx="15" ry="10" fill="#241c14" />
      ) : null}
    </g>
  )
}
