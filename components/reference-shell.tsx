import Link from "next/link"
import type { ReactNode } from "react"

export function ReferenceShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#1a1410] pt-[env(safe-area-inset-top)] text-[#f4ecdf]">
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <Link href="/journal" className="font-heading text-2xl leading-none">
          Waymark
        </Link>
        <Link href="/journal" className="text-xs text-[#c6a15a] underline-offset-2 hover:underline">
          Back to the map
        </Link>
      </header>
      <main className="min-h-0 flex-1 overflow-y-auto bg-[#f4ecdf] text-[#241c14]">
        <div className="mx-auto w-full max-w-3xl px-5 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6">{children}</div>
      </main>
    </div>
  )
}
