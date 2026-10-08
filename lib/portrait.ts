export function portraitSrc(id: string, portraitAt: string | null | undefined) {
  if (!portraitAt) return null
  return `/api/portrait/${id}?v=${encodeURIComponent(portraitAt)}`
}
