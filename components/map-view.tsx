"use client"

import { Minus, Plus, LocateFixed } from "lucide-react"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from "react"
import { regions, type RegionId } from "@/lib/journey"

const ASPECT = 4200 / 3300
const STACK = regions.length
// Plate IV is the top of the scroll. Plate I is the bottom.
const stack = [...regions].reverse()

export type MapPin = {
  id: string
  x: number
  y: number
  kind:
    | "current"
    | "viewing"
    | "done"
    | "ahead"
    | "place"
    | "place-active"
    | "companion"
    | "companion-active"
    | "companion-more"
  label?: string
  kicker?: string
  color?: string
  image?: string
  named?: boolean
  regionId: RegionId
  aria: string
}

type MapPoint = { x: number; y: number; regionId: RegionId }

type Point = { x: number; y: number }
type View = { x: number; y: number; scale: number }

function plateIndex(id: RegionId) {
  const index = stack.findIndex((region) => region.id === id)
  return index < 0 ? 0 : index
}

function stackHeight(frame: HTMLElement, scale: number) {
  return frame.clientWidth * ASPECT * STACK * scale
}

function preferredScale(frame: HTMLElement) {
  return frame.clientWidth < 800 ? 1.7 : 1.2
}

function clampView(frame: HTMLElement, view: View): View {
  const width = frame.clientWidth
  const height = frame.clientHeight
  const scale = Math.min(4, Math.max(1, view.scale))
  const imageWidth = width * scale
  const imageHeight = stackHeight(frame, scale)
  let x = view.x
  let y = view.y
  if (imageWidth <= width) x = (width - imageWidth) / 2
  else x = Math.min(0, Math.max(width - imageWidth, x))
  if (imageHeight <= height) y = (height - imageHeight) / 2
  else y = Math.min(0, Math.max(height - imageHeight, y))
  return { x, y, scale }
}

function viewForPoint(frame: HTMLElement, point: MapPoint, scale: number): View {
  const width = frame.clientWidth
  const height = frame.clientHeight
  const imageWidth = width * scale
  const plateHeight = width * ASPECT * scale
  const index = plateIndex(point.regionId)
  return clampView(frame, {
    scale,
    x: width / 2 - (point.x / 100) * imageWidth,
    y: height / 2 - index * plateHeight - (point.y / 100) * plateHeight,
  })
}

function regionAtCenter(frame: HTMLElement, view: View): RegionId {
  const contentY = (frame.clientHeight / 2 - view.y) / view.scale
  const plateHeight = frame.clientWidth * ASPECT
  const index = Math.min(STACK - 1, Math.max(0, Math.floor(contentY / plateHeight)))
  return stack[index].id
}

