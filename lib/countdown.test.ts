import assert from "node:assert/strict"
import test from "node:test"
import { retreatCountdown } from "./countdown.ts"

test("the retreat countdown counts local days until October 30", () => {
  assert.equal(retreatCountdown("2026-10-07"), "D-23")
  assert.equal(retreatCountdown("2026-10-29"), "D-1")
  assert.equal(retreatCountdown("2026-10-30"), "D-Day")
  assert.equal(retreatCountdown("2026-10-31"), null)
  assert.equal(retreatCountdown("Monday"), null)
})
