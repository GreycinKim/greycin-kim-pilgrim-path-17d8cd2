import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/dal"
import { listCompany } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json(
      { error: "Sign in to see who else is reading." },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    )
  }

  const pilgrims = listCompany().map((row) => ({
    id: row.id,
    pseudonym: row.name,
    stageId: row.stageId,
    finished: row.finished,
    self: row.id === user.id,
    arrivedAt: row.arrivedAt,
    portraitAt: row.portraitAt,
    points: row.points,
  }))

  return NextResponse.json(
    { pilgrims },
    { headers: { "Cache-Control": "no-store" } },
  )
}
