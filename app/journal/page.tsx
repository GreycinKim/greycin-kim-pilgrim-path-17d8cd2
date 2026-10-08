import type { Metadata } from "next"
import { JournalApp } from "@/components/journal-app"
import type { Pilgrim } from "@/lib/company"
import { getJournal, requireUser } from "@/lib/dal"
import { grantArrivals, listAwards, listCheckins, listCompany } from "@/lib/db"
import { castByStage, speakerIndex, stagePlates } from "@/lib/reference"
import { totalPoints, type Award } from "@/lib/score"

export const metadata: Metadata = {
  title: "Journal · Waymark",
  description: "Where you are in The Pilgrim’s Progress, marked on the map.",
}

export default async function JournalPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string; place?: string }>
}) {
  const query = await searchParams
  const user = await requireUser()
  const journal = await getJournal(user.id)
  grantArrivals(user.id, journal.progress.stageId, journal.progress.finished)
  const awards: Award[] = listAwards(user.id)
  const pilgrims: Pilgrim[] = listCompany().map((row) => ({
    id: row.id,
    pseudonym: row.name,
    stageId: row.stageId,
    finished: row.finished,
    self: row.id === user.id,
    arrivedAt: row.arrivedAt,
    portraitAt: row.portraitAt,
    points: row.id === user.id ? totalPoints(awards) : row.points,
  }))
  return (
    <JournalApp
      name={user.name}
      progress={journal.progress}
      notes={journal.notes}
      pilgrims={pilgrims}
      checkins={listCheckins(user.id)}
      awards={awards}
      score={totalPoints(awards)}
      cast={castByStage()}
      speakers={speakerIndex()}
      stagePlates={stagePlates()}
      openStage={query.stage}
      openLandmark={query.place}
      givenName={user.givenName}
      admin={user.admin}
    />
  )
}
