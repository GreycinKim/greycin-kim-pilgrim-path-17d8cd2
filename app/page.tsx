import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { AuthForm } from "@/components/auth-form"
import { getCurrentUser } from "@/lib/dal"

export const metadata: Metadata = {
  title: "Sign in · Waymark",
  description:
    "Sign in to keep your place in The Pilgrim’s Progress and see it on the map.",
}

export default async function HomePage() {
  const user = await getCurrentUser()
  if (user) redirect("/journal")
  return <AuthForm />
}
