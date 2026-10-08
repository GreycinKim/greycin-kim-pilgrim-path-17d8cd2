"use client"

import { useActionState, useState } from "react"
import { login, signup, type AuthState } from "@/app/actions/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AuthForm() {
  const [mode, setMode] = useState<"signin" | "create">("signin")

  return (
    <div className="flex min-h-dvh items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[#241c14]">
              <CompassMark ink />
              <p className="font-heading text-3xl">Waymark</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#5c4e3d]">
              A reading journal for The Pilgrim’s Progress. Your place on the
              map follows the passage you are in.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-full bg-[#e7dcc6] p-1">
            <button
              type="button"
              onClick={() => setMode("signin")}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                mode === "signin" ? "bg-[#f7f1e4] text-[#241c14] shadow-sm" : "text-[#5c4e3d]"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => setMode("create")}
              className={`rounded-full px-3 py-2 text-sm font-medium ${
                mode === "create" ? "bg-[#f7f1e4] text-[#241c14] shadow-sm" : "text-[#5c4e3d]"
              }`}
            >
              Create account
            </button>
          </div>

          {mode === "signin" ? (
            <CredentialForm
              key="signin"
              mode="signin"
              action={login}
              submitLabel="Sign in"
              pendingLabel="Signing in…"
            />
          ) : (
            <CredentialForm
              key="create"
              mode="create"
              action={signup}
              submitLabel="Create journal"
              pendingLabel="Creating your journal…"
            />
          )}
        </div>
    </div>
  )
}

function CredentialForm({
  mode,
  action,
  submitLabel,
  pendingLabel,
}: {
  mode: "signin" | "create"
  action: (state: AuthState | undefined, formData: FormData) => Promise<AuthState>
  submitLabel: string
  pendingLabel: string
}) {
  const [state, formAction, pending] = useActionState(action, undefined)

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div>
        <h2 className="font-heading text-3xl text-[#241c14]">
          {mode === "signin" ? "Welcome back" : "Begin a journal"}
        </h2>
        <p className="mt-1 text-sm text-[#5c4e3d]">
          {mode === "signin"
            ? "Your pin, passages, and notes are waiting."
            : "Choose a name for the map. Other readers do not see your email. You start in the City of Destruction."}
        </p>
      </div>

      {state?.error ? (
        <p role="alert" className="rounded-lg bg-[#9a3b32]/10 px-3 py-2 text-sm text-[#7d2e28]">
          {state.error}
        </p>
      ) : null}

      {mode === "create" ? (
        <>
          <Field
            id="given-name"
            label="Your name"
            name="givenName"
            autoComplete="name"
            error={state?.fieldErrors?.givenName}
            hint="Private. Other readers only see the map name."
          />
          <Field
            id="name"
            label="Name on the map"
            name="name"
            autoComplete="nickname"
            error={state?.fieldErrors?.name}
            hint="Other readers see this name, not your email."
          />
        </>
      ) : null}
      <Field
        id="email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        error={state?.fieldErrors?.email}
      />
      <Field
        id="password"
        label="Password"
        name="password"
        type="password"
        autoComplete={mode === "create" ? "new-password" : "current-password"}
        error={state?.fieldErrors?.password}
        hint={mode === "create" ? "At least 8 characters." : undefined}
      />

      <Button
        type="submit"
        disabled={pending}
        className="h-11 w-full text-sm"
      >
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  )
}

function Field({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  error,
  hint,
}: {
  id: string
  label: string
  name: string
  type?: string
  autoComplete: string
  error?: string
  hint?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-11 bg-[#f7f1e4] px-3"
        required
      />
      {error ? (
        <p id={`${id}-error`} className="text-sm text-[#7d2e28]">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-[#6a5b48]">{hint}</p>
      ) : null}
    </div>
  )
}

function CompassMark({ ink = false }: { ink?: boolean }) {
  const stroke = ink ? "#241c14" : "#c6a15a"
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="none" stroke={stroke} strokeWidth="1.4" />
      <path d="M14 4.5 L16.2 14 L14 12.2 L11.8 14 Z" fill={stroke} />
      <path d="M14 23.5 L11.8 14 L14 15.8 L16.2 14 Z" fill={stroke} opacity="0.45" />
    </svg>
  )
}
