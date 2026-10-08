import assert from "node:assert/strict"
import test from "node:test"
import { kjv } from "./kjv.ts"
import { landmarks, stages } from "./journey.ts"
import { allPeople, allPlaces, getPerson, personForSpeaker } from "./reference.ts"
import { voicesAt } from "./voices.ts"

const books =
  /^(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Job|Psalm|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Ezekiel|Daniel|Hosea|Amos|Micah|Habakkuk|Zechariah|Matthew|Mark|Luke|John|Acts|Romans|1 Corinthians|2 Corinthians|Galatians|Ephesians|Philippians|Colossians|1 Thessalonians|1 Timothy|2 Timothy|Hebrews|James|1 Peter|2 Peter|1 John|Revelation) \d+:\d+(?:-\d+)?$/

test("every scripture citation is a real reference with Authorized text", () => {
  for (const verse of Object.values(kjv)) {
    assert.match(verse.ref, books, verse.ref)
    assert.ok(verse.text.length > 20, verse.ref)
  }
})

test("people and places are unique and each has a picture and a verse", () => {
  const personIds = new Set<string>()
  for (const person of allPeople()) {
    assert.equal(personIds.has(person.id), false, person.id)
    personIds.add(person.id)
    assert.ok(person.account.length > 40, person.id)
    assert.ok(person.verses.length > 0, person.id)
    assert.ok(person.plate.sky && person.plate.land && person.plate.mark && person.plate.figure, person.id)
  }
  const placeIds = new Set<string>()
  for (const place of allPlaces()) {
    assert.equal(placeIds.has(place.id), false, place.id)
    placeIds.add(place.id)
    assert.ok(place.account.length > 20, place.id)
    assert.ok(place.verses.length > 0, place.id)
  }
  for (const stage of stages) assert.ok(placeIds.has(stage.id), stage.id)
  for (const place of landmarks) assert.ok(placeIds.has(place.id), place.id)
})

test("every voice on the map opens a person in the reference", () => {
  for (const stage of stages) {
    for (const line of voicesAt(stage.id)) {
      const person = personForSpeaker(line.speaker)
      assert.ok(person, `${stage.id}: ${line.speaker}`)
      assert.ok(person.seenAt.includes(stage.id), `${person.id} should be at ${stage.id}`)
    }
  }
  assert.equal(getPerson("christian")?.aliases?.includes("Graceless"), true)
})
