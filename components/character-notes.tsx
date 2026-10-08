import Link from "next/link"
import { voicesAt } from "@/lib/voices"

export function CharacterNotes({
  stageId,
  speakers,
}: {
  stageId: string
  speakers: Record<string, string>
}) {
  const lines = voicesAt(stageId)
  if (lines.length === 0) return null
  return (
    <section className="space-y-2 border-t border-[#241c14]/10 pt-3" aria-label="Left at this place">
      <h3 className="text-sm font-medium">Left at this place</h3>
      <ul className="space-y-2">
        {lines.map((line) => {
          const personId = speakers[line.speaker]
          return (
            <li key={line.speaker} className="rounded-lg bg-[#e7dcc6] px-4 py-3">
              <p className="text-xs tracking-[0.12em] text-[#8a6232] uppercase">
                {personId ? (
                  <Link href={`/journal/reference/people/${personId}`} className="underline-offset-2 hover:underline">
                    {line.speaker}
                  </Link>
                ) : (
                  line.speaker
                )}
              </p>
              <p className="mt-1 font-serif text-[15px] leading-relaxed">{line.line}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
