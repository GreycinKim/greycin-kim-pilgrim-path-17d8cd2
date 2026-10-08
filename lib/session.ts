import "server-only"
import { cookies } from "next/headers"
import { encryptSession } from "@/lib/session-crypto"

const COOKIE = "session"
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + THIRTY_DAYS)
  const token = await encryptSession({ userId })
  const cookieStore = await cookies()
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE)
}
