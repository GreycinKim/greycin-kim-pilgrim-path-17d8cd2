const dayPattern = /^\d{4}-\d{2}-\d{2}$/

export function localDay(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${date.getFullYear()}-${month}-${day}`
}

export function previousDay(day: string) {
  const [year, month, date] = day.split("-").map(Number)
  const then = new Date(year, (month || 1) - 1, date || 1)
  then.setDate(then.getDate() - 1)
  return localDay(then)
}

export function isPlausibleDay(day: string, now = new Date()) {
  if (!dayPattern.test(day)) return false
  const [year, month, date] = day.split("-").map(Number)
  const then = new Date(year, (month || 1) - 1, date || 1, 12, 0, 0, 0)
  if (Number.isNaN(then.getTime())) return false
  return Math.abs(then.getTime() - now.getTime()) < 36 * 60 * 60 * 1000
}

/** Consecutive days ending today, or yesterday if today is still open. */
export function streakEnding(days: string[], today: string) {
  const have = new Set(days)
  let cursor = today
  if (!have.has(cursor)) {
    cursor = previousDay(today)
    if (!have.has(cursor)) return 0
  }
  let count = 0
  while (have.has(cursor)) {
    count += 1
    cursor = previousDay(cursor)
  }
  return count
}

export function recentDays(today: string, count = 7) {
  const days = [today]
  let cursor = today
  for (let index = 1; index < count; index += 1) {
    cursor = previousDay(cursor)
    days.push(cursor)
  }
  return days.reverse()
}
