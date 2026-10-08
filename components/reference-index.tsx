"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"

export type ReferenceCard = {
  href: string
  name: string
  kind: "Person" | "Place"
  role: string
  find: string
}

const filters = ["All", "People", "Places"] as const

export function ReferenceIndex({
  items,
  peopleCount,
  placeCount,
}: {
  items: ReferenceCard[]
  peopleCount: number
  placeCount: number
}) {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")
  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items.filter((item) => {
      if (filter === "People" && item.kind !== "Person") return false
      if (filter === "Places" && item.kind !== "Place") return false
      if (!needle) return true
      return item.find.includes(needle)
    })
  }, [filter, items, query])

  const groups = new Map<string, ReferenceCard[]>()
  for (const item of shown) {
    const letter = item.name.replace(/^The /, "").charAt(0).toUpperCase()
    const list = groups.get(letter) ?? []
    list.push(item)
    groups.set(letter, list)
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] tracking-[0.16em] text-[#8a6232] uppercase">Part I</p>
        <h1 className="mt-1 font-heading text-4xl leading-none">Reference</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#5c4e3d]">
          {peopleCount} people and {placeCount} places from The Pilgrim’s Progress. Open any name for a picture, the
          part they play, and the scriptures in the margin. The verses are the Authorized Version.
        </p>
      </div>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search a name or a verse, such as Psalm 23"
        aria-label="Search the reference"
        className="h-10 bg-white/60"
      />
      <div className="flex gap-2" role="tablist" aria-label="Filter">
        {filters.map((item) => {
          const selected = filter === item
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(item)}
              className={`rounded-full px-3 py-1 text-sm ${
                selected ? "bg-[#241c14] text-[#f4ecdf]" : "bg-[#e7dcc6] text-[#241c14]"
              }`}
            >
              {item}
            </button>
          )
        })}
      </div>
      {shown.length === 0 ? (
        <p className="text-sm text-[#5c4e3d]">Nothing in Part I matches that.</p>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([letter, group]) => (
            <section key={letter} aria-label={letter}>
              <h2 className="font-heading text-2xl leading-none text-[#8a6232]">{letter}</h2>
              <ul className="mt-2 divide-y divide-[#241c14]/10">
                {group.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="block py-3 hover:bg-white/40">
                      <span className="text-[11px] tracking-[0.14em] text-[#8a6232] uppercase">{item.kind}</span>
                      <span className="mt-0.5 block font-heading text-2xl leading-none">{item.name}</span>
                      <span className="mt-1 block text-sm text-[#5c4e3d]">{item.role}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
