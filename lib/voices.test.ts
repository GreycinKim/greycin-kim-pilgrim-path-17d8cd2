import assert from "node:assert/strict"
import test from "node:test"
import { stages } from "./journey.ts"
import { voicesAt } from "./voices.ts"

test("a character has left a line at every passage", () => {
  for (const stage of stages) {
    const lines = voicesAt(stage.id)
    assert.ok(lines.length > 0, stage.id)
    for (const line of lines) {
      assert.ok(line.speaker.length > 1, stage.id)
      assert.ok(line.line.length > 30, stage.id)
      assert.equal(line.line.includes("@"), false, stage.id)
    }
  }
})
