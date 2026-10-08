"use client"

import { Button } from "@/components/ui/button"

export default function JournalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="desk grid h-dvh place-items-center px-6 text-[#f4ecdf]">
      <div className="max-w-sm text-center">
        <h1 className="font-heading text-4xl">The journal didn’t open</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#f4ecdf]/75">
          Your place is still saved. Try opening it again.
        </p>
        <Button type="button" className="mt-5 h-10" onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  )
}
