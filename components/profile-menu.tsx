"use client"

import Link from "next/link"
import { unstable_rethrow } from "next/navigation"
import { useActionState, useEffect, useRef, useState, useSyncExternalStore, useTransition, type ChangeEvent } from "react"
import { logout, updateGivenName, updatePseudonym, type PseudonymState } from "@/app/actions/auth"
import { checkIn } from "@/app/actions/checkin"
import { clearPortrait, setPortrait } from "@/app/actions/portrait"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { localDay, recentDays, streakEnding } from "@/lib/checkin"
import { ordinal } from "@/lib/score"
import { portraitSrc } from "@/lib/portrait"

export function ProfileMenu({
  name,
  checkins,
  now,
  userId,
  portraitAt,
  onPortrait,
  score,
  rank,
  givenName,
  admin,
}: {
  name: string
  checkins: string[]
  now: Date
  userId: string
  portraitAt: string | null
  onPortrait: (portraitAt: string | null) => void
  score: number
  rank: number
  givenName: string | null
  admin: boolean
}) {
  const [open, setOpen] = useState(false)
  const [days, setDays] = useState(checkins)
  const [checkError, setCheckError] = useState("")
  const [pending, startTransition] = useTransition()
  const today = useLocalDay(now)
  const checked = today !== null && days.includes(today)
  const run = today ? streakEnding(days, today) : 0
  const week = today ? recentDays(today) : []
  const initial = name.trim().charAt(0).toUpperCase() || "?"
  const picture = portraitSrc(userId, portraitAt)

  function onCheckIn() {
    if (pending || checked || !today) return
    setCheckError("")
    const previous = days
    setDays((current) => (current.includes(today) ? current : [...current, today]))
    startTransition(async () => {
      try {
        const result = await checkIn(today)
        if (result.error) {
          setDays(previous)
          setCheckError(result.error)
        }
      } catch (error) {
        unstable_rethrow(error)
        setDays(previous)
        setCheckError("The check-in could not be saved.")
      }
    })
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="profile-panel"
        onClick={() => setOpen((value) => !value)}
        className={`grid size-11 place-items-center overflow-hidden rounded-full text-sm font-medium ${
          picture
            ? "bg-[#1a1410] text-[#f4ecdf]"
            : checked
              ? "bg-[#c6a15a] text-[#1a1410]"
              : "bg-white/10 text-[#f4ecdf] hover:bg-white/15"
        } ${checked ? "ring-2 ring-[#c6a15a]" : ""}`}
      >
        {picture ? (
          <HeaderPhoto key={picture} src={picture} initial={initial} />
        ) : (
          <span aria-hidden="true">{initial}</span>
        )}
        <span className="sr-only">Profile{checked ? ", checked in today" : ""}</span>
      </button>
      {open ? (
        <div className="fixed inset-0 z-[70]">
          <button type="button" aria-label="Close profile" className="absolute inset-0 bg-[#1a1410]/45" onClick={() => setOpen(false)} />
          <div
            id="profile-panel"
            role="dialog"
            aria-label="Profile"
            className="absolute inset-x-0 bottom-0 max-h-[min(40rem,calc(100dvh-env(safe-area-inset-top)-4.5rem))] overflow-y-auto overscroll-contain rounded-t-2xl bg-[#f7f1e4] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-left text-[#241c14] shadow-xl"
          >
          <div className="sticky top-0 z-10 -mx-5 mb-1 border-b border-[#241c14]/10 bg-[#f7f1e4] px-5 pt-3 pb-3">
            <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-[#241c14]/20" aria-hidden="true" />
            <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate font-heading text-2xl leading-none">{name}</p>
              <p className="mt-1 font-heading text-3xl leading-none">
                {score} pts
                {rank ? <span className="ml-2 font-sans text-sm font-normal text-[#5c4e3d]">{ordinal(rank)}</span> : null}
              </p>
              <p className="mt-1 text-sm text-[#5c4e3d]">On the map under this name. Other readers do not see your email.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="shrink-0 rounded-full px-3 py-2 text-sm text-[#8a6232]"
            >
              Close
            </button>
            </div>
          </div>

          {admin ? (
            <p className="mt-4">
              <Link href="/journal/admin" className="text-sm font-medium text-[#8a6232]">
                Admin
              </Link>
            </p>
          ) : null}

          <section className="mt-4 border-t border-[#241c14]/10 pt-3" aria-label="Daily check-in">
            <h2 className="text-sm font-medium">Daily check-in</h2>
            <p className="mt-1 text-xs leading-relaxed text-[#5c4e3d]">
              Mark that you sat down with the book today. It does not move your pin.
            </p>
            <p className="mt-2 font-heading text-3xl leading-none">
              {run}
              <span className="ml-2 font-sans text-sm font-normal text-[#5c4e3d]">
                {run === 1 ? "day in a row" : "days in a row"}
              </span>
            </p>
            {!checked && run > 0 ? (
              <p className="mt-1 text-xs text-[#8a6232]">Check in to keep the run going.</p>
            ) : null}
            <ol className="mt-3 grid grid-cols-7 gap-1">
              {week.map((day) => {
                const marked = days.includes(day)
                const [year, month, date] = day.split("-").map(Number)
                const label = new Date(year, (month || 1) - 1, date || 1).toLocaleDateString("en-US", {
                  weekday: "narrow",
                })
                return (
                  <li key={day} className="text-center">
                    <span className="block text-[10px] text-[#6a5b48]">{label}</span>
                    <span
                      className={`mx-auto mt-1 block size-6 rounded-full ${
                        marked ? "bg-[#8f3a32]" : "bg-[#e7dcc6]"
                      }`}
                    >
                      <span className="sr-only">{marked ? `${day} checked in` : `${day} not checked in`}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
            <Button type="button" className="mt-3 h-12 w-full" disabled={pending || checked} onClick={onCheckIn}>
              {checked ? "Checked in today" : pending ? "Saving…" : "Check in"}
            </Button>
            {checkError ? (
              <p role="alert" className="mt-2 text-sm text-[#7d2e28]">
                {checkError}
              </p>
            ) : null}
          </section>

          <PictureForm
            initial={initial}
            picture={picture}
            onPortrait={onPortrait}
          />

          <GivenNameForm givenName={givenName} />
          <NameForm name={name} />

          <form action={logout} className="mt-4 border-t border-[#241c14]/10 pt-3">
            <Button
              type="submit"
              variant="outline"
              className="h-12 w-full"
            >
              Sign out
            </Button>
          </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function emptySubscribe() {
  return () => {}
}

/** The calendar day in the browser. Null during server render so the markup matches. */
function useLocalDay(now: Date) {
  const stamp = now.getTime()
  return useSyncExternalStore(
    emptySubscribe,
    () => localDay(new Date(stamp)),
    () => null,
  )
}

function PictureForm({
  initial,
  picture,
  onPortrait,
}: {
  initial: string
  picture: string | null
  onPortrait: (portraitAt: string | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const previewRef = useRef<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()
  const shown = preview ?? picture

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    }
  }, [])

  function replacePreview(url: string | null) {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current)
    previewRef.current = url
    setPreview(url)
  }

  function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file || pending) return
    if (!file.type.startsWith("image/")) {
      setError("Choose an image.")
      return
    }
    if (file.size > 8_000_000) {
      setError("Use a picture under 8 MB.")
      return
    }
    setError("")
    startTransition(async () => {
      try {
        const blob = await cropSquareJpeg(file)
        replacePreview(URL.createObjectURL(blob))
        const data = new FormData()
        data.set("portrait", new File([blob], "portrait.jpg", { type: "image/jpeg" }))
        const result = await setPortrait(data)
        if (result.error || !result.portraitAt) {
          replacePreview(null)
          setError(result.error ?? "The picture could not be saved.")
          return
        }
        onPortrait(result.portraitAt)
        replacePreview(null)
      } catch (caught) {
        unstable_rethrow(caught)
        replacePreview(null)
        setError("The picture could not be saved.")
      }
    })
  }

  function onRemove() {
    if (pending || !picture) return
    setError("")
    startTransition(async () => {
      try {
        await clearPortrait()
        replacePreview(null)
        onPortrait(null)
      } catch (caught) {
        unstable_rethrow(caught)
        setError("The picture could not be removed.")
      }
    })
  }

  return (
    <section className="mt-4 border-t border-[#241c14]/10 pt-3" aria-label="Profile picture">
      <h2 className="text-sm font-medium">Picture</h2>
      <p className="mt-1 text-xs leading-relaxed text-[#5c4e3d]">
        Other readers see this on your pin. Your email stays private.
      </p>
      <div className="mt-3 flex items-center gap-3">
        <span className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[#8f3a32] text-lg font-medium text-white">
          {shown ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shown} alt="" className="size-full object-cover" />
          ) : (
            initial
          )}
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFile}
          />
          <Button type="button" className="h-12" disabled={pending} onClick={() => inputRef.current?.click()}>
            {pending ? "Saving…" : picture ? "Change picture" : "Add picture"}
          </Button>
          {picture ? (
            <Button type="button" variant="outline" className="h-12" disabled={pending} onClick={onRemove}>
              Remove
            </Button>
          ) : null}
        </div>
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-[#7d2e28]">
          {error}
        </p>
      ) : null}
    </section>
  )
}

async function cropSquareJpeg(file: File) {
  const bitmap = await createImageBitmap(file)
  const size = 256
  const side = Math.min(bitmap.width, bitmap.height)
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext("2d")
  if (!context) {
    bitmap.close()
    throw new Error("canvas")
  }
  context.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    size,
    size,
  )
  bitmap.close()
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85))
  if (!blob) throw new Error("blob")
  if (blob.size <= 300_000) return blob
  const smaller = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.6))
  if (!smaller || smaller.size > 300_000) throw new Error("large")
  return smaller
}

