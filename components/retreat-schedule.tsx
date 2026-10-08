"use client"

import { Camera, Check } from "lucide-react"
import { useRef, useState, type ChangeEvent } from "react"
import { missions, type Mission, type MissionWhen } from "@/lib/missions"

const days: { name: string; rows: [string, string][] }[] = [
  {
    name: "Friday",
    rows: [
      ["1:00 PM", "Wave 1 meets at church, loads vehicles"],
      ["1:30 PM", "Wave 1 departs (Wave 2 leaves at 3:00 PM)"],
      ["~4:30 PM", "Arrive at Cottonwood, set up camp together"],
      ["5:15 PM", ""],
      ["6:00 PM", "Dinner"],
      ["7:00 PM", "Praise & sermon"],
      ["9:00 PM", "Testimonies around the fire (late arrivals join)"],
      ["10:00 PM", "Fellowship under the stars (quiet hours, so keep it low-key)"],
      ["11:30 PM", "Lights out"],
    ],
  },
  {
    name: "Saturday",
    rows: [
      ["7:00 AM", "Wake up; optional sunrise walk and quiet time on the Cottonwood Spring trail"],
      ["7:45 AM", "Breakfast"],
      ["8:30 AM", "Celestial City Examination"],
      ["9:30 AM", "Q&A"],
      ["10:15 AM", "Small groups"],
      ["11:00 AM", "Closing prayer & goodbye"],
      ["11:15 AM", "Pack up, clean site"],
      ["12:00 PM", "Depart north through the park"],
      ["12:30 PM", "Quick stop at Cholla Cactus Garden"],
      ["1:15 PM", "Picnic lunch among the Joshua trees (Jumbo Rocks or Hidden Valley area)"],
      ["2:30 PM", "Exit through the West Entrance"],
      ["~4:30–5:00 PM", "Arrive back in Santa Ana"],
    ],
  },
]

const groups: { when: MissionWhen; title: string }[] = [
  { when: "before", title: "Before" },
  { when: "after", title: "After" },
]

export function RetreatSchedule({
  done,
  photos,
  pendingId,
  onUpload,
}: {
  done: ReadonlySet<string>
  photos: Record<string, string | null>
  pendingId: string | null
  onUpload: (id: string, photo: Blob) => void
}) {
  const earned = missions.filter((mission) => done.has(mission.id)).reduce((sum, mission) => sum + mission.points, 0)
  const possible = missions.reduce((sum, mission) => sum + mission.points, 0)
  return (
    <div className="bg-[#ead9b8] px-4 pt-5 pb-10 text-[#241c14]">
      <h1 className="font-heading text-3xl leading-none">Schedule</h1>
      <p className="mt-1.5 text-sm text-[#6b5340]">The retreat.</p>
      <section className="mt-5 rounded-md border border-[#241c14]/15 bg-[#f6edd8] px-4 pt-4 pb-2 shadow-[0_1px_0_rgba(36,28,20,0.06)]">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-heading text-2xl leading-none">Scavenger hunt</h2>
          <p className="font-heading shrink-0 text-lg text-[#8a6232]">
            {earned} of {possible}
          </p>
        </div>
        <p className="mt-1.5 text-sm text-[#6b5340]">
          Take the photo or selfie to finish each one. {missions[0]?.points ?? 0} points each, once, on the
          leaderboard. The picture stays on your card.
        </p>
        {groups.map((group) => (
          <div key={group.when} className="mt-4">
            <h3 className="font-heading text-xl leading-none">{group.title}</h3>
            <ul className="mt-1">
              {missions
                .filter((mission) => mission.when === group.when)
                .map((mission) => (
                  <MissionRow
                    key={mission.id}
                    mission={mission}
                    finished={done.has(mission.id)}
                    photo={photos[mission.id] ?? null}
                    pending={pendingId === mission.id}
                    locked={pendingId !== null}
                    onUpload={onUpload}
                  />
                ))}
            </ul>
          </div>
        ))}
      </section>
      {days.map((day) => (
        <section key={day.name} className="mt-6">
          <h2 className="font-heading text-2xl leading-none">{day.name}</h2>
          <table className="mt-3 w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#241c14]/25 text-xs tracking-wide text-[#6b5340] uppercase">
                <th scope="col" className="py-2 pr-4 font-medium whitespace-nowrap">
                  Time
                </th>
                <th scope="col" className="py-2 font-medium">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody>
              {day.rows.map(([time, activity]) => (
                <tr key={`${day.name}-${time}`} className="border-b border-[#241c14]/10 align-top">
                  <th scope="row" className="py-2.5 pr-4 font-medium whitespace-nowrap text-[#8a6232]">
                    {time}
                  </th>
                  <td className="py-2.5 leading-snug">{activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </div>
  )
}

function MissionRow({
  mission,
  finished,
  photo,
  pending,
  locked,
  onUpload,
}: {
  mission: Mission
  finished: boolean
  photo: string | null
  pending: boolean
  locked: boolean
  onUpload: (id: string, photo: Blob) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const shown = photo && failedSrc !== photo ? photo : null
  const addLabel = mission.shot === "selfie" ? "Add a selfie" : "Add a photo"
  const changeLabel = mission.shot === "selfie" ? "Change selfie" : "Change photo"

  function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ""
    if (!file || locked) return
    setError("")
    void fitJpeg(file)
      .then((blob) => onUpload(mission.id, blob))
      .catch((caught: unknown) => {
        const reason = caught instanceof Error ? caught.message : ""
        setError(reason === "large" ? "Use a picture under 8 MB." : "That picture could not be read.")
      })
  }

  return (
    <li className="border-b border-[#241c14]/10 py-3 last:border-b-0">
      <div className="flex items-start gap-3">
        <span className="relative grid size-20 shrink-0 place-items-center overflow-hidden rounded-md border border-[#241c14]/20 bg-[#ead9b8] text-[#8a6232]">
          {shown ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={shown} alt="" className="size-full object-cover" onError={() => setFailedSrc(shown)} />
          ) : (
            <Camera className="size-6" aria-hidden="true" />
          )}
          {finished ? (
            <span className="absolute right-1 bottom-1 grid size-5 place-items-center rounded-sm bg-[#8a6232] text-[#f6edd8]">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-3">
            <span className="block leading-snug font-medium">{mission.title}</span>
            <span className="shrink-0 text-sm text-[#8a6232]">{mission.points}</span>
          </span>
          <span className="mt-0.5 block text-sm leading-snug text-[#6b5340]">{mission.detail}</span>
          <input
            ref={inputRef}
            data-mission={mission.id}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFile}
          />
          <button
            type="button"
            className="mt-1 inline-flex min-h-10 items-center text-sm font-medium text-[#8a6232] disabled:opacity-50"
            disabled={locked}
            onClick={() => inputRef.current?.click()}
          >
            {pending ? "Saving…" : shown ? changeLabel : addLabel}
          </button>
          {error ? (
            <span role="alert" className="block text-sm text-[#7d2e28]">
              {error}
            </span>
          ) : null}
        </span>
      </div>
    </li>
  )
}

async function fitJpeg(file: File) {
  if (!file.type.startsWith("image/")) throw new Error("read")
  if (file.size > 8_000_000) throw new Error("large")
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file)
  } catch {
    throw new Error("read")
  }
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement("canvas")
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const context = canvas.getContext("2d")
  if (!context) {
    bitmap.close()
    throw new Error("read")
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.8))
  if (!blob) throw new Error("read")
  if (blob.size <= 1_200_000) return blob
  const smaller = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.55))
  if (!smaller || smaller.size > 1_200_000) throw new Error("large")
  return smaller
}
