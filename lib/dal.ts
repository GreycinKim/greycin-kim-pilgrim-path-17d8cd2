import "server-only"
import { cache } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ensureProgress, getNotes, getUserById } from "@/lib/db"
import { decryptSession } from "@/lib/session-crypto"

export type CurrentUser = {
  id: string
  name: string
  email: string
  givenName: string | null
  admin: boolean
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const token = (await cookies()).get("session")?.value
  const session = await decryptSession(token)
  if (!session) return null
  const user = getUserById(session.userId)
  if (!user) return null
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    givenName: user.givenName,
    admin: user.admin,
  }
})

export async function requireUser() {
  const user = await getCurrentUser()
  if (!user) redirect("/")
  return user
}

export async function requireAdmin() {
  const user = await requireUser()
  if (!user.admin) redirect("/journal")
  return user
}

export async function getJournal(userId: string) {
  return {
    progress: ensureProgress(userId),
    notes: getNotes(userId),
  }
}
