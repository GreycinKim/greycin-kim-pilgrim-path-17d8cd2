export const challengeKeys: Record<string, { quiz: [number, number, number]; path: number }> = {
  city: { quiz: [1, 2, 0], path: 1 },
  evangelist: { quiz: [0, 1, 2], path: 1 },
  slough: { quiz: [1, 0, 1], path: 0 },
  help: { quiz: [1, 0, 2], path: 1 },
  wiseman: { quiz: [0, 1, 2], path: 0 },
  sinai: { quiz: [2, 0, 1], path: 2 },
  "evangelist-return": { quiz: [0, 1, 2], path: 0 },
  wicket: { quiz: [1, 0, 1], path: 2 },
  interpreter: { quiz: [0, 1, 2], path: 0 },
  cross: { quiz: [1, 2, 0], path: 1 },
  hill: { quiz: [0, 1, 2], path: 0 },
  arbour: { quiz: [1, 0, 2], path: 1 },
  palace: { quiz: [0, 1, 2], path: 0 },
  humiliation: { quiz: [0, 1, 0], path: 1 },
  apollyon: { quiz: [0, 1, 0], path: 0 },
  shadow: { quiz: [1, 1, 0], path: 1 },
  faithful: { quiz: [0, 1, 1], path: 0 },
  vanity: { quiz: [0, 1, 2], path: 0 },
  "by-ends": { quiz: [0, 1, 1], path: 0 },
  ease: { quiz: [1, 0, 2], path: 0 },
  lucre: { quiz: [0, 1, 2], path: 0 },
  bypath: { quiz: [0, 1, 1], path: 1 },
  despair: { quiz: [0, 1, 1], path: 0 },
  delectable: { quiz: [0, 1, 0], path: 1 },
  ignorance: { quiz: [0, 1, 2], path: 0 },
  flatterer: { quiz: [0, 1, 2], path: 0 },
  atheist: { quiz: [0, 1, 1], path: 1 },
  enchanted: { quiz: [0, 1, 0], path: 0 },
  beulah: { quiz: [0, 1, 2], path: 0 },
  river: { quiz: [0, 1, 1], path: 1 },
  celestial: { quiz: [0, 1, 2], path: 0 },
}

export function gradeQuiz(stageId: string, answers: number[]) {
  const key = challengeKeys[stageId]
  if (!key || answers.length !== key.quiz.length) return null
  return key.quiz.filter((answer, index) => answers[index] === answer).length
}

export function gradePath(stageId: string, choice: number) {
  const key = challengeKeys[stageId]
  if (!key) return null
  return choice === key.path
}
