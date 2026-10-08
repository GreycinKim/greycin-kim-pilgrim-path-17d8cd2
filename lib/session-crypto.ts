import { randomBytes } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { SignJWT, jwtVerify } from "jose"

export type SessionPayload = {
  userId: string
}

let encodedKey: Uint8Array | null = null

function secretKey() {
  if (encodedKey) return encodedKey
  const fromEnv = process.env.SESSION_SECRET?.trim()
  let secret = fromEnv && fromEnv.length >= 32 ? fromEnv : ""
  if (!secret) {
    const file = path.join(process.cwd(), "data", ".session-secret")
    try {
      secret = readFileSync(file, "utf8").trim()
    } catch {
      secret = randomBytes(32).toString("base64")
      mkdirSync(path.dirname(file), { recursive: true })
      writeFileSync(file, secret, { mode: 0o600 })
    }
  }
  encodedKey = new TextEncoder().encode(secret)
  return encodedKey
}

export async function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secretKey())
}

export async function decryptSession(token: string | undefined) {
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
    })
    if (typeof payload.userId !== "string" || payload.userId.length === 0) {
      return null
    }
    return { userId: payload.userId }
  } catch {
    return null
  }
}
