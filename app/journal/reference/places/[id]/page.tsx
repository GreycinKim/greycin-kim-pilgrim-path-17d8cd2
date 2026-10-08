import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ReferenceDetail } from "@/components/reference-detail"
import { ReferenceShell } from "@/components/reference-shell"
import { placeImages } from "@/lib/place-images"
import { getPlace, scripturesOf } from "@/lib/reference"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const place = getPlace(id)
  if (!place) return { title: "Reference · Waymark" }
  return {
    title: `${place.name} · Waymark`,
    description: place.role,
  }
}

export default async function PlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const place = getPlace(id)
  if (!place) notFound()
  return (
    <ReferenceShell>
      <ReferenceDetail
        kind="Place"
        name={place.name}
        role={place.role}
        account={place.account}
        plate={place.plate}
        portrait={placeImages[place.id]}
        scriptures={scripturesOf(place.verses)}
        stageId={place.stageId}
        landmarkId={place.landmarkId}
      />
    </ReferenceShell>
  )
}
