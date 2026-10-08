import assert from "node:assert/strict"
import test from "node:test"
import { missedQuestions, quizScoreBreakdown } from "./quiz-report.ts"

test("a saved quiz score tells how many answers were right", () => {
  assert.deepEqual(quizScoreBreakdown(0), { correct: 0, inTime: false })
  assert.deepEqual(quizScoreBreakdown(20), { correct: 0, inTime: true })
  assert.deepEqual(quizScoreBreakdown(50), { correct: 2, inTime: true })
  assert.deepEqual(quizScoreBreakdown(65), { correct: 3, inTime: true })
  assert.equal(quizScoreBreakdown(7), null)
})

test("missed questions name the choice and the right answer", () => {
  const missed = missedQuestions("city", [1, 0, 0], 1)
  assert.ok(missed)
  assert.equal(missed.length, 1)
  assert.equal(missed[0].prompt, "Who points him across the field?")
  assert.equal(missed[0].chosen, "Help")
  assert.equal(missed[0].right, "Evangelist")
  assert.equal(missedQuestions("city", [1, 2, 0], 1)?.length, 0)
  assert.equal(missedQuestions("missing", [0, 0, 0], 0), null)
})
