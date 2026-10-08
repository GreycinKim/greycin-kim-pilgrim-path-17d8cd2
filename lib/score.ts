export const ARRIVAL_POINTS = 50
export const QUIZ_CORRECT = 15
export const QUIZ_TIME_BONUS = 20
export const QUIZ_SECONDS = 45
export const QUIZ_QUESTIONS = 3
export const PATH_POINTS = 25

export type AwardKind = "arrival" | "quiz" | "path" | "mission"

export type Award = {
  stageId: string
  kind: AwardKind
  points: number
  createdAt?: string
}

export function quizPoints(correct: number, inTime: boolean) {
  const earned = Math.max(0, Math.min(QUIZ_QUESTIONS, Math.floor(correct))) * QUIZ_CORRECT
  return earned + (inTime ? QUIZ_TIME_BONUS : 0)
}

export function awardPoints(awards: Award[], stageId: string, kind: AwardKind) {
  return awards.find((award) => award.stageId === stageId && award.kind === kind)?.points ?? 0
}

export function hasAward(awards: Award[], stageId: string, kind: AwardKind) {
  return awards.some((award) => award.stageId === stageId && award.kind === kind)
}

export function totalPoints(awards: Award[]) {
  return awards.reduce((sum, award) => sum + award.points, 0)
}

export function ordinal(rank: number) {
  const mod100 = rank % 100
  if (mod100 >= 11 && mod100 <= 13) return `${rank}th`
  switch (rank % 10) {
    case 1:
      return `${rank}st`
    case 2:
      return `${rank}nd`
    case 3:
      return `${rank}rd`
    default:
      return `${rank}th`
  }
}

/** Highest score first. Tied scores share a rank, then names go A to Z. */
export function leaderboard<T extends { points: number; pseudonym: string }>(people: T[]) {
  const ordered = [...people].sort(
    (a, b) => b.points - a.points || a.pseudonym.localeCompare(b.pseudonym),
  )
  let previousPoints: number | null = null
  let previousRank = 0
  return ordered.map((person, index) => {
    const rank = previousPoints === person.points ? previousRank : index + 1
    previousPoints = person.points
    previousRank = rank
    return { person, rank }
  })
}
