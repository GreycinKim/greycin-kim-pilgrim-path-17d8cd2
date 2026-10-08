import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ReferenceDetail } from "@/components/reference-detail"
import { ReferenceShell } from "@/components/reference-shell"
import { characterPortraits } from "@/lib/character-portraits"
import { getPerson, scripturesOf } from "@/lib/reference"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const person = getPerson(id)
  if (!person) return { title: "Reference · Waymark" }
  return {
    title: `${person.name} · Waymark`,
    description: person.role,
  }
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const person = getPerson(id)
  if (!person) notFound()
  return (
    <ReferenceShell>
      <ReferenceDetail
        kind="Person"
        name={person.name}
        role={person.role}
        account={person.account}
        plate={person.plate}
        portrait={characterPortraits[person.id]}
        scriptures={scripturesOf(person.verses)}
        seenAt={person.seenAt}
      />
    </ReferenceShell>
  )
}