export function MapView({
  regionId,
  pins,
  jump,
  focus,
  home,
  showPlaces,
  onTogglePlaces,
  onSelect,
  onBackground,
  onVisibleRegion,
  elsewhere,
}: {
  regionId: RegionId
  jump: number
  pins: MapPin[]
  focus: MapPoint | null
  home: MapPoint
  showPlaces: boolean
  onTogglePlaces: () => void
  onSelect: (pin: MapPin) => void
  onBackground?: () => void
  onVisibleRegion?: (id: RegionId) => void
  elsewhere: { label: string; onShow: () => void } | null
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<View>({ x: 0, y: 0, scale: 1 })
  const viewRef = useRef(view)
  const focusRef = useRef(focus)
  const homeRef = useRef(home)
  const regionRef = useRef(regionId)
  const onVisibleRegionRef = useRef(onVisibleRegion)
  const userAdjusted = useRef(false)

  useLayoutEffect(() => {
    focusRef.current = focus
    homeRef.current = home
    regionRef.current = regionId
    onVisibleRegionRef.current = onVisibleRegion
  })

  function targetPoint(): MapPoint {
    const region = regionRef.current
    const point = focusRef.current
    if (point && point.regionId === region) return point
    return { x: 50, y: 40, regionId: region }
  }

  function commit(next: View, reportRegion = false) {
    viewRef.current = next
    setView(next)
    if (!reportRegion) return
    const frame = frameRef.current
    if (!frame) return
    const id = regionAtCenter(frame, next)
    if (id === regionRef.current) return
    regionRef.current = id
    onVisibleRegionRef.current?.(id)
  }
  const placed = useRef(false)
  const pointers = useRef(new Map<number, Point>())
  const drag = useRef<{
    x: number
    y: number
    vx: number
    vy: number
    moved: boolean
  } | null>(null)
  const pinch = useRef<{ dist: number; scale: number } | null>(null)
  const lastTap = useRef(0)
  const [broken, setBroken] = useState<Partial<Record<RegionId, boolean>>>({})
  const [closedBanner, setClosedBanner] = useState<string | null>(null)
  const focusKey = focus ? `${focus.regionId}:${focus.x}:${focus.y}` : "fit"

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    if (frame.clientWidth === 0 || frame.clientHeight === 0) return
    userAdjusted.current = false
    const scale = placed.current ? viewRef.current.scale : preferredScale(frame)
    const point = placed.current ? targetPoint() : homeRef.current
    placed.current = true
    const next = viewForPoint(frame, point, scale)
    viewRef.current = next
    setView(next)
  }, [jump, focusKey])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    let width = frame.clientWidth
    let height = frame.clientHeight
    const observer = new ResizeObserver(() => {
      if (frame.clientWidth === width && frame.clientHeight === height) return
      width = frame.clientWidth
      height = frame.clientHeight
      const current = viewRef.current
      const next = userAdjusted.current
        ? clampView(frame, current)
        : viewForPoint(frame, targetPoint(), current.scale)
      viewRef.current = next
      setView(next)
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      userAdjusted.current = true
      const rect = frame.getBoundingClientRect()
      const current = viewRef.current
      if (event.ctrlKey || event.metaKey) {
        const next = Math.min(4, Math.max(1, current.scale * (event.deltaY > 0 ? 0.92 : 1.08)))
        if (next === current.scale) return
        const px = event.clientX - rect.left
        const py = event.clientY - rect.top
        const ratio = next / current.scale
        commit(
          clampView(frame, {
            scale: next,
            x: px - (px - current.x) * ratio,
            y: py - (py - current.y) * ratio,
          }),
        )
        return
      }
      commit(
        clampView(frame, {
          scale: current.scale,
          x: current.x - event.deltaX,
          y: current.y - event.deltaY,
        }),
        true,
      )
    }
    frame.addEventListener("wheel", onWheel, { passive: false })
    return () => frame.removeEventListener("wheel", onWheel)
  }, [])

  function zoomAt(clientX: number, clientY: number, nextScale: number) {
    const frame = frameRef.current
    if (!frame) return
    userAdjusted.current = true
    const rect = frame.getBoundingClientRect()
    const current = viewRef.current
    const next = Math.min(4, Math.max(1, nextScale))
    const px = clientX - rect.left
    const py = clientY - rect.top
    const ratio = next / current.scale
    commit(
      clampView(frame, {
        scale: next,
        x: px - (px - current.x) * ratio,
        y: py - (py - current.y) * ratio,
      }),
    )
  }

  function recenter() {
    const frame = frameRef.current
    if (!frame) return
    userAdjusted.current = false
    commit(viewForPoint(frame, home, Math.max(viewRef.current.scale, preferredScale(frame))), true)
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement
    if (target.closest("[data-pin], [data-map-control]")) return
    const frame = frameRef.current
    if (!frame) return
    frame.setPointerCapture(event.pointerId)
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointers.current.size === 1) {
      drag.current = {
        x: event.clientX,
        y: event.clientY,
        vx: viewRef.current.x,
        vy: viewRef.current.y,
        moved: false,
      }
      pinch.current = null
    } else if (pointers.current.size >= 2) {
      const pts = [...pointers.current.values()]
      pinch.current = {
        dist: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1,
        scale: viewRef.current.scale,
      }
      drag.current = null
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId)) return
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    const frame = frameRef.current
    if (!frame) return
    if (pointers.current.size >= 2 && pinch.current) {
      const pts = [...pointers.current.values()]
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1
      const next = pinch.current.scale * (dist / pinch.current.dist)
      const midX = (pts[0].x + pts[1].x) / 2
      const midY = (pts[0].y + pts[1].y) / 2
      zoomAt(midX, midY, next)
      return
    }
    if (!drag.current) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    if (Math.hypot(dx, dy) > 4) drag.current.moved = true
    userAdjusted.current = true
    commit(
      clampView(frame, {
        scale: viewRef.current.scale,
        x: drag.current.vx + dx,
        y: drag.current.vy + dy,
      }),
      true,
    )
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const wasTap = Boolean(drag.current && !drag.current.moved && pointers.current.size === 1)
    pointers.current.delete(event.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    if (pointers.current.size === 0 && wasTap) {
      onBackground?.()
      const now = Date.now()
      if (now - lastTap.current < 280) {
        const next = viewRef.current.scale > 2 ? 1 : viewRef.current.scale * 1.75
        zoomAt(event.clientX, event.clientY, next)
        lastTap.current = 0
      } else {
        lastTap.current = now
      }
    }
    if (pointers.current.size === 0) drag.current = null
  }

  return (
    <div
      ref={frameRef}
      className="relative h-full w-full cursor-grab touch-none overflow-hidden bg-[#cbbfa6] active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="application"
      aria-label="The four plates, with Plate IV at the top and Plate I at the bottom. Drag or scroll to move. Pinch to zoom."
    >
      <div
        className="absolute top-0 left-0 will-change-transform"
        style={{
          width: "100%",
          transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          transformOrigin: "0 0",
        }}
      >
        {stack.map((region) => (
          <div key={region.id} className="relative w-full" style={{ aspectRatio: "3300 / 4200" }}>
            {broken[region.id] ? (
              <div className="absolute inset-0 grid place-items-center bg-[#f4ecdf] p-6 text-center text-[#241c14]">
                <p className="font-heading text-2xl">{region.name}</p>
                <p className="mt-2 max-w-xs text-sm">This plate didn’t load. Refresh the page to try again.</p>
              </div>
            ) : (
              <Image
                src={region.image}
                alt={`Illustrated map of ${region.name} from The Pilgrim's Progress`}
                fill
                priority={region.id === regionId}
                unoptimized
                draggable={false}
                sizes="100vw"
                className="pointer-events-none select-none object-fill"
                onError={() => setBroken((current) => ({ ...current, [region.id]: true }))}
              />
            )}
            <p className="pointer-events-none absolute top-3 left-3 z-30 rounded-full bg-[#1a1410]/80 px-3 py-1 text-[11px] text-[#f4ecdf] shadow-md">
              {region.plate} · {region.name}
            </p>
            {pins
              .filter((pin) => pin.regionId === region.id)
              .map((pin) => (
                <PinButton key={pin.id} pin={pin} onSelect={onSelect} />
              ))}
          </div>
        ))}
      </div>

      {elsewhere && closedBanner !== elsewhere.label ? (
        <div data-map-control className="absolute right-3 bottom-16 left-3 z-20 flex justify-center">
          <div className="flex max-w-full items-center gap-1 rounded-full bg-[#1a1410]/90 py-1 pr-1 pl-3 text-[#f4ecdf] shadow-lg">
            <button type="button" onClick={elsewhere.onShow} className="py-1 text-left text-xs">
              You are in {elsewhere.label}. Show my place
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setClosedBanner(elsewhere.label)}
              className="grid size-8 shrink-0 place-items-center rounded-full text-base leading-none"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}

      <div data-map-control className="absolute right-4 bottom-4 z-20 flex flex-col gap-2">
        <ControlButton label="Zoom in" onClick={() => {
          const frame = frameRef.current
          if (!frame) return
          const rect = frame.getBoundingClientRect()
          zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, view.scale * 1.25)
        }}>
          <Plus />
        </ControlButton>
        <ControlButton label="Zoom out" onClick={() => {
          const frame = frameRef.current
          if (!frame) return
          const rect = frame.getBoundingClientRect()
          zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, view.scale / 1.25)
        }}>
          <Minus />
        </ControlButton>
        <ControlButton label="Center on my place" onClick={recenter}>
          <LocateFixed />
        </ControlButton>
        <button
          type="button"
          aria-pressed={showPlaces}
          onClick={onTogglePlaces}
          className={`rounded-full px-3 py-2 text-xs font-medium shadow-md ${
            showPlaces ? "bg-[#2c6b49] text-[#f7f1e4]" : "bg-[#f7f1e4] text-[#241c14]"
          }`}
        >
          Places
        </button>
      </div>
    </div>
  )
}

function ControlButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full bg-[#f7f1e4] text-[#241c14] shadow-md disabled:opacity-40 [&_svg]:size-5"
    >
      {children}
    </button>
  )
}

function PinButton({ pin, onSelect }: { pin: MapPin; onSelect: (pin: MapPin) => void }) {
  const companion = pin.kind === "companion" || pin.kind === "companion-active"
  const more = pin.kind === "companion-more"
  const prominent =
    pin.kind === "current" ||
    pin.kind === "viewing" ||
    pin.kind === "place-active" ||
    pin.kind === "companion-active"
  return (
    <span
      data-pin
      className={`absolute ${prominent ? "z-20" : companion || more ? "z-[15]" : "z-10"}`}
      style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
    >
      {companion ? (
        <button type="button" aria-label={pin.aria} onClick={() => onSelect(pin)}>
          <CompanionMark pin={pin} />
        </button>
      ) : more ? (
        <button type="button" aria-label={pin.aria} onClick={() => onSelect(pin)}>
          <MoreMark pin={pin} />
        </button>
      ) : prominent ? (
        <ProminentPin pin={pin} onSelect={() => onSelect(pin)} />
      ) : (
        <button type="button" aria-label={pin.aria} onClick={() => onSelect(pin)}>
          <Dot pin={pin} />
        </button>
      )}
    </span>
  )
}

