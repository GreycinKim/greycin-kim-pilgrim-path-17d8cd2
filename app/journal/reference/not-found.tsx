import Link from "next/link"
import { ReferenceShell } from "@/components/reference-shell"

export default function ReferenceMissing() {
  return (
    <ReferenceShell>
      <h1 className="font-heading text-4xl leading-none">Not in the book</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#5c4e3d]">
        That name is not in this reference for Part I.
      </p>
      <p className="mt-4">
        <Link href="/journal/reference" className="text-sm text-[#8a6232] underline-offset-2 hover:underline">
          Back to the reference
        </Link>
      </p>
    </ReferenceShell>
  )
}
