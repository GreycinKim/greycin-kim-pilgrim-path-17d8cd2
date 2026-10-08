import assert from "node:assert/strict"
import test from "node:test"
import { arrival, stayPhrase, stayShort } from "./company.ts"

test("a stay is dated from the local calendar", () => {
  const now = new Date(2026, 9, 5, 16, 0, 0)
  assert.deepEqual(arrival(new Date(2026, 9, 5, 15, 59, 30).toISOString(), now), { fresh: true })
  assert.deepEqual(arrival(new Date(2026, 9, 5, 9, 0, 0).toISOString(), now), {
    fresh: false,
    since: "earlier today",
  })
  assert.deepEqual(arrival(new Date(2026, 9, 4, 18, 0, 0).toISOString(), now), {
    fresh: false,
    since: "yesterday",
  })
  assert.deepEqual(arrival(new Date(2026, 8, 29, 11, 0, 0).toISOString(), now), {
    fresh: false,
    since: "Tuesday",
  })
  assert.equal(
    stayPhrase("Grey", "Vanity Fair", false, new Date(2026, 8, 29, 11).toISOString(), now),
    "Grey has been reading Vanity Fair since Tuesday.",
  )
  assert.equal(
    stayShort("Vanity Fair", false, new Date(2026, 8, 29, 11).toISOString(), now),
    "Vanity Fair · since Tuesday",
  )
  assert.equal(
    stayPhrase("You", "City of Destruction", false, new Date(2026, 9, 5, 15, 59, 40).toISOString(), now, true),
    "You just arrived here.",
  )
})
