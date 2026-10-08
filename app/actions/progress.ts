"use server"

import { revalidatePath } from "next/cache"
import { getStage, stageIndex, stages } from "@/lib/journey"
import { getProgress, grantArrivals, saveNote, setProgress, sumPoints } from "@/lib/db"
import { requireUser } from "@/lib/dal"

export async function setPlace(stageId: string) {
  const user = await requireUser()
  if (!getStage(stageId)) return { total: sumPoints(user.id) }
  setProgress(user.id, stageId, false)
  grantArrivals(user.id, stageId, false)
  revalidatePath("/journal")
  return { total: sumPoints(user.id) }
}

export async function markPassageRead(stageId: string) {
  const user = await requireUser()
  const progress = getProgress(user.id)
  if (!progress || progress.stageId !== stageId || progress.finished) return { total: sumPoints(user.id) }
  const index = stageIndex(stageId)
  const next = stages[index + 1]
  if (!next) {
    setProgress(user.id, stageId, true)
    grantArrivals(user.id, stageId, true)
  } else {
    setProgress(user.id, next.id, false)
    grantArrivals(user.id, next.id, false)
  }
  revalidatePath("/journal")
  return { total: sumPoints(user.id) }
}

export async function restartJourney() {
  const user = await requireUser()
  setProgress(user.id, stages[0].id, false)
  grantArrivals(user.id, stages[0].id, false)
  revalidatePath("/journal")
  return { total: sumPoints(user.id) }
}

export async function saveNoteAction(stageId: string, body: string) {
  const user = await requireUser()
  if (!getStage(stageId) || typeof body !== "string") return
  saveNote(user.id, stageId, body)
}
