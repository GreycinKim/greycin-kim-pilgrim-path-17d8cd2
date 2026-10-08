import assert from "node:assert/strict"
import test from "node:test"
import { checkGivenName, checkPseudonym, layoutCompanions, mapFaces, pilgrimColor } from "./company.ts"

test("a map name is short, unique-looking, and not an email", () => {
  assert.deepEqual(checkPseudonym("  Hopeful  "), { ok: true, name: "Hopeful" })
  assert.deepEqual(checkPseudonym("O'Malley"), { ok: true, name: "O'Malley" })
  assert.deepEqual(checkPseudonym("Anne-Marie"), { ok: true, name: "Anne-Marie" })
  assert.equal(checkPseudonym("Éowyn").ok, true)
  assert.equal(checkPseudonym("A").ok, false)
  assert.equal(checkPseudonym("A".repeat(25)).ok, false)
  assert.equal(checkPseudonym("hope@road.test").ok, false)
  assert.equal(checkPseudonym("Name!").ok, false)
  assert.deepEqual(checkGivenName("  Anne Marie  "), { ok: true, name: "Anne Marie" })
  assert.equal(checkGivenName("A").ok, false)
  assert.equal(checkGivenName("person@example.com").ok, false)
})

test("each reader keeps a stable color", () => {
  const first = pilgrimColor("reader-a")
  assert.equal(pilgrimColor("reader-a"), first)
  assert.match(first, /^#[0-9a-f]{6}$/)
  assert.equal(pilgrimColor(""), pilgrimColor(""))
})

test("companions spread out when they share a passage", () => {
  const alone = layoutCompanions([{ id: "a", self: false }], 50, 40)
  assert.deepEqual(alone, [{ id: "a", x: 50, y: 40 }])

  const besideYou = layoutCompanions(
    [
      { id: "me", self: true },
      { id: "a", self: false },
    ],
    50,
    40,
  )
  assert.equal(besideYou.length, 1)
  assert.notDeepEqual(besideYou[0], { id: "a", x: 50, y: 40 })

  const crowd = layoutCompanions(
    [
      { id: "me", self: true },
      { id: "a", self: false },
      { id: "b", self: false },
    ],
    46,
    74,
  )
  assert.equal(crowd.length, 2)
  assert.notDeepEqual(
    { x: crowd[0]?.x, y: crowd[0]?.y },
    { x: crowd[1]?.x, y: crowd[1]?.y },
  )
  for (const pin of crowd) {
    assert.ok(pin.x >= 3 && pin.x <= 97)
    assert.ok(pin.y >= 3 && pin.y <= 97)
    assert.notEqual(pin.x === 46 && pin.y === 74, true)
  }
})

test("a crowd at one passage keeps a few faces apart and folds the rest", () => {
  const people = Array.from({ length: 30 }, (_, index) => ({ id: `reader-${index}` }))
  const folded = mapFaces(people)
  assert.equal(folded.shown.length, 5)
  assert.equal(folded.extra.length, 25)
  const picked = mapFaces(people, "reader-20")
  assert.equal(picked.shown[0]?.id, "reader-20")
  assert.equal(picked.shown.length, 5)
  assert.equal(picked.extra.length, 25)
  assert.equal(picked.extra.some((person) => person.id === "reader-20"), false)

  const ring = layoutCompanions(
    [{ id: "self", self: true }, ...folded.shown.map((person) => ({ id: person.id, self: false })), { id: "crowd:city", self: false }],
    46,
    74,
  )
  assert.equal(ring.length, 6)
  for (let left = 0; left < ring.length; left += 1) {
    for (let right = left + 1; right < ring.length; right += 1) {
      const dx = ring[left].x - ring[right].x
      const dy = ring[left].y - ring[right].y
      assert.ok(Math.hypot(dx, dy) > 6, `${ring[left].id} overlaps ${ring[right].id}`)
    }
  }
})
