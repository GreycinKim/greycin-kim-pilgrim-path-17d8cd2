"use client"

import Image from "next/image"
import type { ReactNode } from "react"
import { BadgeSeal } from "@/components/badge-seal"
import { hasReached, stages, type RegionId } from "@/lib/journey"
import { placeImages } from "@/lib/place-images"
import type { PlateSpec } from "@/lib/plate"
import type { Award } from "@/lib/score"

const engraved: Record<string, string> = {
  slough: "/badges/slough.png",
  wicket: "/badges/wicket.png",
  interpreter: "/badges/interpreter.png",
  cross: "/badges/cross.png",
  hill: "/badges/hill.png",
  palace: "/badges/palace.png",
  humiliation: "/badges/humiliation.png",
  shadow: "/badges/shadow.png",
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function badgeDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}

const fallbackPlate: PlateSpec = { sky: "day", land: "road", mark: "none", figure: "pilgrim" }

export function BadgeBook({
  progress,
  awards,
  plates,
  onOpen,
}: {
  progress: { stageId: string; finished: boolean }
  awards: Award[]
  plates: Record<string, PlateSpec>
  onOpen: (stageId: string) => void
}) {
  const earnedCount = stages.filter((stage) => hasReached(progress.stageId, progress.finished, stage.id)).length
  return (
    <div className="bg-[#ead9b8] px-4 pt-5 pb-8 text-[#241c14]">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-3xl leading-none">Badges</h1>
          <p className="mt-1.5 text-sm text-[#6b5340]">Every stop on the way.</p>
        </div>
        <p className="font-heading text-lg text-[#8a6232]">
          {earnedCount} of {stages.length}
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {stages.map((stage, index) => {
          const earned = hasReached(progress.stageId, progress.finished, stage.id)
          const arrived = awards.find((award) => award.stageId === stage.id && award.kind === "arrival")
          const date = earned && arrived?.createdAt ? badgeDate(arrived.createdAt) : ""
          const art = engraved[stage.id] ?? placeImages[stage.id]
          return (
            <li key={stage.id}>
              <BadgeCard
                number={index + 1}
                title={stage.title}
                earned={earned}
                date={date}
                onOpen={earned ? () => onOpen(stage.id) : undefined}
              >
                <Medallion
                  art={art}
                  title={stage.title}
                  plate={plates[stage.id] ?? fallbackPlate}
                  regionId={stage.regionId}
                />
              </BadgeCard>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function BadgeCard({
  number,
  title,
  earned,
  date,
  onOpen,
  children,
}: {
  number: number
  title: string
  earned: boolean
  date: string
  onOpen?: () => void
  children: ReactNode
}) {
  const className =
    "flex h-full w-full flex-col rounded-md border border-[#241c14]/15 bg-[#f6edd8] px-3 pt-3 pb-2.5 text-left shadow-[0_1px_0_rgba(36,28,20,0.06)]"
  const body = (
    <>
      <p className="font-heading min-h-10 text-[13px] leading-tight text-[#241c14]">
        {number}. {title}
      </p>
      <div className={`mx-auto mt-2 size-28 ${earned ? "" : "opacity-55 grayscale"}`}>{children}</div>
      <p className="mt-2 text-xs text-[#3a2e24]">
        Date:{" "}
        <span className="inline-block min-w-16 border-b border-[#241c14]/35 text-[#241c14]">{date}</span>
      </p>
    </>
  )
  if (!onOpen) {
    return (
      <div className={className} aria-label={`${title}, not yet earned`}>
        {body}
      </div>
    )
  }
  return (
    <button type="button" className={`${className} active:bg-[#efe4cc]`} onClick={onOpen} aria-label={`${title}, earned ${date}`}>
      {body}
    </button>
  )
}

function Medallion({
  art,
  title,
  plate,
  regionId,
}: {
  art?: string
  title: string
  plate: PlateSpec
  regionId: RegionId
}) {
  if (art) {
    return (
      <Image
        src={art}
        alt=""
        width={256}
        height={256}
        className="size-full rounded-full"
      />
    )
  }
  return <BadgeSeal plate={plate} regionId={regionId} label={title} />
}