function CompanionMark({ pin }: { pin: MapPin }) {
  const active = pin.kind === "companion-active"
  const initial = (pin.label ?? "?").trim().charAt(0).toUpperCase() || "?"
  return (
    <span className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <CompanionFace
        key={pin.image ?? ""}
        src={pin.image}
        initial={initial}
        color={pin.color ?? "#2f5d8a"}
        active={active}
      />
      {pin.label && (pin.named !== false || active) ? (
        <span
          className={`mt-0.5 max-w-28 truncate rounded px-1.5 py-px text-[10px] leading-tight shadow-sm ${
            active ? "bg-[#1a1410] text-[#f4ecdf]" : "bg-[#f7f1e4]/95 text-[#241c14]"
          }`}
        >
          {pin.label}
        </span>
      ) : null}
    </span>
  )
}

function MoreMark({ pin }: { pin: MapPin }) {
  return (
    <span className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
      <span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#1a1410] px-1.5 text-[11px] font-semibold text-[#f4ecdf] shadow-md ring-2 ring-[#f7f1e4]">
        {pin.label}
      </span>
    </span>
  )
}

function CompanionFace({
  src,
  initial,
  color,
  active,
}: {
  src?: string
  initial: string
  color: string
  active: boolean
}) {
  const [failed, setFailed] = useState(false)
  return (
    <span
      className={`grid size-7 place-items-center overflow-hidden rounded-full text-xs font-semibold text-white shadow-md ring-2 ${
        active ? "ring-[#c6a15a]" : "ring-[#f7f1e4]"
      }`}
      style={{ backgroundColor: color }}
    >
      {src && !failed ? (
        // Session-gated portrait; next/image cannot send the cookie.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" className="size-full object-cover" onError={() => setFailed(true)} />
      ) : (
        initial
      )}
    </span>
  )
}

function ProminentPin({ pin, onSelect }: { pin: MapPin; onSelect: () => void }) {
  const seal = pin.kind === "current"
  const labelKey = `${pin.kind}:${pin.kicker ?? ""}:${pin.label ?? ""}`
  const [hiddenKey, setHiddenKey] = useState<string | null>(null)
  const showLabel = Boolean(pin.label) && hiddenKey !== labelKey
  return (
    <span className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-full flex-col items-center">
      {showLabel ? (
        <span className="relative mb-1 block max-w-44 rounded-md bg-[#f7f1e4]/95 px-2 py-1 pr-7 text-center leading-tight shadow-md ring-1 ring-[#241c14]/15">
          <button
            type="button"
            aria-label={pin.kicker ? `Close ${pin.kicker}` : "Close label"}
            onClick={() => setHiddenKey(labelKey)}
            className="absolute top-0.5 right-0.5 grid size-7 place-items-center rounded-full text-base leading-none text-[#6b5340]"
          >
            <span aria-hidden="true">×</span>
          </button>
          {pin.kicker ? (
            <span className="block text-[9px] font-medium tracking-[0.14em] text-[#9a3b32] uppercase">
              {pin.kicker}
            </span>
          ) : null}
          <span className="text-[11px] font-medium text-[#241c14]">{pin.label}</span>
        </span>
      ) : null}
      <button
        type="button"
        aria-label={pin.aria}
        aria-current={pin.kind === "current" ? "true" : undefined}
        onClick={onSelect}
        className="relative"
      >
        {seal ? (
          <span className="waymark-pulse absolute top-1 left-1/2 size-4 -translate-x-1/2 rounded-full bg-[#c6a15a]" />
        ) : null}
        <svg width="28" height="36" viewBox="0 0 28 36" aria-hidden="true">
          <path
            d="M14 35C14 35 2 22.5 2 14a12 12 0 1 1 24 0C26 22.5 14 35 14 35Z"
            fill={seal ? "#9a3b32" : "#8a6232"}
            stroke="#f7f1e4"
            strokeWidth="1.6"
          />
          <circle cx="14" cy="14" r="4.2" fill="#f7f1e4" />
        </svg>
      </button>
    </span>
  )
}

function Dot({ pin }: { pin: MapPin }) {
  const done = pin.kind === "done"
  const place = pin.kind === "place"
  return (
    <span
      className={`absolute top-0 left-0 block size-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${
        done
          ? "before:absolute before:top-1/2 before:left-1/2 before:size-2.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[#2c6b49] before:ring-2 before:ring-[#f7f1e4]"
          : place
            ? "before:absolute before:top-1/2 before:left-1/2 before:size-2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-[#8a6232]/80"
            : "before:absolute before:top-1/2 before:left-1/2 before:size-2.5 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-[#f7f1e4]/80 before:ring-2 before:ring-[#241c14]/50"
      }`}
    />
  )
}
