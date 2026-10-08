export const RETREAT_DAY = "2026-10-30"

/** Calendar days from a local day to the retreat. D-Day on the 30th, then nothing. */
export function retreatCountdown(today: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(today)) return null
  const days = Math.round(
    (Date.parse(`${RETREAT_DAY}T00:00:00Z`) - Date.parse(`${today}T00:00:00Z`)) / 86_400_000,
  )
  if (!Number.isFinite(days) || days < 0) return null
  if (days === 0) return "D-Day"
  return `D-${days}`
}
