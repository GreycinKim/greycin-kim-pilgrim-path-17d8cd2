"use server"

import { revalidatePath } from "next/cache"
import { gradePath, gradeQuiz } from "@/lib/challenge-key"
import { requireUser } from "@/lib/dal"
import {
  beginQuizClock,
  getProgress,
  hasSavedAward,
  quizClock,
  saveAwardOnce,
  saveQuizAnswers,
  sumPoints,
} from "@/lib/db"
import { getStage, hasReached } from "@/lib/journey"
import { PATH_POINTS, QUIZ_QUESTIONS, QUIZ_SECONDS, quizPoints } from "@/lib/score"

const QUIZ_ANSWERS = QUIZ_QUESTIONS + 1

function reached(userId: string, stageId: string) {
  const progress = getProgress(userId)
  if (!progress || !getStage(stageId)) return false
  return hasReached(progress.stageId, progress.finished, stageId)
}

export async function beginQuiz(stageId: string) {
  const user = await requireUser()
  if (!reached(user.id, stageId)) return { error: "Reach this place before the quiz." }
  if (hasSavedAward(user.id, stageId, "quiz")) return { error: "You already took this quiz." }
  const startedAt = beginQuizClock(user.id, stageId)
  return { ok: true as const, startedAt }
}

export async function submitQuiz(stageId: string, answers: number[]) {
  const user = await requireUser()
  if (!reached(user.id, stageId)) return { error: "Reach this place before the quiz." }
  if (hasSavedAward(user.id, stageId, "quiz")) return { error: "You already took this quiz." }
  if (!Array.isArray(answers) || answers.length !== QUIZ_ANSWERS) {
    return { error: "Answer every question." }
  }
  const graded = answers.map((answer) => (answer === 0 || answer === 1 || answer === 2 ? answer : -1))
  const correct = gradeQuiz(stageId, graded.slice(0, QUIZ_QUESTIONS))
  const pathRight = gradePath(stageId, graded[QUIZ_QUESTIONS] ?? -1)
  if (correct === null || pathRight === null) return { error: "That place has no quiz." }
  const started = Date.parse(quizClock(user.id, stageId))
  if (!Number.isFinite(started)) return { error: "Start the quiz first." }
  const elapsed = Date.now() - started
  const inTime = elapsed >= 0 && elapsed <= (QUIZ_SECONDS + 8) * 1000
  saveQuizAnswers(user.id, stageId, graded.slice(0, QUIZ_QUESTIONS), graded[QUIZ_QUESTIONS] ?? -1)
  const quizSaved = saveAwardOnce(user.id, stageId, "quiz", quizPoints(correct, inTime))
  const pathSaved = saveAwardOnce(user.id, stageId, "path", pathRight ? PATH_POINTS : 0)
  revalidatePath("/journal")
  return {
    correct,
    pathRight,
    inTime,
    points: quizSaved.points + pathSaved.points,
    gained: quizSaved.gained + pathSaved.gained,
    total: sumPoints(user.id),
  }
}
