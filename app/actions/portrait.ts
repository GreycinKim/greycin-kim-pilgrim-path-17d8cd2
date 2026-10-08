"use server"

import { mkdirSync, unlinkSync, writeFileSync } from "node:fs"
import path from "node:path"
import { requireUser } from "@/lib/dal"
import { setPortraitAt } from "@/lib/db"

const MAX_BYTES = 300_000

function portraitPath(userId: string) {
  return path.join(process.cwd(), "data", "portraits", `${userId}.jpg`)
}

function isJpeg(bytes: Uint8Array) {
  return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
}

export async function setPortrait(formData: FormData): Promise<{ portraitAt?: string; error?: string }> {
  const user = await requireUser()
  const file = formData.get("portrait")
  if (!(file instanceof File)) return { error: "Choose a picture." }
  if (file.type !== "image/jpeg") return { error: "Use a JPEG picture." }
  if (file.size > MAX_BYTES) return { error: "Use a smaller picture." }
  const bytes = new Uint8Array(await file.arrayBuffer())
  if (!isJpeg(bytes)) return { error: "That file is not a picture." }
  const dir = path.join(process.cwd(), "data", "portraits")
  mkdirSync(dir, { recursive: true })
  writeFileSync(portraitPath(user.id), bytes)
  const portraitAt = new Date().toISOString()
  setPortraitAt(user.id, portraitAt)
  return { portraitAt }
}

export async function clearPortrait() {
  const user = await requireUser()
  try {
    unlinkSync(portraitPath(user.id))
  } catch {
    // The picture file is already gone.
  }
  setPortraitAt(user.id, null)
  return { portraitAt: null }
}
