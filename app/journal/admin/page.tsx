import type { Metadata } from "next"
import Link from "next/link"
import { existsSync } from "node:fs"
import path from "node:path"
import { requireAdmin } from "@/lib/dal"
import { listAccounts, listAllAwards, listAllQuizAnswers } from "@/lib/db"
import { getStage } from "@/lib/journey"
import { getMission } from "@/lib/missions"
import { QUIZ_QUESTIONS } from "@/lib/score"
import { missedQuestions, quizScoreBreakdown } from "@/lib/quiz-report"

export const metadata: Metadata = {
  title: "Admin · Waymark",
  description: "Names, missed questions, finished missions, and retreat pictures.",
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  await requireAdmin()
  const accounts = listAccounts()
  const awards = listAllAwards()
  const answers = listAllQuizAnswers()
  const pictures: { userId: string; pseudonym: string; missionId: string; title: string; src: string }[] = []

  const readers = accounts.map((account) => {
    const missions = awards
      .filter((award) => award.userId === account.id && award.kind === "mission")
      .flatMap((award) => {
        const mission = getMission(award.stageId)
        if (!mission) return []
        const file = path.join(process.cwd(), "data", "missions", account.id, `${mission.id}.jpg`)
        const hasPhoto = existsSync(file)
        if (hasPhoto) {
          pictures.push({
            userId: account.id,
            pseudonym: account.pseudonym,
            missionId: mission.id,
            title: mission.title,
            src: `/api/admin/photo/${account.id}/${mission.id}?v=${encodeURIComponent(award.createdAt)}`,
          })
        }
        return [{ id: mission.id, title: mission.title, when: mission.when, hasPhoto }]
      })
    const quizzes = awards
      .filter((award) => award.userId === account.id && award.kind === "quiz")
      .flatMap((award) => {
        const stage = getStage(award.stageId)
        if (!stage) return []
        const pathAward = awards.find(
          (item) => item.userId === account.id && item.stageId === award.stageId && item.kind === "path",
        )
        const saved = answers.find((item) => item.userId === account.id && item.stageId === award.stageId)
        const breakdown = quizScoreBreakdown(award.points)
        const missed = saved ? missedQuestions(award.stageId, saved.quiz, saved.path) : null
        return [
          {
            title: stage.title,
            correct: breakdown?.correct ?? null,
            pathRight: pathAward ? pathAward.points > 0 : null,
            missed,
          },
        ]
      })
    return { ...account, missions, quizzes }
  })

  return (
    <div className="min-h-dvh bg-[#ead9b8] text-[#241c14]">
      <header className="border-b border-[#241c14]/10 px-4 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <h1 className="font-heading text-3xl leading-none">Admin</h1>
          <Link href="/journal" className="text-sm text-[#8a6232]">
            Journal
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6 pb-16">
        <p className="text-sm leading-relaxed text-[#6b5340]">
          Map names, real names, missed questions, and finished missions. Pictures stay off the map.
        </p>
        <a
          href="/api/admin/export"
          className="mt-4 inline-flex h-12 items-center rounded-md bg-[#8a6232] px-4 text-sm font-medium text-[#f6edd8]"
        >
          Download pictures for Google Drive
        </a>
        <p className="mt-2 text-xs leading-relaxed text-[#6b5340]">
          The folder is grouped by map name. Upload that zip to Google Drive, then open it there.
        </p>

        <section className="mt-8" aria-label="Pictures">
          <h2 className="font-heading text-2xl leading-none">Gallery</h2>
          {pictures.length === 0 ? (
            <p className="mt-3 text-sm text-[#6b5340]">No pictures yet.</p>
          ) : (
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {pictures.map((picture) => (
                <li key={`${picture.userId}-${picture.missionId}`} className="overflow-hidden rounded-md border border-[#241c14]/15 bg-[#f6edd8]">
                  {/* Admin-only picture. next/image cannot send the session cookie. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={picture.src} alt="" className="aspect-square w-full object-cover" />
                  <p className="px-3 py-2 text-sm">
                    <span className="font-medium">{picture.pseudonym}</span>
                    <span className="mt-0.5 block text-[#6b5340]">{picture.title}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-10" aria-label="Readers">
          <h2 className="font-heading text-2xl leading-none">Readers</h2>
          <ul className="mt-4 space-y-4">
            {readers.map((reader) => (
              <li key={reader.id} className="rounded-md border border-[#241c14]/15 bg-[#f6edd8] px-4 py-4">
                <h3 className="font-heading text-2xl leading-none">{reader.pseudonym}</h3>
                <p className="mt-2 text-sm">
                  Actual name: {reader.givenName ?? "Not entered"}
                </p>
                <p className="mt-1 text-sm text-[#6b5340]">{reader.email}</p>
                <h4 className="mt-4 text-sm font-medium">Missions</h4>
                {reader.missions.length === 0 ? (
                  <p className="mt-1 text-sm text-[#6b5340]">None finished.</p>
                ) : (
                  <ul className="mt-1 text-sm leading-relaxed">
                    {reader.missions.map((mission) => (
                      <li key={mission.id}>
                        {mission.title}
                        {mission.hasPhoto ? "" : " · no picture"}
                      </li>
                    ))}
                  </ul>
                )}
                <h4 className="mt-4 text-sm font-medium">Questions missed</h4>
                {reader.quizzes.length === 0 ? (
                  <p className="mt-1 text-sm text-[#6b5340]">No quiz yet.</p>
                ) : (
                  <ul className="mt-2 space-y-3">
                    {reader.quizzes.map((quiz) => (
                      <li key={quiz.title}>
                        <p className="text-sm font-medium">{quiz.title}</p>
                        {quiz.missed ? (
                          quiz.missed.length === 0 ? (
                            <p className="text-sm text-[#6b5340]">None missed.</p>
                          ) : (
                            <ul className="mt-1 space-y-2">
                              {quiz.missed.map((miss) => (
                                <li key={miss.prompt} className="text-sm leading-snug">
                                  <span className="block">{miss.prompt}</span>
                                  <span className="block text-[#7d2e28]">Chose {miss.chosen}</span>
                                  <span className="block text-[#6b5340]">Answer: {miss.right}</span>
                                </li>
                              ))}
                            </ul>
                          )
                        ) : (
                          <p className="text-sm text-[#6b5340]">
                            {quiz.correct === null
                              ? "Score saved before the missed questions were kept."
                              : `${quiz.correct} of ${QUIZ_QUESTIONS} right. The missed questions were not kept.`}
                            {quiz.pathRight === false ? " The path question was missed." : ""}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
