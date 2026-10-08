import assert from "node:assert/strict"
import test from "node:test"
import { MISSION_POINTS, getMission, missions } from "./missions.ts"

test("retreat missions are unique, split before and after, and worth a fixed score", () => {
  const ids = missions.map((mission) => mission.id)
  assert.equal(new Set(ids).size, ids.length)
  assert.ok(missions.some((mission) => mission.when === "before"))
  assert.ok(missions.some((mission) => mission.when === "after"))
  for (const mission of missions) {
    assert.equal(mission.points, MISSION_POINTS)
    assert.ok(mission.shot === "photo" || mission.shot === "selfie")
    assert.equal(getMission(mission.id)?.title, mission.title)
  }
  assert.equal(getMission("missing"), undefined)
  assert.equal(MISSION_POINTS, 25)
})
