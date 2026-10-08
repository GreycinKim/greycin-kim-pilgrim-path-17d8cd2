import assert from "node:assert/strict"
import test from "node:test"
import { hasReached, stages, stagesReached } from "./journey.ts"
import { ARRIVAL_POINTS, PATH_POINTS, QUIZ_CORRECT, QUIZ_TIME_BONUS, leaderboard, ordinal, quizPoints } from "./score.ts"

test("a timed quiz pays for right answers and a finish bonus", () => {
  assert.equal(quizPoints(0, false), 0)
  assert.equal(quizPoints(3, false), QUIZ_CORRECT * 3)
  assert.equal(quizPoints(3, true), QUIZ_CORRECT * 3 + QUIZ_TIME_BONUS)
  assert.equal(quizPoints(9, true), QUIZ_CORRECT * 3 + QUIZ_TIME_BONUS)
  assert.equal(quizPoints(-2, true), QUIZ_TIME_BONUS)
})

test("the leaderboard ranks by points and shares a tie", () => {
  const board = leaderboard([
    { pseudonym: "Hopeful", points: 50 },
    { pseudonym: "Faithful", points: 140 },
    { pseudonym: "Christian", points: 50 },
  ])
  assert.deepEqual(
    board.map((row) => [row.rank, row.person.pseudonym]),
    [
      [1, "Faithful"],
      [2, "Christian"],
      [2, "Hopeful"],
    ],
  )
  assert.equal(ordinal(1), "1st")
  assert.equal(ordinal(2), "2nd")
  assert.equal(ordinal(3), "3rd")
  assert.equal(ordinal(11), "11th")
  assert.equal(ordinal(12), "12th")
  assert.equal(ordinal(13), "13th")
})

test("arrival points cover every place already reached", () => {
  assert.deepEqual(stagesReached("city", false), ["city"])
  assert.equal(stagesReached("slough", false).length, 3)
  assert.equal(stagesReached("celestial", true).length, stages.length)
  assert.equal(stagesReached("missing", false).length, 0)
  assert.equal(hasReached("slough", false, "city"), true)
  assert.equal(hasReached("slough", false, "help"), false)
  assert.equal(hasReached("slough", true, "celestial"), true)
  assert.equal(ARRIVAL_POINTS, 50)
  assert.equal(PATH_POINTS, 25)
})
