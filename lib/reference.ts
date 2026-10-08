import { characterPortraits } from "./character-portraits.ts"
import { kjv, type VerseId } from "./kjv.ts"
import type { PlateSpec } from "./plate.ts"
import { people, type Person } from "./reference-people.ts"
import { places, type Place } from "./reference-places.ts"

export type CastMember = { id: string; name: string; plate: PlateSpec; portrait?: string }

export type { Person, Place }
export type Scripture = { ref: string; text: string; why: string }

const personById = new Map(people.map((person) => [person.id, person]))
const placeById = new Map(places.map((place) => [place.id, place]))

function normalize(name: string) {
  return name.trim().toLowerCase()
}

const speakers = new Map<string, string>()
for (const person of people) {
  speakers.set(normalize(person.name), person.id)
  for (const alias of person.aliases ?? []) speakers.set(normalize(alias), person.id)
}

export function getPerson(id: string) {
  return personById.get(id)
}

export function getPlace(id: string) {
  return placeById.get(id)
}

export function allPeople() {
  return people
}

export function allPlaces() {
  return places
}

export function scripturesOf(verses: { id: VerseId; why: string }[]): Scripture[] {
  return verses.map((verse) => {
    const text = kjv[verse.id]
    return { ref: text.ref, text: text.text, why: verse.why }
  })
}

export function personForSpeaker(name: string) {
  const id = speakers.get(normalize(name))
  return id ? personById.get(id) : undefined
}

export function speakerIndex() {
  const index: Record<string, string> = {}
  for (const person of people) {
    index[person.name] = person.id
    for (const alias of person.aliases ?? []) index[alias] = person.id
  }
  return index
}

export function castByStage() {
  const cast: Record<string, CastMember[]> = {}
  for (const person of people) {
    for (const stageId of person.seenAt) {
      const list = cast[stageId] ?? []
      list.push({
        id: person.id,
        name: person.name,
        plate: person.plate,
        portrait: characterPortraits[person.id],
      })
      cast[stageId] = list
    }
  }
  return cast
}

export function peopleAt(stageId: string) {
  return people.filter((person) => person.seenAt.includes(stageId))
}

export function stagePlates() {
  const plates: Record<string, PlateSpec> = {}
  for (const place of places) {
    if (place.stageId && place.id === place.stageId) plates[place.id] = place.plate
  }
  return plates
}
