import assert from "node:assert/strict"
import test from "node:test"
import { portraitSrc } from "./portrait.ts"

test("portrait address includes the cache stamp", () => {
  assert.equal(portraitSrc("abc", null), null)
  assert.equal(portraitSrc("abc", ""), null)
  assert.equal(
    portraitSrc("abc", "2026-10-05T00:00:00.000Z"),
    "/api/portrait/abc?v=2026-10-05T00%3A00%3A00.000Z",
  )
})
