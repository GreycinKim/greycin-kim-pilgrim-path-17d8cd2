import { challenges } from "./challenge-copy.ts"
import { challengeKeys } from "./challenge-key.ts"
import { QUIZ_CORRECT, QUIZ_TIME_BONUS } from "./score.ts"

export type MissedQuestion = {
  prompt: string
  chosen: string
  right: string
}

const breakdowns = new Map<number, { correct: number; inTime: boolean }>()
for (let correct = 0; correct <= 3; correct += 1) {
  for (const inTime of [false, true]) {
    breakdowns.set(correct * QUIZ_CORRECT + (inTime ? QUIZ_TIME_BONUS : 0), { correct, inTime })
  }
}

/** Recover how many quiz answers were right from the saved point total. */
export function quizScoreBreakdown(points: number) {
  return breakdowns.get(points) ?? null
}

export function missedQuestions(stageId: string, quiz: number[], path: number): MissedQuestion[] | null {
  const copy = challenges[stageId]
  const key = challengeKeys[stageId]
  if (!copy || !key || quiz.length !== key.quiz.length) return null
  const missed: MissedQuestion[] = []
  quiz.forEach((choice, index) => {
    const question = copy.quiz[index]
    const rightIndex = key.quiz[index]
    if (choice === rightIndex) return
    missed.push({
      prompt: question.prompt,
      chosen: question.choices[choice] ?? "No answer",
      right: question.choices[rightIndex],
    })
  })
  if (path !== key.path) {
    missed.push({
      prompt: copy.path.prompt,
      chosen: copy.path.choices[path] ?? "No answer",
      right: copy.path.choices[key.path],
    })
  }
  return missed
}
