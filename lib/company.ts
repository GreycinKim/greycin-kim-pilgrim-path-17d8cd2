export type Pilgrim = {
  id: string
  pseudonym: string
  stageId: string
  finished: boolean
  self: boolean
  arrivedAt: string
  portraitAt: string | null
  points: number
}

export type Arrival = { fresh: true } | { fresh: false; since: string }

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

/** How long a reader has stayed at their current passage. */
export function arrival(iso: string, now = new Date()): Arrival {
  const then = new Date(iso)
  if (Number.isNaN(then.getTime()) || then.getTime() > now.getTime()) return { fresh: true }
  if (now.getTime() - then.getTime() < 60_000) return { fresh: true }
  const dayDiff = Math.round((startOfDay(now) - startOfDay(then)) / 86_400_000)
  if (dayDiff <= 0) return { fresh: false, since: "earlier today" }
  if (dayDiff === 1) return { fresh: false, since: "yesterday" }
  if (dayDiff < 7) {
    return {
      fresh: false,
      since: then.toLocaleDateString("en-US", { weekday: "long" }),
    }
  }
  return {
    fresh: false,
    since: then.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  }
}

export function stayPhrase(
  name: string,
  place: string,
  finished: boolean,
  iso: string,
  now = new Date(),
  self = false,
) {
  const when = arrival(iso, now)
  if (when.fresh) {
    if (self) return finished ? "You just finished Part I." : "You just arrived here."
    return finished ? `${name} has just finished Part I.` : `${name} just arrived at ${place}.`
  }
  if (self) {
    return finished
      ? `You have been at the Celestial City since ${when.since}.`
      : `You have been here since ${when.since}.`
  }
  return finished
    ? `${name} has been at the Celestial City since ${when.since}.`
    : `${name} has been reading ${place} since ${when.since}.`
}

export function stayShort(place: string, finished: boolean, iso: string, now = new Date()) {
  const when = arrival(iso, now)
  const where = finished ? "Finished Part I" : place
  return when.fresh ? `${where} · just arrived` : `${where} · since ${when.since}`
}

const palette = [
  "#2f5d8a",
  "#6b3d6e",
  "#1f6b5a",
  "#8a4b22",
  "#3d4a8a",
  "#7a3d48",
  "#3f6b2f",
  "#5a4a28",
]

export function pilgrimColor(id: string) {
  let hash = 0
  for (let index = 0; index < id.length; index += 1) {
    hash = (hash * 31 + id.charCodeAt(index)) >>> 0
  }
  return palette[hash % palette.length] ?? palette[0]
}

const pseudonymPattern = /^[\p{L}\p{N}][\p{L}\p{N} '’-]*$/u

export function checkPseudonym(
  raw: string,
): { ok: true; name: string } | { ok: false; error: string } {
  const name = raw.trim().replace(/\s+/g, " ")
  if (name.length < 2) return { ok: false, error: "Use at least 2 characters." }
  if (name.length > 24) return { ok: false, error: "Use 24 characters or fewer." }
  if (name.includes("@")) {
    return { ok: false, error: "Leave the @ out. This name is shown to other readers." }
  }
  if (!pseudonymPattern.test(name)) {
    return {
      ok: false,
      error: "Use letters, numbers, spaces, hyphens, or apostrophes.",
    }
  }
  return { ok: true, name }
}

export function checkGivenName(
  raw: string,
): { ok: true; name: string } | { ok: false; error: string } {
  const name = raw.trim().replace(/\s+/g, " ")
  if (name.length < 2) return { ok: false, error: "Enter your name." }
  if (name.length > 60) return { ok: false, error: "Use 60 characters or fewer." }
  if (name.includes("@")) return { ok: false, error: "Use your name, not an email." }
  if (!pseudonymPattern.test(name)) {
    return { ok: false, error: "Use letters, numbers, spaces, hyphens, or apostrophes." }
  }
  return { ok: true, name }
}

function clampPercent(value: number) {
  return Math.min(97, Math.max(3, value))
}

/** Faces drawn around one passage before the rest fold into a count. */
export const MAP_FACE_LIMIT = 6

/** Keeps a crowd at one passage to a few faces, and keeps a selected reader among them. */
export function mapFaces<T extends { id: string }>(people: T[], selectedId?: string | null) {
  if (people.length <= MAP_FACE_LIMIT) return { shown: people, extra: [] as T[] }
  const shown = people.slice(0, MAP_FACE_LIMIT - 1)
  const extra = people.slice(MAP_FACE_LIMIT - 1)
  if (!selectedId) return { shown, extra }
  const index = extra.findIndex((person) => person.id === selectedId)
  if (index < 0) return { shown, extra }
  const picked = extra[index]
  const displaced = shown[shown.length - 1]
  return {
    shown: [picked, ...shown.slice(0, -1)],
    extra: [displaced, ...extra.slice(0, index), ...extra.slice(index + 1)],
  }
}

/** Places fellow readers near a passage without covering the reader’s own pin. */
export function layoutCompanions(
  people: { id: string; self: boolean }[],
  x: number,
  y: number,
) {
  const others = people.filter((person) => !person.self)
  const share = people.some((person) => person.self)
  const count = others.length
  return others.map((person, index) => {
    if (count === 1 && !share) return { id: person.id, x, y }
    const radius = count === 1 ? 4.8 : count >= 5 ? 8.2 : 6.4
    const fullCircle = count > 4
    const sweep = fullCircle ? Math.PI * 2 : Math.PI
    const step = fullCircle ? count : Math.max(count - 1, 1)
    const angle = -Math.PI * 0.75 + (index / step) * sweep
    return {
      id: person.id,
      x: clampPercent(x + Math.cos(angle) * radius),
      y: clampPercent(y + Math.sin(angle) * radius * 0.8),
    }
  })
}
