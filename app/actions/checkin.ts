"use server"

import { isPlausibleDay } from "@/lib/checkin"
import { requireUser } from "@/lib/dal"
import { addCheckin } from "@/lib/db"

export async function checkIn(day: string) {
  const user = await requireUser()
  if (!isPlausibleDay(day)) return { error: "Check in for today." }
  addCheckin(user.id, day)
  return {}
}