function HeaderPhoto({ src, initial }: { src: string; initial: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <span aria-hidden="true">{initial}</span>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className="size-full object-cover" onError={() => setFailed(true)} />
  )
}

function GivenNameForm({ givenName }: { givenName: string | null }) {
  const [state, formAction, pending] = useActionState(
    updateGivenName,
    undefined as PseudonymState | undefined,
  )
  return (
    <form action={formAction} className="mt-4 border-t border-[#241c14]/10 pt-3">
      <label htmlFor="given-name" className="text-sm font-medium">
        Your name
      </label>
      <p className="mt-1 text-xs leading-relaxed text-[#5c4e3d]">
        Only an admin sees this. Other readers still see the map name.
      </p>
      <Input
        id="given-name"
        name="givenName"
        key={givenName ?? ""}
        defaultValue={givenName ?? ""}
        maxLength={60}
        autoComplete="name"
        required
        className="mt-2 h-12 bg-white text-base"
      />
      {state?.error ? (
        <p role="alert" className="mt-2 text-sm text-[#7d2e28]">
          {state.error}
        </p>
      ) : state?.saved ? (
        <p className="mt-2 text-sm text-[#8a6232]">Saved.</p>
      ) : null}
      <Button type="submit" disabled={pending} className="mt-2 h-12 w-full">
        {pending ? "Saving…" : "Save your name"}
      </Button>
    </form>
  )
}

function NameForm({ name }: { name: string }) {
  const [state, formAction, pending] = useActionState(
    updatePseudonym,
    undefined as PseudonymState | undefined,
  )
  return (
    <form action={formAction} className="mt-4 border-t border-[#241c14]/10 pt-3">
      <label htmlFor="map-name" className="text-sm font-medium">
        Name on the map
      </label>
      <Input
        id="map-name"
        name="name"
        key={name}
        defaultValue={name}
        maxLength={24}
        autoComplete="nickname"
        required
        className="mt-2 h-12 bg-white text-base"
      />
      {state?.error ? (
        <p role="alert" className="mt-2 text-sm text-[#7d2e28]">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="mt-2 h-12 w-full">
        {pending ? "Saving…" : "Save name"}
      </Button>
    </form>
  )
}
