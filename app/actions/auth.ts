"use server"

import { compare, hash } from "bcryptjs"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { checkGivenName, checkPseudonym } from "@/lib/company"
import { getCurrentUser } from "@/lib/dal"
import {
  ensureProgress,
  getUserByEmail,
  insertUser,
  pseudonymTaken,
  renameUser,
  setGivenName,
} from "@/lib/db"
import { createSession, deleteSession } from "@/lib/session"

export type AuthState = {
  error?: string
  fieldErrors?: {
    givenName?: string
    name?: string
    email?: string
    password?: string
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function readEmail(formData: FormData) {
  return String(formData.get("email") ?? "").trim().toLowerCase()
}

function readPassword(formData: FormData) {
  return String(formData.get("password") ?? "")
}

export async function signup(
  _state: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  const checkedGiven = checkGivenName(String(formData.get("givenName") ?? ""))
  const checkedName = checkPseudonym(String(formData.get("name") ?? ""))
  const email = readEmail(formData)
  const password = readPassword(formData)
  const fieldErrors: AuthState["fieldErrors"] = {}

  if (!checkedGiven.ok) fieldErrors.givenName = checkedGiven.error
  if (!checkedName.ok) fieldErrors.name = checkedName.error
  if (!emailPattern.test(email) || email.length > 120) {
    fieldErrors.email = "Enter a valid email."
  }
  if (password.length < 8) fieldErrors.password = "Use at least 8 characters."
  if (password.length > 72) fieldErrors.password = "Use 72 characters or fewer."
  if (fieldErrors.givenName || fieldErrors.name || fieldErrors.email || fieldErrors.password) {
    return { fieldErrors }
  }

  if (!checkedGiven.ok || !checkedName.ok) return { fieldErrors }
  if (pseudonymTaken(checkedName.name)) {
    return { fieldErrors: { name: "Someone on the road already uses that name." } }
  }
  if (getUserByEmail(email)) {
    return { error: "An account with that email already exists. Sign in instead." }
  }

  const passwordHash = await hash(password, 10)
  const id = crypto.randomUUID()
  try {
    insertUser({
      id,
      email,
      name: checkedName.name,
      givenName: checkedGiven.name,
      admin: false,
      passwordHash,
    })
  } catch {
    return { error: "An account with that email already exists. Sign in instead." }
  }
  ensureProgress(id)
  await createSession(id)
  redirect("/journal")
}

export async function login(
  _state: AuthState | undefined,
  formData: FormData,
): Promise<AuthState> {
  const email = readEmail(formData)
  const password = readPassword(formData)
  const fieldErrors: AuthState["fieldErrors"] = {}
  if (!emailPattern.test(email)) fieldErrors.email = "Enter a valid email."
  if (!password) fieldErrors.password = "Enter your password."
  if (fieldErrors.email || fieldErrors.password) return { fieldErrors }

  const user = getUserByEmail(email)
  const matches = user ? await compare(password, user.passwordHash) : false
  if (!user || !matches) {
    return { error: "Email or password is incorrect." }
  }
  ensureProgress(user.id)
  await createSession(user.id)
  redirect("/journal")
}

export type PseudonymState = {
  error?: string
  saved?: boolean
}

export async function updatePseudonym(
  _state: PseudonymState | undefined,
  formData: FormData,
): Promise<PseudonymState> {
  const user = await getCurrentUser()
  if (!user) return { error: "Sign in again to change your name." }
  const checked = checkPseudonym(String(formData.get("name") ?? ""))
  if (!checked.ok) return { error: checked.error }
  if (pseudonymTaken(checked.name, user.id)) {
    return { error: "Someone on the road already uses that name." }
  }
  renameUser(user.id, checked.name)
  revalidatePath("/journal")
  return { saved: true }
}

export async function updateGivenName(
  _state: PseudonymState | undefined,
  formData: FormData,
): Promise<PseudonymState> {
  const user = await getCurrentUser()
  if (!user) return { error: "Sign in again to change your name." }
  const checked = checkGivenName(String(formData.get("givenName") ?? ""))
  if (!checked.ok) return { error: checked.error }
  setGivenName(user.id, checked.name)
  revalidatePath("/journal")
  revalidatePath("/journal/admin")
  return { saved: true }
}

export async function logout() {
  await deleteSession()
  redirect("/")
}
