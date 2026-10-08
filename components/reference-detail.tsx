import Image from "next/image"
import Link from "next/link"
import { ReferencePlate } from "@/components/reference-plate"
import { getStage } from "@/lib/journey"
import type { PlateSpec } from "@/lib/plate"
import { peopleAt, type Scripture } from "@/lib/reference"

export function ReferenceDetail({
  kind,
  name,
  role,
  account,
  plate,
  portrait,
  scriptures,
  stageId,
  landmarkId,
  seenAt,
}: {
  kind: "Person" | "Place"
  name: string
  role: string
  account: string
  plate: PlateSpec
  portrait?: string
  scriptures: Scripture[]
  stageId?: string
  landmarkId?: string
  seenAt?: string[]
}) {
  const company = stageId ? peopleAt(stageId) : []
  const appearances = (seenAt ?? [])
    .map((id) => getStage(id))
    .filter((stage) => stage !== undefined)

  return (
    <article className="space-y-6">
      <p className="text-[11px] tracking-[0.16em] text-[#8a6232] uppercase">
        <Link href="/journal/reference" className="underline-offset-2 hover:underline">
          Reference
        </Link>
        {" · "}
        {kind}
      </p>
      <figure className="overflow-hidden rounded-xl border border-[#241c14]/10 bg-[#efe4cf]">
        {portrait ? (
          <div className="flex justify-center bg-[#f7f1e4] px-6 py-8">
            <Image src={portrait} alt="" width={320} height={320} className="size-64 rounded-full object-cover" />
          </div>
        ) : (
          <ReferencePlate plate={plate} label={name} />
        )}
        <figcaption className="px-3 py-2 text-xs text-[#5c4e3d]">{name}</figcaption>
      </figure>
      <header>
        <h1 className="font-heading text-4xl leading-none">{name}</h1>
        <p className="mt-2 text-sm text-[#8a6232]">{role}</p>
      </header>
      <p className="font-serif text-[17px] leading-relaxed">{account}</p>
      {stageId ? (
        <p>
          <Link href={`/journal?stage=${stageId}`} className="text-sm text-[#8a6232] underline-offset-2 hover:underline">
            Show this passage on the map
          </Link>
        </p>
      ) : null}
      {landmarkId ? (
        <p>
          <Link href={`/journal?place=${landmarkId}`} className="text-sm text-[#8a6232] underline-offset-2 hover:underline">
            Show this name on the plate
          </Link>
        </p>
      ) : null}
      {appearances.length > 0 ? (
        <section className="space-y-2" aria-label="Along the way">
          <h2 className="text-sm font-medium">Along the way</h2>
          <ul className="flex flex-wrap gap-1.5">
            {appearances.map((stage) => (
              <li key={stage.id}>
                <Link
                  href={`/journal/reference/places/${stage.id}`}
                  className="inline-block rounded-full bg-[#e7dcc6] px-2.5 py-1 text-xs"
                >
                  {stage.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {company.length > 0 ? (
        <section className="space-y-2" aria-label="People here">
          <h2 className="text-sm font-medium">People here</h2>
          <ul className="flex flex-wrap gap-1.5">
            {company.map((person) => (
              <li key={person.id}>
                <Link
                  href={`/journal/reference/people/${person.id}`}
                  className="inline-block rounded-full bg-[#e7dcc6] px-2.5 py-1 text-xs"
                >
                  {person.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="space-y-4 border-t border-[#241c14]/10 pt-4" aria-label="Scripture">
        <h2 className="text-sm font-medium">Scripture</h2>
        <ul className="space-y-4">
          {scriptures.map((verse, index) => (
            <li key={`${verse.ref}-${index}`}>
              <p className="text-[11px] tracking-[0.14em] text-[#8a6232] uppercase">{verse.ref}</p>
              <blockquote className="mt-1 border-l-2 border-[#c6a15a] pl-3 font-serif text-[16px] leading-relaxed italic">
                “{verse.text}”
              </blockquote>
              <p className="mt-2 text-sm leading-relaxed text-[#5c4e3d]">{verse.why}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}
