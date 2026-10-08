import "server-only"
import { mkdirSync } from "node:fs"
import path from "node:path"
import { DatabaseSync } from "node:sqlite"
import { getStage, stages, stagesReached } from "@/lib/journey"
import { getMission } from "@/lib/missions"
import { ARRIVAL_POINTS, type Award, type AwardKind } from "@/lib/score"

type DatabaseHandle = DatabaseSync

const SCHEMA = 6
const globalForDb = globalThis as unknown as {
  waymarkDb?: DatabaseHandle
  waymarkSchema?: number
}

function database() {
  if (!globalForDb.waymarkDb) {
    const dir = path.join(process.cwd(), "data")
    mkdirSync(dir, { recursive: true })
    globalForDb.waymarkDb = new DatabaseSync(path.join(dir, "waymark.sqlite"))
  }
  if (globalForDb.waymarkSchema !== SCHEMA) {
    globalForDb.waymarkDb.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS progress (
        user_id TEXT PRIMARY KEY,
        stage_id TEXT NOT NULL,
        finished INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS notes (
        user_id TEXT NOT NULL,
        stage_id TEXT NOT NULL,
        body TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (user_id, stage_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        stage_id TEXT NOT NULL,
        recipient_id TEXT,
        body TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
      );
      CREATE TABLE IF NOT EXISTS checkins (
        user_id TEXT NOT NULL,
        day TEXT NOT NULL,
        created_at TEXT NOT NULL,
        PRIMARY KEY (user_id, day),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `)
    globalForDb.waymarkSchema = SCHEMA
  }
  ensurePortraitColumn(globalForDb.waymarkDb)
  ensureAccountColumns(globalForDb.waymarkDb)
  ensureScoreTables(globalForDb.waymarkDb)
  return globalForDb.waymarkDb
}

function ensureScoreTables(db: DatabaseHandle) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS awards (
      user_id TEXT NOT NULL,
      stage_id TEXT NOT NULL,
      kind TEXT NOT NULL,
      points INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (user_id, stage_id, kind),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS quiz_starts (
      user_id TEXT NOT NULL,
      stage_id TEXT NOT NULL,
      started_at TEXT NOT NULL,
      PRIMARY KEY (user_id, stage_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS quiz_answers (
      user_id TEXT NOT NULL,
      stage_id TEXT NOT NULL,
      quiz TEXT NOT NULL,
      path INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (user_id, stage_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `)
}

function ensurePortraitColumn(db: DatabaseHandle) {
  const columns = db.prepare(`PRAGMA table_info(users)`).all()
  const hasPortrait = columns.some((column) => text(column.name) === "portrait_at")
  if (!hasPortrait) db.exec(`ALTER TABLE users ADD COLUMN portrait_at TEXT`)
}

function ensureAccountColumns(db: DatabaseHandle) {
  const columns = db.prepare(`PRAGMA table_info(users)`).all()
  const names = new Set(columns.map((column) => text(column.name)))
  if (!names.has("given_name")) db.exec(`ALTER TABLE users ADD COLUMN given_name TEXT`)
  if (!names.has("admin")) db.exec(`ALTER TABLE users ADD COLUMN admin INTEGER NOT NULL DEFAULT 0`)
  const emails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter((item) => item.length > 0)
  const promote = db.prepare(`UPDATE users SET admin = 1 WHERE email = ?`)
  for (const email of emails) promote.run(email)
}

export type UserRecord = {
  id: string
  email: string
  name: string
  givenName: string | null
  admin: boolean
  passwordHash: string
}

function text(value: unknown) {
  return typeof value === "string" ? value : ""
}

export function insertUser(user: UserRecord) {
  database()
    .prepare(
      `INSERT INTO users (id, email, name, given_name, password_hash, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(user.id, user.email, user.name, user.givenName, user.passwordHash, new Date().toISOString())
}

function userFromRow(row: Record<string, unknown>): UserRecord {
  const givenName = text(row.given_name)
  return {
    id: text(row.id),
    email: text(row.email),
    name: text(row.name),
    givenName: givenName || null,
    admin: Number(row.admin) === 1,
    passwordHash: text(row.password_hash),
  }
}

export function getUserByEmail(email: string): UserRecord | null {
  const row = database()
    .prepare(
      `SELECT id, email, name, given_name, admin, password_hash FROM users WHERE email = ?`,
    )
    .get(email)
  if (!row) return null
  return userFromRow(row)
}

export function getUserById(id: string): UserRecord | null {
  const row = database()
    .prepare(
      `SELECT id, email, name, given_name, admin, password_hash FROM users WHERE id = ?`,
    )
    .get(id)
  if (!row) return null
  return userFromRow(row)
}

export function setGivenName(id: string, givenName: string) {
  database().prepare(`UPDATE users SET given_name = ? WHERE id = ?`).run(givenName, id)
}

export type ProgressRecord = {
  stageId: string
  finished: boolean
  updatedAt: string
}

export function ensureProgress(userId: string): ProgressRecord {
  const existing = getProgress(userId)
  if (existing) return existing
  const stageId = stages[0].id
  const updatedAt = new Date().toISOString()
  database()
    .prepare(
      `INSERT INTO progress (user_id, stage_id, finished, updated_at)
       VALUES (?, ?, 0, ?)`,
    )
    .run(userId, stageId, updatedAt)
  return { stageId, finished: false, updatedAt }
}

export function getProgress(userId: string): ProgressRecord | null {
  const row = database()
    .prepare(
      `SELECT stage_id, finished, updated_at FROM progress WHERE user_id = ?`,
    )
    .get(userId)
  if (!row) return null
  const updatedAt = text(row.updated_at) || new Date().toISOString()
  const stageId = text(row.stage_id)
  if (!getStage(stageId)) {
    return { stageId: stages[0].id, finished: false, updatedAt }
  }
  return { stageId, finished: Number(row.finished) === 1, updatedAt }
}

export function setProgress(userId: string, stageId: string, finished: boolean) {
  database()
    .prepare(
      `INSERT INTO progress (user_id, stage_id, finished, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(user_id) DO UPDATE SET
         stage_id = excluded.stage_id,
         finished = excluded.finished,
         updated_at = excluded.updated_at`,
    )
    .run(userId, stageId, finished ? 1 : 0, new Date().toISOString())
}

export function getNotes(userId: string) {
  const rows = database()
    .prepare(`SELECT stage_id, body FROM notes WHERE user_id = ?`)
    .all(userId)
  const notes: Record<string, string> = {}
  for (const row of rows) {
    const id = text(row.stage_id)
    if (getStage(id)) notes[id] = text(row.body)
  }
  return notes
}

export type CompanyRow = {
  id: string
  name: string
  stageId: string
  finished: boolean
  arrivedAt: string
  portraitAt: string | null
  points: number
}

export function listCompany(): CompanyRow[] {
  grantKnownArrivals()
  const scores = pointsByUser()
  const rows = database()
    .prepare(
      `SELECT users.id, users.name, users.created_at, users.portrait_at,
              progress.stage_id, progress.finished, progress.updated_at
       FROM users
       LEFT JOIN progress ON progress.user_id = users.id
       ORDER BY users.created_at ASC`,
    )
    .all()
  return rows.map((row) => {
    const stageId = text(row.stage_id)
    const portraitAt = text(row.portrait_at)
    return {
      id: text(row.id),
      name: text(row.name),
      stageId: getStage(stageId) ? stageId : stages[0].id,
      finished: Number(row.finished) === 1,
      arrivedAt: text(row.updated_at) || text(row.created_at) || new Date().toISOString(),
      portraitAt: portraitAt || null,
      points: scores.get(text(row.id)) ?? 0,
    }
  })
}

const awardKinds = new Set<AwardKind>(["arrival", "quiz", "path"])

export function listAwards(userId: string): Award[] {
  const rows = database()
    .prepare(`SELECT stage_id, kind, points, created_at FROM awards WHERE user_id = ?`)
    .all(userId)
  const awards: Award[] = []
  for (const row of rows) {
    const kind = text(row.kind)
    const stageId = text(row.stage_id)
    if (kind === "mission") {
      if (!getMission(stageId)) continue
    } else if (!awardKinds.has(kind as AwardKind) || !getStage(stageId)) {
      continue
    }
    const createdAt = text(row.created_at)
    awards.push({
      stageId,
      kind: kind as AwardKind,
      points: Number(row.points) || 0,
      createdAt: createdAt || undefined,
    })
  }
  return awards
}

function grantKnownArrivals() {
  const rows = database()
    .prepare(`SELECT user_id, stage_id, finished FROM progress`)
    .all()
  for (const row of rows) {
    const stageId = text(row.stage_id)
    if (!getStage(stageId)) continue
    grantArrivals(text(row.user_id), stageId, Number(row.finished) === 1)
  }
}

export function grantArrivals(userId: string, stageId: string, finished: boolean) {
  const insert = database().prepare(
    `INSERT INTO awards (user_id, stage_id, kind, points, created_at)
     VALUES (?, ?, 'arrival', ?, ?)
     ON CONFLICT(user_id, stage_id, kind) DO NOTHING`,
  )
  const now = new Date().toISOString()
  for (const id of stagesReached(stageId, finished)) {
    insert.run(userId, id, ARRIVAL_POINTS, now)
  }
}

export function hasSavedAward(userId: string, stageId: string, kind: AwardKind) {
  const row = database()
    .prepare(`SELECT 1 AS present FROM awards WHERE user_id = ? AND stage_id = ? AND kind = ?`)
    .get(userId, stageId, kind)
  return Boolean(row)
}

export function saveMissionAward(userId: string, missionId: string, points: number) {
  const photoAt = new Date().toISOString()
  const existed = hasSavedAward(userId, missionId, "mission")
  database()
    .prepare(
      `INSERT INTO awards (user_id, stage_id, kind, points, created_at)
       VALUES (?, ?, 'mission', ?, ?)
       ON CONFLICT(user_id, stage_id, kind) DO UPDATE SET created_at = excluded.created_at`,
    )
    .run(userId, missionId, points, photoAt)
  return { gained: existed ? 0 : points, photoAt }
}

export function saveAwardOnce(userId: string, stageId: string, kind: AwardKind, points: number) {
  const info = database()
    .prepare(
      `INSERT INTO awards (user_id, stage_id, kind, points, created_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(user_id, stage_id, kind) DO NOTHING`,
    )
    .run(userId, stageId, kind, points, new Date().toISOString())
  const row = database()
    .prepare(`SELECT points FROM awards WHERE user_id = ? AND stage_id = ? AND kind = ?`)
    .get(userId, stageId, kind)
  const saved = Number(row?.points) || 0
  return { points: saved, gained: info.changes > 0 ? saved : 0 }
}

export function sumPoints(userId: string) {
  const row = database()
    .prepare(`SELECT COALESCE(SUM(points), 0) AS points FROM awards WHERE user_id = ?`)
    .get(userId)
  return Number(row?.points) || 0
}

function pointsByUser() {
  const rows = database()
    .prepare(`SELECT user_id, COALESCE(SUM(points), 0) AS points FROM awards GROUP BY user_id`)
    .all()
  const scores = new Map<string, number>()
  for (const row of rows) scores.set(text(row.user_id), Number(row.points) || 0)
  return scores
}

export function beginQuizClock(userId: string, stageId: string) {
  const existing = quizClock(userId, stageId)
  if (existing) return existing
  const startedAt = new Date().toISOString()
  database()
    .prepare(
      `INSERT INTO quiz_starts (user_id, stage_id, started_at)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, stage_id) DO NOTHING`,
    )
    .run(userId, stageId, startedAt)
  return quizClock(userId, stageId) || startedAt
}

export function quizClock(userId: string, stageId: string) {
  const row = database()
    .prepare(`SELECT started_at FROM quiz_starts WHERE user_id = ? AND stage_id = ?`)
    .get(userId, stageId)
  return row ? text(row.started_at) : ""
}

export function setPortraitAt(userId: string, portraitAt: string | null) {
  database().prepare(`UPDATE users SET portrait_at = ? WHERE id = ?`).run(portraitAt, userId)
}

export function listCheckins(userId: string) {
  const rows = database()
    .prepare(`SELECT day FROM checkins WHERE user_id = ? ORDER BY day ASC`)
    .all(userId)
  return rows.map((row) => text(row.day)).filter((day) => day.length > 0)
}

export function addCheckin(userId: string, day: string) {
  database()
    .prepare(
      `INSERT INTO checkins (user_id, day, created_at)
       VALUES (?, ?, ?)
       ON CONFLICT(user_id, day) DO NOTHING`,
    )
    .run(userId, day, new Date().toISOString())
}

export function pseudonymTaken(name: string, exceptUserId?: string) {
  const needle = name.toLowerCase()
  const rows = database().prepare(`SELECT id, name FROM users`).all()
  return rows.some(
    (row) => text(row.id) !== exceptUserId && text(row.name).toLowerCase() === needle,
  )
}

export function renameUser(id: string, name: string) {
  database().prepare(`UPDATE users SET name = ? WHERE id = ?`).run(name, id)
}

export function saveQuizAnswers(userId: string, stageId: string, quiz: number[], pathChoice: number) {
  database()
    .prepare(
      `INSERT INTO quiz_answers (user_id, stage_id, quiz, path, created_at)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(user_id, stage_id) DO NOTHING`,
    )
    .run(userId, stageId, JSON.stringify(quiz), pathChoice, new Date().toISOString())
}

export type AccountRow = {
  id: string
  pseudonym: string
  givenName: string | null
  email: string
}

export function listAccounts(): AccountRow[] {
  const rows = database()
    .prepare(
      `SELECT id, name, given_name, email FROM users ORDER BY created_at ASC`,
    )
    .all()
  return rows.map((row) => {
    const givenName = text(row.given_name)
    return {
      id: text(row.id),
      pseudonym: text(row.name),
      givenName: givenName || null,
      email: text(row.email),
    }
  })
}

export type AwardRow = {
  userId: string
  stageId: string
  kind: string
  points: number
  createdAt: string
}

export function listAllAwards(): AwardRow[] {
  const rows = database()
    .prepare(`SELECT user_id, stage_id, kind, points, created_at FROM awards`)
    .all()
  return rows.map((row) => ({
    userId: text(row.user_id),
    stageId: text(row.stage_id),
    kind: text(row.kind),
    points: Number(row.points) || 0,
    createdAt: text(row.created_at),
  }))
}

export type QuizAnswerRow = {
  userId: string
  stageId: string
  quiz: number[]
  path: number
}

export function listAllQuizAnswers(): QuizAnswerRow[] {
  const rows = database()
    .prepare(`SELECT user_id, stage_id, quiz, path FROM quiz_answers`)
    .all()
  const answers: QuizAnswerRow[] = []
  for (const row of rows) {
    let parsed: unknown
    try {
      parsed = JSON.parse(text(row.quiz) || "[]")
    } catch {
      continue
    }
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === "number")) continue
    answers.push({
      userId: text(row.user_id),
      stageId: text(row.stage_id),
      quiz: parsed,
      path: Number(row.path),
    })
  }
  return answers
}

export function saveNote(userId: string, stageId: string, body: string) {
  const trimmed = body.slice(0, 4000)
  if (!trimmed.trim()) {
    database()
      .prepare(`DELETE FROM notes WHERE user_id = ? AND stage_id = ?`)
      .run(userId, stageId)
    return
  }
  database()
    .prepare(
      `INSERT INTO notes (user_id, stage_id, body, updated_at)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(user_id, stage_id) DO UPDATE SET
         body = excluded.body,
         updated_at = excluded.updated_at`,
    )
    .run(userId, stageId, trimmed, new Date().toISOString())
}
