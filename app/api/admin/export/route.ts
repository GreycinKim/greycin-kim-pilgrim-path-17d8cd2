import { readFileSync } from "node:fs"
import path from "node:path"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/dal"
import { listAccounts, listAllAwards } from "@/lib/db"
import { getMission } from "@/lib/missions"
import { zipStore } from "@/lib/zip-store"

export const dynamic = "force-dynamic"

function safeName(value: string) {
  const cleaned = value.replace(/[\\/:*?"<>|]/g, "").trim()
  return cleaned || "reader"
}

export async function GET() {
  const user = await getCurrentUser()
  if (!user?.admin) return new NextResponse(null, { status: 401 })
  const accounts = new Map(listAccounts().map((account) => [account.id, account]))
  const files: { name: string; data: Uint8Array }[] = []
  for (const award of listAllAwards()) {
    if (award.kind !== "mission") continue
    const mission = getMission(award.stageId)
    const account = accounts.get(award.userId)
    if (!mission || !account) continue
    const file = path.join(process.cwd(), "data", "missions", account.id, `${mission.id}.jpg`)
    try {
      const data = readFileSync(file)
      files.push({
        name: `CM Retreat/${safeName(account.pseudonym)}/${safeName(mission.title)}.jpg`,
        data,
      })
    } catch {
      // A finished mission can exist without a picture.
    }
  }
  if (files.length === 0) {
    files.push({
      name: "CM Retreat/readme.txt",
      data: new TextEncoder().encode("No mission pictures have been uploaded yet.\n"),
    })
  }
  const archive = zipStore(files)
  return new NextResponse(new Uint8Array(archive), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="cm-retreat-pictures.zip"',
      "Cache-Control": "private, no-store",
    },
  })
}
