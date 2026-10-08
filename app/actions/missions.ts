"use server"

import { mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { revalidatePath } from "next/cache"
import { requireUser } from "@/lib/dal"
import { saveMissionAward, sumPoints } from "@/lib/db"
import { getMission } from "@/lib/missions"

const MAX_BYTES = 1_500_000
const userIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function isJpeg(bytes: Uint8Array) {
  return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
}

export async function completeMission(formData: FormData) {
  const user = await requireUser()
  const missionId = formData.get("missionId")
  const mission = typeof missionId === "string" ? getMission(missionId) : undefined
  if (!mission) return { error: "That mission is not on the card." }
  if (!userIdPattern.test(user.id)) return { error: "That picture could not be saved." }
  const file = formData.get("photo")
  if (!(file instanceof File)) return { error: "Choose a picture." }
  if (file.type !== "image/jpeg") return { error: "Use a JPEG picture." }
  if (file.size === 0 || file.size > MAX_BYTES) return { error: "Use a smaller picture." }
  const bytes = new Uint8Array(await file.arrayBuffer())
  if (!isJpeg(bytes)) return { error: "That file is not a picture." }
  const dir = path.join(process.cwd(), "data", "missions", user.id)
  mkdirSync(dir, { recursive: true })
  writeFileSync(path.join(dir, `${mission.id}.jpg`), bytes)
  const saved = saveMissionAward(user.id, mission.id, mission.points)
  revalidatePath("/journal")
  return {
    ok: true as const,
    points: mission.points,
    gained: saved.gained,
    total: sumPoints(user.id),
    photoAt: saved.photoAt,
  }
}
