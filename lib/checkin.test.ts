import assert from "node:assert/strict"
import test from "node:test"
import { isPlausibleDay, localDay, previousDay, streakEnding } from "./checkin.ts"

test("a check-in day is a real date close to now", () => {
  const now = new Date(2026, 9, 5, 18, 0, 0)
  assert.equal(localDay(now), "2026-10-05")
  assert.equal(previousDay("2026-10-01"), "2026-09-30")
  assert.equal(isPlausibleDay("2026-10-05", now), true)
  assert.equal(isPlausibleDay("2026-10-04", now), true)
  assert.equal(isPlausibleDay("2026-09-01", now), false)
  assert.equal(isPlausibleDay("Monday", now), false)
})

test("a run of days stops at the first gap", () => {
  assert.equal(streakEnding(["2026-10-03", "2026-10-04", "2026-10-05"], "2026-10-05"), 3)
  assert.equal(streakEnding(["2026-10-03", "2026-10-04"], "2026-10-05"), 2)
  assert.equal(streakEnding(["2026-10-03"], "2026-10-05"), 0)
  assert.equal(streakEnding([], "2026-10-05"), 0)
  assert.equal(
    streakEnding(["2026-10-01", "2026-10-03", "2026-10-04", "2026-10-05"], "2026-10-05"),
    3,
  )
})
