"use client"

import { BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { unstable_rethrow } from "next/navigation"
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react"
import { completeMission } from "@/app/actions/missions"
import {
  markPassageRead,
  restartJourney,
  saveNoteAction,
  setPlace,
} from "@/app/actions/progress"
import { BadgeBook } from "@/components/badge-book"
import { RetreatSchedule } from "@/components/retreat-schedule"
import { CharacterNotes } from "@/components/character-notes"
import { MapView, type MapPin } from "@/components/map-view"
import { PlaceChallenges, QuizDialog } from "@/components/place-challenges"
import { ProfileMenu } from "@/components/profile-menu"
import { CharacterPortrait } from "@/components/reference-plate"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogPopup, DialogPortal, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { localDay } from "@/lib/checkin"
import { retreatCountdown } from "@/lib/countdown"
import { layoutCompanions, mapFaces, pilgrimColor, stayPhrase, stayShort, type Pilgrim } from "@/lib/company"
import type { PlateSpec } from "@/lib/plate"
import { getMission, missionPhotoSrc } from "@/lib/missions"
import { awardPoints, hasAward, leaderboard, ordinal, type Award } from "@/lib/score"
import { portraitSrc } from "@/lib/portrait"
import {
  getLandmark,
  getRegion,
  getStage,
  landmarksInRegion,
  progressPercent,
  regions,
  hasReached,
  stageIndex,
  stages,
  stagesInRegion,
  type RegionId,
} from "@/lib/journey"

type Progress = { stageId: string; finished: boolean; updatedAt: string }
type Cast = Record<string, { id: string; name: string; plate: PlateSpec; portrait?: string }[]>
type Pane = "map" | "path" | "notes" | "company" | "badges" | "schedule"

export function JournalApp({
  name,
  progress: initialProgress,
  notes: initialNotes,
  pilgrims: initialPilgrims,
  checkins,
  awards,
  score: initialScore,
  cast,
  speakers,
  stagePlates,
  openStage,
  openLandmark,
  givenName,
  admin,
}: {
  name: string
  progress: Progress
  notes: Record<string, string>
  pilgrims: Pilgrim[]
  checkins: string[]
  awards: Award[]
  score: number
  cast: Cast
  speakers: Record<string, string>
  stagePlates: Record<string, PlateSpec>
  openStage?: string
  openLandmark?: string
  givenName: string | null
  admin: boolean
}) {
  const [heldProgress, setHeldProgress] = useState<Progress | null>(null)
  const progress = heldProgress ?? initialProgress
  const focusStage = openStage && getStage(openStage) ? openStage : initialProgress.stageId
  const focusLandmark = openLandmark ? getLandmark(openLandmark) : undefined
  const [notes, setNotes] = useState(initialNotes)
  const [pilgrims, setPilgrims] = useState(initialPilgrims)
  const [selectedStageId, setSelectedStageId] = useState(focusStage)
  const [landmarkId, setLandmarkId] = useState<string | null>(focusLandmark?.id ?? null)
  const [companionId, setCompanionId] = useState<string | null>(null)
  const [crowdStageId, setCrowdStageId] = useState<string | null>(null)
  const [regionId, setRegionId] = useState<RegionId>(
    focusLandmark?.regionId ?? getStage(focusStage)?.regionId ?? "destruction",
  )
  const [mapJump, setMapJump] = useState(0)
  const [showPlaces, setShowPlaces] = useState(false)
  const [pane, setPane] = useState<Pane>("map")
  const [confirmRestart, setConfirmRestart] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())
  const [pending, startTransition] = useTransition()
  const [live, setLive] = useState("")
  const [quizStageId, setQuizStageId] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const advanceAfterQuiz = useRef<{ nextId: string | null } | null>(null)
  const [recordedQuizzes, setRecordedQuizzes] = useState<Record<string, number>>({})
  const [markedMissions, setMarkedMissions] = useState<string[]>([])
  const [photoStamps, setPhotoStamps] = useState<Record<string, string>>({})
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [, startMission] = useTransition()
  const [score, setScore] = useState(initialScore)
  const [scoreSeen, setScoreSeen] = useState(initialScore)
  if (initialScore !== scoreSeen) {
    setScoreSeen(initialScore)
    setScore((current) => Math.max(current, initialScore))
  }

  const current = getStage(progress.stageId) ?? stages[0]
  const selected = getStage(selectedStageId) ?? current
  const landmark = landmarkId ? getLandmark(landmarkId) : undefined
  const currentIndex = stageIndex(current.id)
  const selectedIndex = stageIndex(selected.id)

  const chooseStage = useCallback((id: string, options?: { stayOnList?: boolean }) => {
    const stage = getStage(id)
    if (!stage) return
    setLandmarkId(null)
    setCompanionId(null)
    setCrowdStageId(null)
    setSelectedStageId(stage.id)
    setRegionId(stage.regionId)
    setMapJump((n) => n + 1)
    if (!options?.stayOnList) setPane("map")
  }, [])

  const onCity = useCallback((id: RegionId, options?: { stayOnList?: boolean }) => {
    const inRegion = stagesInRegion(id)
    const here = inRegion.find((stage) => stage.id === progress.stageId)
    const pick = here ?? inRegion[0]
    if (pick) chooseStage(pick.id, options)
  }, [chooseStage, progress.stageId])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      ) {
        return
      }
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft" && event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return
      }
      event.preventDefault()
      const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1
      const next = stages[stageIndex(selectedStageId) + delta]
      if (next) chooseStage(next.id, { stayOnList: pane === "path" })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [chooseStage, pane, selectedStageId])

  const company = pilgrims.map((pilgrim) =>
    pilgrim.self
      ? {
          ...pilgrim,
          pseudonym: name,
          stageId: progress.stageId,
          finished: progress.finished,
          arrivedAt: progress.updatedAt,
          points: score,
        }
      : pilgrim,
  )
  const myRank = leaderboard(company).find((row) => row.person.self)?.rank ?? 1

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (document.visibilityState === "hidden") return
      try {
        const response = await fetch("/api/company", { cache: "no-store" })
        if (!response.ok) return
        const body: unknown = await response.json()
        const next = readPilgrims(body)
        if (!next || cancelled) return
        setPilgrims((prev) => (sameCompany(prev, next) ? prev : next))
      } catch {
        // Keep the last company if the refresh fails.
      }
    }
    function refresh() {
      void load()
    }
    refresh()
    const timer = window.setInterval(refresh, 8000)
    const clock = window.setInterval(() => setNow(new Date()), 60_000)
    document.addEventListener("visibilitychange", refresh)
    return () => {
      cancelled = true
      window.clearInterval(timer)
      window.clearInterval(clock)
      document.removeEventListener("visibilitychange", refresh)
    }
  }, [name, progress.finished, progress.stageId])

  function onPortrait(portraitAt: string | null) {
    setPilgrims((current) =>
      current.map((pilgrim) => (pilgrim.self ? { ...pilgrim, portraitAt } : pilgrim)),
    )
  }

  function quizTaken(stageId: string) {
    return stageId in recordedQuizzes || hasAward(awards, stageId, "quiz")
  }

  function quizScore(stageId: string) {
    if (stageId in recordedQuizzes) return recordedQuizzes[stageId]
    return awardPoints(awards, stageId, "quiz") + awardPoints(awards, stageId, "path")
  }

  const doneMissions = new Set([
    ...awards.filter((award) => award.kind === "mission").map((award) => award.stageId),
    ...markedMissions,
  ])

  function onUploadMission(id: string, photo: Blob) {
    if (uploadingId) return
    const mission = getMission(id)
    if (!mission) return
    setUploadingId(id)
    startMission(async () => {
      try {
        const data = new FormData()
        data.set("missionId", id)
        data.set("photo", new File([photo], "mission.jpg", { type: "image/jpeg" }))
        const result = await completeMission(data)
        if ("error" in result || !result.photoAt || result.gained === undefined || result.total === undefined) {
          setNotice("error" in result ? (result.error ?? "That picture could not be saved.") : "That picture could not be saved.")
          return
        }
        setMarkedMissions((current) => (current.includes(id) ? current : [...current, id]))
        setPhotoStamps((current) => ({ ...current, [id]: result.photoAt }))
        if (result.gained > 0) onScored(result.total, `${mission.title}. ${result.gained} points.`)
        else setNotice("Picture saved.")
      } catch (error) {
        unstable_rethrow(error)
        setNotice("That picture could not be saved.")
      } finally {
        setUploadingId(null)
      }
    })
  }

  const onScored = useCallback((total: number, message: string) => {
    setScore(total)
    setLive(message)
    setNotice(message)
    setPilgrims((current) => current.map((pilgrim) => (pilgrim.self ? { ...pilgrim, points: total } : pilgrim)))
  }, [])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(null), 8000)
    return () => window.clearTimeout(timer)
  }, [notice])

  function openRegion(id: RegionId) {
    setRegionId(id)
    setLandmarkId(null)
    setMapJump((n) => n + 1)
  }

  function onVisibleRegion(id: RegionId) {
    setRegionId((current) => (current === id ? current : id))
  }

  function showMine() {
    chooseStage(current.id)
  }

  function rememberPlace() {
    return {
      stageId: selectedStageId,
      regionId,
      landmarkId,
    }
  }

  function restorePlace(snapshot: { stageId: string; regionId: RegionId; landmarkId: string | null }) {
    setSelectedStageId(snapshot.stageId)
    setRegionId(snapshot.regionId)
    setLandmarkId(snapshot.landmarkId)
    setMapJump((n) => n + 1)
  }

  function revealNext(nextId: string | null) {
    setHeldProgress(null)
    setDetailOpen(false)
    if (!nextId) {
      setLive("Part one is finished.")
      return
    }
    const stage = getStage(nextId)
    if (!stage) return
    chooseStage(stage.id)
    const moved = `Your place is now ${stage.title}.`
    setLive(moved)
    setNotice((current) => (current ? `${current} ${moved}` : moved))
  }

  function onQuizClose() {
    setQuizStageId(null)
    const advance = advanceAfterQuiz.current
    advanceAfterQuiz.current = null
    if (advance) revealNext(advance.nextId)
  }

  function onMarkRead() {
    if (pending || selected.id !== progress.stageId || progress.finished) return
    const next = stages[currentIndex + 1]
    const snapshot = rememberPlace()
    const readId = progress.stageId
    const nextId = next?.id ?? null
    if (!quizTaken(readId)) {
      advanceAfterQuiz.current = { nextId }
      setHeldProgress(progress)
      setDetailOpen(false)
      setQuizStageId(readId)
    } else {
      revealNext(nextId)
    }
    startTransition(async () => {
      try {
        const result = await markPassageRead(progress.stageId)
        if (typeof result?.total === "number") setScore(result.total)
      } catch (error) {
        unstable_rethrow(error)
        advanceAfterQuiz.current = null
        setHeldProgress(null)
        restorePlace(snapshot)
        setQuizStageId((current) => (current === readId ? null : current))
      }
    })
  }

  function onSetPlace() {
    if (pending || selected.id === progress.stageId) return
    const snapshot = rememberPlace()
    setLive(`Your place is now ${selected.title}.`)
    startTransition(async () => {
      try {
        const result = await setPlace(selected.id)
        if (typeof result?.total === "number") setScore(result.total)
      } catch (error) {
        unstable_rethrow(error)
        restorePlace(snapshot)
      }
    })
  }

  function onRestart() {
    const snapshot = rememberPlace()
    chooseStage(stages[0].id)
    setConfirmRestart(false)
    setLive("Back at the City of Destruction. Your notes are still here.")
    startTransition(async () => {
      try {
        await restartJourney()
      } catch (error) {
        unstable_rethrow(error)
        restorePlace(snapshot)
      }
    })
  }

  const onNote = useCallback((stageId: string, body: string) => {
    setNotes((prev) => ({ ...prev, [stageId]: body }))
  }, [])

  const home = { x: current.x, y: current.y, regionId: current.regionId }
  const elsewhere = current.regionId === regionId ? null : { label: getRegion(current.regionId).name, onShow: showMine }

  const pins = pinsForPlate({
    progress,
    selectedStageId,
    landmarkId,
    companionId,
    company,
    showPlaces,
  })
  const companionPin = companionId ? pins.find((pin) => pin.id === companionId) : undefined
  const companion = company.find((pilgrim) => pilgrim.id === companionId && !pilgrim.self)
  const focus = companionPin
    ? { x: companionPin.x, y: companionPin.y, regionId: companionPin.regionId }
    : landmark
      ? { x: landmark.x, y: landmark.y, regionId: landmark.regionId }
      : { x: selected.x, y: selected.y, regionId: selected.regionId }

  function lookAtCompanion(id: string) {
    const pilgrim = company.find((person) => person.id === id && !person.self)
    const stage = pilgrim ? getStage(pilgrim.stageId) : undefined
    if (!pilgrim || !stage) return
    setLandmarkId(null)
    setCrowdStageId(null)
    setCompanionId(pilgrim.id)
    setLive(`${pilgrim.pseudonym} is reading ${stage.title}.`)
    setSelectedStageId(stage.id)
    setRegionId(stage.regionId)
    setMapJump((n) => n + 1)
    setPane("map")
    setDetailOpen(true)
  }

  function onSelectPin(pin: MapPin) {
    setDetailOpen(true)
    if (pin.kind === "companion" || pin.kind === "companion-active") {
      lookAtCompanion(pin.id)
      return
    }
    if (pin.kind === "companion-more" && pin.id.startsWith("crowd:")) {
      const stage = getStage(pin.id.slice("crowd:".length))
      if (!stage) return
      setCompanionId(null)
      setLandmarkId(null)
      setCrowdStageId(stage.id)
      setSelectedStageId(stage.id)
      setRegionId(stage.regionId)
      setMapJump((n) => n + 1)
      setPane("map")
      setLive(`${stage.title} has more readers.`)
      return
    }
    if (pin.kind === "place" || pin.kind === "place-active") {
      const place = getLandmark(pin.id)
      if (!place) return
      setCompanionId(null)
      setLandmarkId(place.id)
      setRegionId(place.regionId)
      setMapJump((n) => n + 1)
      setPane("map")
      return
    }
    chooseStage(pin.id)
  }

  function showPane(id: Pane) {
    setPane(id)
    if (id !== "map") setDetailOpen(false)
  }

  const crowdStage = crowdStageId ? getStage(crowdStageId) : undefined
  const crowd = crowdStage
    ? company
        .filter((pilgrim) => !pilgrim.self && pilgrim.stageId === crowdStage.id)
        .sort((a, b) => a.pseudonym.localeCompare(b.pseudonym))
    : []
  const reading = companion ? (
    <CompanionCard
      pilgrim={companion}
      now={now}
      onOpenPassage={() => {
        setCompanionId(null)
        setPane("map")
      }}
      onShowMine={showMine}
    />
  ) : crowdStage && crowd.length > 0 ? (
    <CrowdList stageTitle={crowdStage.title} people={crowd} now={now} onSelect={lookAtCompanion} />
  ) : (
    <ReadingCard
      selected={selected}
      selectedIndex={selectedIndex}
      currentId={progress.stageId}
      finished={progress.finished}
      landmark={landmark}
      pending={pending}
      note={notes[selected.id] ?? ""}
      arrivedAt={progress.updatedAt}
      now={now}
      onNote={onNote}
      onMarkRead={onMarkRead}
      onSetPlace={onSetPlace}
      onPrevious={() => {
        const prev = stages[selectedIndex - 1]
        if (prev) chooseStage(prev.id, { stayOnList: pane === "path" })
      }}
      onShowMine={showMine}
      onOpenLandmark={(id) => {
        const place = getLandmark(id)
        if (!place) return
        setCompanionId(null)
        setLandmarkId(place.id)
        setRegionId(place.regionId)
        setMapJump((n) => n + 1)
        setPane("map")
      }}
      confirmRestart={confirmRestart}
      setConfirmRestart={setConfirmRestart}
      onRestart={onRestart}
      quizScore={quizScore(selected.id)}
      quizTaken={quizTaken(selected.id)}
      cast={cast}
      speakers={speakers}
    />
  )

  return (
    <div className="desk flex h-dvh flex-col pt-[env(safe-area-inset-top)] text-[#f4ecdf]">
      <p className="sr-only" aria-live="polite">{live}</p>
      <RetreatCountdown now={now} />
      {quizStageId ? (
        <QuizDialog
          key={quizStageId}
          stageId={quizStageId}
          onClose={onQuizClose}
          onScored={onScored}
          onRecorded={(points) => {
            const stageId = quizStageId
            if (!stageId) return
            setRecordedQuizzes((current) => ({ ...current, [stageId]: points }))
          }}
        />
      ) : null}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen} modal={false} disablePointerDismissal>
        <DialogPortal>
          <DialogPopup className="top-auto right-0 bottom-0 left-0 max-h-[85dvh] w-full max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-t-2xl rounded-b-none p-0 pb-[env(safe-area-inset-bottom)]">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[#f4ecdf]/95 px-5 pt-4">
              <DialogTitle className="font-heading text-base text-[#8a6232]">
                {landmark?.name ?? companion?.pseudonym ?? (crowdStage ? `${crowd.length} at ${crowdStage.title}` : selected.title)}
              </DialogTitle>
              <DialogClose className="rounded-full px-3 py-1.5 text-sm text-[#8a6232]">Close</DialogClose>
            </div>
            {pane === "map" ? reading : null}
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="min-w-0">
            <p className="font-heading text-2xl leading-none">Waymark</p>
            <label className="mt-1 block min-w-0">
              <span className="sr-only">Plate</span>
              <select
                value={regionId}
                onChange={(event) => {
                  openRegion(event.target.value as RegionId)
                  setDetailOpen(false)
                }}
                className="max-w-full truncate bg-transparent text-xs text-[#f4ecdf]/80 outline-none [color-scheme:dark]"
              >
                {regions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.plate} · {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/journal/reference"
            aria-label="Reference"
            className="grid size-11 place-items-center rounded-full hover:bg-white/10"
          >
            <BookOpen className="size-5" />
          </Link>
          <ProfileMenu
            name={name}
            checkins={checkins}
            now={now}
            userId={company.find((pilgrim) => pilgrim.self)?.id ?? ""}
            portraitAt={company.find((pilgrim) => pilgrim.self)?.portraitAt ?? null}
            onPortrait={onPortrait}
            score={score}
            rank={myRank}
            givenName={givenName}
            admin={admin}
          />
        </div>
      </header>

      {notice ? (
        <p className="flex shrink-0 items-start justify-between gap-3 bg-[#3d3328] px-4 py-3 text-sm text-[#f4ecdf]">
          <span>{notice}</span>
          <button type="button" className="shrink-0 text-[#c6a15a]" onClick={() => setNotice(null)}>
            Close
          </button>
        </p>
      ) : null}

      <div className="min-h-0 flex-1">
        {pane === "map" ? (
          <MapView
            regionId={regionId}
            jump={mapJump}
            pins={pins}
            focus={focus}
            home={home}
            showPlaces={showPlaces}
            onVisibleRegion={onVisibleRegion}
            onTogglePlaces={() => setShowPlaces((value) => !value)}
            onSelect={onSelectPin}
            onBackground={() => setDetailOpen(false)}
            elsewhere={elsewhere}
          />
        ) : pane === "badges" ? (
          <div className="h-full overflow-y-auto bg-[#ead9b8]">
            <BadgeBook
              progress={progress}
              awards={awards}
              plates={stagePlates}
              onOpen={(id) => {
                chooseStage(id)
                setDetailOpen(true)
              }}
            />
          </div>
        ) : pane === "schedule" ? (
          <div className="h-full overflow-y-auto bg-[#ead9b8]">
            <RetreatSchedule
              done={doneMissions}
              pendingId={uploadingId}
              photos={Object.fromEntries(
                [...doneMissions].map((id) => [
                  id,
                  missionPhotoSrc(
                    id,
                    photoStamps[id] ??
                      awards.find((award) => award.kind === "mission" && award.stageId === id)?.createdAt,
                  ),
                ]),
              )}
              onUpload={onUploadMission}
            />
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            {pane === "notes" ? (
              <NotesList
                notes={notes}
                onOpen={(id) => {
                  chooseStage(id)
                  setDetailOpen(true)
                }}
              />
            ) : pane === "company" ? (
              <CompanyList
                company={company}
                now={now}
                selectedId={companionId}
                onSelect={(id) => {
                  const person = company.find((pilgrim) => pilgrim.id === id)
                  if (!person || person.self) {
                    showMine()
                    return
                  }
                  lookAtCompanion(id)
                }}
              />
            ) : (
              <div className="mx-auto max-w-xl">
                <StageList
                  progress={progress}
                  selectedId={selected.id}
                  regionId={landmark?.regionId ?? selected.regionId}
                  onSelect={(id) => chooseStage(id, { stayOnList: true })}
                  onCity={(id) => onCity(id, { stayOnList: true })}
                />
                <div className="border-t border-[#241c14]/10 bg-[#f4ecdf] text-[#241c14]">
                  {pane === "path" ? reading : null}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <nav
        className="grid shrink-0 grid-cols-4 border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
        aria-label="Journal"
      >
        {(
          [
            ["map", "Map"],
            ["company", "Leaderboard"],
            ["badges", "Badges"],
            ["schedule", "Schedule"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`relative px-0.5 py-4 text-[13px] whitespace-nowrap ${pane === id ? "text-[#c6a15a]" : "text-[#f4ecdf]/70"}`}
            onClick={() => showPane(id)}
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  )
}

function emptySubscribe() {
  return () => {}
}

function RetreatCountdown({ now }: { now: Date }) {
  const stamp = now.getTime()
  const label = useSyncExternalStore(
    emptySubscribe,
    () => retreatCountdown(localDay(new Date(stamp))) ?? "",
    () => null,
  )
  if (label === "") return null
  const count = label ?? "CM Retreat"
  return (
    <p className="flex shrink-0 items-baseline justify-center gap-2 border-b border-white/10 px-4 py-1.5">
      <span className="font-heading text-lg leading-none text-[#c6a15a]">{count}</span>
      {label ? <span className="text-xs text-[#f4ecdf]/70">CM Retreat</span> : null}
    </p>
  )
}

function pinsForPlate({
  progress,
  selectedStageId,
  landmarkId,
  companionId,
  company,
  showPlaces,
}: {
  progress: Progress
  selectedStageId: string
  landmarkId: string | null
  companionId: string | null
  company: Pilgrim[]
  showPlaces: boolean
}): MapPin[] {
  const currentIndex = stageIndex(progress.stageId)
  const pins: MapPin[] = []
  for (const region of regions) pins.push(...pinsOnPlate(region.id))
  return pins

  function pinsOnPlate(regionId: RegionId): MapPin[] {
    const platePins: MapPin[] = []
    for (const stage of stagesInRegion(regionId)) {
      const index = stageIndex(stage.id)
      const isCurrent = stage.id === progress.stageId
      const done = progress.finished ? index <= currentIndex : index < currentIndex
      const passage = `Passage ${index + 1} of ${stages.length}`
      if (isCurrent) {
        platePins.push({
          id: stage.id,
          x: stage.x,
          y: stage.y,
          regionId,
          kind: "current",
          label: stage.title,
          kicker: progress.finished ? "Journey complete" : "You are here",
          aria: `${stage.title}, ${passage}, you are here`,
        })
      } else if (stage.id === selectedStageId && !landmarkId && !companionId) {
        platePins.push({
          id: stage.id,
          x: stage.x,
          y: stage.y,
          regionId,
          kind: "viewing",
          label: stage.title,
          kicker: "Viewing",
          aria: `${stage.title}, ${passage}`,
        })
      } else {
        platePins.push({
          id: stage.id,
          x: stage.x,
          y: stage.y,
          regionId,
          kind: done ? "done" : "ahead",
          aria: `${stage.title}, ${passage}, ${done ? "already read" : "still ahead"}`,
        })
      }
    }
    for (const place of landmarksInRegion(regionId)) {
      const active = place.id === landmarkId
      if (!showPlaces && !active) continue
      platePins.push({
        id: place.id,
        x: place.x,
        y: place.y,
        regionId,
        kind: active ? "place-active" : "place",
        label: active ? place.name : undefined,
        kicker: active ? "On this plate" : undefined,
        aria: place.name,
      })
    }
    for (const stage of stagesInRegion(regionId)) {
      const present = company
        .filter((pilgrim) => !pilgrim.self && pilgrim.stageId === stage.id)
        .sort((a, b) => a.pseudonym.localeCompare(b.pseudonym))
      if (present.length === 0) continue
      const faces = mapFaces(present, companionId)
      const markers = [
        ...faces.shown.map((pilgrim) => ({ id: pilgrim.id, self: false as const })),
        ...(faces.extra.length > 0 ? [{ id: `crowd:${stage.id}`, self: false as const }] : []),
      ]
      const placed = layoutCompanions(
        [
          ...(stage.id === progress.stageId ? [{ id: "self", self: true as const }] : []),
          ...markers,
        ],
        stage.x,
        stage.y,
      )
      const named = markers.length <= 3
      for (const spot of placed) {
        if (spot.id.startsWith("crowd:")) {
          platePins.push({
            id: spot.id,
            x: spot.x,
            y: spot.y,
            regionId,
            kind: "companion-more",
            label: `+${faces.extra.length}`,
            aria: `${faces.extra.length} more readers at ${stage.title}`,
          })
          continue
        }
        const pilgrim = present.find((person) => person.id === spot.id)
        if (!pilgrim) continue
        const active = pilgrim.id === companionId
        platePins.push({
          id: pilgrim.id,
          x: spot.x,
          y: spot.y,
          regionId,
          kind: active ? "companion-active" : "companion",
          label: pilgrim.pseudonym,
          named,
          color: pilgrimColor(pilgrim.id),
          image: portraitSrc(pilgrim.id, pilgrim.portraitAt) ?? undefined,
          aria: `${pilgrim.pseudonym} is reading ${stage.title}`,
        })
      }
    }
    return platePins
  }
}

function StageList({
  progress,
  selectedId,
  regionId,
  onSelect,
  onCity,
}: {
  progress: Progress
  selectedId: string
  regionId: RegionId
  onSelect: (id: string) => void
  onCity: (id: RegionId) => void
}) {
  const currentIndex = stageIndex(progress.stageId)
  const percent = progressPercent(currentIndex, progress.finished)
  const stops = stagesInRegion(regionId)
  const placeId = stops.some((stage) => stage.id === selectedId) ? selectedId : (stops[0]?.id ?? "")
  return (
    <div className="pb-6">
      <div className="px-5 py-5">
        <div className="flex items-baseline justify-between gap-3 text-sm text-[#f4ecdf]/70">
          <span>{progress.finished ? "Every passage read" : `Reading ${currentIndex + 1} of ${stages.length}`}</span>
          <span>{percent}%</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[#c6a15a]" style={{ width: `${percent}%` }} />
        </div>
      </div>
      <div className="space-y-4 bg-[#1a1410]/95 px-5 pb-5">
        <CitySelect regionId={regionId} onCity={onCity} />
        <label className="block">
          <span className="mb-1 block text-[11px] tracking-[0.16em] text-[#c6a15a] uppercase">Place</span>
          <select
            value={placeId}
            onChange={(event) => onSelect(event.target.value)}
            className="h-12 w-full rounded-md border border-white/15 bg-[#241c14] px-3 text-base text-[#f4ecdf]"
          >
            {stops.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stageIndex(stage.id) + 1}. {stage.title}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}

function NotesList({
  notes,
  onOpen,
}: {
  notes: Record<string, string>
  onOpen: (id: string) => void
}) {
  const entries = stages.filter((stage) => notes[stage.id]?.trim())
  if (entries.length === 0) {
    return (
      <div className="px-5 py-8">
        <h2 className="font-heading text-3xl">Nothing written yet</h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#f4ecdf]/70">
          Notes you keep on a passage gather here, in the order of the road.
        </p>
      </div>
    )
  }
  return (
    <ul className="divide-y divide-white/10">
      {entries.map((stage) => (
        <li key={stage.id}>
          <button type="button" onClick={() => onOpen(stage.id)} className="block w-full px-5 py-4 text-left hover:bg-white/5">
            <p className="text-[11px] tracking-[0.14em] text-[#c6a15a] uppercase">
              {getRegion(stage.regionId).name}
            </p>
            <p className="mt-1 font-heading text-xl">{stage.title}</p>
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-[#f4ecdf]/80">
              {notes[stage.id]}
            </p>
          </button>
        </li>
      ))}
    </ul>
  )
}

function ReadingCard({
  selected,
  selectedIndex,
  currentId,
  finished,
  landmark,
  pending,
  note,
  arrivedAt,
  now,
  onNote,
  onMarkRead,
  onSetPlace,
  onPrevious,
  onShowMine,
  onOpenLandmark,
  confirmRestart,
  setConfirmRestart,
  onRestart,
  quizScore,
  quizTaken,
  cast,
  speakers,
}: {
  selected: (typeof stages)[number]
  selectedIndex: number
  currentId: string
  finished: boolean
  landmark: ReturnType<typeof getLandmark>
  pending: boolean
  note: string
  arrivedAt: string
  now: Date
  onNote: (stageId: string, body: string) => void
  onMarkRead: () => void
  onSetPlace: () => void
  onPrevious: () => void
  onShowMine: () => void
  onOpenLandmark: (id: string) => void
  confirmRestart: boolean
  setConfirmRestart: (value: boolean) => void
  onRestart: () => void
  quizScore: number
  quizTaken: boolean
  cast: Cast
  speakers: Record<string, string>
}) {
  if (landmark) {
    return (
      <div className="space-y-4 px-5 py-5">
        <h2 className="font-heading text-3xl leading-tight">{landmark.name}</h2>
        <p>
          <Link href={`/journal/reference/places/${landmark.id}`} className="text-xs text-[#8a6232] underline-offset-2 hover:underline">
            About this place
          </Link>
        </p>
        <p className="font-serif text-base leading-7">{landmark.note}</p>
        <Button type="button" variant="outline" className="h-12" onClick={onShowMine}>
          Back to my passage
        </Button>
      </div>
    )
  }

  const here = selected.id === currentId
  const ahead = selectedIndex > stageIndex(currentId)

  return (
    <div className="space-y-4 px-5 py-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[11px] tracking-[0.16em] text-[#8a6232] uppercase">
          {selectedIndex + 1} of {stages.length}
        </p>
        {!here ? (
          <button type="button" onClick={onShowMine} className="text-xs text-[#8a6232] underline-offset-2 hover:underline">
            Back to where I am
          </button>
        ) : null}
      </div>
      <h2 className="font-heading text-3xl leading-tight">{selected.title}</h2>
      <CastRow stageId={selected.id} cast={cast} ink />
      <p>
        <Link href={`/journal/reference/places/${selected.id}`} className="text-xs text-[#8a6232] underline-offset-2 hover:underline">
          About this place
        </Link>
      </p>
      {here ? (
        <p className="text-xs text-[#6a5b48]">
          {stayPhrase("You", selected.title, finished, arrivedAt, now, true)}
        </p>
      ) : null}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-12"
          disabled={selectedIndex === 0}
          onClick={onPrevious}
        >
          Previous
        </Button>
        {here && finished ? (
          <Button type="button" variant="outline" className="h-12 flex-1" onClick={() => setConfirmRestart(true)}>
            Begin again
          </Button>
        ) : here ? (
          <Button type="button" className="h-12 flex-1" disabled={pending} onClick={onMarkRead}>
            {pending ? "Saving…" : "I’ve read this passage"}
          </Button>
        ) : (
          <Button type="button" className="h-12 flex-1" disabled={pending} onClick={onSetPlace}>
            {pending ? "Saving…" : "Set my place here"}
          </Button>
        )}
      </div>
      {!here && ahead ? (
        <p className="text-xs text-[#6a5b48]">Passages before this one will count as read.</p>
      ) : null}
      {here && finished ? (
        <p className="text-sm leading-relaxed">
          Part I is finished. Christian is through the gate, and the dream ends. Your notes stay if you begin again.
        </p>
      ) : null}
      {confirmRestart && here && finished ? (
        <RestartControl
          confirmRestart={confirmRestart}
          setConfirmRestart={setConfirmRestart}
          onRestart={onRestart}
          ink
        />
      ) : null}
      <CharacterNotes stageId={selected.id} speakers={speakers} />
      <p className="text-sm leading-relaxed text-[#5c4e3d]">
        <span className="font-medium text-[#241c14]">In the book. </span>
        {selected.readCue}
      </p>
      <p className="font-serif text-base leading-7">{selected.synopsis}</p>
      {selected.quote ? (
        <blockquote className="border-l-2 border-[#c6a15a] pl-3 font-serif text-[15px] leading-relaxed text-[#3d3328] italic">
          “{selected.quote}”
        </blockquote>
      ) : null}
      {selected.related && selected.related.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {selected.related.map((id) => {
            const place = getLandmark(id)
            if (!place) return null
            return (
              <button
                key={id}
                type="button"
                onClick={() => onOpenLandmark(id)}
                className="rounded-full bg-[#e7dcc6] px-2.5 py-1 text-xs text-[#241c14]"
              >
                {place.name}
              </button>
            )
          })}
        </div>
      ) : null}

      <PlaceChallenges
        key={`challenges-${selected.id}`}
        stageId={selected.id}
        reached={hasReached(currentId, finished, selected.id)}
        quizScore={quizScore}
        taken={quizTaken}
      />

      <NoteField key={`note-${selected.id}`} stageId={selected.id} initial={note} onChange={onNote} />
    </div>
  )
}

function CitySelect({
  regionId,
  onCity,
  ink,
}: {
  regionId: RegionId
  onCity: (id: RegionId) => void
  ink?: boolean
}) {
  return (
    <label className="block">
      <span className={`mb-1 block text-[11px] tracking-[0.16em] uppercase ${ink ? "text-[#8a6232]" : "text-[#c6a15a]"}`}>
        City
      </span>
      <select
        value={regionId}
        onChange={(event) => onCity(event.target.value as RegionId)}
        className={
          ink
            ? "h-12 w-full rounded-md border border-[#241c14]/15 bg-[#f7f1e4] px-3 text-base text-[#241c14]"
            : "h-12 w-full rounded-md border border-white/15 bg-[#241c14] px-3 text-base text-[#f4ecdf]"
        }
      >
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.plate} · {region.name}
          </option>
        ))}
      </select>
    </label>
  )
}

function CastRow({ stageId, cast, ink }: { stageId: string; cast: Cast; ink?: boolean }) {
  const people = cast[stageId] ?? []
  if (people.length === 0) return null
  return (
    <ul
      className={`flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${ink ? "" : "pr-4 pb-3 pl-[3.25rem]"}`}
      aria-label="People at this place"
    >
      {people.map((person) => (
        <li key={person.id} className={ink ? "w-[4.75rem] shrink-0" : "w-14 shrink-0"}>
          <Link href={`/journal/reference/people/${person.id}`} className="block text-center">
            <span
              className={`mx-auto block overflow-hidden rounded-full border ${
                ink ? "size-16 border-[#241c14]/15" : "size-10 border-white/20"
              }`}
            >
              {person.portrait ? (
                <Image src={person.portrait} alt="" width={80} height={80} className="size-full object-cover" />
              ) : (
                <CharacterPortrait plate={person.plate} label={person.name} />
              )}
            </span>
            <span className={`mt-1.5 line-clamp-2 text-xs leading-tight ${ink ? "text-[#241c14]" : "text-[#f4ecdf]/80"}`}>
              {person.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

function NoteField({
  stageId,
  initial,
  onChange,
}: {
  stageId: string
  initial: string
  onChange: (stageId: string, body: string) => void
}) {
  const [value, setValue] = useState(initial)
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const saved = useRef(initial)

  useEffect(() => {
    if (value === saved.current) return
    setStatus("saving")
    const handle = window.setTimeout(async () => {
      const snapshot = value
      try {
        await saveNoteAction(stageId, snapshot)
        saved.current = snapshot
        onChange(stageId, snapshot)
        setStatus("saved")
      } catch (error) {
        unstable_rethrow(error)
        setStatus("error")
      }
    }, 450)
    return () => window.clearTimeout(handle)
  }, [onChange, stageId, value])

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between">
        <label htmlFor="passage-note" className="text-sm font-medium">
          Note
          <span className="ml-2 text-[11px] font-normal text-[#6a5b48]">Only you</span>
        </label>
        <span className="text-[11px] text-[#6a5b48]">
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved" : status === "error" ? "Couldn’t save" : ""}
        </span>
      </div>
      <Textarea
        id="passage-note"
        value={value}
        maxLength={4000}
        onChange={(event) => setValue(event.target.value)}
        placeholder="What stayed with you in this passage?"
        className="min-h-20 bg-[#f7f1e4] text-base"
      />
    </div>
  )
}

function RestartControl({
  confirmRestart,
  setConfirmRestart,
  onRestart,
  ink = false,
}: {
  confirmRestart: boolean
  setConfirmRestart: (value: boolean) => void
  onRestart: () => void
  ink?: boolean
}) {
  if (!confirmRestart) {
    return (
      <button
        type="button"
        onClick={() => setConfirmRestart(true)}
        className={`mt-3 text-xs underline-offset-2 hover:underline ${ink ? "text-[#8a6232]" : "text-[#f4ecdf]/70"}`}
      >
        Begin again from the city
      </button>
    )
  }
  return (
    <div className={`mt-3 rounded-lg p-3 text-sm ${ink ? "bg-[#e7dcc6]" : "bg-white/10"}`}>
      <p>This returns the pin to the City of Destruction. Notes stay where you wrote them.</p>
      <div className="mt-2 flex gap-2">
        <Button type="button" className="h-9" onClick={onRestart}>
          Begin again
        </Button>
        <Button type="button" variant="outline" className="h-9" onClick={() => setConfirmRestart(false)}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

function CompanyList({
  company,
  now,
  selectedId,
  onSelect,
}: {
  company: Pilgrim[]
  now: Date
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const others = company.filter((pilgrim) => !pilgrim.self)
  const board = leaderboard(company)
  return (
    <div className="pb-8">
      <div className="px-4 py-4">
        <h2 className="font-heading text-3xl">Leaderboard</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#f4ecdf]/70">
          {others.length === 0
            ? "You are the only one on the road. When someone else signs in, they join this board under the name they chose."
            : "Ranked by points, including retreat missions. Tied scores share a place. Email and notes stay private."}
        </p>
      </div>
      <ol>
        {board.map(({ person: pilgrim, rank }) => {
          const stage = getStage(pilgrim.stageId)
          if (!stage) return null
          const selected = pilgrim.id === selectedId
          return (
            <li key={pilgrim.id}>
              <button
                type="button"
                onClick={() => onSelect(pilgrim.id)}
                className={`flex w-full items-center gap-3 px-5 py-4 text-left ${
                  selected ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <span
                  className={`w-8 shrink-0 text-sm tabular-nums ${rank === 1 ? "text-[#c6a15a]" : "text-[#f4ecdf]/55"}`}
                >
                  {ordinal(rank)}
                </span>
                <ReaderFace
                  name={pilgrim.pseudonym}
                  color={pilgrim.self ? "#9a3b32" : pilgrimColor(pilgrim.id)}
                  image={portraitSrc(pilgrim.id, pilgrim.portraitAt)}
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm">
                    {pilgrim.pseudonym}
                    {pilgrim.self ? <span className="text-[#c6a15a]"> · You</span> : null}
                  </span>
                  <span className="block truncate text-xs text-[#f4ecdf]/65">
                    {stayShort(stage.title, pilgrim.finished, pilgrim.arrivedAt, now)}
                    {" · "}
                    {pilgrim.points} pts
                    {" · "}
                    {getRegion(stage.regionId).short}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function CrowdList({
  stageTitle,
  people,
  now,
  onSelect,
}: {
  stageTitle: string
  people: Pilgrim[]
  now: Date
  onSelect: (id: string) => void
}) {
  return (
    <div className="px-5 py-4">
      <p className="text-sm leading-relaxed text-[#5c4e3d]">
        {people.length} readers are at {stageTitle}. Tap one to see them on the map.
      </p>
      <ul className="mt-3 divide-y divide-[#241c14]/10">
        {people.map((pilgrim) => {
          const stage = getStage(pilgrim.stageId)
          return (
            <li key={pilgrim.id}>
              <button type="button" onClick={() => onSelect(pilgrim.id)} className="flex w-full items-center gap-3 py-3 text-left">
                <ReaderFace
                  name={pilgrim.pseudonym}
                  color={pilgrimColor(pilgrim.id)}
                  image={portraitSrc(pilgrim.id, pilgrim.portraitAt)}
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm">{pilgrim.pseudonym}</span>
                  <span className="block truncate text-xs text-[#6a5b48]">
                    {stage ? stayShort(stage.title, pilgrim.finished, pilgrim.arrivedAt, now) : stageTitle}
                    {" · "}
                    {pilgrim.points} pts
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function CompanionCard({
  pilgrim,
  now,
  onOpenPassage,
  onShowMine,
}: {
  pilgrim: Pilgrim
  now: Date
  onOpenPassage: () => void
  onShowMine: () => void
}) {
  const stage = getStage(pilgrim.stageId) ?? stages[0]
  const region = getRegion(stage.regionId)
  return (
    <div className="space-y-4 px-5 py-5">
      <p className="text-xs tracking-[0.16em] text-[#8a6232] uppercase">
        On the road · {region.short}
      </p>
      <div className="flex items-center gap-3">
        <ReaderFace
          name={pilgrim.pseudonym}
          color={pilgrimColor(pilgrim.id)}
          image={portraitSrc(pilgrim.id, pilgrim.portraitAt)}
          large
        />
        <h2 className="font-heading text-3xl leading-none">{pilgrim.pseudonym}</h2>
      </div>
      <p className="font-serif text-[15px] leading-relaxed">
        {stayPhrase(pilgrim.pseudonym, stage.title, pilgrim.finished, pilgrim.arrivedAt, now)}
      </p>
      <p className="text-sm text-[#5c4e3d]">{pilgrim.points} points on the road.</p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" className="h-12" onClick={onOpenPassage}>
          Open this passage
        </Button>
        <Button type="button" variant="outline" className="h-12" onClick={onShowMine}>
          Back to my passage
        </Button>
      </div>
      <p className="text-xs leading-relaxed text-[#6a5b48]">Notes and email stay private.</p>
    </div>
  )
}

function readPilgrims(value: unknown): Pilgrim[] | null {
  if (!value || typeof value !== "object") return null
  const list = (value as { pilgrims?: unknown }).pilgrims
  if (!Array.isArray(list)) return null
  const pilgrims: Pilgrim[] = []
  for (const item of list) {
    if (!item || typeof item !== "object") return null
    const row = item as Record<string, unknown>
    if (
      typeof row.id !== "string" ||
      typeof row.pseudonym !== "string" ||
      typeof row.stageId !== "string" ||
      typeof row.finished !== "boolean" ||
      typeof row.self !== "boolean" ||
      typeof row.arrivedAt !== "string"
    ) {
      return null
    }
    if (!getStage(row.stageId)) continue
    pilgrims.push({
      id: row.id,
      pseudonym: row.pseudonym,
      stageId: row.stageId,
      finished: row.finished,
      self: row.self,
      arrivedAt: row.arrivedAt,
      portraitAt: typeof row.portraitAt === "string" && row.portraitAt.length > 0 ? row.portraitAt : null,
      points: typeof row.points === "number" && Number.isFinite(row.points) ? row.points : 0,
    })
  }
  return pilgrims
}

function sameCompany(left: Pilgrim[], right: Pilgrim[]) {
  if (left.length !== right.length) return false
  return left.every((pilgrim, index) => {
    const other = right[index]
    return (
      !!other &&
      pilgrim.id === other.id &&
      pilgrim.pseudonym === other.pseudonym &&
      pilgrim.stageId === other.stageId &&
      pilgrim.finished === other.finished &&
      pilgrim.self === other.self &&
      pilgrim.arrivedAt === other.arrivedAt &&
      pilgrim.portraitAt === other.portraitAt &&
      pilgrim.points === other.points
    )
  })
}

function ReaderFace({
  name,
  color,
  image,
  large,
}: {
  name: string
  color: string
  image: string | null
  large?: boolean
}) {
  const initial = name.trim().charAt(0).toUpperCase() || "?"
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-full text-xs font-semibold text-white ${
        large ? "size-12 text-base" : "mt-0.5 size-7"
      }`}
      style={{ backgroundColor: color }}
    >
      <FaceImage key={image ?? ""} image={image} initial={initial} />
    </span>
  )
}

function FaceImage({ image, initial }: { image: string | null; initial: string }) {
  const [failed, setFailed] = useState(false)
  if (!image || failed) return initial
  return (
    // Session-gated portrait; next/image cannot send the cookie.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={image} alt="" className="size-full object-cover" onError={() => setFailed(true)} />
  )
}
