import assert from "node:assert/strict"
import test from "node:test"
import {
  landmarks,
  progressPercent,
  regions,
  stageIndex,
  stages,
} from "./journey.ts"

const regionIds = new Set(regions.map((region) => region.id))
const regionOrder = regions.map((region) => region.id)

test("passages are unique, on a plate, and in story order", () => {
  const ids = new Set<string>()
  let lastRegion = 0
  for (const stage of stages) {
    assert.equal(ids.has(stage.id), false, stage.id)
    ids.add(stage.id)
    assert.ok(regionIds.has(stage.regionId), stage.id)
    assert.ok(stage.x > 2 && stage.x < 98, stage.id)
    assert.ok(stage.y > 2 && stage.y < 98, stage.id)
    assert.ok(stage.synopsis.length > 40, stage.id)
    assert.ok(stage.readCue.length > 10, stage.id)
    const regionAt = regionOrder.indexOf(stage.regionId)
    assert.ok(regionAt >= lastRegion, `${stage.id} goes backward`)
    lastRegion = regionAt
  }
  assert.equal(stages[0]?.title, "City of Destruction")
  assert.equal(stages.at(-1)?.title, "The Celestial City")
  assert.equal(stageIndex("city"), 0)
  assert.equal(stageIndex("missing"), -1)
})

test("landmarks exist and passage cross-references resolve", () => {
  const ids = new Set(landmarks.map((place) => place.id))
  assert.equal(ids.size, landmarks.length)
  for (const place of landmarks) {
    assert.ok(regionIds.has(place.regionId))
    assert.ok(place.x > 2 && place.x < 98)
    assert.ok(place.y > 2 && place.y < 98)
  }
  for (const stage of stages) {
    for (const related of stage.related ?? []) {
      assert.ok(ids.has(related), `${stage.id} → ${related}`)
    }
  }
})

test("progress percent follows the pin", () => {
  assert.equal(progressPercent(0, false), 0)
  assert.equal(progressPercent(stages.length - 1, false), 97)
  assert.equal(progressPercent(stages.length - 1, true), 100)
})
