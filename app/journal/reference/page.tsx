import type { Metadata } from "next"
import { ReferenceIndex, type ReferenceCard } from "@/components/reference-index"
import { ReferenceShell } from "@/components/reference-shell"
import { allPeople, allPlaces, scripturesOf } from "@/lib/reference"

export const metadata: Metadata = {
  title: "Reference · Waymark",
  description: "People and places in The Pilgrim’s Progress, with the scriptures in the margin.",
}

function findText(name: string, aliases: string[] | undefined, role: string, account: string, refs: string) {
  return [name, ...(aliases ?? []), role, account, refs].join(" ").toLowerCase()
}

export default function ReferencePage() {
  const people = allPeople()
  const places = allPlaces()
  const items: ReferenceCard[] = [
    ...people.map((person) => ({
      href: `/journal/reference/people/${person.id}`,
      name: person.name,
      kind: "Person" as const,
      role: person.role,
      find: findText(
        person.name,
        person.aliases,
        person.role,
        person.account,
        scripturesOf(person.verses).map((verse) => verse.ref).join(" "),
      ),
    })),
    ...places.map((place) => ({
      href: `/journal/reference/places/${place.id}`,
      name: place.name,
      kind: "Place" as const,
      role: place.role,
      find: findText(
        place.name,
        undefined,
        place.role,
        place.account,
        scripturesOf(place.verses).map((verse) => verse.ref).join(" "),
      ),
    })),
  ].sort((a, b) => a.name.replace(/^The /, "").localeCompare(b.name.replace(/^The /, "")))

  return (
    <ReferenceShell>
      <ReferenceIndex items={items} peopleCount={people.length} placeCount={places.length} />
    </ReferenceShell>
  )
}
