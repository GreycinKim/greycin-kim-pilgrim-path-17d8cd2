import { readFileSync } from "node:fs"
import path from "node:path"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/dal"
import { getMission } from "@/lib/missions"

export const dynamic = "force-dynamic"

const userIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  _request: Request,
  context: { params: Promise<{ userId: string; missionId: string }> },
) {
  const user = await getCurrentUser()
  if (!user?.admin) return new NextResponse(null, { status: 401 })
  const { userId, missionId } = await context.params
  const mission = getMission(missionId)
  if (!mission || !userIdPattern.test(userId)) return new NextResponse(null, { status: 404 })
  try {
    const bytes = readFileSync(path.join(process.cwd(), "data", "missions", userId, `${mission.id}.jpg`))
    return new NextResponse(bytes, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "private, max-age=86400",
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
